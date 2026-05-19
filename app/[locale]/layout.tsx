import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider"
import Header from "@/components/Header";
import ProviderLayout from "./provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bambadev.com'),
  title: {
    default: "BambaDev - Portfolio & Blog",
    template: "%s | BambaDev" // Permet d'avoir "Nom de l'article | BambaDev"
  },
  description: "Développeur Fullstack JavaScript spécialisé React, Next.js et NestJS.",
  openGraph: {
    title: "BambaDev",
    description: "Partage de connaissances sur le développement web et mobile.",
    url: "https://ton-domaine.com",
    siteName: "BambaDev",
    images: [
      {
        url: "/og-background.webp", // Image par défaut dans ton dossier public
        width: 1200,
        height: 630,
        alt: "BambaDev Portfolio",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BambaDev",
    description: "Développeur Fullstack JavaScript",
    images: ["/og-background.webp"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // On définit params comme une Promise
}) {
  const { locale } = await params; // On attend la résolution des params

  return (
    <html
      lang={locale} // Utilise la vraie locale ici au lieu de "fr" en dur
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
         attribute="class" 
         defaultTheme="system" 
         enableSystem
         disableTransitionOnChange
        >
        <ProviderLayout params={params}>
            <Header />
            {children}
        </ProviderLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
