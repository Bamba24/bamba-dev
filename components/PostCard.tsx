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
    <article className="group" aria-labelledby={`post-${post.slug}-title`}>
      <Link
        href={`/${locale}/posts/${post.slug}`}
        className="block -mx-3 p-3 sm:-mx-4 sm:p-4 rounded-xl hover:bg-muted/40 transition-colors border border-transparent hover:border-border/40"
      >
        <div className="flex flex-col gap-1.5">
          {/* Metadata Row: Date + Read time + Tag */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <time dateTime={post.publishedAt} className="tabular-nums">
                {new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>
                {post.time} {t("post.read_time")}
              </span>
            </div>

            {post.tag && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                #{post.tag}
              </span>
            )}
          </div>

          {/* Title Row with subtle arrow */}
          <div className="flex items-start justify-between gap-4 pt-1">
            <h3
              id={`post-${post.slug}-title`}
              className="text-base sm:text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug"
            >
              {post.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
          </div>

          {/* Description */}
          {post.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light mt-0.5">
              {post.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}