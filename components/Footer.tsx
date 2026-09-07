"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n, useCurrentLocale } from "@/locales/client";

export default function Footer() {
  const t = useI18n();
  const locale = useCurrentLocale();

  return (
    <footer className="w-full border-t border-border/40 mt-20 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Top line: Brand / tagline + socials */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-pixel-grid font-bold text-sm tracking-wider text-foreground">
              bamba<span className="text-primary">.dev</span>
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {t("footer.made_with")}
            </span>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
            >
              GitHub <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
            >
              X <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Bottom line: Copyright & nav */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] font-mono text-muted-foreground/80 pt-4 border-t border-border/20">
          <div>
            © {new Date().getFullYear()} bamba.dev. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}`}
              className="hover:text-foreground transition-colors"
            >
              {t("header.home")}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/posts`}
              className="hover:text-foreground transition-colors"
            >
              {t("header.posts")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}