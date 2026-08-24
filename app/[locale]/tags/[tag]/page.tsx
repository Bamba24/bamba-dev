import React from "react";
import { getPostsPreview } from "@/lib/posts";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import { setStaticParamsLocale } from 'next-international/server';

export const dynamic = 'force-static';
export const dynamicParams = true; 
export const revalidate = 3600; 

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params: Array<{ locale: string; tag: string }> = [];
  
  for (const locale of locales) {
    try {
      const posts = await getPostsPreview(locale);
      if (posts) {
        const tags = Array.from(new Set(posts.map(post => post.tag).filter(Boolean)));
        tags.forEach(tag => {
          params.push({ locale, tag });
        });
      }
    } catch (error) {
      console.error(`Erreur generateStaticParams [Tags] pour la locale ${locale}:`, error);
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string, locale: string }> }): Promise<Metadata> {
  const { tag, locale } = await params;
 
  if (!locale || locale === '[locale]') return {} as Metadata;
  if (!tag || typeof tag !== 'string') return {};
  if (!/^[a-z0-9\-]+$/i.test(tag)) return {};

  setStaticParamsLocale(locale);
 
  const posts = await getPostsPreview(locale);
  const filteredPosts = posts ? posts.filter(post => post.tag?.toLowerCase() === tag.toLowerCase()) : [];

  if (filteredPosts.length === 0) {
    return {
      title: "Tag non trouvé",
      description: `Aucun article trouvé pour le tag "${tag}".`
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: `Articles sur "${tag}" | bambaDev`,
    description: `Découvrez les articles techniques liés au tag "${tag}" sur bambaDev.`,
    openGraph: {
      title: `Articles sur "${tag}" | bambaDev`,
      description: `Découvrez les articles techniques liés au tag "${tag}" sur bambaDev.`,
      url: `${baseUrl}/${locale}/tags/${tag}`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    }
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string , locale: string }>;
}) {
  const { tag, locale } = await params;

  if (!locale || locale === '[locale]') return null;

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
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* BOUTON RETOUR */}
      <div>
        <Link
          href={`/${locale}/posts`} 
          className="inline-flex items-center text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-500 uppercase transition-colors group"
        >
          <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          {t("nav.all_archives")}
        </Link>
      </div>

      {/* HEADER DE TAG TYPE CODELYNX */}
      <header className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
          <BookOpen size={16} strokeWidth={2.5} />
          <span className="text-xs font-mono uppercase tracking-widest">{t("tag.category")}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight capitalize text-zinc-900 dark:text-zinc-50">
          #{tag}
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
          {filteredPosts.length === 1 && t('tag.explorations.one')}
          {filteredPosts.length > 1 && t('tag.explorations.other', { count: filteredPosts.length })}
        </p>
      </header>

      {/* LISTE DES ARTICLES FILTRÉS */}
      <section className="space-y-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

    </main>
  );
}