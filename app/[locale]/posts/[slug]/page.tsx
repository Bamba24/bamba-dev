import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostsPreview } from "@/lib/posts";
import Mdx from "@/features/mdx/Mdx";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import type { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    try {
      const posts = await getPostsPreview(locale);
      if (posts && Array.isArray(posts)) {
        posts.forEach((post) => {
          params.push({ locale, slug: post.slug });
        });
      }
    } catch (error) {
      console.error(
        `Erreur generateStaticParams pour la locale ${locale}:`,
        error
      );
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!locale || locale === "[locale]") return {} as Metadata;
  if (!slug || typeof slug !== "string" || !/^[a-z0-9\-]+$/.test(slug))
    return {} as Metadata;

  setStaticParamsLocale(locale);

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: "Article non trouvé | bambaDev",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bambadev.com";

  return {
    title: `${post.title} | bambaDev`,
    description: post.description || "Article technique",
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${locale}/posts/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: "bambaDev",
      authors: ["BambaDev"],
      tags: [post.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  if (!locale || locale === "[locale]") return null;
  if (!slug || typeof slug !== "string" || !/^[a-z0-9\-]+$/.test(slug))
    return notFound();

  setStaticParamsLocale(locale);

  const post = await getPostBySlug(slug, locale);
  const t = await getI18n();

  if (!post) {
    return notFound();
  }

  const allPosts = await getPostsPreview(locale);
  const similarPosts = allPosts
    ? allPosts
        .filter((item) => item.tag === post.tag && item.slug !== slug)
        .slice(0, 2)
    : [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bambadev.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "BambaDev",
    },
    url: `${baseUrl}/${locale}/posts/${slug}`,
    keywords: post.tag,
  };

  return (
    <main
      id="main-content"
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 transition-colors duration-300 min-w-0"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. RETOUR AUX ARTICLES */}
      <div className="mb-6">
        <Link
          href={`/${locale}/posts`}
          className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft
            className="mr-1.5 h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
          <span>{t("nav.back_to_home")}</span>
        </Link>
      </div>

      {/* 2. EN-TÊTE ÉDITORIAL DE L'ARTICLE */}
      <header className="space-y-3 pb-6 border-b border-border/40 mb-8">
        <h1 className="font-pixel-grid text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.2] break-words">
          {post.title}
        </h1>

        {/* Méta-données */}
        <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs font-mono">
          <time dateTime={post.publishedAt} className="tabular-nums">
            {new Date(post.publishedAt).toLocaleDateString(locale, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>
            {post.time} {t("post.read_time")}
          </span>
          {post.tag && (
            <>
              <span>•</span>
              <Link
                href={`/${locale}/tags/${post.tag}`}
                className="hover:text-primary transition-colors uppercase tracking-wider"
              >
                #{post.tag}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* 3. CORPS DE L'ARTICLE DEPUIS MDX */}
      <div className="w-full min-w-0">
        <div
          className="prose prose-zinc dark:prose-invert max-w-none w-full min-w-0 overflow-hidden break-words
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-normal text-sm sm:text-base
          
          prose-headings:text-foreground 
          prose-headings:font-pixel-grid
          prose-headings:tracking-tight

          prose-h2:text-lg 
          sm:prose-h2:text-xl 
          prose-h2:pt-6 
          prose-h2:pb-2 
          prose-h2:border-b 
          prose-h2:border-border/30

          prose-h3:text-base
          sm:prose-h3:text-lg
          prose-h3:pt-4

          prose-a:text-primary 
          prose-a:no-underline 
          hover:prose-a:underline font-medium

          prose-strong:text-foreground 
          prose-strong:font-semibold

          {/* CODE BLOCKS */}
          prose-pre:bg-muted/40 
          prose-pre:border
          prose-pre:border-border/60
          prose-pre:rounded-xl 
          prose-pre:w-full
          prose-pre:overflow-x-auto
          prose-pre:block
          prose-pre:p-4

          {/* INLINE CODE */}
          prose-code:before:content-none 
          prose-code:after:content-none
          prose-code:font-mono 
          prose-code:font-normal
          prose-code:text-[0.9em]
          prose-code:px-1.5 
          prose-code:py-0.5 
          prose-code:rounded
          prose-code:bg-muted/60
          prose-code:border
          prose-code:border-border/40
          prose-code:text-primary

          prose-img:rounded-xl prose-img:border border-border/40
          "
        >
          <Mdx>{post.content}</Mdx>
        </div>
      </div>

      {/* 4. ARTICLES SIMILAIRES */}
      {similarPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border/40 space-y-4">
          <h2 className="font-pixel-grid text-xs uppercase tracking-widest text-muted-foreground font-bold">
            {t("post.similar_titles")}
          </h2>

          <div className="flex flex-col divide-y divide-border/20">
            {similarPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/posts/${item.slug}`}
                className="group py-3 -mx-3 px-3 rounded-lg hover:bg-muted/40 transition-colors flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground/70">
                    #{item.tag}
                  </span>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}