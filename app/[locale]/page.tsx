import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard"; // On importe le composant
import { getI18n } from '../../locales/server'

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const posts = await getPosts(locale);
  const allTags = Array.from(new Set(posts.map(post => post.tag).filter(Boolean)));

  const t = await getI18n();

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 antialiased">
      {/* HEADER MINIMALISTE */}
      <header className="mb-24 border-b border-zinc-100 pb-12">
        <h1 className="text-3xl font-medium tracking-tight mb-4">
          {t("hero.title")}<span className="text-amber-600 font-bold">{t("hero.subtitle")}</span>
        </h1>
        <p className="text-zinc-500 max-w-md leading-relaxed">
          {t("hero.description")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-20">
        
        {/* LISTE D'ARTICLES (Maintenant gérée par PostCard) */}
        <section className="divide-y divide-zinc-100">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>

        {/* SIDEBAR DISCRÈTE */}
        <aside className="space-y-12">
          {/* Navigation par Tags */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-tighter text-zinc-400">{t("sidebar.navigation")}</h3>
            <nav className="flex flex-col gap-3">
              {allTags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/tags/${tag}`}
                  className="text-sm text-zinc-600 hover:text-amber-600 transition-colors flex justify-between items-center"
                >
                  #{tag}
                  <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full text-zinc-500">
                    {posts.filter(p => p.tag === tag).length}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="pt-8 border-t border-zinc-100">
            <h3 className="text-sm font-bold mb-3">{t("sidebar.newsletter.title")}</h3>
            <p className="text-xs text-zinc-500 mb-4 leading-normal">
              {t("sidebar.newsletter.description")}
            </p>
            <input 
              type="email" 
              placeholder={t("sidebar.newsletter.placeholder")} 
              className="w-full text-sm border-b border-zinc-300 py-1 focus:border-amber-600 outline-none bg-transparent transition-colors mb-4"
            />
            <button className="text-xs font-black uppercase tracking-widest hover:text-amber-600 transition-colors">
              {t("sidebar.newsletter.button")}
            </button>
          </div>
        </aside>

      </div>

      <footer className="mt-32 pt-8 border-t border-zinc-100 text-center">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} {t("footer.made_with")}
        </p>
      </footer>
    </main>
  );
}