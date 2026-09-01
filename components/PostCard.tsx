"use client";

import Link from "next/link";
import { useI18n, useCurrentLocale } from "@/locales/client";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

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
    <article className="h-full flex flex-col" aria-labelledby={`post-${post.slug}-title`}>
      <Link 
        href={`/${locale}/posts/${post.slug}`} 
        className="group relative flex flex-col justify-between h-full p-6 bg-zinc-50/60 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 border border-zinc-200/70 dark:border-zinc-800/70 hover:border-amber-500/50 dark:hover:border-amber-500/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1"
      >
        <div className="space-y-4">
          {/* Header row: Tag Pill + Arrow */}
          <div className="flex items-center justify-between gap-2">
            {post.tag ? (
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-mono font-semibold uppercase tracking-wider">
                #{post.tag}
              </span>
            ) : <div />}

            <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-center text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:border-amber-500/40 transition-all">
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Title */}
          <h3 
            id={`post-${post.slug}-title`} 
            className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors leading-snug line-clamp-2"
          >
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed font-light">
            {post.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-6 mt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <time dateTime={post.publishedAt} className="tabular-nums">
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </time>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 opacity-70" />
            <span>{post.time} {t('post.read_time')}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}