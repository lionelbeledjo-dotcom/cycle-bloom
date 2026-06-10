import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { Users, TrendingUp, CreditCard, Activity, ArrowUpRight, ArrowDownRight, Mail, Clock, Crown, AlertTriangle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — CycleBloom AI" }] }),
  component: AdminDashboard,
});

const growthData = [
  { month: "Jan", users: 420, premium: 38, revenue: 380 },
  { month: "Fév", users: 680, premium: 62, revenue: 620 },
  { month: "Mar", users: 1050, premium: 98, revenue: 980 },
  { month: "Avr", users: 1480, premium: 145, revenue: 1450 },
  { month: "Mai", users: 2100, premium: 210, revenue: 2100 },
  { month: "Jun", users: 2850, premium: 295, revenue: 2950 },
];

const recentActivity = [
  { text: "Nouvelle premium: Sophie Martin (Annuel)", time: "Il y a 12 min", type: "payment" },
  { text: "Inscription: Julie Dubois (Paris) — email envoyé ✓", time: "Il y a 28 min", type: "signup" },
  { text: "Essai démarré: Léa Bernard (7 jours)", time: "Il y a 45 min", type: "trial" },
  { text: "Demande démo pro: Dr. Claire Martin (CHU Lyon)", time: "Il y a 1h", type: "demo" },
  { text: "Paiement reçu: 79,99 € — Clara Fontaine", time: "Il y a 2h", type: "payment" },
  { text: "Essai expirant dans 2j: Nadia Koné", time: "Il y a 3h", type: "alert" },
  { text: "Inscription: Amina Diallo (Lyon) — email envoyé ✓", time: "Il y a 4h", type: "signup" },
  { text: "Résiliation: Marie Nguyen — email de rétention envoyé", time: "Il y a 5h", type: "churn" },
  { text: "Demande démo pro: Sage-femme Aminata K. (Bordeaux)", time: "Il y a 6h", type: "demo" },
  { text: "Conversion essai → premium: Fatou Ndiaye", time: "Il y a 7h", type: "payment" },
];

const emailsToday = [
  { type: "Bienvenue", count: 12, icon: "📩" },
  { type: "Confirmation essai", count: 5, icon: "🔑" },
  { type: "Rappel fin essai (J-2)", count: 3, icon: "⏰" },
  { type: "Paiement confirmé", count: 8, icon: "✅" },
  { type: "Rétention (résiliation)", count: 1, icon: "💌" },
];

function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Utilisatrices" value="2 850" change="+35%" up />
        <StatCard icon={Crown} label="Abonnées Premium" value="295" change="+41%" up />
        <StatCard icon={CreditCard} label="MRR" value="2 950 €" change="+18%" up />
        <StatCard icon={Clock} label="En essai gratuit" value="47" change="+8" up />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Croissance & Revenus (6 mois)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "oklch(0.2 0.02 260)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
              <Line type="monotone" dataKey="users" stroke="oklch(0.68 0.21 355)" strokeWidth={2.5} dot={{ fill: "oklch(0.68 0.21 355)" }} name="Utilisatrices" />
              <Line type="monotone" dataKey="premium" stroke="oklch(0.58 0.18 295)" strokeWidth={2.5} dot={{ fill: "oklch(0.58 0.18 295)" }} name="Premium" />
              <Line type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} dot={{ fill: "#34d399" }} name="Revenus (€)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Activité récente</h3>
          <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                  a.type === "payment" ? "bg-emerald-400" :
                  a.type === "signup" ? "bg-blue-400" :
                  a.type === "trial" ? "bg-amber-400" :
                  a.type === "demo" ? "bg-violet-400" :
                  a.type === "churn" ? "bg-red-400" :
                  "bg-orange-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/80 leading-snug">{a.text}</div>
                  <div className="text-[10px] text-white/30">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emails & Key metrics */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4 text-white/40" />
            <h3 className="text-sm font-semibold text-white">Emails envoyés aujourd'hui</h3>
          </div>
          <div className="space-y-3">
            {emailsToday.map(e => (
              <div key={e.type} className="flex items-center justify-between">
                <span className="text-xs text-white/70">{e.icon} {e.type}</span>
                <span className="text-xs font-bold text-white">{e.count}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/5 flex justify-between">
              <span className="text-xs font-medium text-white/50">Total</span>
              <span className="text-sm font-bold text-emerald-400">{emailsToday.reduce((s, e) => s + e.count, 0)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Demandes démo pro</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-xs text-white/60">En attente</span><span className="text-sm font-bold text-amber-400">4</span></div>
            <div className="flex justify-between"><span className="text-xs text-white/60">Approuvées ce mois</span><span className="text-sm font-bold text-emerald-400">12</span></div>
            <div className="flex justify-between"><span className="text-xs text-white/60">Total actives</span><span className="text-sm font-bold text-white">28</span></div>
          </div>
          <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="text-[10px] font-medium text-amber-300">⚠️ 4 demandes en attente de validation</div>
          </div>
        </div>

        <div className="space-y-4">
          <MiniStat label="Taux conversion essai → premium" value="23%" desc="Objectif : 25%" />
          <MiniStat label="Churn mensuel" value="2.1%" desc="En baisse ↓" />
          <MiniStat label="LTV moyenne" value="89 €" desc="Premium annuel" />
          <MiniStat label="NPS" value="72" desc="Excellent" />
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-amber-300">Actions requises</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-xs text-white/70">Essais expirant sous 48h</div>
            <div className="text-lg font-bold text-white mt-1">7</div>
            <div className="text-[10px] text-white/30">Email rappel envoyé automatiquement</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-xs text-white/70">Paiements échoués</div>
            <div className="text-lg font-bold text-white mt-1">2</div>
            <div className="text-[10px] text-white/30">Relance automatique dans 24h</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-xs text-white/70">Signalements communauté</div>
            <div className="text-lg font-bold text-white mt-1">1</div>
            <div className="text-[10px] text-white/30">En attente de modération</div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({ icon: Icon, label, value, change, up }: { icon: any; label: string; value: string; change: string; up: boolean }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">{label}</span>
        <Icon className="h-4 w-4 text-white/20" />
      </div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      <div className={`mt-1 flex items-center gap-1 text-xs ${up ? "text-emerald-400" : "text-red-400"}`}>
        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {change}
      </div>
    </div>
  );
}

function MiniStat({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
      <div className="text-xs text-white/40">{label}</div>
      <div className="mt-1 text-xl font-bold text-white">{value}</div>
      <div className="text-[10px] text-white/30">{desc}</div>
    </div>
  );
}
