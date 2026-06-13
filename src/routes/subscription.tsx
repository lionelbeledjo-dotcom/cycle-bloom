import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Check, Crown, Sparkles, Shield, Zap, Star, TrendingUp, Heart, Lock, X, CreditCard } from "lucide-react";
import { setUserSubscription } from "@/lib/premium-gate";
import { toast } from "sonner";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Abonnement Premium — CycleBloom AI" }] }),
  component: Subscription,
});

const PLANS = [
  {
    id: "free",
    name: "Essentiel",
    price: "0 €",
    period: "",
    description: "Suivi de base de votre cycle menstruel",
    features: [
      "Suivi du cycle menstruel (calendrier)",
      "Prédictions de règles (3 mois)",
      "Enregistrement symptômes (3 par jour max)",
      "3 questions Bloom AI par mois",
      "Communauté (lecture seule)",
      "1 rappel configurable",
      "Articles gratuits (3 par mois)",
    ],
    limitations: [
      "Rapports et graphiques détaillés",
      "Bloom AI illimité",
      "Prédictions d'ovulation",
      "Mode fertilité avancé",
      "Suivi température basale",
      "Téléconsultation",
      "Mode grossesse",
      "Export PDF",
      "Synchronisation partenaire",
    ],
    cta: "Plan actuel",
    active: true,
  },
  {
    id: "premium_monthly",
    name: "Premium",
    price: "9,99 €",
    period: "/mois",
    description: "L'expérience complète pour comprendre votre corps",
    popular: true,
    features: [
      "Tout le plan Essentiel, plus :",
      "Bloom AI ILLIMITÉ — réponses médicales sourcées",
      "Prédictions avancées (ovulation + fertilité + 12 mois)",
      "Rapports détaillés + graphiques interactifs",
      "Suivi température basale avec courbe",
      "Mode fertilité avancé (fenêtre fertile, glaire, LH)",
      "Mode grossesse complet (semaine par semaine)",
      "Communauté : poster, répondre, badges",
      "Rappels intelligents illimités (adaptés à votre phase)",
      "Synchronisation partenaire",
      "1 téléconsultation gynéco / mois incluse",
      "Export PDF de vos données (pour votre médecin)",
      "Accès à tous les articles du magazine",
      "Aucune publicité",
      "Support prioritaire",
    ],
    cta: "Commencer l'essai gratuit",
    trial: "7 jours gratuits",
  },
  {
    id: "premium_yearly",
    name: "Premium Annuel",
    price: "79,99 €",
    period: "/an",
    priceMonthly: "6,67 €/mois",
    description: "Économisez 33% — notre meilleure offre",
    badge: "-33%",
    features: [
      "Tout le plan Premium, plus :",
      "3 téléconsultations / mois incluses",
      "Analyses IA ultra-personnalisées",
      "Historique illimité (au-delà de 12 mois)",
      "Accès anticipé aux nouvelles fonctionnalités",
      "Badge communauté « Membre Premium »",
      "Support VIP par email",
      "Rapport annuel de santé hormonale",
    ],
    cta: "Choisir l'annuel",
    trial: "14 jours gratuits",
  },
];

const TESTIMONIALS = [
  { name: "Aminata K.", location: "Paris", text: "Les prédictions sont bluffantes de précision. Après 3 cycles, l'app a prédit mes règles au jour près.", rating: 5 },
  { name: "Claire D.", location: "Lyon", text: "La téléconsultation incluse, c'est incroyable. Plus besoin d'attendre 3 mois pour un RDV gynéco.", rating: 5 },
  { name: "Marie L.", location: "Bordeaux", text: "Bloom AI m'a aidée à comprendre pourquoi j'avais des SPM horribles. Mieux que Google, sourcé et fiable.", rating: 5 },
];

