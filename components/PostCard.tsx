"use client";

import Link from "next/link";
import { useI18n, useCurrentLocale } from "@/locales/client";
import { ArrowUpRight } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  time: number;
  tag?: string;
}

export function PostCard({ post }: { post: Post }) {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <article 
      className="w-full group relative py-10 border-b border-zinc-100 dark:border-zinc-900/80 last:border-0 first:pt-0" 
      aria-labelledby={`post-${post.slug}-title`} 
      aria-describedby={`post-${post.slug}-description`}
    >
      <Link 
        href={`/${locale}/posts/${post.slug}`} 
        className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start w-full min-w-0"
      >
        
        <div className="space-y-3.5 min-w-0">
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            <time className="tabular-nums font-medium">
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
            </time>
            
            <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            
            <span> {post.time} {t('post.read_time')}</span>

            {post.tag && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-amber-600 dark:text-amber-500 font-semibold">#{post.tag}</span>
              </>
            )}
          </div>

          {/* Titre */}
          <h2 
            id={`post-${post.slug}-title`} 
            className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300 leading-tight break-words"
          >
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl line-clamp-2 font-light break-words">
            {post.description}
          </p>
        </div>

        {/* Flèche d'action */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 dark:text-zinc-600 group-hover:text-white group-hover:bg-amber-600 dark:group-hover:bg-amber-500 group-hover:border-transparent transition-all duration-300 group-hover:scale-105 shadow-sm">
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>

      </Link>
    </article>
  );
}