import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { useState } from "react";
import { Save, Mail, Shield, CreditCard, Zap, Bell } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Paramètres — Admin CycleBloom" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  const [tab, setTab] = useState<"general" | "pricing" | "emails" | "integrations" | "security">("general");

  const tabs = [
    { id: "general" as const, label: "Général" },
    { id: "pricing" as const, label: "Tarification" },
    { id: "emails" as const, label: "Emails" },
    { id: "integrations" as const, label: "Intégrations" },
    { id: "security" as const, label: "Sécurité" },
  ];

  return (
    <AdminShell title="Paramètres">
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-3 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "general" && <GeneralTab />}
      {tab === "pricing" && <PricingTab />}
      {tab === "emails" && <EmailsTab />}
      {tab === "integrations" && <IntegrationsTab />}
      {tab === "security" && <SecurityTab />}
    </AdminShell>
  );
}

function GeneralTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Informations plateforme">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom de l'app" defaultValue="CycleBloom AI" />
          <Field label="Slogan" defaultValue="Santé féminine intelligente" />
          <Field label="Email support" defaultValue="support@cyclebloom.ai" />
          <Field label="Téléphone" defaultValue="+33 6 60 06 17 23" />
          <Field label="URL du site" defaultValue="https://cycle-bloom-ia.lovable.app" />
          <Field label="Devise" defaultValue="EUR (€)" />
        </div>
      </Section>
      <Section title="Inscription">
        <Toggle label="Inscription ouverte" desc="Permettre l'inscription libre" defaultChecked />
        <Toggle label="Vérification email obligatoire" desc="Exiger la confirmation par email avant d'accéder à l'app" defaultChecked />
        <Toggle label="Onboarding 5 étapes" desc="Questionnaire santé après inscription" defaultChecked />
        <Toggle label="Mode maintenance" desc="Bloquer l'accès temporairement (page maintenance)" />
      </Section>
      <SaveButton />
    </div>
  );
}

function PricingTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Forfaits actifs (EUR)">
        <div className="rounded-xl border border-white/10 p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white">Essentiel</span>
            <span className="text-sm text-white/50">Gratuit</span>
          </div>
          <p className="text-xs text-white/40">Suivi basique, calendrier, 3 questions Bloom AI/mois, communauté lecture seule</p>
        </div>
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white">Premium Mensuel</span>
            <span className="text-sm text-rose-vif font-bold">9,99 €/mois</span>
          </div>
          <p className="text-xs text-white/40">Tous modules, Bloom AI illimité, 1 téléconsultation/mois, rapports, communauté complète</p>
          <div className="mt-2 text-[10px] text-amber-300">Essai gratuit : 7 jours</div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white">Premium Annuel</span>
            <span className="text-sm text-emerald-400 font-bold">79,99 €/an <span className="text-white/40 font-normal">(6,67 €/mois)</span></span>
          </div>
          <p className="text-xs text-white/40">Tout Premium + 3 téléconsultations/mois, historique illimité, support VIP, rapport annuel</p>
          <div className="mt-2 text-[10px] text-amber-300">Essai gratuit : 14 jours</div>
        </div>
      </Section>

      <Section title="Configuration essai gratuit">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Durée essai mensuel (jours)" defaultValue="7" type="number" />
          <Field label="Durée essai annuel (jours)" defaultValue="14" type="number" />
          <Field label="Durée essai démo pro (jours)" defaultValue="60" type="number" />
          <Field label="Jours avant rappel expiration" defaultValue="2" type="number" />
        </div>
        <Toggle label="Prolongation admin" desc="Permettre de prolonger les essais depuis le panel admin" defaultChecked />
        <Toggle label="Auto-conversion après essai" desc="Facturer automatiquement si carte enregistrée" defaultChecked />
      </Section>

      <Section title="Stripe">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price ID mensuel" defaultValue="price_premium_monthly_999" />
          <Field label="Price ID annuel" defaultValue="price_premium_yearly_7999" />
        </div>
      </Section>
      <SaveButton />
    </div>
  );
}

function EmailsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Emails automatiques — Inscription">
        <Toggle label="Email de bienvenue" desc="Envoyé immédiatement après inscription" defaultChecked />
        <Toggle label="Confirmation email (double opt-in)" desc="Lien de vérification à cliquer" defaultChecked />
        <Toggle label="Guide de démarrage (J+1)" desc="Envoyé 24h après inscription — tutoriel et astuces" defaultChecked />
      </Section>

      <Section title="Emails automatiques — Essai gratuit">
        <Toggle label="Confirmation début d'essai" desc="Email quand l'essai Premium commence" defaultChecked />
        <Toggle label="Rappel mi-parcours (J-4)" desc="Rappeler les fonctionnalités Premium à tester" defaultChecked />
        <Toggle label="Rappel fin d'essai (J-2)" desc="Prévenir que l'essai expire bientôt" defaultChecked />
        <Toggle label="Essai expiré" desc="Informer que l'essai est terminé + offre conversion" defaultChecked />
        <Toggle label="Email prolongation" desc="Notifier quand un admin prolonge l'essai" defaultChecked />
      </Section>

      <Section title="Emails automatiques — Paiement">
        <Toggle label="Confirmation paiement" desc="Reçu après chaque paiement réussi" defaultChecked />
        <Toggle label="Échec de paiement" desc="Alerter si la carte est refusée (3 tentatives)" defaultChecked />
        <Toggle label="Renouvellement à venir (J-3)" desc="Prévenir avant le prochain prélèvement" defaultChecked />
        <Toggle label="Résiliation confirmée" desc="Confirmer la résiliation + date de fin d'accès" defaultChecked />
      </Section>

      <Section title="Emails automatiques — Rétention">
        <Toggle label="Win-back (J+7 après résiliation)" desc="Offre spéciale pour revenir" defaultChecked />
        <Toggle label="Inactive depuis 7 jours" desc="Rappeler à revenir avec un conseil personnalisé" defaultChecked />
        <Toggle label="Newsletter hebdomadaire" desc="Résumé santé + article de la semaine" defaultChecked />
      </Section>

      <Section title="Emails — Démo professionnelle">
        <Toggle label="Accusé de réception demande" desc="Envoyé automatiquement à la soumission du formulaire" defaultChecked />
        <Toggle label="Email approbation + accès" desc="Identifiants et guide de démarrage pro" defaultChecked />
        <Toggle label="Rappel fin démo (J-7)" desc="Prévenir 7 jours avant la fin de la période" defaultChecked />
        <Toggle label="Fin de démo + offre partenariat" desc="Proposer un accord pro à la fin de l'essai" defaultChecked />
      </Section>

      <Section title="Alertes admin (vous recevez)">
        <Toggle label="Nouvelle inscription" desc="Notification quand une utilisatrice s'inscrit" defaultChecked />
        <Toggle label="Nouvel abonnement Premium" desc="Quand une utilisatrice passe premium" defaultChecked />
        <Toggle label="Résiliation" desc="Quand une abonnée résilie" defaultChecked />
        <Toggle label="Nouvelle demande démo" desc="Quand un professionnel demande une démo" defaultChecked />
        <Toggle label="Signalement contenu" desc="Quand un post communautaire est signalé" defaultChecked />
        <Toggle label="Échec de paiement" desc="Quand un paiement échoue" defaultChecked />
      </Section>

      <Section title="Configuration expéditeur">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom expéditeur" defaultValue="CycleBloom AI" />
          <Field label="Email expéditeur" defaultValue="noreply@cyclebloom.ai" />
          <Field label="Email réponse" defaultValue="support@cyclebloom.ai" />
          <Field label="Provider" defaultValue="Resend" />
        </div>
      </Section>
      <SaveButton />
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Paiements (Stripe)">
        <Field label="Clé publique (pk_live_)" defaultValue="pk_live_•••••••••••••••••••••" type="password" />
        <Field label="Clé secrète (sk_live_)" defaultValue="sk_live_•••••••••••••••••••••" type="password" />
        <Field label="Webhook secret (whsec_)" defaultValue="whsec_•••••••••••••••••••••" type="password" />
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 mt-2">
          <div className="text-xs text-emerald-300">✓ Stripe connecté — Mode production</div>
          <div className="text-[10px] text-white/40 mt-1">Dernière synchronisation : il y a 5 min</div>
        </div>
      </Section>

      <Section title="Email (Resend)">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Clé API" defaultValue="re_•••••••••••••••••••••" type="password" />
          <Field label="Domaine vérifié" defaultValue="cyclebloom.ai" />
        </div>
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 mt-2">
          <div className="text-xs text-emerald-300">✓ Resend connecté — 29 emails envoyés aujourd'hui</div>
        </div>
      </Section>

      <Section title="Intelligence Artificielle (Bloom AI)">
        <Field label="Clé API Anthropic" defaultValue="sk-ant-•••••••••••••••••••••" type="password" />
        <Field label="Modèle" defaultValue="claude-sonnet-4-6" />
        <Field label="Max tokens / réponse" defaultValue="1024" type="number" />
        <Toggle label="Mode enrichi (sources médicales)" desc="Inclure des références scientifiques dans les réponses" defaultChecked />
      </Section>

      <Section title="Analytics">
        <Field label="Google Analytics ID" defaultValue="G-XXXXXXXXXX" />
        <Field label="Mixpanel Token" defaultValue="mp_•••••••••••" type="password" />
        <Toggle label="Tracking actif" desc="Collecte anonymisée des données d'usage" defaultChecked />
      </Section>
      <SaveButton />
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Accès admin">
        <Field label="Email admin principal" defaultValue="lbcloudadmin@gmail.com" />
        <Field label="Mot de passe admin" defaultValue="••••••••••••••••" type="password" />
        <Toggle label="Authentification 2FA" desc="Code TOTP requis pour se connecter à l'admin" />
        <Toggle label="Session expire après 24h" desc="Déconnexion automatique après inactivité" defaultChecked />
      </Section>

      <Section title="Protection des données (RGPD)">
        <Toggle label="Chiffrement AES-256" desc="Données sensibles chiffrées au repos" defaultChecked />
        <Toggle label="Hébergement en France" desc="Serveurs Supabase EU (Paris)" defaultChecked />
        <Toggle label="Droit à l'oubli" desc="Permettre aux utilisatrices de supprimer leur compte" defaultChecked />
        <Toggle label="Export des données" desc="Permettre le téléchargement des données personnelles" defaultChecked />
        <Toggle label="Consentement cookies" desc="Bannière RGPD à la première visite" defaultChecked />
      </Section>

      <Section title="Sécurité applicative">
        <Toggle label="Rate limiting API" desc="Max 100 requêtes/minute par utilisatrice" defaultChecked />
        <Toggle label="Protection brute-force" desc="Blocage après 5 tentatives de connexion échouées" defaultChecked />
        <Toggle label="HTTPS obligatoire" desc="Redirection automatique HTTP → HTTPS" defaultChecked />
        <Toggle label="Headers sécurité (HSTS, CSP)" desc="Protection XSS et clickjacking" defaultChecked />
      </Section>
      <SaveButton />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-rose-vif/50"
      />
    </div>
  );
}

function Toggle({ label, desc, defaultChecked = false }: { label: string; desc: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div>
        <div className="text-sm text-white">{label}</div>
        <div className="text-[11px] text-white/30">{desc}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition shrink-0 ${on ? "bg-rose-vif" : "bg-white/10"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform`} style={{ transform: on ? "translateX(20px)" : "translateX(0)" }} />
      </button>
    </div>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
      <Save className="h-4 w-4" /> {saved ? "✓ Enregistré" : "Enregistrer"}
    </button>
  );
}