function Subscription() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const startPayment = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  return (
    <AppShell title="Abonnement">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-4 py-1.5 text-xs font-semibold text-white mb-4">
          <Crown className="h-3.5 w-3.5" /> Premium
        </div>
        <h2 className="font-display text-3xl font-bold">Prenez soin de vous, sans limites</h2>
        <p className="mt-2 text-sm text-foreground/60 max-w-md mx-auto">
          Débloquez l'intelligence artificielle médicale, les consultations et les prédictions avancées.
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

            <div className="mt-4 mb-1">
              <span className="font-display text-3xl font-bold text-rose-vif">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
            </div>
            {plan.priceMonthly && (
              <p className="text-[10px] text-green-600 font-medium mb-4">soit {plan.priceMonthly}</p>
            )}
            {!plan.priceMonthly && <div className="mb-4" />}

            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
              {plan.limitations?.map(l => (
                <li key={l} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5 text-foreground/30" />
                  <span className="line-through">{l}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => !plan.active && startPayment(plan.id)}
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
              <p className="text-center text-[10px] text-muted-foreground mt-2">{plan.trial} · Annulation à tout moment</p>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="font-display text-2xl font-bold text-center mb-6">Comparaison détaillée</h3>
        <div className="rounded-3xl border border-white/70 glass overflow-hidden shadow-bloom">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="p-4 text-left font-medium text-foreground/60">Fonctionnalité</th>
                <th className="p-4 text-center font-medium">Essentiel</th>
                <th className="p-4 text-center font-medium text-rose-vif">Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Suivi du cycle", "check", "check"],
                ["Prédictions de règles", "3 mois", "12 mois"],
                ["Prédictions d'ovulation", "cross", "check"],
                ["Bloom AI", "3 questions/mois", "Illimité"],
                ["Suivi symptômes", "3/jour", "Illimité"],
                ["Température basale", "cross", "check"],
                ["Mode fertilité", "cross", "check"],
                ["Mode grossesse", "cross", "check"],
                ["Rapports & graphiques", "cross", "check"],
                ["Articles magazine", "3/mois", "Illimité"],
                ["Communauté", "Lecture seule", "Poster + répondre"],
                ["Téléconsultation", "cross", "1-3/mois incluses"],
                ["Export PDF", "cross", "check"],
                ["Sync partenaire", "cross", "check"],
                ["Rappels", "1", "Illimités + IA"],
                ["Publicités", "Oui", "Aucune"],
              ].map(([feature, free, premium]) => (
                <tr key={feature as string} className="border-b border-border/20">
                  <td className="p-3 text-xs">{feature}</td>
                  <td className="p-3 text-center text-xs">
                    {free === "check" ? <Check className="h-4 w-4 text-green-500 mx-auto" /> :
                     free === "cross" ? <X className="h-4 w-4 text-foreground/20 mx-auto" /> :
                     <span className="text-muted-foreground">{free}</span>}
                  </td>
                  <td className="p-3 text-center text-xs">
                    {premium === "check" ? <Check className="h-4 w-4 text-green-500 mx-auto" /> :
                     <span className="font-medium text-rose-vif">{premium}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto mb-12">
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
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-violet-doux">{t.name}</span>
                <span className="text-[10px] text-muted-foreground">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mb-12">
        <h3 className="font-display text-xl font-bold text-center mb-6">Questions fréquentes</h3>
        <div className="space-y-3">
          {[
            { q: "Puis-je annuler à tout moment ?", a: "Oui, aucun engagement. Vous pouvez annuler depuis votre profil en un clic. Votre accès Premium reste actif jusqu'à la fin de la période payée." },
            { q: "Comment fonctionne l'essai gratuit ?", a: "Votre carte est enregistrée mais non débitée pendant la période d'essai (7 ou 14 jours selon le plan). Vous pouvez annuler sans frais avant la fin de l'essai." },
            { q: "La téléconsultation est-elle incluse ?", a: "Oui ! 1 consultation/mois avec le plan mensuel, 3/mois avec l'annuel. Ce sont de vraies consultations avec des gynécologues diplômés." },
            { q: "Mes données sont-elles en sécurité ?", a: "Absolument. Chiffrement AES-256 de bout en bout, conformité RGPD, hébergement en Europe (France). Vos données ne sont jamais vendues." },
            { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire (Visa, Mastercard, CB), Apple Pay, Google Pay. Paiement sécurisé via Stripe." },
          ].map(faq => (
            <details key={faq.q} className="rounded-2xl border border-white/70 glass p-4 group">
              <summary className="font-medium text-sm cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-rose-vif group-open:rotate-45 transition-transform text-lg">+</span>
              </summary>
              <p className="mt-3 text-xs text-foreground/70 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Payment modal */}
      {showPayment && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setShowPayment(false)}
        />
      )}
    </AppShell>
  );
}

function PaymentModal({ plan, onClose }: { plan: string; onClose: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"card" | "processing" | "success">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const planInfo = plan === "premium_monthly"
    ? { name: "Premium Mensuel", price: "9,99 €/mois", trial: "7 jours gratuits" }
    : { name: "Premium Annuel", price: "79,99 €/an", trial: "14 jours gratuits" };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      const planType = plan === "premium_monthly" ? "premium_monthly" : "premium_yearly";
      setUserSubscription({ plan: planType, status: "trial" });
      setStep("success");
      toast.success("Bienvenue dans Premium !");
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return cleaned;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        {step === "card" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold">Paiement sécurisé</h3>
                <p className="text-xs text-muted-foreground mt-0.5">via Stripe — chiffré SSL</p>
              </div>
              <button onClick={onClose} className="h-8 w-8 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Plan summary */}
            <div className="rounded-2xl bg-rose-pastel/30 border border-rose-vif/10 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{planInfo.name}</div>
                  <div className="text-[10px] text-green-600 font-medium">{planInfo.trial} puis {planInfo.price}</div>
                </div>
                <Crown className="h-5 w-5 text-rose-vif" />
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Nom sur la carte</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="PRÉNOM NOM"
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Numéro de carte</label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    required
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 pr-12 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                  <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Expiration</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="123"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.01] transition"
              >
                Démarrer mon essai gratuit
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <Shield className="h-3 w-3" />
                Paiement sécurisé · Chiffrement SSL · Annulation sans frais
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <span className="text-[10px] text-muted-foreground font-medium">Visa</span>
                <span className="text-[10px] text-muted-foreground font-medium">Mastercard</span>
                <span className="text-[10px] text-muted-foreground font-medium">CB</span>
                <span className="text-[10px] text-muted-foreground font-medium">Apple Pay</span>
              </div>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 rounded-full border-4 border-rose-vif/30 border-t-rose-vif animate-spin mb-6" />
            <h3 className="font-display text-xl font-bold">Traitement en cours...</h3>
            <p className="mt-2 text-sm text-muted-foreground">Vérification de votre carte via Stripe</p>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-display text-2xl font-bold">Bienvenue dans Premium !</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre essai gratuit de {plan === "premium_monthly" ? "7" : "14"} jours commence maintenant.
            </p>
            <div className="mt-6 space-y-2 text-left rounded-2xl bg-green-50 p-4">
              {["Bloom AI illimité débloqué", "Prédictions d'ovulation activées", "Mode fertilité disponible", "Téléconsultation activée"].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-green-800">
                  <Check className="h-3.5 w-3.5 text-green-500" /> {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => { onClose(); navigate({ to: "/dashboard" }); }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-3 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
            >
              Explorer mes nouvelles fonctionnalités
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
