"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "@teispace/next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Plus besoin de bloquer le rendu avec un état 'mounted' ici !
  // next-themes s'occupe de l'hydratation proprement grâce au suppressHydrationWarning du RootLayout.
  
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}