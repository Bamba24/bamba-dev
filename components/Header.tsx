"use client"

import Link from 'next/link'; // Retour au Link natif de Next.js
import { Menu, ArrowUpRight, Sparkles } from 'lucide-react';
import { useI18n, useCurrentLocale } from '@/locales/client'; // Import du hook de locale actuelle
import { useState } from 'react';
import dynamic from "next/dynamic"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ThemeToggle = dynamic(() => import("@/components/themeToggle"), { 
  ssr: false, 
  loading: () => <div className="w-10 h-10 rounded-xl" /> 
});

const LangueSwitch = dynamic(() => import("@/components/LangueSwitch"), {
  ssr: false
});

export default function Header() {
  const t = useI18n();
  const locale = useCurrentLocale(); // 🔥 Récupère 'fr' ou 'en' dynamiquement
  const [isOpen, setIsOpen] = useState(false); 

  // On construit les liens dynamiquement en injectant la locale actuelle
  const navLinks = [
    { name: t('header.home'), href: `/${locale}` },
    { name: t('header.posts'), href: `/${locale}/posts` },
    { name: t('header.about'), href: `/${locale}/a-propos` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-100/80 dark:border-zinc-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div className="flex items-center">
          <Link href={`/${locale}`} className="text-xl font-medium tracking-tight group flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={24}      
                height={24}     
                className="object-contain"
              />
            </div>
            <span className="font-normal text-zinc-900 dark:text-zinc-50">
              bamba<span className="text-amber-600 font-semibold">Dev</span>
            </span>
          </Link>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-1.5 bg-zinc-50/60 dark:bg-zinc-900/40 p-1.5 rounded-full border border-zinc-100 dark:border-zinc-800/40" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-xs text-black dark:text-white  px-4 py-2 rounded-full transition-all duration-200 font-medium tracking-wide uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <LangueSwitch />
            <ThemeToggle />
          </div>

          {/* CTA DESKTOP */}
          <Link 
            href={`/${locale}/subscribe`} 
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-xs font-semibold tracking-wider uppercase hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-all shadow-sm group"
          >
            <span>{t("header.subscribe")}</span>
            <ArrowUpRight size={14} strokeWidth={2.5} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* MENU MOBILE */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-900 dark:text-white bg-zinc-50/50 dark:bg-zinc-900/20 active:scale-95 transition-all outline-none">
                <Menu size={20} strokeWidth={2} aria-label="Ouvrir le menu" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 p-8 flex flex-col justify-between">
                <div>
                  <SheetHeader className="text-left border-b border-zinc-100 dark:border-zinc-900 pb-6">
                    <SheetTitle className="text-xl font-normal tracking-tight flex items-center gap-2">
                      <span>bamba<span className="text-amber-600 font-bold">Dev</span></span>
                      <Sparkles className="w-4 h-4 text-amber-500/60" />
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="flex flex-col gap-3 mt-8" aria-label="Navigation mobile">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.href}
                        href={link.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 px-3 py-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                {/* CTA Mobile en bas de tiroir */}
                <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6">
                  <Link 
                    href={`/${locale}/subscribe`}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white group rounded-2xl border border-zinc-100 dark:border-zinc-800/50 transition-all"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white group-hover:text-white">
                      {t("header.subscribe")}
                    </span>
                    <div className="bg-zinc-900 dark:bg-zinc-800 p-2 rounded-xl text-white border border-zinc-800 dark:border-zinc-700/60 group-hover:bg-amber-700 dark:group-hover:bg-amber-600 transition-colors">
                      <ArrowUpRight size={16} strokeWidth={2.5} />
                    </div>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}