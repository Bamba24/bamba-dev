
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { I18nProviderClient } from '../../locales/client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
 

export default async function SubLayout({ params, children }: { params: Promise<{ locale: string }>, children: React.ReactNode
 }) {
  const { locale } = await params
 
  return (
    <I18nProviderClient locale={locale}>
      <NuqsAdapter>
        <Header />
        {children}
        <Footer />
      </NuqsAdapter>
    </I18nProviderClient>
  )
}
