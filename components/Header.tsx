"use client";

import Link from "next/link";
import { useI18n, useCurrentLocale } from "@/locales/client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ThemeToggle = dynamic(() => import("@/components/themeToggle"), {
  ssr: false,
  loading: () => <div className="w-8 h-8 rounded-md" />,
});

const LangueSwitch = dynamic(() => import("@/components/LangueSwitch"), {
  ssr: false,
});

export default function Header() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t("header.home"), href: `/${locale}` },
    { name: t("header.posts"), href: `/${locale}/posts` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-xs focus:font-mono"
      >
        Passer au contenu principal
      </a>

      <div className="max-w-2xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* LOGO / BRAND */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2 font-pixel-grid font-bold text-base tracking-wider hover:opacity-90 transition-opacity"
        >
          <span className="w-2 h-2 rounded-none bg-primary inline-block animate-pulse" />
          <span>
            bamba<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* DESKTOP NAV & ACTIONS */}
        <div className="flex items-center gap-5">
          <nav className="hidden sm:flex items-center gap-4 text-sm" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-xs uppercase tracking-wider font-mono"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 border-l border-border/60 pl-4">
            <LangueSwitch />
            <ThemeToggle />

            {/* MOBILE MENU */}
            <div className="sm:hidden ml-1">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger
                  aria-label="Ouvrir le menu"
                  className="p-1.5 rounded-md border border-border/60 text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Menu className="w-4 h-4" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-64 bg-background border-border p-6 flex flex-col justify-between"
                >
                  <div>
                    <SheetHeader className="text-left pb-4 border-b border-border/50">
                      <SheetTitle className="font-pixel-grid text-base font-bold tracking-wider">
                        bamba<span className="text-primary">.dev</span>
                      </SheetTitle>
                    </SheetHeader>

                    <nav className="flex flex-col gap-2 mt-6" aria-label="Navigation mobile">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground py-2 px-2 rounded-md hover:bg-muted/40 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                    © {new Date().getFullYear()} bamba.dev
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}