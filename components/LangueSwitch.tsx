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

  useEffect(()=>{
    function handleClickOutside(event: MouseEvent){
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
     }
  }, [])

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={ref}
    >
      {/* L'icône Globe */}
      <button 
        className="p-2.5 text-zinc-500 hover:text-amber-600 transition-colors flex items-center justify-center"
        aria-label="Changer de langue"
      >
        <Globe size={19} strokeWidth={1.5} />
      </button>

      {/* Le Popup (Menu) */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-2 w-32 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-xl p-1.5 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLocale(lang.code as "fr" | "en")}
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