import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Droplet, X, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProfile, usePeriodLogs, useTogglePeriodDay, useUpdateProfile, computeCycleInfo } from "@/lib/cycle-store";

export const Route = createFileRoute("/_authenticated/calendar")({
  head: () => ({ meta: [{ title: "Calendrier — CycleBloom AI" }] }),
  component: CalendarPage,
});

type Phase = "period" | "fertile" | "ovulation" | "luteal" | "follicular" | "predicted" | null;

function CalendarPage() {
  const { data: profile, isLoading: pLoad } = useProfile();
  const { data: periods = [], isLoading: lLoad } = usePeriodLogs();
  const toggle = useTogglePeriodDay();
  const updateProfile = useUpdateProfile();

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [logMode, setLogMode] = useState(false);

  if (pLoad || lLoad) {
    return (
      <AppShell title="Calendrier">
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </AppShell>
    );
  }

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const info = computeCycleInfo(profile, periods);
  const periodSet = new Set(periods.map((p) => p.date));

  const isoOf = (d: number) => {
    const local = new Date(year, month, d);
    return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, "0")}-${String(local.getDate()).padStart(2, "0")}`;
  };

  const getDayInfo = (d: number) => {
    const date = new Date(year, month, d);
    const iso = isoOf(d);
    if (periodSet.has(iso)) {
      return { phase: "period" as Phase, cycleDay: null as number | null, description: "Règles enregistrées" };
    }
    if (!info.anchor) return { phase: null as Phase, cycleDay: null, description: "Marquez vos règles pour activer les prédictions" };
    const diff = Math.floor((date.getTime() - info.anchor.getTime()) / 86400000);
    if (diff < 0) return { phase: null as Phase, cycleDay: null, description: "Avant le suivi" };
    const dc = (diff % info.cycleLength) + 1;
    if (dc <= info.periodLength) return { phase: "period" as Phase, cycleDay: dc, description: `Règles prévues — J${dc}/${info.periodLength}` };
    if (dc === info.ovulationOffset + 1) return { phase: "ovulation" as Phase, cycleDay: dc, description: `Ovulation — J${dc}` };
    if (dc >= info.ovulationOffset - 2 && dc <= info.ovulationOffset + 2) return { phase: "fertile" as Phase, cycleDay: dc, description: `Fenêtre fertile — J${dc}` };
    if (dc < info.ovulationOffset - 2) return { phase: "follicular" as Phase, cycleDay: dc, description: `Folliculaire — J${dc}` };
    return { phase: "luteal" as Phase, cycleDay: dc, description: `Lutéale — J${dc} (${info.cycleLength - dc + 1}j avant règles)` };
  };

  const onDayClick = async (d: number) => {
    if (logMode) {
      const iso = isoOf(d);
      const on = !periodSet.has(iso);
      await toggle.mutateAsync({ date: iso, on });
      // First time the user marks any period day → seed last_period_date if absent
      if (on && !profile?.last_period_date) {
        await updateProfile.mutateAsync({ last_period_date: iso });
      }
      toast.success(on ? "Jour de règles enregistré" : "Jour retiré");
    } else {
      setSelectedDay(selectedDay === d ? null : d);
    }
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay - 1 }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedDayInfo = selectedDay ? getDayInfo(selectedDay) : null;

  return (
    <AppShell title="Calendrier">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="font-display text-xl sm:text-2xl font-semibold capitalize min-w-[180px] text-center">{monthName}</h2>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
            <ChevronRight className="h-4 w-4" />
          </button>
          {!isCurrentMonth && (
            <button onClick={() => setViewDate(new Date())} className="rounded-full bg-rose-vif/10 px-3 py-1 text-xs font-medium text-rose-vif hover:bg-rose-vif/20 transition">
              Aujourd'hui
            </button>
          )}
        </div>
        <button
          onClick={() => setLogMode(!logMode)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold shadow-bloom transition ${
            logMode ? "bg-rose-vif text-white" : "bg-gradient-to-r from-rose-vif to-violet-doux text-white hover:scale-[1.02]"
          }`}
        >
          <Droplet className="h-3.5 w-3.5" /> {logMode ? "Fin du marquage" : "Marquer mes règles"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
        <Legend color="bg-rose-vif" label="Règles" />
        <Legend color="bg-orange-300" label="Fertile" />
        <Legend color="bg-purple-500" label="Ovulation" />
        <Legend color="bg-emerald-300" label="Folliculaire" />
        <Legend color="bg-blue-200" label="Lutéale" />
      </div>

      {logMode && (
        <div className="mb-4 rounded-2xl border border-rose-vif/20 bg-rose-pastel/20 p-4 text-sm text-foreground/80">
          <Droplet className="h-4 w-4 inline text-rose-vif mr-1" />
          <strong>Mode marquage actif :</strong> Cliquez sur les jours pour enregistrer/retirer vos règles.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-white/70 glass p-4 sm:p-6 shadow-bloom">
          <div className="mb-3 grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const di = getDayInfo(d);
              const isTodayCell = isCurrentMonth && d === today.getDate();
              const isSelected = selectedDay === d;
              const isLogged = periodSet.has(isoOf(d));
              return (
                <button
                  key={i}
                  onClick={() => onDayClick(d)}
                  className={`relative aspect-square rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition flex flex-col items-center justify-center ${
                    isSelected ? "ring-2 ring-foreground ring-offset-1 scale-105" : ""
                  } ${isTodayCell ? "ring-2 ring-rose-vif ring-offset-2" : ""} ${cellClass(di.phase, isLogged)}`}
                >
                  <span>{d}</span>
                  {di.cycleDay && <span className="text-[8px] opacity-60">J{di.cycleDay}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {selectedDayInfo && selectedDay ? (
            <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-bold">
                  {new Date(year, month, selectedDay).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </h3>
                <button onClick={() => setSelectedDay(null)} className="h-6 w-6 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition">
                  <X className="h-3 w-3" />
                </button>
              </div>
              <div className={`rounded-2xl p-4 ${phaseBg(selectedDayInfo.phase)}`}>
                <div className="text-sm font-bold">{selectedDayInfo.description}</div>
                {selectedDayInfo.cycleDay && (
                  <div className="text-xs text-foreground/60 mt-1">Jour {selectedDayInfo.cycleDay} sur {info.cycleLength}</div>
                )}
              </div>
              {selectedDayInfo.phase && (
                <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">Conseil du jour</p>
                  <p className="text-xs text-gray-500">{phaseAdvice(selectedDayInfo.phase)}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom text-center text-muted-foreground text-sm py-8">
              <CalendarIcon className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Cliquez sur un jour</p>
              <p className="text-xs mt-1">pour voir le détail de chaque phase.</p>
            </div>
          )}

          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <h3 className="font-display text-sm font-bold mb-3">Résumé du cycle</h3>
            <div className="space-y-3 text-xs">
              <Row label="Longueur du cycle" value={`${info.cycleLength} jours`} />
              <Row label="Durée des règles" value={`${info.periodLength} jours`} />
              <Row label="Jours enregistrés" value={`${periods.length}`} />
              {info.cycleDay && <Row label="Jour actuel" value={`J${info.cycleDay}`} />}
              {info.ovulationOffset && <Row label="Ovulation estimée" value={`J${info.ovulationOffset + 1}`} />}
              {info.cycleDay && <Row label="Prochaines règles" value={`dans ${info.cycleLength - info.cycleDay} jours`} />}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <h3 className="font-display text-sm font-bold mb-3">Phases ce mois</h3>
            <div className="space-y-2">
              <PhaseBar label="Règles" color="bg-rose-vif" days={info.periodLength} total={info.cycleLength} />
              <PhaseBar label="Folliculaire" color="bg-emerald-400" days={info.ovulationOffset - info.periodLength - 2} total={info.cycleLength} />
              <PhaseBar label="Fertile" color="bg-orange-400" days={5} total={info.cycleLength} />
              <PhaseBar label="Lutéale" color="bg-indigo-400" days={info.cycleLength - info.ovulationOffset - 2} total={info.cycleLength} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <div className="flex items-center gap-1.5"><span className={`h-3.5 w-3.5 rounded-full ${color}`} /><span>{label}</span></div>;
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
function cellClass(phase: Phase, isLogged: boolean) {
  if (isLogged) return "bg-rose-vif text-white shadow-lg shadow-rose-vif/30 hover:scale-110 font-bold";
  switch (phase) {
    case "period": return "bg-pink-200 text-rose-700 border-2 border-rose-vif/50 font-semibold hover:bg-pink-300 hover:scale-105";
    case "ovulation": return "bg-purple-500 text-white shadow-lg shadow-purple-500/30 hover:scale-110 font-bold";
    case "fertile": return "bg-orange-300 text-orange-900 font-semibold hover:bg-orange-400 hover:scale-105";
    case "follicular": return "bg-emerald-300 text-emerald-900 font-medium hover:bg-emerald-400 hover:scale-105";
    case "luteal": return "bg-blue-200 text-blue-800 font-medium hover:bg-blue-300 hover:scale-105";
    default: return "bg-gray-50 text-foreground/70 hover:bg-white hover:shadow-sm";
  }
}
function phaseBg(phase: Phase) {
  switch (phase) {
    case "period": return "bg-rose-vif/10 text-rose-vif";
    case "ovulation": return "bg-violet-doux/10 text-violet-doux";
    case "fertile": return "bg-orange-50 text-orange-700";
    case "follicular": return "bg-emerald-50 text-emerald-700";
    case "luteal": return "bg-indigo-50 text-indigo-700";
    default: return "bg-white/60 text-muted-foreground";
  }
}
function phaseAdvice(phase: Phase) {
  switch (phase) {
    case "period": return "Privilégiez le repos, l'hydratation et les aliments riches en fer. Le yoga doux peut soulager les crampes.";
    case "ovulation": return "Pic d'énergie et de fertilité. Moment idéal pour les activités sociales et les exercices intenses.";
    case "fertile": return "Fenêtre de fertilité active. Si vous essayez de concevoir, c'est le moment optimal.";
    case "follicular": return "Énergie montante ! Parfait pour commencer de nouveaux projets et des entraînements plus intenses.";
    case "luteal": return "Préparez-vous à ralentir. Favorisez les aliments riches en magnésium et le sommeil réparateur.";
    default: return "";
  }
}
function PhaseBar({ label, color, days, total }: { label: string; color: string; days: number; total: number }) {
  const pct = Math.max(5, Math.round((days / total) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground w-8 text-right">{days}j</span>
    </div>
  );
}
