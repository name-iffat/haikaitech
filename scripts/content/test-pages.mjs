import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

export async function testPages(root, wrangler, baseline, logFile) {
  const redirects = path.join(root, 'dist/_redirects');
  const replacement = fs.readFileSync(redirects);
  const notFound = path.join(root, 'dist/404.html');
  const notFoundBytes = fs.readFileSync(notFound);
  let child;
  let logs = '';
  async function start() {
    const socket = createServer(); socket.listen(0, '127.0.0.1'); await once(socket, 'listening');
    const port = socket.address().port; await new Promise(resolve => socket.close(resolve));
    child = spawn(process.execPath, [wrangler, 'pages', 'dev', 'dist', '--ip', '127.0.0.1', '--port', String(port),
      '--compatibility-date', '2026-06-02', '--show-interactive-dev-session=false'], {
      cwd: root, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, WRANGLER_SEND_METRICS: 'false', CI: 'true' },
    });
    child.stdout.on('data', data => { logs += data; });
    child.stderr.on('data', data => { logs += data; });
    const base = `http://127.0.0.1:${port}`;
    for (let attempt = 0; attempt < 200; attempt++) {
      if (child.exitCode !== null) throw new Error(`Pages runtime exited: ${logs}`);
      try { const response = await fetch(base); if (response.ok) return base; } catch {}
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Pages startup timeout: ${logs}`);
  }
  async function stop() {
    if (!child || child.exitCode !== null) return;
    // Node is launched without a shell; Ctrl+C is unnecessary for this local server.
    child.kill();
    await Promise.race([once(child, 'exit'), new Promise(resolve => setTimeout(resolve, 3000))]);
  }
  const result = {};
  try {
    // Reproduce the original tree: no top-level 404, invalid catch-all ignored
    // by Wrangler 4.95.0, followed by Pages' automatic SPA fallback.
    fs.unlinkSync(notFound);
    fs.writeFileSync(redirects, '/* /index.html 200\n');
    let base = await start();
    const old = await fetch(`${base}/__missing_content_probe__/`);
    assert.equal(old.status, 200);
    assert.match(await old.text(), /HAIKAITECH/);
    result.previousCatchAll = 200;
    assert.match(logs, /Infinite loop detected/);
    result.previousRuleIgnoredAsLoop = true;
    await stop();
    fs.writeFileSync(redirects, replacement);
    fs.writeFileSync(notFound, notFoundBytes);
    base = await start();
    const missing = await fetch(`${base}/__missing_content_probe__/`);
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /Page not found/);
    const nested = await fetch(`${base}/blog/sentinel-draft/`);
    assert.equal(nested.status, 404);
    for (const route of baseline) assert.equal((await fetch(base + route)).status, 200, route);
    for (const route of ['/sitemap.xml', '/llms.txt', '/llms-full.txt', '/okf/blog.md']) {
      assert.equal((await fetch(base + route)).status, 200, route);
    }
    result.replacementMissing = 404;
    result.draftMissing = 404;
    result.baselineRoutes200 = baseline.length;
    return result;
  } finally {
    await stop();
    fs.writeFileSync(redirects, replacement);
    fs.writeFileSync(notFound, notFoundBytes);
    fs.writeFileSync(logFile, logs);
  }
}
