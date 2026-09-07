import React from "react";
import { getPostsPreview } from "@/lib/posts";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = ["fr", "en"];
  const params: Array<{ locale: string; tag: string }> = [];

  for (const locale of locales) {
    try {
      const posts = await getPostsPreview(locale);
      if (posts) {
        const tags = Array.from(
          new Set(posts.map((post) => post.tag).filter(Boolean))
        );
        tags.forEach((tag) => {
          params.push({ locale, tag });
        });
      }
    } catch (error) {
      console.error(
        `Erreur generateStaticParams [Tags] pour la locale ${locale}:`,
        error
      );
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; locale: string }>;
}): Promise<Metadata> {
  const { tag, locale } = await params;

  if (!locale || locale === "[locale]") return {} as Metadata;
  if (!tag || typeof tag !== "string") return {};
  if (!/^[a-z0-9\-]+$/i.test(tag)) return {};

  setStaticParamsLocale(locale);

  const posts = await getPostsPreview(locale);
  const filteredPosts = posts
    ? posts.filter((post) => post.tag?.toLowerCase() === tag.toLowerCase())
    : [];

  if (filteredPosts.length === 0) {
    return {
      title: "Tag non trouvé",
      description: `Aucun article trouvé pour le tag "${tag}".`,
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bambadev.com";

  return {
    title: `Articles sur "${tag}" | bambaDev`,
    description: `Découvrez les articles techniques liés au tag "${tag}" sur bambaDev.`,
    openGraph: {
      title: `Articles sur "${tag}" | bambaDev`,
      description: `Découvrez les articles techniques liés au tag "${tag}" sur bambaDev.`,
      url: `${baseUrl}/${locale}/tags/${tag}`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string; locale: string }>;
}) {
  const { tag, locale } = await params;

  if (!locale || locale === "[locale]") return null;

  setStaticParamsLocale(locale);

  const allPosts = await getPostsPreview(locale);
  const t = await getI18n();

  if (!allPosts) return notFound();

  const filteredPosts = allPosts.filter(
    (post) => post.tag?.toLowerCase() === tag.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    return notFound();
  }

  return (
    <main
      id="main-content"
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 transition-colors duration-300"
    >
      {/* BOUTON RETOUR */}
      <div>
        <Link
          href={`/${locale}/posts`}
          className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          {t("nav.all_archives")}
        </Link>
      </div>

      {/* HEADER DE TAG */}
      <header className="space-y-2 pb-6 border-b border-border/40">
        <h1 className="font-pixel-grid text-2xl sm:text-3xl font-bold tracking-tight text-foreground uppercase">
          #{tag}
        </h1>

        <p className="text-muted-foreground text-sm font-normal leading-relaxed">
          {filteredPosts.length === 1 && t("tag.explorations.one")}
          {filteredPosts.length > 1 &&
            t("tag.explorations.other", { count: filteredPosts.length })}
        </p>
      </header>

      {/* LISTE DES ARTICLES FILTRÉS */}
      <section>
        <div className="flex flex-col divide-y divide-border/30">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}