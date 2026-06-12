import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Sparkles, Droplet, Plus, Heart, Stethoscope } from "lucide-react";
import { getUserName, getCycleDay, getCycleData, getOvulationDay } from "@/lib/user-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — CycleBloom AI" },
      { name: "description", content: "Votre tableau de bord personnel." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const today = new Date();
  const userName = getUserName();
  const cycleDay = getCycleDay();
  const { cycleLength, periodLength, lastPeriod } = getCycleData();
  const ovulationDay = getOvulationDay();
  const daysUntilOvulation = Math.max(0, ovulationDay - cycleDay + 1);
  const daysUntilPeriod = Math.max(0, cycleLength - cycleDay + 1);

  const phase = cycleDay <= periodLength ? "period" : cycleDay < ovulationDay - 2 ? "follicular" : cycleDay <= ovulationDay + 2 ? "fertile" : "luteal";

  const fertilityText = phase === "fertile"
    ? "Forte possibilité de tomber enceinte"
    : phase === "period"
    ? "Très faible possibilité de grossesse"
    : phase === "luteal"
    ? "Très faible possibilité de grossesse"
    : "Faible possibilité de tomber enceinte";

  // Week strip
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const getDayType = (date: Date): "period" | "fertile" | "ovulation" | null => {
    if (!lastPeriod) return null;
    const diff = Math.floor((date.getTime() - new Date(lastPeriod).getTime()) / 86400000);
    if (diff < 0) return null;
    const d = (diff % cycleLength) + 1;
    if (d <= periodLength) return "period";
    if (d === ovulationDay) return "ovulation";
    if (d >= ovulationDay - 2 && d <= ovulationDay + 2) return "fertile";
    return null;
  };

  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
  const monthLabel = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

  return (
    <AppShell>
      {/* Date */}
      <p className="text-center text-sm text-foreground/50 mb-4 capitalize">{monthLabel}</p>

      {/* Week strip */}
      <div className="flex justify-center gap-3 mb-10">
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const type = getDayType(d);
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-medium">{dayLabels[i]}</span>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                isToday ? "border-2 border-foreground bg-white shadow-md" :
                type === "period" ? "bg-rose-vif text-white" :
                type === "ovulation" ? "bg-violet-doux text-white" :
                type === "fertile" ? "bg-rose-poudre text-rose-vif" :
                "text-foreground/50"
              }`}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Central info */}
      <div className="text-center mb-10">
        <p className="text-sm text-foreground/50 mb-1">
          {phase === "period" ? "Fin des règles dans" : "Ovulation dans"}
        </p>
        <p className="font-display text-6xl font-bold mb-1">
          {phase === "period" ? periodLength - cycleDay + 1 : daysUntilOvulation}
        </p>
        <p className="text-base text-foreground/70">
          {phase === "period"
            ? `jour${periodLength - cycleDay + 1 > 1 ? "s" : ""}`
            : `jour${daysUntilOvulation > 1 ? "s" : ""}`}
        </p>
        <p className="mt-4 text-xs text-foreground/40">{fertilityText}</p>
      </div>

      {/* Quick actions */}
      <div className="flex justify-center gap-10 mb-10">
        <Link to="/calendar" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-rose-pastel flex items-center justify-center shadow-sm">
            <Droplet className="h-6 w-6 text-rose-vif" />
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">Mes règles</span>
        </Link>
        <Link to="/symptoms" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full border-2 border-border flex items-center justify-center">
            <Plus className="h-6 w-6 text-foreground/50" />
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">Symptômes</span>
        </Link>
        <Link to="/insights" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full border-2 border-border flex items-center justify-center">
            <Heart className="h-6 w-6 text-foreground/50" />
          </div>
          <span className="text-[11px] font-medium text-center leading-tight">Rapports</span>
        </Link>
      </div>

      {/* Phase explanation */}
      <div className="rounded-3xl bg-white/70 border border-border/50 p-5 mb-6">
        <h3 className="font-display text-base font-bold mb-2">
          {phase === "period" ? "Période menstruelle" :
           phase === "follicular" ? "Phase folliculaire" :
           phase === "fertile" ? "Fenêtre fertile" :
           "Phase lutéale"} · Jour {cycleDay}
        </h3>
        <p className="text-sm text-foreground/60 leading-relaxed">
          {phase === "period"
            ? "Votre corps se renouvelle. Reposez-vous et restez hydratée. Vos niveaux d'énergie remonteront bientôt."
            : phase === "follicular"
            ? "Les oestrogènes augmentent. Énergie et motivation en hausse. Idéal pour le sport et les projets."
            : phase === "fertile"
            ? "Vous êtes au pic de fertilité. Libido élevée, énergie maximale. Si vous souhaitez concevoir, c'est le moment."
            : "La progestérone augmente. Possible fatigue ou irritabilité. Privilégiez le repos et une alimentation douce."}
        </p>
      </div>

      {/* Bottom cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/bloom-ai" className="rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux p-5 text-white shadow-bloom hover:-translate-y-0.5 transition block">
          <Sparkles className="h-5 w-5 mb-2" />
          <p className="text-sm font-semibold mb-1">Une question, {userName} ?</p>
          <p className="text-xs text-white/70">Bloom AI est là pour vous 24h/24</p>
        </Link>
        <Link to="/doctors" className="rounded-2xl bg-white/70 border border-border/50 p-5 hover:-translate-y-0.5 transition block">
          <Stethoscope className="h-5 w-5 text-rose-vif mb-2" />
          <p className="text-sm font-semibold mb-1">Consulter un médecin</p>
          <p className="text-xs text-foreground/50">Gynécologue ou sage-femme</p>
        </Link>
      </div>
    </AppShell>
  );
}
