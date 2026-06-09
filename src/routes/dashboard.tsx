import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CycleRing } from "@/components/CycleRing";
import { Sparkles, Droplet, Flower, Activity, TrendingUp, Heart } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — CycleBloom AI" },
      { name: "description", content: "Votre tableau de bord personnel : cycle, prédictions et conseils." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const today = new Date();
  const formatted = today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <AppShell>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-violet-doux">{formatted}</div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Bonjour, Camille ✨</h1>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-violet-doux shadow-sm backdrop-blur sm:flex">
          <Sparkles className="h-3.5 w-3.5" /> Confiance IA : 98%
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cycle ring card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/70 glass p-8 shadow-bloom lg:col-span-2">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-violet-doux">Phase actuelle</div>
              <h2 className="mt-2 font-display text-3xl font-bold">Fenêtre fertile</h2>
              <p className="mt-3 max-w-xs text-sm text-foreground/70">
                Vous êtes au cœur de votre période la plus fertile. Pic d'œstrogènes et d'énergie attendu.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-xs">
                <MiniStat icon={Droplet} label="Prochaines règles" value="dans 9 j" tint="rose" />
                <MiniStat icon={Flower} label="Ovulation" value="demain" tint="violet" />
                <MiniStat icon={Activity} label="Cycle moyen" value="28 j" tint="rose" />
                <MiniStat icon={Heart} label="Fertilité" value="Haute" tint="violet" />
              </div>
            </div>
            <CycleRing day={14} cycleLength={28} />
          </div>
          <p className="mt-6 text-[11px] italic text-muted-foreground">
            Prédiction basée sur les données enregistrées. Ne constitue pas un diagnostic médical.
          </p>
        </div>

        {/* Bloom AI card */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-8 text-white shadow-bloom">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Bloom AI</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold leading-tight">
            "Profitez de ce pic d'énergie pour bouger, Camille."
          </h3>
          <p className="mt-3 text-sm text-white/85">
            Pendant la fenêtre fertile, la testostérone et les œstrogènes augmentent. Idéal pour les entraînements intenses et les projets créatifs.
          </p>
          <button className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-rose-vif transition hover:scale-[1.02]">
            Discuter avec Bloom →
          </button>
        </div>

        {/* Symptoms quick log */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold">Comment vous sentez-vous ?</h3>
          <p className="text-xs text-muted-foreground">Touchez pour enregistrer</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["🌸 Bien", "😴 Fatiguée", "🌧 Triste", "🔥 Énergique", "💢 Irritée", "🤕 Maux de tête", "🥴 Crampes", "✨ Motivée"].map((s) => (
              <button
                key={s}
                className="rounded-full border border-border bg-white/80 px-3.5 py-1.5 text-xs font-medium transition hover:border-rose-vif hover:text-rose-vif"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Trend card */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Tendance 6 mois</h3>
            <TrendingUp className="h-4 w-4 text-violet-doux" />
          </div>
          <Sparkline />
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Mai</span><span>Juin</span><span>Juil</span><span>Août</span><span>Sept</span><span>Oct</span>
          </div>
          <p className="mt-4 text-xs text-foreground/70">
            Cycle stable autour de <span className="font-semibold text-violet-doux">28 jours</span>.
          </p>
        </div>

        {/* Article suggestion */}
        <div className="overflow-hidden rounded-3xl border border-white/70 glass shadow-bloom">
          <div className="h-32 bg-gradient-to-br from-rose-poudre to-lavande" />
          <div className="p-6">
            <div className="text-[10px] uppercase tracking-widest text-violet-doux">Magazine · Fertilité</div>
            <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
              5 signes que vous êtes en pleine ovulation
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">3 min de lecture · Dr. Léa Bernard</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof Droplet;
  label: string;
  value: string;
  tint: "rose" | "violet";
}) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className={`h-3 w-3 ${tint === "rose" ? "text-rose-vif" : "text-violet-doux"}`} />
        {label}
      </div>
      <div className={`mt-1 font-display text-lg font-bold ${tint === "rose" ? "text-rose-vif" : "text-violet-doux"}`}>
        {value}
      </div>
    </div>
  );
}

function Sparkline() {
  const pts = [28, 29, 27, 28, 30, 28];
  const max = 32, min = 24;
  const w = 240, h = 70;
  const step = w / (pts.length - 1);
  const y = (v: number) => h - ((v - min) / (max - min)) * h;
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-20 w-full">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--rose-vif)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--rose-vif)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#grad)" />
      <path d={d} fill="none" stroke="var(--rose-vif)" strokeWidth={2.5} strokeLinecap="round" />
      {pts.map((v, i) => (
        <circle key={i} cx={i * step} cy={y(v)} r={3} fill="white" stroke="var(--rose-vif)" strokeWidth={2} />
      ))}
    </svg>
  );
}
