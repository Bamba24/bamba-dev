import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bambadev.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // On interdit aux robots de fouiller dans tes routes d'API
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}