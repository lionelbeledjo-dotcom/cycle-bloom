import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Sparkles, Droplet, Heart, Plus, Loader2 } from "lucide-react";
import { useProfile, usePeriodLogs, computeCycleInfo } from "@/lib/cycle-store";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord — CycleBloom AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: profile, isLoading: pLoad } = useProfile();
  const { data: periods = [], isLoading: lLoad } = usePeriodLogs();

  if (pLoad || lLoad) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </AppShell>
    );
  }

  const today = new Date();
  const dayNames = ["D", "L", "M", "M", "J", "V", "S"];
  const info = computeCycleInfo(profile, periods);
  const periodSet = new Set(periods.map((p) => p.date));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - today.getDay() + i + 1);
    return d;
  });

  const getDayPhase = (date: Date): "period" | "fertile" | null => {
    const iso = date.toISOString().slice(0, 10);
    if (periodSet.has(iso)) return "period";
    if (!info.anchor) return null;
    const diff = Math.floor((date.getTime() - info.anchor.getTime()) / 86400000);
    if (diff < 0) return null;
    const dc = (diff % info.cycleLength) + 1;
    if (dc <= info.periodLength) return "period";
    if (dc >= info.ovulationOffset - 2 && dc <= info.ovulationOffset + 2) return "fertile";
    return null;
  };

  const monthDay = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  const firstName = profile?.first_name || "vous";

  return (
    <AppShell>
      <div className="text-center mb-2">
        <p className="text-sm font-medium text-foreground/60 capitalize">{monthDay}</p>
      </div>

      <div className="mb-8 flex justify-center gap-2 sm:gap-3">
        {weekDays.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const ph = getDayPhase(d);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase text-muted-foreground font-medium">{dayNames[d.getDay()]}</span>
              <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center text-sm font-bold transition ${
                isToday ? "bg-white border-2 border-foreground text-foreground shadow-lg"
                : ph === "period" ? "bg-rose-vif text-white"
                : ph === "fertile" ? "bg-rose-poudre text-rose-vif border border-rose-vif/30"
                : "text-foreground/60"
              }`}>{d.getDate()}</div>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-10">
        {!info.anchor ? (
          <>
            <p className="font-display text-2xl font-bold mb-3">Bienvenue {firstName} 🌸</p>
            <p className="text-sm text-foreground/70 max-w-md mx-auto mb-5">
              Pour activer vos prédictions, marquez le premier jour de vos dernières règles sur le calendrier.
            </p>
            <Link to="/calendar" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-3 text-sm font-semibold text-white shadow-bloom">
              <Droplet className="h-4 w-4" /> Marquer mes règles
            </Link>
          </>
        ) : info.phase === "period" ? (
          <>
            <p className="text-sm text-foreground/60 mb-2">Jour {info.cycleDay} des règles</p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-rose-vif mb-3">
              {Math.max(1, info.periodLength - (info.cycleDay ?? 0) + 1)}
            </p>
            <p className="text-lg font-medium text-foreground/80">jour(s) restant(s)</p>
          </>
        ) : info.phase === "fertile" || info.phase === "ovulation" ? (
          <>
            <p className="text-sm text-foreground/60 mb-2">{info.phase === "ovulation" ? "Ovulation" : "Fenêtre fertile"}</p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-violet-doux mb-3">
              {info.phase === "ovulation" ? "Aujourd'hui" : Math.max(0, info.ovulationOffset + 1 - (info.cycleDay ?? 0))}
            </p>
            {info.phase !== "ovulation" && <p className="text-lg font-medium text-foreground/80">jour(s) avant l'ovulation</p>}
          </>
        ) : (
          <>
            <p className="text-sm text-foreground/60 mb-2">Prochaines règles dans</p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-3">
              {info.nextPeriod ? Math.max(0, Math.ceil((info.nextPeriod.getTime() - today.getTime()) / 86400000)) : "—"}
            </p>
            <p className="text-lg font-medium text-foreground/80">jours</p>
          </>
        )}

        {info.phase && (
          <p className="mt-4 text-sm text-foreground/50">
            {info.phase === "fertile" || info.phase === "ovulation"
              ? "Forte probabilité de conception"
              : "Faible probabilité de conception"}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-8 sm:gap-12 mb-10">
        <Link to="/calendar" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-rose-pastel flex items-center justify-center">
            <Droplet className="h-6 w-6 text-rose-vif" />
          </div>
          <span className="text-[11px] font-medium text-foreground/70">Règles</span>
        </Link>
        <Link to="/symptoms" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-white border-2 border-border flex items-center justify-center">
            <Plus className="h-6 w-6 text-foreground/60" />
          </div>
          <span className="text-[11px] font-medium text-foreground/70">Symptômes</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-full bg-white border-2 border-border flex items-center justify-center">
            <Heart className="h-6 w-6 text-foreground/60" />
          </div>
          <span className="text-[11px] font-medium text-foreground/70">Profil</span>
        </Link>
      </div>

      {info.phase && (
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom mb-6">
          <h3 className="font-display text-lg font-bold mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-rose-vif" />
            {info.phase === "period" ? "Au début de votre cycle"
              : info.phase === "follicular" ? "Phase de préparation"
              : info.phase === "fertile" || info.phase === "ovulation" ? "Période la plus fertile"
              : "Phase de repos"}
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {info.phase === "period"
              ? "Votre corps se renouvelle. Repos, hydratation et alimentation riche en fer sont recommandés."
              : info.phase === "follicular"
              ? "Oestrogènes en hausse. Énergie et créativité au rendez-vous, moment idéal pour l'exercice intense."
              : info.phase === "fertile" || info.phase === "ovulation"
              ? "Pic de fertilité. Libido, énergie et confiance au maximum."
              : "Progestérone en hausse. Fatigue ou irritabilité possibles ; privilégiez yoga et alimentation anti-inflammatoire."}
          </p>
        </div>
      )}
    </AppShell>
  );
}
