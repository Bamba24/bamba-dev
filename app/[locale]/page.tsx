import Link from "next/link";
import { getPostsPreview } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { getI18n } from '../../locales/server';
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from 'next-international/server';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' }
  ];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (!locale || locale === '[locale]') {
    return null;
  }

  setStaticParamsLocale(locale);

  const posts = await getPostsPreview(locale);

  if (!posts) {
    return notFound();
  }

  const allTags = Array.from(new Set(posts.map(post => post.tag).filter(Boolean)));
  const t = await getI18n();

  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-12 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HERO HEADER TYPE CODELYNX */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Open for freelance contracts
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50">
          {t("hero.title")}{" "}
          <span className="text-amber-600 dark:text-amber-500 font-medium">
            {t("hero.subtitle")}
          </span>
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
          {t("hero.description")}
        </p>

        {/* NAVIGATION PAR TAGS COMPACTE */}
        <nav className="flex flex-wrap gap-2 pt-2" aria-label="Tags de navigation">
          {allTags.map((tag) => (
            <Link 
              key={tag} 
              href={`/${locale}/tags/${tag}`}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </nav>
      </header>

      {/* SECTION DERNIERS ARTICLES */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Derniers articles
        </h2>

        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

    </main>
  );
}