import { getPostsPreview } from "@/lib/posts";
import { getI18n } from "@/locales/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FilteredPosts from "@/components/filteredPosts";
import { setStaticParamsLocale } from "next-international/server";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locale || locale === "[locale]") {
    return {} as Metadata;
  }

  setStaticParamsLocale(locale);

  const t = await getI18n();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bambadev.com";

  return {
    title: `${t("archive.title_main")} | bambaDev`,
    description: t("archive.description"),
    openGraph: {
      title: `${t("archive.title_main")} | bambaDev`,
      description: t("archive.description"),
      url: `${baseUrl}/${locale}/posts`,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function AllPostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locale || locale === "[locale]") {
    return null;
  }

  setStaticParamsLocale(locale);

  const posts = await getPostsPreview(locale);
  const t = await getI18n();

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <main
      id="main-content"
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 transition-colors duration-300"
    >
      {/* HEADER ARCHIVE */}
      <header className="space-y-2 pb-6 border-b border-border/40">
        <h1 className="font-pixel-grid text-2xl sm:text-3xl font-bold tracking-tight text-foreground uppercase">
          {t("archive.title_main")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base font-normal leading-relaxed">
          {t("archive.description")}
        </p>
      </header>

      {/* FILTER AND POSTS LIST */}
      <section>
        <FilteredPosts posts={posts} />
      </section>
    </main>
  );
}