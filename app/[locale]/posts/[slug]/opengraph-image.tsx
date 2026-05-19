import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BambaDev Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png'; // On garde image/png en sortie car c'est le standard requis pour l'OpenGraph par Facebook/LinkedIn

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ');

  // 1. Charger l'image WebP depuis le dossier public et la transformer en Base64
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const response = await fetch(new URL(`${baseUrl}/og-background.webp`, import.meta.url));
  const buffer = await response.arrayBuffer();
  
  const base64Image = btoa(
    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const backgroundImageStyle = `data:image/webp;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          // On utilise la string Base64 ici
          backgroundImage: `url(${backgroundImageStyle})`,
          backgroundSize: '100% 100%',
          padding: '40px 80px',
        }}
      >
        <h1
          style={{
            fontSize: '55px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textTransform: 'capitalize',
            lineHeight: 1.3,
            textShadow: '0px 4px 20px rgba(0, 0, 0, 0.8)', 
          }}
        >
          {title}
        </h1>
      </div>
    ),
    { ...size }
  );
}