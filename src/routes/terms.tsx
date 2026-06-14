import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, FileText, AlertTriangle, CheckCircle2, Scale, Clock, XCircle } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Conditions d'utilisation — CycleBloom AI" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">CycleBloom</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">← Retour</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
            <FileText className="h-8 w-8 text-rose-vif" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">Conditions d'utilisation</h1>
          <p className="mt-3 text-gray-500">Dernière mise à jour : Juin 2026</p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Acceptation des conditions</h2>
            </div>
            <p>En accédant et en utilisant CycleBloom AI, vous acceptez d'être liée par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Description du service</h2>
            </div>
            <p>CycleBloom AI est une application de suivi de santé féminine qui propose :</p>
            <ul className="mt-3 space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Suivi du cycle menstruel et prédictions</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Suivi de fertilité et d'ovulation</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Suivi de grossesse</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Recommandations personnalisées par IA</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Communauté et forum d'entraide</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Annuaire de professionnels de santé</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h2 className="font-display text-xl font-bold text-gray-900">Avertissement médical</h2>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-900">CycleBloom AI ne constitue pas un avis médical.</p>
              <p className="mt-2 text-amber-800">Les informations fournies par l'application sont à titre informatif uniquement et ne remplacent en aucun cas une consultation médicale professionnelle. Consultez toujours un professionnel de santé qualifié pour toute question médicale.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Compte utilisateur</h2>
            </div>
            <p>Pour utiliser CycleBloom AI, vous devez :</p>
            <ul className="mt-3 space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Avoir au moins 16 ans</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Fournir des informations exactes lors de l'inscription</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Protéger la confidentialité de votre mot de passe</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Ne pas partager votre compte avec des tiers</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Résiliation</h2>
            </div>
            <p>Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l'application. Lors de la suppression, toutes vos données personnelles seront définitivement effacées de nos serveurs dans un délai de 30 jours.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Propriété intellectuelle</h2>
            </div>
            <p>L'ensemble du contenu de CycleBloom AI (textes, graphismes, logos, algorithmes) est protégé par le droit de la propriété intellectuelle et appartient à LB Group. Toute reproduction non autorisée est interdite.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
