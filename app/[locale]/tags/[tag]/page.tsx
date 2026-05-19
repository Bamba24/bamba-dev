import React from "react";
import { getPosts } from "@/lib/posts";
import NotFound from "./notFound";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import { PostCard } from "@/components/PostCard";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string , locale: string}>;
}) {
  const { tag , locale} = await params;
  const allPosts = await getPosts(locale);
  const t = await getI18n();

  // Extraction des tags uniques pour la sidebar
  const allTags = Array.from(new Set(allPosts.map(post => post.tag).filter(Boolean)));

  const filteredPosts = allPosts.filter(
    (post) => post.tag?.toLowerCase() === tag.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    return NotFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 antialiased">
      {/* 1. NAVIGATION : Discrète et élégante */}
      <Link
        href="/articles"
        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-600 mb-16 transition-all group"
      >
        <ArrowLeft className="mr-2 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
        {t("nav.all_archives")}
      </Link>

      {/* 2. HEADER : Focus sur le sujet */}
      <header className="mb-20 space-y-2">
        <div className="flex items-center gap-2 text-amber-600 mb-4">
          <BookOpen size={18} strokeWidth={2} />
          <span className="text-sm font-bold uppercase tracking-tighter">{t("tag.category")}</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-medium tracking-tighter capitalize text-zinc-900 dark:text-zinc-50">
          {tag}<span className="text-amber-600">.</span>
        </h1>

        <p className="text-zinc-500 text-lg font-light italic">
          {filteredPosts.length === 0 && t('tag.explorations.zero')}
          {filteredPosts.length === 1 && t('tag.explorations.one')}
          {filteredPosts.length > 1 && t('tag.explorations.other', { count: filteredPosts.length })}
        </p>
      </header>

      {/* STRUCTURE EN GRILLE : Main + Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-20">
        
        {/* 3. LISTE DES ARTICLES FILTRÉS */}
        <section className="divide-y divide-zinc-100">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>

        {/* 4. SIDEBAR (Récupérée de Home) */}
        <aside className="space-y-12">
          {/* Navigation par Tags */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-tighter text-zinc-400">
              {t("sidebar.navigation")}
            </h3>
            <nav className="flex flex-col gap-3">
              {allTags.map((tName) => (
                <Link 
                  key={tName} 
                  href={`/tags/${tName}`}
                  className={`text-sm transition-colors flex justify-between items-center ${
                    tName?.toLowerCase() === tag.toLowerCase() 
                    ? "text-amber-600 font-medium" 
                    : "text-zinc-600 hover:text-amber-600"
                  }`}
                >
                  #{tName}
                  <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full text-zinc-500">
                    {allPosts.filter(p => p.tag === tName).length}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="pt-8 border-t border-zinc-100">
            <h3 className="text-sm font-bold mb-3">{t("sidebar.newsletter.title")}</h3>
            <p className="text-xs text-zinc-500 mb-4 leading-normal">
              {t("sidebar.newsletter.description")}
            </p>
            <input 
              type="email" 
              placeholder={t("sidebar.newsletter.placeholder")} 
              className="w-full text-sm border-b border-zinc-300 py-1 focus:border-amber-600 outline-none bg-transparent transition-colors mb-4"
            />
            <button className="text-xs font-black uppercase tracking-widest hover:text-amber-600 transition-colors">
              {t("sidebar.newsletter.button")}
            </button>
          </div>
        </aside>
      </div>

      {/* 5. FOOTER DE PAGE */}
      <footer className="mt-32 pt-12 border-t border-zinc-100 dark:border-zinc-900">
        <p className="text-sm text-zinc-400 text-center">
          <Link href="/categories" className="text-amber-600 hover:underline">{t("tag.footer_ask")}</Link>.
        </p>
      </footer>
    </main>
  );
}