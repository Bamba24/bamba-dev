
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { I18nProviderClient } from '../../locales/client'
 

export default async function SubLayout({ params, children }: { params: Promise<{ locale: string }>, children: React.ReactNode
 }) {
  const { locale } = await params
 
  return (
    <I18nProviderClient locale={locale}>
      <NuqsAdapter>
        {children}
      </NuqsAdapter>
    </I18nProviderClient>
  )
}
