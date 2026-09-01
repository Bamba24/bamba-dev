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
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HERO HEADER */}
      <header className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Open for freelance & engineering contracts
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50">
          {t("hero.title")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-200">
            {t("hero.subtitle")}
          </span>
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl font-light leading-relaxed">
          {t("hero.description")}
        </p>

        {/* NAVIGATION PAR TAGS COMPACTE */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold block">
            Explore Topics
          </span>
          <nav className="flex flex-wrap gap-2" aria-label="Tags de navigation">
            {allTags.map((tag) => (
              <Link 
                key={tag} 
                href={`/${locale}/tags/${tag}`}
                className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-500/40 transition-all"
              >
                #{tag}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* SECTION DERNIERS ARTICLES */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-900 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Derniers articles
          </h2>
          <Link 
            href={`/${locale}/posts`}
            className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500 font-semibold hover:underline"
          >
            Voir tout ({posts.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

    </main>
  );
}