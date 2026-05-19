import { getPosts } from "@/lib/posts";
import { Hash } from "lucide-react";
import { getI18n } from '@/locales/server'
import dynamic from 'next/dynamic';

const FilteredPosts = dynamic(() => import('@/components/filteredPosts'), { 
    loading: () => <div className="h-40 animate-pulse bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
  });

export default async function AllPostsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const posts = await getPosts(locale);
  const t = await getI18n();

  return (
    <main className="max-w-4xl mx-auto px-6 py-24 antialiased">
      {/* 1. HEADER */}
      <header className="mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
          <Hash className="w-3 h-3 text-amber-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">Archive</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
          {t('archive.title_main')} <span className="italic font-light text-zinc-400">Digitale</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
          {t('archive.description')}
        </p>
      </header>

      {/* 2. FILTRES & RECHERCHE */}
      <FilteredPosts posts={posts} />

      {/* FOOTER */}
      {posts.length > 0 && (
        <div className="mt-20 pt-10 border-t border-dashed border-zinc-200 dark:border-zinc-800 text-center text-zinc-400 text-sm">
          {t('archive.end', {count: posts.length})}
        </div>
      )}
    </main>
  );
}