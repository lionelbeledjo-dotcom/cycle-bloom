import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { useState } from "react";
import { TrendingUp, CreditCard, Users, ArrowUpRight, Clock, Crown, Mail, CalendarPlus, Eye, MoreHorizontal, Check, X, RefreshCw } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/subscriptions")({
  head: () => ({ meta: [{ title: "Abonnements — Admin CycleBloom" }] }),
  component: AdminSubscriptions,
});

type SubStatus = "active" | "trial" | "trial_expiring" | "cancelled" | "past_due";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  plan: "Premium Mensuel" | "Premium Annuel";
  amount: string;
  method: string;
  status: SubStatus;
  started: string;
  trialEnd?: string;
  nextBilling: string;
  emailSent: boolean;
}

const SUBSCRIBERS: Subscriber[] = [
  { id: 1, name: "Sophie Martin", email: "sophie.m@gmail.com", plan: "Premium Annuel", amount: "79,99 €", method: "Visa •••• 4242", status: "active", started: "2026-01-15", nextBilling: "2027-01-15", emailSent: true },
  { id: 2, name: "Léa Bernard", email: "lea.b@gmail.com", plan: "Premium Mensuel", amount: "9,99 €", method: "Mastercard •••• 8821", status: "active", started: "2026-02-08", nextBilling: "2026-07-08", emailSent: true },
  { id: 3, name: "Camille Petit", email: "camille.p@gmail.com", plan: "Premium Annuel", amount: "79,99 €", method: "Visa •••• 1234", status: "active", started: "2025-11-20", nextBilling: "2026-11-20", emailSent: true },
  { id: 4, name: "Inès Moreau", email: "ines.m@outlook.fr", plan: "Premium Annuel", amount: "79,99 €", method: "Apple Pay", status: "active", started: "2026-02-14", nextBilling: "2027-02-14", emailSent: true },
  { id: 5, name: "Clara Fontaine", email: "clara.f@icloud.com", plan: "Premium Mensuel", amount: "9,99 €", method: "Google Pay", status: "active", started: "2026-01-30", nextBilling: "2026-07-30", emailSent: true },
  { id: 6, name: "Nadia Koné", email: "nadia.k@gmail.com", plan: "Premium Mensuel", amount: "9,99 €", method: "—", status: "trial", started: "2026-06-01", trialEnd: "2026-06-08", nextBilling: "—", emailSent: true },
  { id: 7, name: "Fatou Ndiaye", email: "fatou.n@hotmail.com", plan: "Premium Mensuel", amount: "9,99 €", method: "—", status: "trial_expiring", started: "2026-05-29", trialEnd: "2026-06-05", nextBilling: "—", emailSent: true },
  { id: 8, name: "Amina Diallo", email: "amina.d@yahoo.fr", plan: "Premium Annuel", amount: "79,99 €", method: "—", status: "trial", started: "2026-06-03", trialEnd: "2026-06-17", nextBilling: "—", emailSent: true },
  { id: 9, name: "Marie Nguyen", email: "marie.ng@gmail.com", plan: "Premium Mensuel", amount: "9,99 €", method: "Visa •••• 5678", status: "cancelled", started: "2025-09-15", nextBilling: "—", emailSent: true },
  { id: 10, name: "Julie Dubois", email: "julie.dbs@outlook.fr", plan: "Premium Mensuel", amount: "9,99 €", method: "Mastercard •••• 3456", status: "past_due", started: "2026-03-22", nextBilling: "2026-06-22", emailSent: true },
  { id: 11, name: "Awa Traoré", email: "awa.t@gmail.com", plan: "Premium Mensuel", amount: "9,99 €", method: "—", status: "trial", started: "2026-06-04", trialEnd: "2026-06-11", nextBilling: "—", emailSent: true },
  { id: 12, name: "Rachida B.", email: "rachida.b@gmail.com", plan: "Premium Annuel", amount: "79,99 €", method: "—", status: "trial", started: "2026-06-02", trialEnd: "2026-06-16", nextBilling: "—", emailSent: true },
];

const revenueByMonth = [
  { month: "Jan", revenue: 1250 },
  { month: "Fév", revenue: 1680 },
  { month: "Mar", revenue: 1950 },
  { month: "Avr", revenue: 2300 },
  { month: "Mai", revenue: 2650 },
  { month: "Jun", revenue: 2950 },
];

