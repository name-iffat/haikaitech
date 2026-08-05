interface Env {
  GA4_API_SECRET?: string;
}

const MEASUREMENT_ID = 'G-82BQD8BX9G';
const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }): Promise<Response> => {
  const origin = request.headers.get('Origin');
  const allowed =
    !origin ||
    origin.endsWith('haikaitech.my') ||
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1');
  if (!allowed) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: JSON_HEADERS });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: JSON_HEADERS });
  }

  const apiSecret = env.GA4_API_SECRET;
  if (!apiSecret) {
    return new Response(JSON.stringify({ error: 'GA4 not configured' }), { status: 503, headers: JSON_HEADERS });
  }

  const url = `${GA4_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${apiSecret}`;
  const ga4Resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!ga4Resp.ok) {
    console.error('[track] GA4 error:', ga4Resp.status, await ga4Resp.text());
  }

  return new Response(null, { status: 204 });
};
