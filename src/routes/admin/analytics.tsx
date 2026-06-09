import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Admin CycleBloom" }] }),
  component: AdminAnalytics,
});

const dailyActive = [
  { day: "Lun", users: 980 }, { day: "Mar", users: 1150 }, { day: "Mer", users: 1280 },
  { day: "Jeu", users: 1100 }, { day: "Ven", users: 1350 }, { day: "Sam", users: 890 }, { day: "Dim", users: 750 },
];

const featureUsage = [
  { feature: "Calendrier", usage: 89 },
  { feature: "Symptômes", usage: 72 },
  { feature: "Bloom AI", usage: 65 },
  { feature: "Magazine", usage: 58 },
  { feature: "Rapports", usage: 42 },
  { feature: "Communauté", usage: 35 },
];

const retention = [
  { week: "S1", rate: 100 }, { week: "S2", rate: 78 }, { week: "S3", rate: 65 },
  { week: "S4", rate: 58 }, { week: "S5", rate: 52 }, { week: "S6", rate: 48 },
  { week: "S7", rate: 45 }, { week: "S8", rate: 43 },
];

const ageDistribution = [
  { name: "18-24", value: 28, color: "oklch(0.68 0.21 355)" },
  { name: "25-34", value: 42, color: "oklch(0.58 0.18 295)" },
  { name: "35-44", value: 20, color: "oklch(0.85 0.08 350)" },
  { name: "45+", value: 10, color: "oklch(0.95 0.025 295)" },
];

function AdminAnalytics() {
  return (
    <AdminShell title="Analytics">
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        <MiniStat label="Sessions / jour" value="4 200" />
        <MiniStat label="Durée moy. session" value="8m 42s" />
        <MiniStat label="Pages / session" value="5.3" />
        <MiniStat label="Taux rebond" value="18%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Utilisatrices actives (7 jours)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyActive}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "oklch(0.2 0.02 260)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
              <Bar dataKey="users" fill="oklch(0.68 0.21 355)" radius={[6, 6, 0, 0]} name="Actives" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Rétention (cohorte)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={retention}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ background: "oklch(0.2 0.02 260)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="oklch(0.58 0.18 295)" strokeWidth={2.5} dot={{ fill: "oklch(0.58 0.18 295)" }} name="Rétention" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Utilisation des fonctionnalités (%)</h3>
          <div className="space-y-3">
            {featureUsage.map(f => (
              <div key={f.feature}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{f.feature}</span>
                  <span className="text-white/40">{f.usage}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux" style={{ width: `${f.usage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Distribution par âge</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={ageDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                  {ageDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {ageDistribution.map(a => (
                <div key={a.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full" style={{ background: a.color }} />
                  <span className="text-xs text-white/70">{a.name} ans</span>
                  <span className="text-xs font-semibold text-white">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
      <div className="text-xs text-white/40">{label}</div>
      <div className="mt-1 text-xl font-bold text-white">{value}</div>
    </div>
  );
}
