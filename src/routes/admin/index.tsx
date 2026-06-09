import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { Users, TrendingUp, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — CycleBloom AI" }] }),
  component: AdminDashboard,
});

const growthData = [
  { month: "Jan", users: 420, premium: 38 },
  { month: "Fév", users: 680, premium: 62 },
  { month: "Mar", users: 1050, premium: 98 },
  { month: "Avr", users: 1480, premium: 145 },
  { month: "Mai", users: 2100, premium: 210 },
  { month: "Jun", users: 2850, premium: 295 },
];

const recentActivity = [
  { text: "Nouvelle premium: Sophie Martin (Business)", time: "Il y a 12 min", type: "payment" },
  { text: "Inscription: Julie Dubois (Paris)", time: "Il y a 28 min", type: "signup" },
  { text: "Article publié: 'Yoga et cycle menstruel'", time: "Il y a 1h", type: "content" },
  { text: "Nouvelle premium: Léa Bernard (Starter)", time: "Il y a 2h", type: "payment" },
  { text: "Signalement communauté: spam", time: "Il y a 3h", type: "alert" },
  { text: "Inscription: Amina Diallo (Lyon)", time: "Il y a 4h", type: "signup" },
  { text: "Résiliation: Marie Nguyen", time: "Il y a 5h", type: "churn" },
];

function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Utilisatrices" value="2 850" change="+35%" up />
        <StatCard icon={Activity} label="Actives aujourd'hui" value="1 204" change="+12%" up />
        <StatCard icon={CreditCard} label="Abonnées Premium" value="295" change="+41%" up />
        <StatCard icon={TrendingUp} label="MRR" value="1 475 000 FCFA" change="+18%" up />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Croissance utilisatrices (6 mois)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "oklch(0.2 0.02 260)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
              <Line type="monotone" dataKey="users" stroke="oklch(0.68 0.21 355)" strokeWidth={2.5} dot={{ fill: "oklch(0.68 0.21 355)" }} name="Total" />
              <Line type="monotone" dataKey="premium" stroke="oklch(0.58 0.18 295)" strokeWidth={2.5} dot={{ fill: "oklch(0.58 0.18 295)" }} name="Premium" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Activité récente</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                  a.type === "payment" ? "bg-emerald-400" :
                  a.type === "signup" ? "bg-blue-400" :
                  a.type === "content" ? "bg-violet-400" :
                  a.type === "churn" ? "bg-red-400" :
                  "bg-amber-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/80 truncate">{a.text}</div>
                  <div className="text-[10px] text-white/30">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat label="Taux de conversion" value="10.3%" desc="Essai → Premium" />
        <MiniStat label="Churn rate" value="2.1%" desc="Ce mois" />
        <MiniStat label="Sessions/jour" value="4 200" desc="Moyenne 7j" />
        <MiniStat label="NPS" value="72" desc="Excellent" />
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
