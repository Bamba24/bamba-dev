"use client"

import Link from 'next/link';
import { Moon, Sun, Menu, ArrowUpRight} from 'lucide-react';
import { useI18n } from '@/locales/client';
import LangueSwitch from "./LangueSwitch";
import { useTheme } from "next-themes"
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Import Shadcn Sheet

export default function Header() {
  const t = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // État pour fermer le menu au clic

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: t('header.home'), href: '/' },
    { name: t('header.posts'), href: '/posts' },
    { name: t('header.category'), href: '/categories' },
    { name: t('header.about'), href: '/a-propos' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        
        {/* LOGO */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-medium tracking-tight group">
            bamba<span className="text-amber-600 transition-colors group-hover:text-amber-500">Dev</span>
          </Link>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-sm text-zinc-500 hover:text-amber-600 transition-colors duration-200 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <LangueSwitch />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 text-zinc-500 hover:text-amber-600 transition-colors"
          >
            {mounted && (theme === "dark" ? <Sun size={19} strokeWidth={1.5} /> : <Moon size={19} strokeWidth={1.5} />)}
          </button>

          {/* CTA DESKTOP */}
          <Link 
            href="/subscribe" 
            className="hidden md:flex items-center gap-1 ml-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white border-b-2 border-amber-600 pb-0.5 hover:border-zinc-900 dark:hover:border-white transition-all"
          >
            {t("header.subscribe")}
            <ArrowUpRight size={14} strokeWidth={3} />
          </Link>

          {/* MENU MOBILE (MODAL) */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2 text-zinc-900 dark:text-white outline-none" >
                
                  <Menu size={24} strokeWidth={1.5} />
        
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-medium tracking-tight mb-8">
                    bamba<span className="text-amber-600">Dev</span>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col gap-6 mt-10 ml-10">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      onClick={() => setIsOpen(false)} // Ferme la modal au clic
                      className="text-2xl font-medium text-zinc-500 hover:text-amber-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <hr className="border-zinc-100 dark:border-zinc-900 my-4" />
                  
                  <Link 
                    href="/subscribe"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-xl font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                      {t("header.subscribe")}
                    </span>
                    <div className="bg-amber-600 p-2 rounded-full text-white">
                      <ArrowUpRight size={20} />
                    </div>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}