"use client";

import { useState, useEffect, useMemo } from 'react'; // 👈 Ajout de useMemo
import { PostCard } from '@/components/PostCard';
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useI18n } from '@/locales/client';

interface Post {
  slug: string;
  title: string;
  tag: string;
  description: string;
  publishedAt: string;
  time: number;
}

export default function FilteredPosts(props: { posts: Post[] }) {
  const [queryParam, setQueryParam] = useQueryState('q', { defaultValue: '' })
  const [activeTag, setActiveTag] = useQueryState('tag')
  const t = useI18n();

  const [localSearch, setLocalSearch] = useState(queryParam);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQueryParam(localSearch || null);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, setQueryParam]);

  // 1. OPTIMISATION DES TAGS : Ne recalcule la liste unique que si les posts changent
  const tags = useMemo(() => {
    return Array.from(new Set(props.posts.map((post) => post.tag).filter(Boolean)));
  }, [props.posts]);

  // 2. OPTIMISATION DU FILTRAGE : Ne filtre que quand les critères réels (debouncés) changent
  const filteredPosts = useMemo(() => {
    return props.posts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(queryParam.toLowerCase()) || 
        post.description.toLowerCase().includes(queryParam.toLowerCase());
      
      const matchesTag = activeTag ? post.tag === activeTag : true;

      return matchesSearch && matchesTag;
    });
  }, [props.posts, queryParam, activeTag]); // 👈 Dépend de queryParam (l'état debouncé), pas de localSearch !

  return (
    <div>
      <section className="mb-12 space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-amber-600 transition-colors" />
          <label className="sr-only" htmlFor='recherche'>Recherche</label>
          <input 
            type="text" 
            id='recherche'
            placeholder={t("search.placeholder")}
            value={localSearch} 
            onChange={(e) => setLocalSearch(e.target.value)} 
            className="w-full pl-12 pr-4 py-3.5 bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 focus:border-amber-600 dark:focus:border-amber-500 rounded-2xl outline-none transition-all text-base sm:text-lg placeholder:text-zinc-400 shadow-sm"
          />
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          <button 
            type='button'
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              activeTag === null 
              ? "bg-amber-600 text-white shadow-sm shadow-amber-500/20" 
              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/60 hover:text-amber-600 dark:hover:text-amber-500"
            }`}
          >
            {t("tag.all")}
          </button>

          {tags.map((tag) => (
            <button 
              type='button'
              aria-pressed={activeTag === tag} 
              key={tag} 
              onClick={() => setActiveTag(tag === activeTag ? null : tag as string)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                activeTag === tag 
                ? "bg-amber-600 text-white shadow-sm shadow-amber-500/20" 
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/60 hover:text-amber-600 dark:hover:text-amber-500"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      <div>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 bg-zinc-100/60 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200/80 dark:border-zinc-800/80 text-left space-y-1">
            <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
              {t("tag.no_results")}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
              Aucun article ne correspond à vos critères. Essayez avec un autre mot-clé ou réinitialisez le filtre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}