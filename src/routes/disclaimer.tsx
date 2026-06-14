import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, AlertTriangle, Heart, Stethoscope, Brain, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Avertissement médical — CycleBloom AI" }] }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">Avertissement médical</h1>
          <p className="mt-3 text-gray-500">Information importante sur l'utilisation de CycleBloom AI</p>
        </div>

        <div className="mb-10 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8">
          <div className="flex items-start gap-4">
            <ShieldAlert className="h-8 w-8 text-amber-600 shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-xl font-bold text-amber-900">Avertissement important</h2>
              <p className="mt-3 text-amber-800 leading-relaxed">CycleBloom AI est une application de bien-être et de suivi personnel. Elle ne constitue en aucun cas un dispositif médical, un outil de diagnostic ou un substitut à un avis médical professionnel.</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-5 w-5 text-rose-vif" />
              <h2 className="font-display text-xl font-bold text-gray-900">Suivi du cycle</h2>
            </div>
            <p>Les prédictions de cycle menstruel, d'ovulation et de fertilité sont basées sur des algorithmes statistiques et l'intelligence artificielle. Ces prédictions sont des estimations et peuvent varier d'une personne à l'autre.</p>
            <ul className="mt-4 space-y-3 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"></span>Ne pas utiliser comme méthode de contraception unique</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"></span>Les prédictions d'ovulation ne garantissent pas la fertilité</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"></span>Un cycle irrégulier nécessite un suivi médical</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="h-5 w-5 text-rose-vif" />
              <h2 className="font-display text-xl font-bold text-gray-900">Quand consulter un médecin</h2>
            </div>
            <p>Consultez immédiatement un professionnel de santé si vous présentez :</p>
            <ul className="mt-4 space-y-3 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Des douleurs pelviennes intenses ou inhabituelles</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Des saignements anormaux ou très abondants</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Une absence de règles prolongée (aménorrhée)</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Des symptômes de grossesse inattendus</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Tout symptôme préoccupant lié à votre santé reproductive</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-5 w-5 text-rose-vif" />
              <h2 className="font-display text-xl font-bold text-gray-900">Intelligence artificielle</h2>
            </div>
            <p>Les recommandations générées par notre IA sont basées sur des données scientifiques générales et votre historique personnel. Elles ne prennent pas en compte votre dossier médical complet et ne peuvent pas remplacer l'expertise d'un professionnel de santé.</p>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <p className="text-center font-semibold text-gray-900">En utilisant CycleBloom AI, vous reconnaissez avoir lu et compris cet avertissement médical et acceptez que l'application ne se substitue pas à un suivi médical professionnel.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
