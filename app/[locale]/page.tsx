import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { getI18n } from '../../locales/server'
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from 'next-international/server'
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

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

  const posts = await getPosts(locale);

  if (!posts) {
    return notFound();
  }

  const allTags = Array.from(new Set(posts.map(post => post.tag).filter(Boolean)));
  const t = await getI18n();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:py-24 lg:px-8 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* HEADER TYPE STUDIO / PREMIUM */}
      <header className="relative mb-20 md:mb-28 border-b border-zinc-100 dark:border-zinc-900 pb-16">
        {/* Petit badge optionnel "Disponible" ou "Statut" */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400 text-xs font-medium mb-6 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Open for freelance contracts
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1] mb-6">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent font-medium">
                {t("hero.subtitle")}
              </span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              {t("hero.description")}
            </p>
          </div>
          
          {/* Section d'accroche droite (Esthétique minimaliste) */}
          <div className="hidden lg:flex flex-col items-end text-right justify-between h-full pt-2 text-zinc-400 dark:text-zinc-600">
            <Sparkles className="w-6 h-6 text-amber-500/40" />
            <div className="text-xs tracking-widest uppercase font-mono">
              Curated thoughts <br /> & Tech Insights
            </div>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL : Grille Asymétrique */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 md:gap-24 items-start">
        
        {/* LISTE D'ARTICLES FLUIDE */}
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

        {/* SIDEBAR ARCHITECTURÉE */}
        <aside className="space-y-10 lg:sticky lg:top-8">
          
          {/* Bloc Navigation par Tags */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {t("sidebar.navigation")}
            </h3>
            <nav className="flex flex-wrap lg:flex-col gap-2" aria-label="Tags de navigation">
              {allTags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/${locale}/tags/${tag}`}
                  className="inline-flex lg:flex items-center justify-between gap-3 text-sm px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-200 dark:hover:border-amber-900/50 transition-all group w-auto lg:w-full"
                >
                  <span className="font-medium">#{tag}</span>
                  <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-500 dark:text-zinc-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/50 group-hover:text-amber-600 transition-colors">
                    {posts.filter(p => p.tag === tag).length}
                    <span className="sr-only"> articles</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Bloc Newsletter Premium */}
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 space-y-4">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 flex items-center justify-center text-amber-600 dark:text-amber-500">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">{t("sidebar.newsletter.title")}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t("sidebar.newsletter.description")}
              </p>
            </div>
            
            <form action="/newsletter" method="POST" className="space-y-3 pt-2">
              <label htmlFor="email-newsletter" className="sr-only">
                {t("sidebar.newsletter.placeholder")}
              </label>
              <div className="relative">
                <input 
                  disabled
                  id="email-newsletter"
                  type="email" 
                  required
                  name="email"
                  placeholder={t("sidebar.newsletter.placeholder")} 
                  className="w-full text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 dark:focus:border-amber-500 transition-all placeholder:text-zinc-400"
                />
              </div>

              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-medium tracking-wide uppercase hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-all cursor-pointer group"
              >
                <span>{t("sidebar.newsletter.button")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </aside>

      </div>

      {/* FOOTER SÉMANTIQUE */}
      <footer className="mt-36 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">
        <div>
          © {new Date().getFullYear()} bambaDev. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          {t("footer.made_with")}
        </div>
      </footer>
    </main>
  );
}