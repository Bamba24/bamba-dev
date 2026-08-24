"use client"

import { Moon, Sun } from 'lucide-react';
import { useTheme } from "@teispace/next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 text-zinc-500 hover:text-amber-600 transition-colors"
      aria-label="Basculer le thème"
    >
      {theme === "dark" ? (
        <Sun size={19} strokeWidth={1.5} />
      ) : (
        <Moon size={19} strokeWidth={1.5} />
      )}
    </button>
  );
}