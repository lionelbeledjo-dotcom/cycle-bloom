import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { TrendingUp, DollarSign, Users, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/subscriptions")({
  head: () => ({ meta: [{ title: "Abonnements — Admin CycleBloom" }] }),
  component: AdminSubscriptions,
});

const SUBSCRIBERS = [
  { id: 1, name: "Sophie Martin", email: "sophie.m@gmail.com", plan: "Business", amount: 4900, method: "Carte", status: "active", started: "2025-01-15", next: "2025-07-15" },
  { id: 2, name: "Léa Bernard", email: "lea.b@gmail.com", plan: "Starter", amount: 2900, method: "Mobile Money", status: "active", started: "2025-02-08", next: "2025-07-08" },
  { id: 3, name: "Camille Petit", email: "camille.p@gmail.com", plan: "Business", amount: 4900, method: "Carte", status: "active", started: "2024-11-20", next: "2025-07-20" },
  { id: 4, name: "Inès Moreau", email: "ines.m@outlook.fr", plan: "Premium+", amount: 9900, method: "Carte", status: "active", started: "2025-02-14", next: "2025-07-14" },
  { id: 5, name: "Clara Fontaine", email: "clara.f@icloud.com", plan: "Business", amount: 4900, method: "Apple Pay", status: "active", started: "2025-01-30", next: "2025-07-30" },
  { id: 6, name: "Nadia Koné", email: "nadia.k@gmail.com", plan: "Starter", amount: 2900, method: "Mobile Money", status: "trial", started: "2025-06-01", next: "2025-06-15" },
  { id: 7, name: "Marie Nguyen", email: "marie.ng@gmail.com", plan: "Business", amount: 4900, method: "Carte", status: "cancelled", started: "2024-09-15", next: "—" },
];

const revenueByPlan = [
  { plan: "Starter", revenue: 145000, count: 50 },
  { plan: "Business", revenue: 882000, count: 180 },
  { plan: "Premium+", revenue: 448000, count: 65 },
];

function AdminSubscriptions() {
  const active = SUBSCRIBERS.filter(s => s.status === "active").length;
  const mrr = SUBSCRIBERS.filter(s => s.status === "active").reduce((s, sub) => s + sub.amount, 0);

  return (
    <AdminShell title="Abonnements">
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Abonnées actives</span>
            <Users className="h-4 w-4 text-white/20" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">295</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400"><ArrowUpRight className="h-3 w-3" /> +41%</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">MRR</span>
            <TrendingUp className="h-4 w-4 text-white/20" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">1 475 000 FCFA</div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400"><ArrowUpRight className="h-3 w-3" /> +18%</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">ARR</span>
            <DollarSign className="h-4 w-4 text-white/20" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">17.7M FCFA</div>
          <div className="text-[10px] text-white/30 mt-1">Projection annuelle</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">ARPU</span>
            <DollarSign className="h-4 w-4 text-white/20" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">5 000 FCFA</div>
          <div className="text-[10px] text-white/30 mt-1">Revenu moyen / user</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Revenus par forfait</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueByPlan}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="plan" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "oklch(0.2 0.02 260)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} formatter={(v: number) => `${v.toLocaleString()} FCFA`} />
              <Bar dataKey="revenue" fill="oklch(0.68 0.21 355)" radius={[6, 6, 0, 0]} name="Revenu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Répartition</h3>
          <div className="space-y-4">
            {revenueByPlan.map(p => (
              <div key={p.plan}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{p.plan}</span>
                  <span className="text-white/40">{p.count} abonnées</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux" style={{ width: `${(p.count / 295) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Abonnée</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Forfait</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Montant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Méthode</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Statut</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Prochaine fact.</th>
            </tr>
          </thead>
          <tbody>
            {SUBSCRIBERS.map((s) => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{s.name}</div>
                  <div className="text-[11px] text-white/40">{s.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium text-violet-300">{s.plan}</span>
                </td>
                <td className="px-4 py-3 font-medium text-white">{s.amount.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-white/60">{s.method}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    s.status === "active" ? "bg-emerald-500/20 text-emerald-300" :
                    s.status === "trial" ? "bg-amber-500/20 text-amber-300" :
                    "bg-red-500/20 text-red-300"
                  }`}>
                    {s.status === "active" ? "Actif" : s.status === "trial" ? "Essai" : "Résiliée"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40">{s.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
