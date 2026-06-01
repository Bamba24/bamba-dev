import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // configurations générales
  images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      },
      
      // Compression et performance
      compress: true,
      productionBrowserSourceMaps: false,
      
      // Headers de sécurité
      async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
              },
              {
                key: 'X-Frame-Options',
                value: 'DENY',
              },
              {
                key: 'X-XSS-Protection',
                value: '1; mode=block',
              },
              {
                key: 'Referrer-Policy',
                value: 'strict-origin-when-cross-origin',
              },
            ],
          },
          // Cache headers pour les assets statiques
          {
            source: '/public/:path*',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
              },
            ],
          },
        ];
      },
      
      // Redirects pour les anciennes URLs
      async redirects() {
        return [
          // Ajouter des redirects si nécessaire
           {
          source: '/articles',
          destination: '/posts',
          permanent: false,
        },
        {
          source: '/articles/:slug',
          destination: '/posts/:slug',
          permanent: false,
        },
        {
          source: '/categories/:tag',
          destination: '/tags/:tag',
          permanent: false,
        },
        {
          source: '/category/:tag',
          destination: '/tags/:tag',
          permanent: false,
        },
        ];
      },
};

export default nextConfig;
