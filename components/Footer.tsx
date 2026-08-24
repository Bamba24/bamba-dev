"use client"

import React from 'react'
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { useI18n, useCurrentLocale } from "@/locales/client";

export default function Footer() {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <footer className="max-w-7xl mx-auto mt-24 px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-100 dark:border-zinc-900 space-y-12">
      
      {/* Grille principale des liens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Logo / Description */}
        <div className="space-y-4">
          {/* Logo agrandi à text-lg et rendu plus percutant */}
          <div className="font-semibold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
            bamba<span className="text-amber-500">Dev</span>
          </div>
          {/* Description passée de text-xs à text-sm */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed font-light">
            {t("footer.description")}
          </p>
        </div>

        {/* Navigation interne */}
        <div className="space-y-4">
          {/* Titre de section plus visible */}
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            {t("sidebar.navigation")}
          </h4>
          {/* Liens passés de text-xs à text-sm */}
          <ul className="space-y-3 text-sm font-mono">
            <li>
              <Link href={`/${locale}`} className="text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors">
                {t('header.home')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/posts`} className="text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors">
                {t('header.posts')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about`} className="text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors">
                {t('header.about')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Liens Réseaux / Contact */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            Connect
          </h4>
          {/* Liens passés de text-xs à text-sm */}
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-mono">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
              GitHub <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
              X <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Ligne inférieure de Copyright (Légèrement rehaussée pour l'équilibre) */}
      <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">
        <div>
          © {new Date().getFullYear()} bambaDev. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          {t("footer.made_with")}
        </div>
      </div>
    </footer>
  )
}