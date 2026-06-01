import { getPosts } from "@/lib/posts";
import { Hash, Layers } from "lucide-react";
import { getI18n } from '@/locales/server'
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import FilteredPosts from '@/components/filteredPosts';
import { setStaticParamsLocale } from 'next-international/server'

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
  const { locale } = await params

  if (!locale || locale === '[locale]') {
    return null;
  }

  setStaticParamsLocale(locale);
  
  const posts = await getPosts(locale);
  const t = await getI18n();

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 lg:px-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HEADER DE L'ARCHIVE TYPE STUDIO */}
      <header className="relative mb-16 md:mb-24 border-b border-zinc-100 dark:border-zinc-900 pb-12 md:pb-16">
        
        {/* Badge de section épuré */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-xs font-mono mb-6">
          <Hash className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" aria-hidden="true" />
          <span className="tracking-wider uppercase">
            Index ({posts.length})
          </span>
        </div>
        
        {/* Titre et description asymétriques */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1]">
              {t('archive.title_main')}{" "}
              <span className="bg-gradient-to-r from-zinc-400 via-zinc-500 to-zinc-600 dark:from-zinc-500 dark:via-zinc-400 dark:to-zinc-300 bg-clip-text text-transparent font-light">
                Archive
              </span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              {t('archive.description')}
            </p>
          </div>

          {/* Décoration ou métadonnée visuelle à droite */}
          <div className="hidden lg:flex flex-col items-end text-right justify-between h-full pt-2 text-zinc-400 dark:text-zinc-600">
            <Layers className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
            <div className="text-[11px] font-mono tracking-widest uppercase leading-normal">
              Recherche globale <br /> & filtres par tags
            </div>
          </div>
        </div>
      </header>

      {/* ZONE DES FILTRES ET DE LA LISTE D'ARTICLES */}
      <section className="min-h-[40vh] max-w-4xl mx-auto space-y-8">
        <FilteredPosts posts={posts} />
      </section>

      {/* FOOTER DE L'ARCHIVE SÉMANTIQUE */}
      {posts.length > 0 && (
        <footer className="mt-24 pt-10 border-t border-zinc-100 dark:border-zinc-900 text-center">
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
            {t('archive.end', { count: posts.length })}
          </p>
        </footer>
      )}
    </main>
  );
}