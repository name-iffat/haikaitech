import sharp from 'sharp';
import { writeFileSync } from 'fs';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#faf9f6"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.06"/>

  <!-- Grid pattern -->
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" stroke-width="0.5"/>
    </pattern>
  </defs>

  <!-- Top-left tape effect -->
  <rect x="40" y="30" width="120" height="24" rx="2" fill="#fef08a" opacity="0.8" transform="rotate(-2, 100, 42)"/>

  <!-- HAIKAITECH wordmark -->
  <text x="80" y="160" font-family="monospace" font-size="64" font-weight="900" fill="#0f172a" letter-spacing="-2">
    HAIKAITECH
  </text>
  <text x="80" y="200" font-family="monospace" font-size="20" fill="#64748b" letter-spacing="4">
    SOLUTIONS
  </text>

  <!-- Tagline -->
  <text x="80" y="290" font-family="system-ui, sans-serif" font-size="28" fill="#334155" font-weight="300">
    Custom web apps, dashboards &amp; interactive systems
  </text>
  <text x="80" y="330" font-family="system-ui, sans-serif" font-size="28" fill="#334155" font-weight="300">
    for businesses that outgrew templates.
  </text>

  <!-- Details -->
  <text x="80" y="400" font-family="monospace" font-size="16" fill="#94a3b8">
    React · .NET · Unity · Based in Penang, Malaysia
  </text>

  <!-- CTA pill -->
  <rect x="80" y="460" width="280" height="48" rx="8" fill="#25D366"/>
  <text x="220" y="490" font-family="system-ui, sans-serif" font-size="16" fill="white" font-weight="600" text-anchor="middle">
    Chat on WhatsApp →
  </text>

  <!-- Bottom bar -->
  <rect x="0" y="590" width="1200" height="40" fill="#0f172a"/>
  <text x="600" y="615" font-family="monospace" font-size="14" fill="#94a3b8" text-anchor="middle">
    haikaitech.my · SSM: 202603149868
  </text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('OG image generated: public/og-image.png (1200×630)');
