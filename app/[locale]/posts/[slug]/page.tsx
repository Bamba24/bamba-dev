// app/[locale]/posts/[slug]/page.tsx

import React from 'react'
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/posts';
import Mdx from '@/features/mdx/Mdx';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import Link from 'next/link';
import { getI18n } from '@/locales/server'
import type { Metadata } from "next";
import { setStaticParamsLocale } from 'next-international/server'

export const dynamic = 'force-static';
export const dynamicParams = true; 

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    try {
      const posts = await getPosts(locale);
      if (posts && Array.isArray(posts)) {
        posts.forEach(post => {
          params.push({ locale, slug: post.slug });
        });
      }
    } catch (error) {
      console.error(`Erreur generateStaticParams pour la locale ${locale}:`, error);
    }
  }

  return params;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!locale || locale === '[locale]') return {} as Metadata;
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9\-]+$/.test(slug)) return {} as Metadata;

  setStaticParamsLocale(locale);

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: "Article non trouvé | bambaDev",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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

export default async function Post({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;

  if (!locale || locale === '[locale]') return null;
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9\-]+$/.test(slug)) return notFound();

  setStaticParamsLocale(locale);

  const post = await getPostBySlug(slug, locale);
  const t = await getI18n();

  if (!post) {
    return notFound();
  }

  const allPosts = await getPosts(locale);
  const similarPosts = allPosts
