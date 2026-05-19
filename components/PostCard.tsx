"use client";

import Link from "next/link";
import {useI18n} from "@/locales/client";

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
}

export function PostCard({ post }: { post: Post }) {

  const t = useI18n();

  return (
    <article className="group relative mb-16">
      <Link href={`/posts/${post.slug}`} className="block space-y-4">
        
        {/* Meta : Date et Temps de lecture */}
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          <time className="tabular-nums">
            {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </time>
          <span className="h-px w-6 bg-zinc-200 dark:bg-zinc-800" />
          <span>{t('post.read_time')}</span>
        </div>

        {/* Titre avec effet de survol progressif */}
        <h2 className="text-2xl md:text-3xl font-semibold leading-tight group-hover:text-amber-600 transition-colors duration-300">
          {t("post.title", {title: post.title})}
        </h2>

        {/* Description courte */}
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl line-clamp-2 font-light">
          {t("post.description", {description: post.description})}
        </p>

        {/* Lien stylisé avec bordure animée */}
        <div className="pt-2">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b-2 border-amber-600/20 group-hover:border-amber-600 transition-all duration-300 pb-0.5">
            {t("post.read_study")}
          </span>
        </div>
      </Link>
    </article>
  );
}