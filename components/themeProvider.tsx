"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider , type ThemeProviderProps} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Si on n'est pas monté, on rend juste les enfants pour l'hydratation initiale
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider 
      {...props} 
      enableColorScheme={false} // 👈 Ajoute ceci : désactive la gestion auto du color-scheme via script
    >
      {children}
    </NextThemesProvider>
  )
}