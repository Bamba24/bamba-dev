"use client";

import { useState, useEffect } from 'react'; //  Ajout de useState et useEffect
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
  time: number; // Temps de lecture en minutes
}

export default function FilteredPosts(props: { posts: Post[] }) {
  // 1. L'URL est gérée par nuqs
  const [queryParam, setQueryParam] = useQueryState('q', { defaultValue: '' })
  const [activeTag, setActiveTag] = useQueryState('tag')
  const t = useI18n();

  // 2. ÉTAT LOCAL : Pour que l'input reste ultra-fluide quand on tape
  const [localSearch, setLocalSearch] = useState(queryParam);

  // 3. DEBOUNCE EFFECT : On attend 300ms après la fin de la frappe pour mettre à jour l'URL
  useEffect(() => {
    const handler = setTimeout(() => {
      setQueryParam(localSearch || null); // Met à jour l'URL (et retire le paramètre si vide)
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, setQueryParam]);


  const tags = Array.from(new Set(props.posts.map((post) => post.tag).filter(Boolean)));

  // 4. LOGIQUE DE FILTRAGE : Elle se base sur queryParam (l'état debouncé dans l'URL)
  const filteredPosts = props.posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(queryParam.toLowerCase()) || 
                          post.description.toLowerCase().includes(queryParam.toLowerCase());
    
    const matchesTag = activeTag ? post.tag === activeTag : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div>
      <section className="mb-16 space-y-8 ">
        {/* INPUT DE RECHERCHE */}
        <div className="relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-amber-600 transition-colors" />
          <label className="sr-only" htmlFor='recherche'>Recherche</label>
          <input 
            type="text" 
            id='recherche'
            placeholder={t("search.placeholder")}
            value={localSearch} // 👈 On lie l'input à l'état local fluide
            onChange={(e) => setLocalSearch(e.target.value)} // 👈 Changement instantané
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-amber-600 outline-none transition-all text-lg placeholder:text-zinc-300"
          />
        </div>
        
        {/* FILTRE PAR TAGS */}
        <div className="flex flex-wrap gap-3">
          <button 
            type='button'
            onClick={() => setActiveTag(null)}
            className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTag === null 
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" 
              : "text-zinc-500 border border-zinc-200 dark:border-zinc-800 hover:border-amber-600"
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
              className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTag === tag 
                ? "bg-amber-600 text-white border-amber-600" 
                : "text-zinc-500 border border-zinc-200 dark:border-zinc-800 hover:border-amber-600 hover:text-amber-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* RÉSULTATS */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="py-20 text-center text-zinc-400 italic">
            {t("tag.no_results")}
          </p>
        )}
      </div>
    </div>
  );
}