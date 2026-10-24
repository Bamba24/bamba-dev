const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const createSvg = (size, isMaskable = false) => {
  const rx = isMaskable ? 0 : Math.round(size * 0.22);
  
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#18181b"/>
        <stop offset="100%" stop-color="#09090b"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="${size * 0.02}" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="${size}" height="${size}" rx="${rx}" fill="url(#bg)"/>
    
    <rect x="${size * 0.04}" y="${size * 0.04}" width="${size * 0.92}" height="${size * 0.92}" rx="${rx * 0.9}" fill="none" stroke="#27272a" stroke-width="${size * 0.015}"/>

    <g transform="translate(${size * 0.18}, ${size * 0.18}) scale(0.64)">
      <path d="M ${size * 0.15} ${size * 0.25} L ${size * 0.35} ${size * 0.45} L ${size * 0.15} ${size * 0.65}" 
            fill="none" stroke="url(#accent)" stroke-width="${size * 0.07}" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      
      <text x="${size * 0.46}" y="${size * 0.64}" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-size="${size * 0.46}" 
            font-weight="900" 
            fill="#ffffff">B</text>
      
      <rect x="${size * 0.80}" y="${size * 0.52}" width="${size * 0.07}" height="${size * 0.12}" fill="url(#accent)" rx="${size * 0.01}" />
    </g>
  </svg>
  `;
};

async function generate() {
  const svg192 = Buffer.from(createSvg(192));
  const svg512 = Buffer.from(createSvg(512));
  const svgMaskable = Buffer.from(createSvg(512, true));
  const svgApple = Buffer.from(createSvg(180));

  fs.writeFileSync(path.join(dir, 'icon.svg'), createSvg(512));
  
  await sharp(svg192).png().toFile(path.join(dir, 'icon-192x192.png'));
  await sharp(svg512).png().toFile(path.join(dir, 'icon-512x512.png'));
  await sharp(svgMaskable).png().toFile(path.join(dir, 'icon-maskable-512x512.png'));
  await sharp(svgApple).png().toFile(path.join(dir, 'apple-touch-icon.png'));
  
  console.log('PWA icons successfully generated in public/icons/');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
