import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { useState } from "react";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Paramètres — Admin CycleBloom" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  const [tab, setTab] = useState<"general" | "pricing" | "notifications" | "integrations">("general");

  const tabs = [
    { id: "general" as const, label: "Général" },
    { id: "pricing" as const, label: "Tarification" },
    { id: "notifications" as const, label: "Notifications" },
    { id: "integrations" as const, label: "Intégrations" },
  ];

  return (
    <AdminShell title="Paramètres">
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-3">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "general" && <GeneralTab />}
      {tab === "pricing" && <PricingTab />}
      {tab === "notifications" && <NotificationsTab />}
      {tab === "integrations" && <IntegrationsTab />}
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
        </div>
      </Section>
      <Section title="Sécurité">
        <Toggle label="Inscription ouverte" desc="Permettre l'inscription libre" defaultChecked />
        <Toggle label="Vérification email" desc="Exiger la confirmation par email" defaultChecked />
        <Toggle label="Mode maintenance" desc="Bloquer l'accès temporairement" />
      </Section>
      <SaveButton />
    </div>
  );
}

function PricingTab() {
  const plans = [
    { name: "Starter", price: "2 900", features: "Suivi basique, calendrier, 3 questions IA/jour" },
    { name: "Business", price: "4 900", features: "Tous modules, IA illimitée, rapports PDF, communauté" },
    { name: "Premium+", price: "9 900", features: "Tout + coaching personnalisé, accès anticipé, support prioritaire" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Forfaits actifs">
        {plans.map(p => (
          <div key={p.name} className="rounded-xl border border-white/10 p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white">{p.name}</span>
              <span className="text-sm text-rose-vif font-bold">{p.price} FCFA/mois</span>
            </div>
            <p className="text-xs text-white/40">{p.features}</p>
          </div>
        ))}
      </Section>
      <Section title="Essai gratuit">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Durée (jours)" defaultValue="7" type="number" />
          <Field label="Suspension après (jours impayé)" defaultValue="3" type="number" />
        </div>
      </Section>
      <SaveButton />
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Alertes admin">
        <Toggle label="Nouvelle inscription" desc="Notification quand une utilisatrice s'inscrit" defaultChecked />
        <Toggle label="Nouvel abonnement" desc="Quand une utilisatrice passe premium" defaultChecked />
        <Toggle label="Résiliation" desc="Quand une abonnée résilie" defaultChecked />
        <Toggle label="Signalement contenu" desc="Quand un post communautaire est signalé" defaultChecked />
      </Section>
      <Section title="Emails automatiques">
        <Toggle label="Email de bienvenue" desc="Envoyé à chaque nouvelle inscription" defaultChecked />
        <Toggle label="Rappel essai expirant" desc="J-2 avant fin de l'essai gratuit" defaultChecked />
        <Toggle label="Newsletter hebdo" desc="Résumé santé personnalisé" defaultChecked />
      </Section>
      <SaveButton />
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Paiements">
        <Field label="Clé Stripe (live)" defaultValue="sk_live_•••••••••••" type="password" />
        <Field label="Clé CinetPay (Mobile Money)" defaultValue="ci_•••••••••••" type="password" />
      </Section>
      <Section title="Email">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Provider" defaultValue="Resend" />
          <Field label="Clé API" defaultValue="re_•••••••••••" type="password" />
        </div>
      </Section>
      <Section title="IA">
        <Field label="Clé OpenAI / Anthropic" defaultValue="sk-•••••••••••" type="password" />
        <Field label="Modèle" defaultValue="claude-sonnet-4-6" />
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
        className={`relative h-6 w-11 rounded-full transition ${on ? "bg-rose-vif" : "bg-white/10"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5.5 left-0.5" : "left-0.5"}`} style={{ transform: on ? "translateX(20px)" : "translateX(0)" }} />
      </button>
    </div>
  );
}

function SaveButton() {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom">
      <Save className="h-4 w-4" /> Enregistrer
    </button>
  );
}
