"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useCurrentLocale, useChangeLocale } from '@/locales/client'
import { Globe, Check } from 'lucide-react'

export default function LangueSwitch() {
  const locale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ]

  // Fermer le menu si on clique en dehors du composant
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Gestion du changement de langue sécurisé
  const handleLocaleChange = (e: React.MouseEvent, code: "fr" | "en") => {
    e.stopPropagation() // Empêche l'événement de remonter et de déclencher handleClickOutside inutilement
    setIsOpen(false)    // Ferme le menu immédiatement
    changeLocale(code)  // Change la langue
  }

  return (
    <div className="relative" ref={ref}>
      {/* Bouton Globe qui déclenche l'ouverture/fermeture au clic */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 transition-colors flex items-center justify-center rounded-lg ${
          isOpen ? 'text-amber-600 bg-zinc-50 dark:bg-zinc-800' : 'text-zinc-500 hover:text-amber-600'
        }`}
        aria-label="Changer de langue"
      >
        <Globe size={19} strokeWidth={1.5} />
      </button>

      {/* Le Popup (Menu) */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-2 w-32 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl p-1.5 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={(e) => handleLocaleChange(e, lang.code as "fr" | "en")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  locale === lang.code 
                    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                {lang.label}
                {locale === lang.code && <Check size={12} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}