function AdminSubscriptions() {
  const [tab, setTab] = useState<"all" | "trials" | "active" | "cancelled">("all");
  const [extendModal, setExtendModal] = useState<Subscriber | null>(null);
  const [emailModal, setEmailModal] = useState<Subscriber | null>(null);

  const filtered = tab === "all" ? SUBSCRIBERS
    : tab === "trials" ? SUBSCRIBERS.filter(s => s.status === "trial" || s.status === "trial_expiring")
    : tab === "active" ? SUBSCRIBERS.filter(s => s.status === "active")
    : SUBSCRIBERS.filter(s => s.status === "cancelled" || s.status === "past_due");

  const totalActive = SUBSCRIBERS.filter(s => s.status === "active").length;
  const totalTrials = SUBSCRIBERS.filter(s => s.status === "trial" || s.status === "trial_expiring").length;
  const mrr = totalActive * 9.99 + SUBSCRIBERS.filter(s => s.status === "active" && s.plan === "Premium Annuel").length * (79.99 / 12 - 9.99);

  return (
    <AdminShell title="Abonnements & Essais">
      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-5 mb-6">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">Abonnées actives</div>
          <div className="text-2xl font-bold text-white mt-1">{totalActive}</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400"><ArrowUpRight className="h-3 w-3" /> +41%</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">En essai gratuit</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{totalTrials}</div>
          <div className="text-[10px] text-white/30 mt-1">dont 1 expirant bientôt</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">MRR</div>
          <div className="text-2xl font-bold text-white mt-1">2 950 €</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400"><ArrowUpRight className="h-3 w-3" /> +18%</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">ARR (projection)</div>
          <div className="text-2xl font-bold text-white mt-1">35 400 €</div>
          <div className="text-[10px] text-white/30 mt-1">Objectif : 50k €</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">Conversion essai</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">23%</div>
          <div className="text-[10px] text-white/30 mt-1">7/30 derniers essais</div>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="rounded-2xl border border-white/5 bg-white/5 p-6 mb-6">
        <h3 className="text-sm font-semibold text-white mb-4">Revenus mensuels (€)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}€`} />
            <Tooltip contentStyle={{ background: "oklch(0.2 0.02 260)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} formatter={(v: number) => `${v} €`} />
            <Bar dataKey="revenue" fill="oklch(0.68 0.21 355)" radius={[6, 6, 0, 0]} name="Revenu" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "all" as const, label: "Tout", count: SUBSCRIBERS.length },
          { id: "trials" as const, label: "Essais gratuits", count: totalTrials },
          { id: "active" as const, label: "Actifs", count: totalActive },
          { id: "cancelled" as const, label: "Résiliés / Impayés", count: SUBSCRIBERS.filter(s => s.status === "cancelled" || s.status === "past_due").length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
              tab === t.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t.label} <span className="ml-1 opacity-60">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Abonnée</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Forfait</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Montant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Moyen paiement</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Statut</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Fin essai</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{s.name}</div>
                  <div className="text-[11px] text-white/40">{s.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium text-violet-300">{s.plan}</span>
                </td>
                <td className="px-4 py-3 font-medium text-white">{s.amount}</td>
                <td className="px-4 py-3 text-white/60 text-xs">{s.method}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-3 text-xs">
                  {s.trialEnd ? (
                    <span className={`${s.status === "trial_expiring" ? "text-amber-400 font-medium" : "text-white/60"}`}>
                      {new Date(s.trialEnd).toLocaleDateString("fr-FR")}
                    </span>
                  ) : (
                    <span className="text-white/20">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {s.emailSent ? (
                    <span className="text-emerald-400 text-xs">✓ Envoyé</span>
                  ) : (
                    <span className="text-red-400 text-xs">✗ Échec</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {(s.status === "trial" || s.status === "trial_expiring") && (
                      <button
                        onClick={() => setExtendModal(s)}
                        className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-amber-400 transition"
                        title="Prolonger l'essai"
                      >
                        <CalendarPlus className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setEmailModal(s)}
                      className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-blue-400 transition"
                      title="Envoyer un email"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-white transition" title="Voir le profil">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Extend trial modal */}
      {extendModal && <ExtendTrialModal subscriber={extendModal} onClose={() => setExtendModal(null)} />}
      {emailModal && <SendEmailModal subscriber={emailModal} onClose={() => setEmailModal(null)} />}
    </AdminShell>
  );
}

function StatusBadge({ status }: { status: SubStatus }) {
  const config = {
    active: { label: "Actif", class: "bg-emerald-500/20 text-emerald-300" },
    trial: { label: "Essai", class: "bg-amber-500/20 text-amber-300" },
    trial_expiring: { label: "Essai (expire bientôt)", class: "bg-orange-500/20 text-orange-300" },
    cancelled: { label: "Résiliée", class: "bg-red-500/20 text-red-300" },
    past_due: { label: "Impayé", class: "bg-red-500/20 text-red-400" },
  };
  const c = config[status];
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${c.class}`}>{c.label}</span>;
}

