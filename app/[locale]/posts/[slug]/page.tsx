import React from 'react'
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/posts';
import NotFound from './notFound';
import Mdx from '@/features/mdx/Mdx';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { getI18n } from '@/locales/server'
import type { Metadata } from "next";
import { setStaticParamsLocale } from 'next-international/server'

export const dynamicParams = true; // Permet de générer les pages à la volée si besoin
// Bloque le pré-rendu strict au build si l'i18n n'est pas encore instancié
export const dynamic = 'force-dynamic';

// 1. Force la page à se mettre à jour en arrière-plan toutes les heures max
export const revalidate = 3600; 

// 2. Dit à Next.js de pré-générer tous les articles existants au moment du build
export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params: Array<{ locale: string; slug: string }> = [];

  
  for (const locale of locales) {
    setStaticParamsLocale(locale);
    try {
      const posts = await getPosts(locale);
      posts.forEach(post => {
        params.push({ locale, slug: post.slug });
      });
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
  const post = await getPostBySlug(slug, locale);

   // Valider le slug
    if (!slug || typeof slug !== 'string') {
        notFound();
    }
      
      // Vérifier que le slug ne contient que des caractères sûrs
      if (!/^[a-z0-9\-]+$/.test(slug)) {
        notFound();
      }

  // Sécurité : Si l'article n'existe pas
  if (!post) {
    return {
      title: "Article non trouvé | bambaDev",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    // Le titre qui apparaîtra sur l'onglet du navigateur
    title: post.title, 
    description: post.description || "Article technique sur bambaDev",
    
    // Configuration OpenGraph (LinkedIn, Facebook, Discord...)
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${locale}/posts/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: "bambaDev",
      // Remarque : Tu n'as PAS besoin de spécifier la clé `images` ici !
      // Next.js détecte automatiquement ton fichier `opengraph-image.tsx` 
      // et l'associera tout seul à cet article.
       authors: ["BambaDev"],
      // Ajouter les tags
       tags: [post.tag],
    },

    // Configuration pour Twitter / X
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}


export default async function Post({params}: {params: Promise<{slug: string, locale: string}>}) {
  const {slug, locale} = await params;
  const post = await getPostBySlug(slug, locale);
  const t = await getI18n()

   // Valider le slug
   if (!slug || typeof slug !== 'string') {
      notFound();
    }
      
    // Vérifier que le slug ne contient que des caractères sûrs
    if (!/^[a-z0-9\-]+$/.test(slug)) {
      notFound();
    }

  if (!post) {
    return NotFound();
  }

  const allPosts = await getPosts(locale);
  const similarPosts = allPosts
    .filter((item) => item.tag === post.tag && item.slug !== slug)
    .slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      {/* Bouton Retour */}
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-amber-600 mb-8 transition-colors group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        {t('nav.back_to_home')}
      </Link>

      {/* En-tête de l'article */}
      <header className="space-y-6 mb-10">
        <div className="space-y-4">
          <Badge variant="secondary" className="rounded-full px-4 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
            {/* Si post.tag est déjà une chaîne propre, affiche-la directement ou passe-la au i18n */}
            {post.tag}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {/* CORRECTION : Utilisation de la locale dynamique pour éviter les bugs d'hydratation */}
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {/* Si ta clé prend en charge le temps dynamique : t('post.read_time', { time: post.readingTime }) */}
            <span>{t('post.read_time')}</span> 
          </div>
        </div>
        
      </header>

      {/* Contenu de l'article avec Shiki géré par le composant Mdx */}
      <div className="prose prose-zinc dark:prose-invert max-w-none 
        prose-headings:scroll-mt-20 
        prose-h2:text-3xl prose-h2:border-b prose-h2:pb-2 dark:prose-h2:border-zinc-800
        prose-a:text-amber-600 hover:prose-a:text-amber-500
        prose-img:rounded-xl prose-img:shadow-lg">
        
        <Mdx>{post.content}</Mdx>
      </div>

      {/* Articles similaires */}
      {similarPosts.length > 0 && (
        <section className="mt-16 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950/40">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {t("post.similar_titles")}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t("post.similar_description")}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {similarPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/posts/${item.slug}`}
                className="rounded-2xl border border-zinc-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-500">{item.tag}</span>
                  <span className="text-xs text-zinc-400 group-hover:text-amber-600 transition-colors">Lire →</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer de l'article */}
      <footer className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl text-center space-y-4">
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{t("post.feedback_title")}</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            {t("post.feedback_desc")}
          </p>
          <div className="flex justify-center gap-4 pt-2">
             {/* Emplacement pour tes boutons ou icônes de réseaux sociaux */}
          </div>
        </div>
      </footer>
    </article>
  )
}