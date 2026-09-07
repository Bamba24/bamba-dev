import { NuqsAdapter } from "nuqs/adapters/next/app";
import { I18nProviderClient } from "../../locales/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function SubLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;

  return (
    <I18nProviderClient locale={locale}>
      <NuqsAdapter>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </NuqsAdapter>
    </I18nProviderClient>
  );
}