function ExtendTrialModal({ subscriber, onClose }: { subscriber: Subscriber; onClose: () => void }) {
  const [days, setDays] = useState("7");
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);

  const handleExtend = () => {
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-[oklch(0.18_0.02_260)] border border-white/10 p-6" onClick={e => e.stopPropagation()}>
        {!done ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <CalendarPlus className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Prolonger l'essai gratuit</h3>
                <p className="text-xs text-white/40">{subscriber.name} — {subscriber.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Fin d'essai actuelle</label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70">
                  {subscriber.trialEnd ? new Date(subscriber.trialEnd).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "—"}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Nombre de jours à ajouter</label>
                <select
                  value={days}
                  onChange={e => setDays(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-rose-vif/50"
                >
                  <option value="3">+3 jours</option>
                  <option value="7">+7 jours</option>
                  <option value="14">+14 jours</option>
                  <option value="30">+30 jours</option>
                  <option value="60">+60 jours (2 mois)</option>
                  <option value="90">+90 jours (3 mois)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Raison (optionnel)</label>
                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Ex: Cliente VIP, problème technique, promotion spéciale..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none resize-none h-20 focus:border-rose-vif/50"
                />
              </div>
              <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                <div className="text-xs text-blue-300">📧 Un email sera automatiquement envoyé à la cliente pour l'informer de la prolongation.</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-white/60 hover:bg-white/5">
                Annuler
              </button>
              <button onClick={handleExtend} className="flex-1 rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-2.5 text-sm font-semibold text-white">
                Prolonger de {days} jours
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Essai prolongé</h3>
            <p className="mt-2 text-sm text-white/60">
              L'essai de {subscriber.name} a été prolongé de {days} jours. Un email de confirmation a été envoyé.
            </p>
            <button onClick={onClose} className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm text-white hover:bg-white/15">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SendEmailModal({ subscriber, onClose }: { subscriber: Subscriber; onClose: () => void }) {
  const [template, setTemplate] = useState("custom");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const templates = [
    { id: "custom", label: "Email personnalisé" },
    { id: "welcome", label: "Bienvenue" },
    { id: "trial_reminder", label: "Rappel fin d'essai" },
    { id: "upgrade", label: "Offre Premium spéciale" },
    { id: "retention", label: "Rétention (win-back)" },
  ];

  const handleSend = () => setSent(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-[oklch(0.18_0.02_260)] border border-white/10 p-6" onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Envoyer un email</h3>
                <p className="text-xs text-white/40">À : {subscriber.name} ({subscriber.email})</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Template</label>
                <select
                  value={template}
                  onChange={e => setTemplate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-rose-vif/50"
                >
                  {templates.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Objet</label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Objet de l'email..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-rose-vif/50"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Message</label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="Contenu de l'email..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none resize-none h-32 focus:border-rose-vif/50"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-white/60 hover:bg-white/5">
                Annuler
              </button>
              <button onClick={handleSend} className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-violet-doux py-2.5 text-sm font-semibold text-white">
                Envoyer l'email
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Email envoyé !</h3>
            <p className="mt-2 text-sm text-white/60">L'email a été envoyé à {subscriber.email}.</p>
            <button onClick={onClose} className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm text-white hover:bg-white/15">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
