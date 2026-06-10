import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Check, Crown, Sparkles, Shield, Zap, Star, TrendingUp, Heart } from "lucide-react";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Abonnement — CycleBloom AI" }] }),
  component: Subscription,
});

const PLANS = [
  {
    id: "free",
    name: "Essentiel",
    price: "Gratuit",
    period: "",
    description: "Suivi de base de votre cycle",
    features: [
      "Suivi du cycle menstruel",
      "Calendrier des règles",
      "Prédictions basiques (3 mois)",
      "Enregistrement des symptômes (5/jour)",
      "3 questions Bloom AI / mois",
      "Accès communauté (lecture seule)",
      "1 rappel configurable",
    ],
    limitations: [
      "Pas de rapports détaillés",
      "Bloom AI limité",
      "Pas de consultation médicale",
      "Pas de mode grossesse",
    ],
    cta: "Plan actuel",
    active: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "4 990 FCFA",
    priceEur: "7,49 €",
    period: "/mois",
    description: "L'expérience complète pour comprendre votre corps",
    popular: true,
    features: [
      "Tout le plan Essentiel +",
      "Bloom AI illimité avec sources",
      "Prédictions avancées (12 mois)",
      "Rapports détaillés et graphiques",
      "Suivi de la température basale",
      "Mode fertilité avancé",
      "Mode grossesse complet",
      "Communauté : poster et répondre",
      "Rappels illimités et intelligents",
      "Synchronisation partenaire",
      "1 téléconsultation/mois incluse",
      "Export PDF de vos données",
      "Aucune publicité",
    ],
    cta: "Commencer l'essai gratuit",
    trial: "7 jours gratuits",
  },
  {
    id: "premium_yearly",
    name: "Premium Annuel",
    price: "39 900 FCFA",
    priceEur: "59,99 €",
    period: "/an",
    description: "Économisez 33% avec l'abonnement annuel",
    badge: "-33%",
    features: [
      "Tout le plan Premium +",
      "3 téléconsultations/mois incluses",
      "Analyses IA personnalisées",
      "Historique illimité",
      "Accès prioritaire aux nouveautés",
      "Badge communauté Premium",
      "Support prioritaire",
    ],
    cta: "Choisir l'annuel",
    trial: "14 jours gratuits",
  },
];

const TESTIMONIALS = [
  { name: "Aminata K.", text: "Bloom AI m'a aidée à comprendre mon SOPK mieux que n'importe quel article. Les réponses sont précises et sourcées.", rating: 5 },
  { name: "Claire D.", text: "La téléconsultation incluse, c'est game-changer. J'ai pu parler à une gynéco depuis chez moi au Cameroun.", rating: 5 },
  { name: "Marie L.", text: "Je suis passée de Premium mensuel à annuel. L'appli est devenue indispensable pour mon suivi de fertilité.", rating: 5 },
];

function Subscription() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <AppShell title="Abonnement">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-4 py-1.5 text-xs font-semibold text-white mb-4">
          <Crown className="h-3.5 w-3.5" /> Premium
        </div>
        <h2 className="font-display text-3xl font-bold">Prenez soin de vous, sans limites</h2>
        <p className="mt-2 text-sm text-foreground/60 max-w-md mx-auto">
          Accédez à l'intelligence artificielle médicale la plus avancée, aux consultations et à une communauté active.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full bg-white/70 p-1 border border-border">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${billing === "monthly" ? "bg-rose-vif text-white shadow-bloom" : "text-foreground/60"}`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${billing === "yearly" ? "bg-rose-vif text-white shadow-bloom" : "text-foreground/60"}`}
          >
            Annuel <span className="ml-1 text-[10px] opacity-80">-33%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-6 ${
              plan.popular
                ? "border-2 border-rose-vif bg-white shadow-bloom scale-[1.02]"
                : "border border-white/70 glass shadow-bloom"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Le plus populaire
              </div>
            )}
            {plan.badge && (
              <div className="absolute -top-2 -right-2 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold text-white">
                {plan.badge}
              </div>
            )}

            <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            <p className="text-xs text-foreground/60 mt-1">{plan.description}</p>

            <div className="mt-4 mb-6">
              <span className="font-display text-3xl font-bold text-rose-vif">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              {plan.priceEur && (
                <div className="text-[10px] text-muted-foreground mt-0.5">soit {plan.priceEur}{plan.period}</div>
              )}
            </div>

            <ul className="space-y-2.5 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
              {plan.limitations?.map(l => (
                <li key={l} className="flex items-start gap-2 text-xs text-muted-foreground line-through">
                  <span className="h-3.5 w-3.5 shrink-0 mt-0.5 text-center">✗</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-full py-3 text-sm font-semibold transition ${
                plan.active
                  ? "bg-foreground/10 text-foreground/60 cursor-default"
                  : plan.popular
                    ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-bloom hover:scale-[1.02]"
                    : "bg-rose-vif/10 text-rose-vif hover:bg-rose-vif/20"
              }`}
            >
              {plan.cta}
            </button>
            {plan.trial && (
              <p className="text-center text-[10px] text-muted-foreground mt-2">{plan.trial} puis facturation automatique</p>
            )}
          </div>
        ))}
      </div>

      {/* Features comparison */}
      <div className="max-w-3xl mx-auto mb-12">
        <h3 className="font-display text-2xl font-bold text-center mb-6">Pourquoi passer Premium ?</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Sparkles} title="Bloom AI illimité" desc="Réponses médicales sourcées, sans limite quotidienne" />
          <FeatureCard icon={Shield} title="Téléconsultation" desc="Médecins gynécologues francophones disponibles 24h/24" />
          <FeatureCard icon={TrendingUp} title="Rapports avancés" desc="Analyse de tendances, prédictions IA personnalisées" />
          <FeatureCard icon={Heart} title="Communauté active" desc="Postez, répondez, et accédez aux réponses d'experts" />
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-3xl mx-auto">
        <h3 className="font-display text-xl font-bold text-center mb-6">Ce qu'elles en disent</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="rounded-2xl border border-white/70 glass p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed italic">"{t.text}"</p>
              <p className="mt-3 text-[10px] font-semibold text-violet-doux">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: typeof Sparkles; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/70 glass p-4 text-center">
      <div className="mx-auto h-10 w-10 rounded-full bg-rose-pastel flex items-center justify-center mb-3">
        <Icon className="h-5 w-5 text-rose-vif" />
      </div>
      <h4 className="font-display text-sm font-bold">{title}</h4>
      <p className="mt-1 text-[10px] text-foreground/60">{desc}</p>
    </div>
  );
}
