import React from "react";
import { getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import { setStaticParamsLocale } from 'next-international/server'

export const dynamic = 'force-static';
export const dynamicParams = true; 

export const revalidate = 3600; 

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params: Array<{ locale: string; tag: string }> = [];
  
  for (const locale of locales) {
    try {
      const posts = await getPosts(locale);
      if (posts) {
        const tags = Array.from(new Set(posts.map(post => post.tag).filter(Boolean)));
        tags.forEach(tag => {
          params.push({ locale, tag });
        });
      }
    } catch (error) {
      console.error(`Erreur generateStaticParams [Tags] pour la locale ${locale}:`, error);
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string, locale: string }> }): Promise<Metadata> {
  const { tag, locale } = await params;
 
  if (!locale || locale === '[locale]') return {} as Metadata;
  if (!tag || typeof tag !== 'string') return {};
  if (!/^[a-z0-9\-]+$/i.test(tag)) return {};

  setStaticParamsLocale(locale);
 
  const posts = await getPosts(locale);
  const filteredPosts = posts ? posts.filter(post => post.tag?.toLowerCase() === tag.toLowerCase()) : [];

  if (filteredPosts.length === 0) {
    return {
      title: "Tag non trouvé",
      description: `Aucun article trouvé pour le tag "${tag}".`
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: `Articles sur "${tag}" | bambaDev`,
    description: `Découvrez les articles techniques liés au tag "${tag}" sur bambaDev.`,
    openGraph: {
      title: `Articles sur "${tag}" | bambaDev`,
      description: `Découvrez les articles techniques liés au tag "${tag}" sur bambaDev.`,
      url: `${baseUrl}/${locale}/tags/${tag}`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    }
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string , locale: string }>;
}) {
  const { tag, locale } = await params;

  if (!locale || locale === '[locale]') return null;

  setStaticParamsLocale(locale);

  const allPosts = await getPosts(locale);
  const t = await getI18n();

  if (!allPosts) return notFound();

  const allTags = Array.from(new Set(allPosts.map(post => post.tag).filter(Boolean)));
  const filteredPosts = allPosts.filter(
    (post) => post.tag?.toLowerCase() === tag.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    return notFound();
  }

  return (
<<<<<<< HEAD
    <main className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 lg:px-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 border border-2">
=======
    <main className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 lg:px-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
      
      {/* 1. NAVIGATION RETOUR PREMIUM */}
      <div className="mb-10">
        <Link
          href={`/${locale}/posts`} 
          className="inline-flex items-center text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-500 uppercase transition-all group"
        >
          <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          {t("nav.all_archives")}
        </Link>
      </div>

      {/* 2. HEADER TYPE STUDIO */}
      <header className="relative mb-20 md:mb-24 border-b border-zinc-100 dark:border-zinc-900 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
              <BookOpen size={16} strokeWidth={2.5} />
              <span className="text-xs font-mono uppercase tracking-widest">{t("tag.category")}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight capitalize leading-none">
              {tag}<span className="text-amber-600 font-semibold">.</span>
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
              {filteredPosts.length === 1 && t('tag.explorations.one')}
              {filteredPosts.length > 1 && t('tag.explorations.other', { count: filteredPosts.length })}
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right justify-between h-full pt-2 text-zinc-400 dark:text-zinc-600">
            <div className="text-[11px] font-mono tracking-widest uppercase leading-normal">
              Trié par tag <br /> & mis à jour
            </div>
          </div>
        </div>
      </header>

      {/* STRUCTURE EN GRILLE ASYMÉTRIQUE */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 md:gap-24 items-start ">
=======
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 md:gap-24 items-start">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
        
        {/* 3. LISTE DES ARTICLES FILTRÉS */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8 flex items-center gap-2">
            <span>01 /</span> {filteredPosts.length} Publications trouvées
          </h2>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* 4. SIDEBAR PREMIUM */}
        <aside className="space-y-10 lg:sticky lg:top-28">
          
          {/* Navigation des étiquettes (Tags) */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {t("sidebar.navigation")}
            </h3>
            <nav className="flex flex-wrap lg:flex-col gap-2" aria-label="Tags de navigation">
              {allTags.map((tName) => {
                const isCurrent = tName?.toLowerCase() === tag.toLowerCase();
                return (
                  <Link 
                    key={tName} 
                    href={`/${locale}/tags/${tName}`} 
                    className={`inline-flex lg:flex items-center justify-between gap-3 text-sm px-3 py-2 rounded-xl border transition-all group w-auto lg:w-full ${
                      isCurrent 
                        ? "bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/30 text-amber-600 dark:text-amber-500 font-medium" 
                        : "bg-white dark:bg-zinc-900 border-zinc-200/60 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-200 dark:hover:border-amber-900/50"
                    }`}
                  >
                    <span className="font-medium">#{tName}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                      isCurrent
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-400"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50 group-hover:text-amber-600"
                    }`}>
                      {allPosts.filter(p => p.tag === tName).length}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Newsletter Card */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-4">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-500">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">{t("sidebar.newsletter.title")}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t("sidebar.newsletter.description")}
              </p>
            </div>
            
            <form action="/newsletter" method="POST" className="space-y-3 pt-2">
              <label htmlFor="tag-email-newsletter" className="sr-only">
                {t("sidebar.newsletter.placeholder")}
              </label>
              <input 
                id="tag-email-newsletter"
                type="email" 
                required
                name="email"
                placeholder={t("sidebar.newsletter.placeholder")} 
                className="w-full text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500 transition-all placeholder:text-zinc-400"
              />
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

      {/* 5. FOOTER DE PAGE */}
      <footer className="mt-36 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">
        <div>
          © {new Date().getFullYear()} bambaDev.
        </div>
        <div className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
          <Link href={`/${locale}/categories`}>
            {t("tag.footer_ask")}
          </Link>
        </div>
      </footer>
    </main>
  );
}