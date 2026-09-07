"use client";

import { useState, useEffect, useMemo } from "react";
import { PostCard } from "@/components/PostCard";
import { Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useI18n } from "@/locales/client";

interface Post {
  slug: string;
  title: string;
  tag: string;
  description: string;
  publishedAt: string;
  time: number;
}

export default function FilteredPosts(props: { posts: Post[] }) {
  const [queryParam, setQueryParam] = useQueryState("q", { defaultValue: "" });
  const [activeTag, setActiveTag] = useQueryState("tag");
  const t = useI18n();

  const [localSearch, setLocalSearch] = useState(queryParam);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQueryParam(localSearch || null);
    }, 250);

    return () => clearTimeout(handler);
  }, [localSearch, setQueryParam]);

  const tags = useMemo(() => {
    return Array.from(
      new Set(props.posts.map((post) => post.tag).filter(Boolean))
    );
  }, [props.posts]);

  const filteredPosts = useMemo(() => {
    return props.posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(queryParam.toLowerCase()) ||
        post.description.toLowerCase().includes(queryParam.toLowerCase());

      const matchesTag = activeTag ? post.tag === activeTag : true;

      return matchesSearch && matchesTag;
    });
  }, [props.posts, queryParam, activeTag]);

  return (
    <div className="space-y-6">
      {/* SEARCH AND TAG FILTER */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <label className="sr-only" htmlFor="search-input">
            {t("search.placeholder")}
          </label>
          <input
            type="text"
            id="search-input"
            placeholder={t("search.placeholder")}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-muted/30 border border-border/60 focus:border-primary/80 focus:bg-background rounded-lg outline-none transition-all text-sm font-sans placeholder:text-muted-foreground/60"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => setLocalSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Effacer la recherche"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-1.5" aria-label="Filtres par tag">
          <button
            type="button"
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
            className={`px-2.5 py-1 rounded text-xs font-mono tracking-wider transition-colors ${
              activeTag === null
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted/40 text-muted-foreground border border-border/40 hover:text-foreground hover:border-border"
            }`}
          >
            {t("tag.all")}
          </button>

          {tags.map((tag) => (
            <button
              type="button"
              aria-pressed={activeTag === tag}
              key={tag}
              onClick={() =>
                setActiveTag(tag === activeTag ? null : (tag as string))
              }
              className={`px-2.5 py-1 rounded text-xs font-mono tracking-wider transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted/40 text-muted-foreground border border-border/40 hover:text-foreground hover:border-border"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* POST LIST */}
      <div className="pt-2">
        {filteredPosts.length > 0 ? (
          <div className="flex flex-col divide-y divide-border/30">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-2 border border-dashed border-border/60 rounded-xl">
            <p className="font-mono text-sm text-foreground">
              {t("tag.no_results")}
            </p>
            <p className="text-xs text-muted-foreground">
              Essayez un autre mot-clé ou réinitialisez le filtre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}