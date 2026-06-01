import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      role="main"
      aria-labelledby="notfound-title"
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6" aria-hidden>
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 id="notfound-title" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Page introuvable
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          La page d&apos;accueil que vous recherchez est introuvable ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            aria-label="Voir les articles"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Voir les articles
          </Link>

          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Si le problème persiste, contactez-nous sur{' '}
          <Link href="/contact" className="text-primary hover:underline" aria-label="Contacter le support">
            notre page de contact
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