<<<<<<< HEAD
    ? allPosts.filter((item) => item.tag === post.tag && item.slug !== slug).slice(0, 2)
    : [];

  return (
    /* FIX: w-full et min-w-0 empêchent le conteneur principal de dépasser de l'écran */
    <main className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 transition-colors duration-300 min-w-0 overflow-hidden"> 
=======
    ? allPosts.filter((item) => item.tag === post.tag && item.slug !== slug).slice(0, 2) // Limité à 2 pour une grille équilibrée
    : [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 transition-colors duration-300"> 
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
      
      {/* 1. RETOUR À L'ACCUEIL */}
      <div className="mb-12">
        <Link 
          href={`/${locale}`} 
          className="inline-flex items-center text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-500 uppercase transition-all group"
        >
          <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          {t('nav.back_to_home')}
        </Link>
      </div>

      {/* 2. EN-TÊTE ÉDITORIAL DE L'ARTICLE */}
      <header className="space-y-6 pb-12 border-b border-zinc-100 dark:border-zinc-900 mb-12">
        <div className="space-y-4">
          <span className="inline-flex items-center text-xs font-mono tracking-wider uppercase text-amber-600 dark:text-amber-500 font-semibold">
            #{post.tag}
          </span>
<<<<<<< HEAD
          {/* FIX: break-words empêche les longs titres techniques de déborder sur mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15] break-words">
=======
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
            {post.title}
          </h1>
        </div>

<<<<<<< HEAD
        {/* Méta-données */}
=======
        {/* Méta-données en ligne style Index technique */}
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
        <div className="flex flex-wrap items-center gap-4 text-zinc-400 dark:text-zinc-500 text-xs font-mono uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          </div>
          <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            <span> {post.time} {t('post.read_time')}</span> 
          </div>
        </div>
      </header>

<<<<<<< HEAD
      {/* 3. CORPS DE L'ARTICLE (Prose) */}
      {/* FIX: Conteneur parent direct w-full min-w-0 + table-fixed implicite pour dompter la balise <pre> */}
      <div className="w-full min-w-0 block">
        <div className="prose prose-zinc dark:prose-invert max-w-none w-full break-words
          prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:font-light text-sm md:text-base
          
=======
        {/* 3. CORPS DE L'ARTICLE (Prose ciselée) */}
        <div className="prose prose-zinc dark:prose-invert max-w-none break-words
          prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:font-light text-sm md:text-base
         
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
          prose-headings:text-zinc-900 
          dark:prose-headings:text-zinc-50 
          prose-headings:font-normal 
          prose-headings:tracking-tight
<<<<<<< HEAD

          prose-h2:text-xl 
          md:prose-h2:text-2xl 
          prose-h2:pt-6 
          prose-h2:pb-2 
          prose-h2:border-b 
          prose-h2:border-zinc-100 
          dark:prose-h2:border-zinc-900

          prose-a:text-amber-600 
          dark:prose-a:text-amber-500 
          prose-a:no-underline 
          hover:prose-a:underline font-medium

          prose-strong:text-zinc-900 
          dark:prose-strong:text-zinc-100 
          prose-strong:font-semibold

          prose-code:text-amber-600 
          dark:prose-code:text-amber-400 
          prose-code:bg-zinc-100 
          dark:prose-code:bg-zinc-900 
          prose-code:px-1.5 
          prose-code:py-0.5 
          prose-code:rounded-md  
          prose-code:before:content-none 
          prose-code:after:content-none

          /* FIX AJOUTÉ : Table-fixed + w-full force le bloc de code à scroller en lui-même sans casser le layout */
          prose-pre:bg-zinc-900 
          dark:prose-pre:bg-zinc-900/60 
          prose-pre:rounded-2xl 
          prose-pre:w-full
          prose-pre:table-fixed
          prose-pre:overflow-x-auto 

          prose-img:rounded-2xl prose-img:border border-zinc-100 dark:border-zinc-900
          ">
          
          <Mdx>{post.content}</Mdx>
        </div>
      </div>

      {/* 4. ARTICLES SIMILAIRES */}
=======

          prose-h2:text-xl 
          md:prose-h2:text-2xl 
          prose-h2:pt-6 
          prose-h2:pb-2 
          prose-h2:border-b 
          prose-h2:border-zinc-100 
          dark:prose-h2:border-zinc-900

          prose-a:text-amber-600 
          dark:prose-a:text-amber-500 
          prose-a:no-underline 
          hover:prose-a:underline font-medium

          prose-strong:text-zinc-900 
          dark:prose-strong:text-zinc-100 
          prose-strong:font-semibold

          prose-code:text-amber-600 
          dark:prose-code:text-amber-400 
          prose-code:bg-zinc-100 
          dark:prose-code:bg-zinc-900 
          prose-code:px-1.5 
          prose-code:py-0.5 
          prose-code:rounded-md  
          prose-code:before:content-none 
          prose-code:after:content-none

          prose-pre:bg-zinc-900 
          dark:prose-pre:bg-zinc-900/60 
          prose-pre:rounded-2xl 
          prose-pre:max-w-full 
          prose-pre:overflow-x-auto 

          prose-img:rounded-2xl prose-img:border border-zinc-100 dark:border-zinc-900
          
          ">
          
          <Mdx>{post.content}</Mdx>
        </div>

      {/* 4. ARTICLES SIMILAIRES (Format Grid Premium) */}
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
      {similarPosts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {t("post.similar_titles")}
            </h2>
          </div>
          
<<<<<<< HEAD
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
=======
          <div className="grid gap-6 sm:grid-cols-2">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
            {similarPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/posts/${item.slug}`}
<<<<<<< HEAD
                className="group p-6 rounded-2xl border border-zinc-100 bg-zinc-50/40 hover:bg-white dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-sm min-w-0"
              >
                <div className="space-y-3 min-w-0">
=======
                className="group p-6 rounded-2xl border border-zinc-100 bg-zinc-50/40 hover:bg-white dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-sm"
              >
                <div className="space-y-3">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">#{item.tag}</span>
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-500 group-hover:scale-105 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
<<<<<<< HEAD
                  <h3 className="text-base font-normal tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors break-words">
=======
                  <h3 className="text-base font-normal tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

<<<<<<< HEAD
      {/* 5. FOOTER FEEDBACK */}
      <footer className="mt-20">
        <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 p-6 sm:p-8 rounded-2xl text-center space-y-3">
=======
      {/* 5. FOOTER FEEDBACK ÉPURÉ */}
      <footer className="mt-20">
        <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 p-8 rounded-2xl text-center space-y-3">
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
          <h3 className="font-normal tracking-tight text-lg text-zinc-900 dark:text-zinc-100">
            {t("post.feedback_title")}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-xs md:text-sm font-light leading-relaxed">
            {t("post.feedback_desc")}
          </p>
          <div className="flex justify-center gap-4 pt-2">
<<<<<<< HEAD
             {/* Boutons réseaux */}
=======
             {/* Tes boutons de partage ou icônes réseaux sociaux ici */}
>>>>>>> 2a4cc2aa6f621b86e4c70f9049b53e103cc8233c
          </div>
        </div>
      </footer>
    </main>
  )
}