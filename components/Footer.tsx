"use client"

import React from 'react'
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { useI18n, useCurrentLocale } from "@/locales/client";

export default function Footer() {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <footer className="w-full border-t border-zinc-200/60 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Grille principale 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Col 1: Brand & Description */}
          <div className="space-y-4 lg:col-span-1">
            <div className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
              bamba<span className="text-amber-600 dark:text-amber-500">Dev</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              {t("footer.description")}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open for engineering roles & consulting
            </div>
          </div>

          {/* Col 2: Navigation interne */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              {t("sidebar.navigation")}
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href={`/${locale}`} className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  {t('header.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/posts`} className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  {t('header.posts')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  {t('header.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Topics / Tech */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Topics
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/tags/JavaScript`} className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  #JavaScript & React 19
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tags/NestJS`} className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  #NestJS & Backend APIs
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tags/DevOps`} className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  #DevOps & Dokploy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tags/IA`} className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                  #Claude Code & AI Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-sm font-medium">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                GitHub <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                LinkedIn <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group">
                X (Twitter) <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Ligne inférieure de Copyright */}
        <div className="pt-8 border-t border-zinc-200/60 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div>
            © {new Date().getFullYear()} bambaDev. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            {t("footer.made_with")}
          </div>
        </div>

      </div>
    </footer>
  )
}