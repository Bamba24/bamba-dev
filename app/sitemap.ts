import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts'; // Ta fonction pour récupérer tous les articles

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bambadev.com';
  const locales = ['fr', 'en']; // Les langues supportées par ton blog

  // 1. Pages statiques de ton site
  const staticPages = [
    '',
    '/categories',
    '/a-propos',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 2. Générer les entrées pour les pages statiques (avec gestion des locales)
  for (const page of staticPages) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8, // Priorité max pour la page d'accueil
      });
    }
  }

  // 3. Générer les entrées dynamiques pour tes articles de blog
  try {
    // On récupère les articles pour chaque langue (ou globalement selon ta structure lib/posts)
    for (const locale of locales) {
      const posts = await getPosts(locale);
      
      posts.forEach((post) => {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/posts/${post.slug}`,
          lastModified: new Date(post.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error("Erreur lors de la génération de la sitemap des posts:", error);
  }

  return sitemapEntries;
}