import type { Metadata } from "next";
import { Inter, Oxanium, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import ProviderLayout from "./provider";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontPixel = Oxanium({
  variable: "--font-pixel-grid",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bambadev.com"
  ),
  title: {
    default: "bamba.dev - Blog & Engineering",
    template: "%s | bamba.dev",
  },
  description:
    "Engineering, software architecture, TypeScript, Next.js, and modern developer tooling.",
  openGraph: {
    title: "bamba.dev",
    description:
      "Engineering, software architecture, TypeScript, Next.js, and modern developer tooling.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://bambadev.com",
    siteName: "bamba.dev",
    images: [
      {
        url: "/og-background.webp",
        width: 1200,
        height: 630,
        alt: "bamba.dev Blog",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bamba.dev",
    description: "Engineering & Software Architecture",
    images: ["/og-background.webp"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${fontSans.variable} ${fontPixel.variable} ${fontMono.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise3 min-h-screen">
            <ProviderLayout params={params}>{children}</ProviderLayout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
