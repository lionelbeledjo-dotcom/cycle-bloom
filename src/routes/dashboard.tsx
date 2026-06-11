import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CycleRing } from "@/components/CycleRing";
import { Sparkles, Droplet, Flower, Activity, TrendingUp, Heart, Calendar, Bell, AlertTriangle, Stethoscope } from "lucide-react";
import { getUserName, getCycleDay, getCycleData, getNextPeriodDate, getOvulationDay } from "@/lib/user-store";

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
  const userName = getUserName();
  const cycleDay = getCycleDay();
  const { cycleLength } = getCycleData();
  const nextPeriod = getNextPeriodDate();
  const ovulationDay = getOvulationDay();
  const daysUntilPeriod = Math.max(0, Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const daysUntilOvulation = Math.max(0, ovulationDay - cycleDay);

  const phase = cycleDay <= 5 ? "Règles" : cycleDay <= ovulationDay - 3 ? "Phase folliculaire" : cycleDay <= ovulationDay + 1 ? "Fenêtre fertile" : "Phase lutéale";
  const phaseDesc = cycleDay <= 5
    ? "Période menstruelle. Reposez-vous et restez hydratée."
    : cycleDay <= ovulationDay - 3
    ? "Votre corps se prépare à l'ovulation. Énergie en hausse."
    : cycleDay <= ovulationDay + 1
    ? "Vous êtes au coeur de votre période la plus fertile. Pic d'oestrogènes et d'énergie."
    : "Phase post-ovulation. Progestérone en hausse, préparez-vous au SPM.";

  const fertility = cycleDay >= ovulationDay - 3 && cycleDay <= ovulationDay + 1 ? "Haute" : cycleDay <= 5 ? "Très basse" : "Basse";

  return (
    <AppShell>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-violet-doux">{formatted}</div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Bonjour, {userName}</h1>
        </div>
        <Link to="/bloom-ai" className="hidden items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-violet-doux shadow-sm backdrop-blur sm:flex hover:bg-white transition">
          <Sparkles className="h-3.5 w-3.5" /> Confiance IA : 98%
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cycle ring card */}
        <Link to="/calendar" className="relative overflow-hidden rounded-3xl border border-white/70 glass p-8 shadow-bloom lg:col-span-2 hover:-translate-y-0.5 transition cursor-pointer block">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-violet-doux">Phase actuelle · Jour {cycleDay}</div>
              <h2 className="mt-2 font-display text-3xl font-bold">{phase}</h2>
              <p className="mt-3 max-w-xs text-sm text-foreground/70">{phaseDesc}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-xs">
                <MiniStat icon={Droplet} label="Prochaines règles" value={`dans ${daysUntilPeriod} j`} tint="rose" />
                <MiniStat icon={Flower} label="Ovulation" value={daysUntilOvulation === 0 ? "Aujourd'hui" : daysUntilOvulation === 1 ? "Demain" : `dans ${daysUntilOvulation} j`} tint="violet" />
                <MiniStat icon={Activity} label="Cycle moyen" value={`${cycleLength} j`} tint="rose" />
                <MiniStat icon={Heart} label="Fertilité" value={fertility} tint="violet" />
              </div>
            </div>
            <CycleRing day={cycleDay} cycleLength={cycleLength} />
          </div>
        </Link>

        {/* Bloom AI card */}
        <Link to="/bloom-ai" className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-8 text-white shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Bloom AI</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold leading-tight">
            "Profitez de ce pic d'énergie pour bouger, Camille."
          </h3>
          <p className="mt-3 text-sm text-white/85">
            Pendant la fenêtre fertile, la testostérone et les oestrogènes augmentent. Idéal pour les entraînements intenses.
          </p>
          <span className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-rose-vif">
            Discuter avec Bloom →
          </span>
        </Link>

        {/* Quick actions */}
        <Link to="/symptoms" className="rounded-3xl border border-white/70 glass p-6 shadow-bloom hover:-translate-y-0.5 transition block">
          <h3 className="font-display text-lg font-semibold">Comment vous sentez-vous ?</h3>
          <p className="text-xs text-muted-foreground">Touchez pour enregistrer vos symptômes</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["🌸 Bien", "😴 Fatiguée", "🌧 Triste", "🔥 Énergique", "💢 Irritée", "🤕 Maux de tête", "🥴 Crampes", "✨ Motivée"].map((s) => (
              <span key={s} className="rounded-full border border-border bg-white/80 px-3.5 py-1.5 text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </Link>

        {/* Trend card */}
        <Link to="/insights" className="rounded-3xl border border-white/70 glass p-6 shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Tendance 6 mois</h3>
            <TrendingUp className="h-4 w-4 text-violet-doux" />
          </div>
          <Sparkline />
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Jun</span>
          </div>
          <p className="mt-4 text-xs text-foreground/70">
            Cycle stable autour de <span className="font-semibold text-violet-doux">28 jours</span>. Voir le rapport complet →
          </p>
        </Link>

        {/* Doctor consultation */}
        <Link to="/doctors" className="rounded-3xl border border-white/70 glass p-6 shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="h-5 w-5 text-rose-vif" />
            <h3 className="font-display text-lg font-semibold">Consulter un médecin</h3>
          </div>
          <p className="text-xs text-foreground/70 mb-3">Téléconsultation gynécologique disponible 24h/24 dans votre pays.</p>
          <span className="rounded-full bg-rose-vif/10 px-3 py-1.5 text-xs font-semibold text-rose-vif">
            Prendre rendez-vous →
          </span>
        </Link>

        {/* Reminders */}
        <Link to="/reminders" className="rounded-3xl border border-white/70 glass p-6 shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-5 w-5 text-violet-doux" />
            <h3 className="font-display text-lg font-semibold">Rappels du jour</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs"><span className="h-2 w-2 rounded-full bg-rose-vif" /> Température basale — 06:30</div>
            <div className="flex items-center gap-2 text-xs"><span className="h-2 w-2 rounded-full bg-violet-doux" /> Suivi symptômes — 21:00</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-muted" /> Pilule — 08:00 (désactivé)</div>
          </div>
        </Link>

        {/* Article suggestion */}
        <Link to="/articles" className="overflow-hidden rounded-3xl border border-white/70 glass shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="h-32 bg-gradient-to-br from-rose-poudre to-lavande" />
          <div className="p-6">
            <div className="text-[10px] uppercase tracking-widest text-violet-doux">Magazine · Fertilité</div>
            <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
              5 signes que vous êtes en pleine ovulation
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">3 min de lecture · Dr. Léa Bernard</p>
          </div>
        </Link>
      </div>
    </AppShell>
  );
}

function MiniStat({ icon: Icon, label, value, tint }: { icon: typeof Droplet; label: string; value: string; tint: "rose" | "violet" }) {
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
