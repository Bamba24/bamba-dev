import Link from "next/link";
import { getPostsPreview } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { getI18n } from '../../locales/server'
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from 'next-international/server'
import { ArrowUpRight, Mail, Sparkles, Hash } from "lucide-react";

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
    <main id="main-content" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 lg:px-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HEADER PREMIUM REFONDU — APPARENCE PLUS RAFINÉE */}
      <header className="relative mb-20 md:mb-28 border-b border-zinc-100 dark:border-zinc-900 pb-16">
        
        {/* Status Badge épuré avec un effet de pulsation discret */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.06] dark:bg-emerald-500/[0.04] border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Open for freelance contracts
        </div>

        {/* Grille typographique asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08] text-zinc-900 dark:text-zinc-50">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-clip-text text-transparent font-medium">
                {t("hero.subtitle")}
              </span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              {t("hero.description")}
            </p>
          </div>
          
          {/* Métadonnées visuelles à droite — Équilibre l'espace vide sur desktop */}
          <div className="hidden lg:flex flex-col items-end text-right justify-between h-full min-h-[140px] pt-3 text-zinc-400 dark:text-zinc-600 font-mono">
            <Sparkles className="w-5 h-5 text-amber-500/50" />
            <div className="text-[11px] tracking-widest uppercase leading-normal">
              Curated thoughts <br /> & Tech Insights
            </div>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL : Grille synchronisée à 320px avec l'Archive */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 md:gap-24 items-start">
        
        {/* LISTE D'ARTICLES */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8 flex items-center gap-2">
            <span>01 /</span> {posts.length} Articles disponibles
          </h2>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {posts.map((post) => (
              <div key={post.slug} className="group relative py-8 first:pt-0 last:pb-0 block transition-all">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>

        {/* SIDEBAR UNIFORMISÉE — CARTES AGRANDIES AVEC ALIGNEMENT EN LIGNE */}
        <aside className="space-y-8 lg:sticky lg:top-8">
          
          {/* Bloc Navigation par Tags */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-5">
            {/* Logo + Titre côte à côte */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                <Hash className="w-4 h-4" />
              </div>
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                {t("sidebar.navigation")}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Explorez les articles par thématiques et technologies.
            </p>
            
            <nav className="flex flex-wrap lg:flex-col gap-2.5 pt-1" aria-label="Tags de navigation">
              {allTags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/${locale}/tags/${tag}`}
                  className="inline-flex lg:flex items-center justify-between gap-3 text-sm px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-200 dark:hover:border-amber-900/50 transition-all group w-auto lg:w-full"
                >
                  <span className="font-medium">#{tag}</span>
                  <span className="text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-500 dark:text-zinc-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50 group-hover:text-amber-600 transition-colors">
                    {posts.filter(p => p.tag === tag).length}
                    <span className="sr-only"> articles</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Bloc Newsletter Premium */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-5">
            {/* Logo + Titre côte à côte */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                {t("sidebar.newsletter.title")}
              </h3>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t("sidebar.newsletter.description")}
            </p>
            
            <form action="/newsletter" method="POST" className="space-y-3 pt-1">
              <label htmlFor="email-newsletter" className="sr-only">
                {t("sidebar.newsletter.placeholder")}
              </label>
              <div className="relative">
                <input 
                  id="email-newsletter"
                  type="email" 
                  required
                  name="email"
                  placeholder={t("sidebar.newsletter.placeholder")} 
                  className="w-full text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500 transition-all placeholder:text-zinc-400"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-medium tracking-wide uppercase hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-all cursor-pointer group"
              >
                <span>{t("sidebar.newsletter.button")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </aside>

      </div>
    </main>
  );
}