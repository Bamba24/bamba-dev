import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Icône */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Article non trouvé
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8">
          Désolé, l&apos;article que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>

        {/* Bouton d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={20} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Voir tous les articles
          </Link>
        </div>

        {/* Message supplémentaire */}
        <p className="text-sm text-muted-foreground mt-8">
          Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, veuillez nous{' '}
          <Link href="/contact" className="text-primary hover:underline">
            contacter
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
