"use client";

import Link from "next/link";
import { useI18n, useCurrentLocale } from "@/locales/client";

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
    <article className="group" aria-labelledby={`post-${post.slug}-title`}>
      <Link 
        href={`/${locale}/posts/${post.slug}`} 
        className="hover:bg-zinc-100/80 dark:hover:bg-zinc-900/50 -mx-3 p-3.5 block rounded-xl transition-colors"
      >
        <div className="space-y-2">
          <h3 
            id={`post-${post.slug}-title`} 
            className="font-sans text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors leading-snug"
          >
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-light">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 pt-0.5">
            <time dateTime={post.publishedAt} className="tabular-nums">
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </time>
            <span>•</span>
            <span>{post.time} {t('post.read_time')}</span>
            {post.tag && (
              <>
                <span>•</span>
                <span className="uppercase text-amber-600 dark:text-amber-500 font-semibold">{post.tag}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}