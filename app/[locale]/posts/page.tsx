import { getPostsPreview } from "@/lib/posts";
import { getI18n } from '@/locales/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import FilteredPosts from '@/components/filteredPosts';
import { setStaticParamsLocale } from 'next-international/server';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!locale || locale === '[locale]') {
    return {} as Metadata;
  }

  setStaticParamsLocale(locale);

  const t = await getI18n();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: `${t('archive.title_main')} | bambaDev`,
    description: t('archive.description'),
    openGraph: {
      title: `${t('archive.title_main')} | bambaDev`,
      description: t('archive.description'),
      url: `${baseUrl}/${locale}/posts`,  
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  }
}

export default async function AllPostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!locale || locale === '[locale]') {
    return null;
  }

  setStaticParamsLocale(locale);
  
  const posts = await getPostsPreview(locale);
  const t = await getI18n();

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HEADER ARCHIVE */}
      <header className="space-y-3 pb-8 border-b border-zinc-200/60 dark:border-zinc-900 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t('archive.title_main')}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
          {t('archive.description')}
        </p>
      </header>

      {/* RECHERCHE ET LISTE DES ARTICLES EN GRILLE */}
      <section className="space-y-8">
        <FilteredPosts posts={posts} />
      </section>

    </main>
  );
}