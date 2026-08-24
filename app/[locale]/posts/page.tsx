import { getPostsPreview } from "@/lib/posts";
import { Hash, Layers, Mail, ArrowUpRight } from "lucide-react";
import { getI18n } from '@/locales/server'
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import FilteredPosts from '@/components/filteredPosts';
import { setStaticParamsLocale } from 'next-international/server'
import Link from "next/link";

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
  
  const posts = await getPostsPreview(locale);
  const t = await getI18n();

  if (!posts || posts.length === 0) {
    return notFound();
  }

  const allTags = Array.from(new Set(posts.map(post => post.tag).filter(Boolean)));

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 lg:px-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HEADER DE L'ARCHIVE TYPE STUDIO */}
      <header className="relative mb-20 md:mb-28 border-b border-zinc-100 dark:border-zinc-900 pb-16">
        
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

      {/* GRILLE ASYMÉTRIQUE : CONTENU + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 md:gap-24 items-start">
        
        {/* ZONE DES FILTRES ET DE LA LISTE D'ARTICLES */}
        <section className="min-h-[40vh] space-y-8">
          <FilteredPosts posts={posts} />
        </section>
        
        {/* SIDEBAR ARCHITECTURÉE AVEC LES CARDS AGRANDIES ET ALIGNÉES */}
        <aside className="space-y-8 lg:sticky lg:top-8">
          
          {/* Bloc Navigation par Tags */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-5">
            {/* Alignement Horizontal : Logo + Titre */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                <Hash className="w-4 h-4" />
              </div>
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                {t("sidebar.navigation")}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Explorez les articles par thématiques et technologies.
            </p>
            
            <nav className="flex flex-wrap lg:flex-col gap-2.5 pt-1" aria-label="Tags de navigation">
              {allTags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/${locale}/tags/${tag}`}
                  className="inline-flex lg:flex items-center justify-between gap-3 text-sm px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-200 dark:hover:border-amber-900/50 transition-all group w-auto lg:w-full"
                >
                  <span className="font-medium">#{tag}</span>
                  <span className="text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-500 dark:text-zinc-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50 group-hover:text-amber-600 transition-colors">
                    {posts.filter(p => p.tag === tag).length}
                    <span className="sr-only"> articles</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Bloc Newsletter Premium */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-5">
            {/* Alignement Horizontal : Logo + Titre */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                {t("sidebar.newsletter.title")}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t("sidebar.newsletter.description")}
            </p>
            
            <form action="/newsletter" method="POST" className="space-y-3 pt-1">
              <label htmlFor="email-newsletter" className="sr-only">
                {t("sidebar.newsletter.placeholder")}
              </label>
              <div className="relative">
                <input 
                  id="email-newsletter"
                  type="email" 
                  required
                  name="email"
                  placeholder={t("sidebar.newsletter.placeholder")} 
                  className="w-full text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500 transition-all placeholder:text-zinc-400"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-medium tracking-wide uppercase hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-all cursor-pointer group"
              >
                <span>{t("sidebar.newsletter.button")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </aside>

      </div>
    </main>
  );
}