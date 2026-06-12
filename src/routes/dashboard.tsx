import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Sparkles, Droplet, Heart, Calendar, Activity, Plus, BookOpen, Stethoscope } from "lucide-react";
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
  const dayNames = ["D", "L", "M", "M", "J", "V", "S"];
  const userName = getUserName();
  const cycleDay = getCycleDay();
  const { cycleLength, periodLength, lastPeriod } = getCycleData();
  const ovulationDay = getOvulationDay();
  const daysUntilOvulation = Math.max(0, ovulationDay - cycleDay + 1);
  const nextPeriod = getNextPeriodDate();
  const daysUntilPeriod = Math.max(0, Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const phase = cycleDay <= periodLength ? "period" : cycleDay <= ovulationDay - 2 ? "follicular" : cycleDay <= ovulationDay + 2 ? "fertile" : "luteal";

  const phaseLabel = phase === "period" ? "Règles" : phase === "follicular" ? "Phase folliculaire" : phase === "fertile" ? "Fenêtre fertile" : "Phase lutéale";

  const fertilityText = phase === "fertile"
    ? "Forte possibilité de tomber enceinte"
    : phase === "period"
    ? "Très faible possibilité de tomber enceinte"
    : phase === "follicular"
    ? "Faible possibilité de tomber enceinte"
    : "Très faible possibilité de tomber enceinte";

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - today.getDay() + i + 1);
    return d;
  });

  const getDayPhase = (date: Date) => {
    if (!lastPeriod) return null;
    const diff = Math.floor((date.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return null;
    const dayInCycle = (diff % cycleLength) + 1;
    if (dayInCycle <= periodLength) return "period";
    if (dayInCycle >= ovulationDay - 2 && dayInCycle <= ovulationDay + 2) return "fertile";
    return null;
  };

  const monthDay = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

  return (
    <AppShell>
      {/* Top header like Flo */}
      <div className="text-center mb-2">
        <p className="text-sm font-medium text-foreground/60 capitalize">{monthDay}</p>
      </div>

      {/* Week strip */}
      <div className="mb-8 flex justify-center gap-2 sm:gap-3">
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const dayPhase = getDayPhase(d);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase text-muted-foreground font-medium">
                {dayNames[d.getDay()]}
              </span>
              <div
                className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center text-sm font-bold transition ${
                  isToday
                    ? "bg-white border-2 border-foreground text-foreground shadow-lg"
                    : dayPhase === "period"
                    ? "bg-rose-vif text-white"
                    : dayPhase === "fertile"
                    ? "bg-rose-poudre text-rose-vif border border-rose-vif/30"
                    : "text-foreground/60"
                }`}
              >
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main cycle info - like Flo */}
      <div className="text-center mb-10">
        {phase === "period" ? (
          <>
            <p className="text-sm text-foreground/60 mb-2">Jour {cycleDay} des règles</p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-rose-vif mb-3">
              {periodLength - cycleDay + 1}
            </p>
            <p className="text-lg font-medium text-foreground/80">jour{periodLength - cycleDay + 1 > 1 ? "s" : ""} restant{periodLength - cycleDay + 1 > 1 ? "s" : ""}</p>
          </>
        ) : phase === "fertile" ? (
          <>
            <p className="text-sm text-foreground/60 mb-2">Fenêtre fertile</p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-violet-doux mb-3">
              {daysUntilOvulation === 0 ? "Aujourd'hui" : daysUntilOvulation}
            </p>
            {daysUntilOvulation > 0 && (
              <p className="text-lg font-medium text-foreground/80">jour{daysUntilOvulation > 1 ? "s" : ""} avant l'ovulation</p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-foreground/60 mb-2">Ovulation dans</p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-3">
              {daysUntilOvulation}
            </p>
            <p className="text-lg font-medium text-foreground/80">jours</p>
          </>
        )}

        <p className="mt-4 text-sm text-foreground/50 flex items-center justify-center gap-1">
          {fertilityText}
          <span className="h-4 w-4 rounded-full border border-foreground/20 inline-flex items-center justify-center text-[8px]">i</span>
        </p>
      </div>

      {/* Quick actions - like Flo */}
      <div className="flex justify-center gap-8 sm:gap-12 mb-10">
        <Link to="/calendar" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-rose-pastel flex items-center justify-center">
            <Droplet className="h-6 w-6 text-rose-vif" />
          </div>
          <span className="text-[11px] font-medium text-foreground/70">Enregistrer les règles</span>
        </Link>
        <Link to="/symptoms" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-white border-2 border-border flex items-center justify-center">
            <Plus className="h-6 w-6 text-foreground/60" />
          </div>
          <span className="text-[11px] font-medium text-foreground/70">Symptômes</span>
        </Link>
        <Link to="/insights" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-white border-2 border-border flex items-center justify-center">
            <Heart className="h-6 w-6 text-foreground/60" />
          </div>
          <span className="text-[11px] font-medium text-foreground/70">Rapports</span>
        </Link>
      </div>

      {/* Daily articles - like Flo */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-bold mb-4">Mes articles quotidiens · aujourd'hui</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <DailyCard
            bg="bg-rose-pastel"
            title="Possibilité de grossesse actuelle"
            subtitle="Mise à jour..."
            icon={<span className="h-3 w-3 rounded-full bg-rose-vif" />}
          />
          <DailyCard
            bg="bg-gradient-to-br from-slate-700 to-slate-900 text-white"
            title={`${monthDay} : Symptômes à prévoir`}
            subtitle=""
          />
          <DailyCard
            bg="bg-violet-doux/10"
            title="Comprendre votre phase actuelle"
            subtitle={phaseLabel}
          />
          <DailyCard
            bg="bg-blue-50"
            title="Type de pertes à observer"
            subtitle="En savoir plus"
          />
        </div>
      </div>

      {/* Phase info */}
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom mb-6">
        <h3 className="font-display text-lg font-bold mb-2">
          {phase === "period" ? "Au début de votre cycle" :
           phase === "follicular" ? "Phase de préparation" :
           phase === "fertile" ? "Période la plus fertile" :
           "Phase de repos"}
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed">
          {phase === "period"
            ? "Votre corps se renouvelle. Repos, hydratation et alimentation riche en fer sont recommandés. Vos niveaux d'énergie vont progressivement augmenter."
            : phase === "follicular"
            ? "Vos oestrogènes augmentent. Énergie et créativité en hausse. C'est le moment idéal pour les projets exigeants et le sport intense."
            : phase === "fertile"
            ? "Vous êtes au pic de votre fertilité. Libido, énergie et confiance sont au maximum. Si vous souhaitez concevoir, c'est le moment."
            : "La progestérone augmente. Possible fatigue, ballonnements ou irritabilité. Privilégiez le yoga, la marche et l'alimentation anti-inflammatoire."}
        </p>
      </div>

      {/* Bloom AI + Doctor */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/bloom-ai" className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-6 text-white shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Bloom AI</span>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            "{phase === "fertile" ? `Profitez de ce pic d'énergie, ${userName} !` : `Des questions sur votre cycle, ${userName} ?`}"
          </p>
          <span className="mt-4 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-semibold">
            Discuter avec Bloom →
          </span>
        </Link>

        <Link to="/doctors" className="rounded-3xl border border-white/70 glass p-6 shadow-bloom hover:-translate-y-0.5 transition block">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="h-5 w-5 text-rose-vif" />
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/60">Médecin</span>
          </div>
          <p className="text-sm text-foreground/70 mb-3">Trouvez un gynécologue ou une sage-femme près de chez vous.</p>
          <span className="rounded-full bg-rose-vif/10 px-3 py-1.5 text-xs font-semibold text-rose-vif">
            Prendre rendez-vous →
          </span>
        </Link>
      </div>
    </AppShell>
  );
}

function DailyCard({ bg, title, subtitle, icon }: { bg: string; title: string; subtitle: string; icon?: React.ReactNode }) {
  return (
    <div className={`shrink-0 w-36 rounded-2xl p-4 ${bg}`}>
      <p className="text-xs font-bold leading-tight mb-2">{title}</p>
      {subtitle && <p className="text-[10px] opacity-70">{subtitle}</p>}
      {icon && <div className="mt-2">{icon}</div>}
    </div>
  );
}
