import React from "react";
import Link from "next/link";
import { WifiOff, RotateCcw, Home } from "lucide-react";
import { getI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: `${t("offline.title")} | bamba.dev`,
    description: t("offline.description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return (
    <main
      id="main-content"
      className="max-w-2xl mx-auto px-4 py-20 flex flex-col items-center text-center space-y-6"
    >
      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <WifiOff className="w-10 h-10 text-amber-500 animate-pulse" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full animate-ping opacity-75" />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-pixel-grid font-bold tracking-tight text-foreground">
          {t("offline.title")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
          {t("offline.description")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
        <Link
          href={`/${locale}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          {t("offline.back_home")}
        </Link>
      </div>
    </main>
  );
}
