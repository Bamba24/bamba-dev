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
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HEADER TYPE CODELYNX */}
      <header className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-900">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t('archive.title_main')}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
          {t('archive.description')}
        </p>
      </header>

      {/* RECHERCHE ET LISTE DES ARTICLES */}
      <section className="space-y-6">
        <FilteredPosts posts={posts} />
      </section>

    </main>
  );
}