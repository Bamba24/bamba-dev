import { ImageResponse } from 'next/og';
import { getPosts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

export const alt = 'BambaDev Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Génération statique des images OpenGraph au moment du build
export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    try {
      const posts = await getPosts(locale);
      posts.forEach((post) => {
        params.push({ locale, slug: post.slug });
      });
    } catch (error) {
      console.error(`Erreur generateStaticParams (OG Image) pour la locale ${locale}:`, error);
    }
  }

  return params;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  
  // Remplacement des tirets par des espaces et capitalisation
  const title = slug.replace(/-/g, ' ');

  // 1. LIRE LE FICHIER DIRECTEMENT DEPUIS LE DOSSIER PUBLIC (Fixe l'erreur de Prerender au build)
  let buffer: ArrayBuffer;
  try {
    // Résolution du chemin absolu vers le dossier public de ton projet
    const filePath = path.join(process.cwd(), 'public', 'og-background.png');
    const fileBuffer = fs.readFileSync(filePath);
    
    // Conversion du Buffer Node.js en ArrayBuffer standard requis pour l'encodage
    buffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset, 
      fileBuffer.byteOffset + fileBuffer.byteLength
    );
  } catch (error) {
    throw new Error(
      "Impossible de lire l'image 'og-background.png' dans le dossier public/. Vérifie son extension et son emplacement."
    );
  }
  
  // 2. Transformation en Base64 sécurisée pour le Runtime Node standard
  const base64Image = Buffer.from(buffer).toString('base64');
  const backgroundImageStyle = `data:image/png;base64,${base64Image}`;

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