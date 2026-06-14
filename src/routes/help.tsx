import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, HelpCircle, BookOpen, MessageCircle, Settings, Calendar, Heart, Brain, Shield, ChevronRight, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Centre d'aide — CycleBloom AI" }] }),
  component: HelpPage,
});

const categories = [
  {
    icon: Calendar,
    title: "Suivi du cycle",
    color: "rose",
    articles: [
      { q: "Comment enregistrer mes règles ?", a: "Depuis le tableau de bord, appuyez sur \"Enregistrer mes règles\" ou utilisez le calendrier pour marquer les jours de menstruation. L'IA ajustera automatiquement vos prédictions." },
      { q: "Pourquoi mes prédictions changent ?", a: "L'IA apprend continuellement de vos données. Plus vous enregistrez d'informations, plus les prédictions deviennent précises. Les 3 premiers mois sont une phase d'apprentissage." },
      { q: "Comment modifier une date enregistrée ?", a: "Accédez au calendrier, appuyez sur la date à modifier, puis choisissez \"Modifier\" ou \"Supprimer\" pour corriger l'entrée." },
    ],
  },
  {
    icon: Heart,
    title: "Fertilité & Ovulation",
    color: "violet",
    articles: [
      { q: "Comment fonctionne le suivi de fertilité ?", a: "CycleBloom analyse votre historique de cycle, vos symptômes et votre température basale pour estimer votre fenêtre de fertilité. Les jours fertiles sont indiqués en bleu sur le calendrier." },
      { q: "Les prédictions sont-elles fiables pour la conception ?", a: "Nos prédictions sont une aide précieuse mais ne remplacent pas un suivi médical. Pour un projet de conception, combinez notre outil avec les conseils de votre gynécologue." },
    ],
  },
  {
    icon: Brain,
    title: "IA & Recommandations",
    color: "purple",
    articles: [
      { q: "Comment l'IA personnalise-t-elle mes conseils ?", a: "Notre IA analyse votre phase de cycle, vos symptômes, votre historique et vos objectifs pour générer des recommandations adaptées en nutrition, exercice et bien-être." },
      { q: "Puis-je désactiver les recommandations ?", a: "Oui, rendez-vous dans Paramètres > Notifications > Recommandations pour personnaliser ce que vous souhaitez recevoir." },
    ],
  },
  {
    icon: Settings,
    title: "Compte & Paramètres",
    color: "gray",
    articles: [
      { q: "Comment changer mon mot de passe ?", a: "Accédez à Profil > Sécurité > Modifier le mot de passe. Vous recevrez un email de confirmation." },
      { q: "Comment supprimer mon compte ?", a: "Dans Paramètres > Compte > Supprimer mon compte. Toutes vos données seront définitivement supprimées sous 30 jours." },
      { q: "Comment exporter mes données ?", a: "Rendez-vous dans Paramètres > Données > Exporter pour télécharger l'ensemble de vos données au format CSV." },
    ],
  },
  {
    icon: Shield,
    title: "Confidentialité",
    color: "emerald",
    articles: [
      { q: "Mes données sont-elles en sécurité ?", a: "Absolument. Nous utilisons un chiffrement AES-256 et vos données ne sont jamais partagées avec des tiers. Consultez notre politique de confidentialité pour plus de détails." },
      { q: "Qui a accès à mes données de santé ?", a: "Uniquement vous. Notre équipe technique n'accède aux données qu'avec votre consentement explicite, uniquement pour résoudre un problème technique." },
    ],
  },
];

function HelpPage() {
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

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
            <HelpCircle className="h-8 w-8 text-rose-vif" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">Centre d'aide</h1>
          <p className="mt-3 text-lg text-gray-500">Trouvez rapidement les réponses à vos questions</p>
        </div>

        <div className="space-y-8">
          {categories.map((cat) => (
            <section key={cat.title} className="rounded-3xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
                  <cat.icon className="h-5 w-5 text-rose-vif" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">{cat.title}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cat.articles.map((article) => (
                  <details key={article.q} className="group">
                    <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
                      {article.q}
                      <ChevronRight className="h-4 w-4 text-gray-400 transition group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{article.a}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-rose-vif/5 to-violet-doux/5 p-8 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-violet-doux mb-3" />
          <h2 className="font-display text-xl font-bold text-gray-900">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="mt-2 text-gray-600">Notre équipe support est disponible pour vous aider</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/33660061723" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600 transition">
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
            <a href="mailto:lbcloudadmin@gmail.com" className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition">
              <Mail className="h-4 w-4" /> Email support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
