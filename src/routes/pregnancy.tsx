import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Baby, Heart, Calendar, Activity, Scale, AlertTriangle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/pregnancy")({
  head: () => ({ meta: [{ title: "Grossesse — CycleBloom AI" }] }),
  component: Pregnancy,
});

const weightData = [
  { week: 6, weight: 58 }, { week: 8, weight: 58.5 }, { week: 10, weight: 59.2 },
  { week: 12, weight: 59.8 }, { week: 14, weight: 60.5 }, { week: 16, weight: 61.3 },
  { week: 18, weight: 62.1 }, { week: 20, weight: 63 },
];

const FRUIT_SIZES = [
  { week: 8, fruit: "🫐", name: "Myrtille", size: "1.6 cm" },
  { week: 12, fruit: "🍑", name: "Prune", size: "5.4 cm" },
  { week: 16, fruit: "🍋", name: "Citron", size: "11.6 cm" },
  { week: 20, fruit: "🍌", name: "Banane", size: "25 cm" },
  { week: 24, fruit: "🌽", name: "Épi de maïs", size: "30 cm" },
  { week: 28, fruit: "🍆", name: "Aubergine", size: "37 cm" },
  { week: 32, fruit: "🥥", name: "Noix de coco", size: "42 cm" },
  { week: 36, fruit: "🍉", name: "Melon", size: "47 cm" },
  { week: 40, fruit: "🎃", name: "Citrouille", size: "51 cm" },
];

const APPOINTMENTS = [
  { date: "15 juin 2025", type: "Échographie T2", doctor: "Dr. Lefèvre", done: false },
  { date: "28 juin 2025", type: "Consultation mensuelle", doctor: "Sage-femme Léna", done: false },
  { date: "1 mai 2025", type: "Échographie T1", doctor: "Dr. Lefèvre", done: true },
  { date: "15 avr 2025", type: "Prise de sang", doctor: "Labo Cerba", done: true },
];

const SYMPTOMS_TO_WATCH = [
  "Saignements vaginaux",
  "Douleurs abdominales intenses",
  "Maux de tête sévères",
  "Vision floue",
  "Gonflement soudain visage/mains",
  "Diminution des mouvements du bébé",
];

function Pregnancy() {
  const currentWeek = 20;
  const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;
  const dueDate = "15 octobre 2025";
  const daysLeft = 140;
  const currentFruit = FRUIT_SIZES.reduce((prev, curr) => curr.week <= currentWeek ? curr : prev, FRUIT_SIZES[0]);

  return (
    <AppShell title="Mode Grossesse">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Week counter */}
        <div className="rounded-3xl border border-white/70 glass p-8 shadow-bloom lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] items-center">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest text-violet-doux">Semaine</div>
              <div className="font-display text-7xl font-bold text-gradient-bloom">{currentWeek}</div>
              <div className="text-xs text-muted-foreground">Trimestre {trimester}/3</div>
            </div>
            <div>
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Début</span>
                  <span>Terme ({dueDate})</span>
                </div>
                <div className="h-3 rounded-full bg-lavande overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux transition-all"
                    style={{ width: `${(currentWeek / 40) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/70 p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Restant</div>
                  <div className="font-display text-lg font-bold text-rose-vif">{daysLeft}j</div>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Trimestre</div>
                  <div className="font-display text-lg font-bold text-violet-doux">{trimester}</div>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Poids bébé</div>
                  <div className="font-display text-lg font-bold text-violet-doux">~300g</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Baby size */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom text-center">
          <div className="text-[10px] uppercase tracking-widest text-violet-doux mb-2">Taille du bébé</div>
          <div className="text-7xl my-4">{currentFruit.fruit}</div>
          <div className="font-display text-xl font-bold">{currentFruit.name}</div>
          <div className="text-sm text-muted-foreground">{currentFruit.size}</div>
          <div className="mt-4 flex justify-center gap-1">
            {FRUIT_SIZES.map((f, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${f.week <= currentWeek ? "bg-rose-vif" : "bg-lavande"}`}
              />
            ))}
          </div>
        </div>

        {/* Weight chart */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-4 w-4 text-violet-doux" />
            <h3 className="font-display text-lg font-semibold">Suivi du poids</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--lavande)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} label={{ value: "Semaine", position: "insideBottom", offset: -5, fontSize: 10 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} domain={[56, 65]} unit=" kg" />
              <Tooltip contentStyle={{ background: "white", border: "1px solid var(--border)", borderRadius: 16 }} formatter={(v: number) => `${v} kg`} />
              <Line type="monotone" dataKey="weight" stroke="var(--rose-vif)" strokeWidth={2.5} dot={{ fill: "var(--rose-vif)", r: 4 }} name="Poids" />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-2 text-[11px] text-muted-foreground">Prise de poids totale : +5 kg (recommandé : +5 à +8 kg à 20 SA)</p>
        </div>

        {/* Kick counter */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-6 text-white shadow-bloom">
          <div className="flex items-center gap-2 mb-3">
            <Baby className="h-5 w-5" />
            <h3 className="font-display text-lg font-bold">Compteur de coups</h3>
          </div>
          <p className="text-sm text-white/80 mb-4">Comptez les mouvements de bébé sur 1 heure</p>
          <div className="text-center">
            <div className="font-display text-5xl font-bold">7</div>
            <div className="text-xs text-white/60 mt-1">mouvements</div>
          </div>
          <button className="mt-4 w-full rounded-2xl bg-white/20 py-3 text-sm font-semibold backdrop-blur hover:bg-white/30 transition">
            + Ajouter un mouvement
          </button>
        </div>

        {/* Appointments */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-violet-doux" />
            <h3 className="font-display text-lg font-semibold">Rendez-vous</h3>
          </div>
          <div className="space-y-3">
            {APPOINTMENTS.map((a, i) => (
              <div key={i} className={`flex items-start gap-3 ${a.done ? "opacity-50" : ""}`}>
                <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${a.done ? "bg-emerald-400" : "bg-rose-vif"}`} />
                <div>
                  <div className="text-xs font-semibold">{a.type}</div>
                  <div className="text-[10px] text-muted-foreground">{a.date} · {a.doctor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms to watch */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h3 className="font-display text-lg font-semibold">Symptômes à surveiller</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Consultez immédiatement si vous ressentez :</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SYMPTOMS_TO_WATCH.map(s => (
              <div key={s} className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-xs font-medium text-amber-800">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
