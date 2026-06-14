import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, HelpCircle, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — CycleBloom AI" }] }),
  component: FaqPage,
});

const faqs = [
  {
    category: "Général",
    items: [
      { q: "Qu'est-ce que CycleBloom AI ?", a: "CycleBloom AI est une application de santé féminine propulsée par l'intelligence artificielle. Elle offre un suivi complet du cycle menstruel, de la fertilité, de la grossesse, ainsi que des recommandations personnalisées basées sur votre profil unique." },
      { q: "CycleBloom est-elle gratuite ?", a: "CycleBloom propose une version gratuite avec les fonctionnalités essentielles de suivi de cycle. L'abonnement Premium débloque l'IA avancée, les prédictions détaillées, le suivi de grossesse complet et l'accès à la communauté d'experts." },
      { q: "Sur quels appareils puis-je utiliser CycleBloom ?", a: "CycleBloom est une application web progressive (PWA) accessible depuis n'importe quel navigateur sur smartphone, tablette ou ordinateur. Aucune installation n'est nécessaire." },
      { q: "CycleBloom est-elle disponible en plusieurs langues ?", a: "Actuellement, CycleBloom est disponible en français. D'autres langues seront ajoutées prochainement (anglais, espagnol, arabe)." },
    ],
  },
  {
    category: "Cycle & Santé",
    items: [
      { q: "Comment l'IA prédit-elle mon cycle ?", a: "Notre algorithme analyse votre historique de cycles, vos symptômes, votre température et d'autres facteurs pour créer un modèle personnalisé. La précision s'améliore avec chaque cycle enregistré." },
      { q: "Puis-je utiliser CycleBloom comme contraception ?", a: "Non. CycleBloom est un outil de suivi et d'information. Il ne doit jamais être utilisé comme seule méthode de contraception. Consultez votre médecin pour des conseils en planification familiale." },
      { q: "L'application peut-elle détecter des problèmes de santé ?", a: "CycleBloom peut identifier des patterns inhabituels dans votre cycle et vous alerter, mais elle ne pose pas de diagnostic. Si vous avez des préoccupations de santé, consultez un professionnel." },
      { q: "Comment fonctionne le suivi de grossesse ?", a: "Une fois votre grossesse confirmée, CycleBloom passe en mode grossesse avec un suivi semaine par semaine, des conseils adaptés, un suivi des rendez-vous et des alertes personnalisées." },
    ],
  },
  {
    category: "Compte & Données",
    items: [
      { q: "Mes données de santé sont-elles protégées ?", a: "Oui. Toutes vos données sont chiffrées (AES-256) et stockées sur des serveurs sécurisés. Nous ne partageons jamais vos données avec des tiers et sommes conformes au RGPD." },
      { q: "Comment supprimer mon compte ?", a: "Rendez-vous dans Paramètres > Compte > Supprimer mon compte. Vos données seront intégralement supprimées de nos serveurs dans un délai de 30 jours." },
      { q: "Puis-je exporter mes données ?", a: "Oui, vous pouvez exporter l'intégralité de vos données (cycles, symptômes, notes) au format CSV depuis Paramètres > Données > Exporter." },
      { q: "J'ai oublié mon mot de passe, que faire ?", a: "Sur la page de connexion, cliquez sur \"Mot de passe oublié\". Vous recevrez un lien de réinitialisation par email. Le lien est valide 1 heure." },
    ],
  },
  {
    category: "Communauté & Médecins",
    items: [
      { q: "Comment fonctionne la communauté ?", a: "La communauté CycleBloom permet d'échanger avec d'autres utilisatrices et des experts santé. Vous pouvez poser des questions, partager votre expérience et obtenir du soutien dans un environnement bienveillant et modéré." },
      { q: "Les médecins listés sont-ils vérifiés ?", a: "Oui, tous les professionnels de santé présents dans notre annuaire sont vérifiés (diplômes, inscriptions ordinales). Les avis sont également modérés pour garantir leur authenticité." },
      { q: "Puis-je prendre rendez-vous via CycleBloom ?", a: "Oui, pour les praticiens qui ont activé la prise de rendez-vous en ligne. Vous pouvez filtrer les résultats par disponibilité, spécialité et localisation." },
    ],
  },
];

function FaqPage() {
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
            <HelpCircle className="h-8 w-8 text-rose-vif" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">Questions fréquentes</h1>
          <p className="mt-3 text-lg text-gray-500">Tout ce que vous devez savoir sur CycleBloom AI</p>
        </div>

        <div className="space-y-8">
          {faqs.map((section) => (
            <section key={section.category}>
              <h2 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-doux" />
                {section.category}
              </h2>
              <div className="rounded-3xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {section.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
                      {item.q}
                      <ChevronRight className="h-4 w-4 text-gray-400 transition group-open:rotate-90 shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">Vous avez une autre question ?</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link to="/help" className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Centre d'aide</Link>
            <Link to="/contact" className="rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-3 text-sm font-semibold text-white shadow-bloom hover:shadow-lg transition">Contactez-nous</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
