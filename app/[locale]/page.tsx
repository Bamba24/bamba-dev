import Link from "next/link";
import { getPostsPreview } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { getI18n } from "@/locales/server";
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from "next-international/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locale || locale === "[locale]") {
    return null;
  }

  setStaticParamsLocale(locale);

  const posts = await getPostsPreview(locale);

  if (!posts) {
    return notFound();
  }

  const allTags = Array.from(
    new Set(posts.map((post) => post.tag).filter(Boolean))
  );
  const t = await getI18n();

  return (
    <main
      id="main-content"
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 transition-colors duration-300"
    >
      {/* HERO SECTION */}
      <section className="space-y-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-muted/50 border border-border/60 text-muted-foreground text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Open for engineering & writing</span>
        </div>

        {/* Title / Intro */}
        <div className="space-y-2">
          <h1 className="font-pixel-grid text-3xl sm:text-4xl font-bold tracking-tight text-foreground uppercase">
            bamba<span className="text-primary">.dev</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed">
            {t("hero.description")}
          </p>
        </div>

        {/* Quick Social / Connect links */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            github <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            x.com <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            linkedin <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* TOPICS / TAGS */}
        {allTags.length > 0 && (
          <div className="pt-2 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/70 block">
              Topics
            </span>
            <div className="flex flex-wrap gap-1.5" aria-label="Tags de navigation">
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/tags/${tag}`}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-muted/40 border border-border/40 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* RECENT POSTS SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <h2 className="font-pixel-grid text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
            {locale === "fr" ? "Derniers articles" : "Recent Posts"}
          </h2>
          <Link
            href={`/${locale}/posts`}
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>{locale === "fr" ? "Tout voir" : "View all"} ({posts.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-border/30">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}