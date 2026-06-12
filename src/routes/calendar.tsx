import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Droplet, X } from "lucide-react";
import { getCycleData, getOvulationDay } from "@/lib/user-store";
import { toast } from "sonner";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendrier — CycleBloom AI" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());
  const [markedPeriods, setMarkedPeriods] = useState<string[]>(() => {
    const stored = localStorage.getItem("cyclebloom_periods");
    return stored ? JSON.parse(stored) : [];
  });
  const [logMode, setLogMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const { cycleLength, periodLength, lastPeriod } = getCycleData();
  const ovulationDay = getOvulationDay();

  const getPhase = (d: number): "period" | "fertile" | "ovulation" | "luteal" | "follicular" | null => {
    const date = new Date(year, month, d);
    const dateStr = date.toISOString().split("T")[0];
    if (markedPeriods.includes(dateStr)) return "period";
    if (!lastPeriod) return null;
    const diff = Math.floor((date.getTime() - lastPeriod.getTime()) / 86400000);
    if (diff < 0) return null;
    const dayInCycle = (diff % cycleLength) + 1;
    if (dayInCycle <= periodLength) return "period";
    if (dayInCycle === ovulationDay) return "ovulation";
    if (dayInCycle >= ovulationDay - 2 && dayInCycle <= ovulationDay + 2) return "fertile";
    if (dayInCycle > ovulationDay + 2) return "luteal";
    return "follicular";
  };

  const toggleDay = (d: number) => {
    const dateStr = new Date(year, month, d).toISOString().split("T")[0];
    let updated: string[];
    if (markedPeriods.includes(dateStr)) {
      updated = markedPeriods.filter(p => p !== dateStr);
    } else {
      updated = [...markedPeriods, dateStr];
    }
    setMarkedPeriods(updated);
    localStorage.setItem("cyclebloom_periods", JSON.stringify(updated));
  };

  const savePeriod = () => {
    setLogMode(false);
    toast.success("Règles enregistrées !", { description: `${markedPeriods.length} jours marqués au total.` });
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay - 1 }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const currentCycleDay = (() => {
    if (!lastPeriod) return null;
    const diff = Math.floor((today.getTime() - lastPeriod.getTime()) / 86400000);
    return (diff % cycleLength) + 1;
  })();

  const getSelectedInfo = () => {
    if (!selectedDay) return null;
    const date = new Date(year, month, selectedDay);
    const phase = getPhase(selectedDay);
    if (!lastPeriod) return { phase, cycleDay: null, label: "Pas de données", desc: "Renseignez vos dernières règles dans votre profil." };
    const diff = Math.floor((date.getTime() - lastPeriod.getTime()) / 86400000);
    if (diff < 0) return { phase: null, cycleDay: null, label: "Avant le suivi", desc: "" };
    const dayInCycle = (diff % cycleLength) + 1;
    const labels: Record<string, [string, string]> = {
      period: ["Règles", "Période menstruelle. Repos et hydratation recommandés."],
      ovulation: ["Ovulation", "Pic de fertilité. Forte chance de conception."],
      fertile: ["Fenêtre fertile", "Fertilité élevée. Les rapports peuvent mener à une grossesse."],
      follicular: ["Phase folliculaire", "Énergie en hausse. Bon moment pour le sport et les projets."],
      luteal: ["Phase lutéale", "Progestérone élevée. Possible fatigue ou SPM."],
    };
    const [label, desc] = labels[phase || ""] || ["—", ""];
    return { phase, cycleDay: dayInCycle, label, desc };
  };

  const selectedInfo = getSelectedInfo();

  return (
    <AppShell title="Calendrier">
      {/* Nav */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="font-display text-xl font-semibold capitalize">{monthName}</h2>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4 text-[11px]">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-rose-vif" /> Règles</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-orange-400" /> Fertile</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-violet-doux ring-2 ring-violet-doux/30" /> Ovulation</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-sky-200" /> Lutéale</span>
      </div>

      {/* Calendar */}
      <div className="rounded-3xl bg-white/70 border border-border/50 p-4 sm:p-6 mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] uppercase text-muted-foreground font-medium">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const phase = getPhase(d);
            const isToday = isCurrentMonth && d === today.getDate();
            const isSelected = selectedDay === d;
            return (
              <button
                key={i}
                onClick={() => logMode ? toggleDay(d) : setSelectedDay(isSelected ? null : d)}
                className={`aspect-square rounded-full flex items-center justify-center text-xs font-medium relative transition-all ${
                  isSelected ? "scale-110 shadow-md" : ""
                } ${isToday ? "ring-2 ring-offset-1 ring-foreground" : ""} ${cellStyle(phase, logMode)}`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Log mode */}
      <div className="flex items-center justify-between mb-6">
        {logMode ? (
          <div className="flex items-center gap-3">
            <button onClick={savePeriod} className="rounded-full bg-rose-vif px-5 py-2 text-xs font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
              Valider
            </button>
            <button onClick={() => setLogMode(false)} className="text-xs text-foreground/50 hover:text-foreground">Annuler</button>
            <span className="text-xs text-foreground/40">Touchez les jours de vos règles</span>
          </div>
        ) : (
          <button
            onClick={() => setLogMode(true)}
            className="flex items-center gap-2 rounded-full bg-rose-pastel px-5 py-2.5 text-xs font-semibold text-rose-vif hover:bg-rose-vif hover:text-white transition"
          >
            <Droplet className="h-3.5 w-3.5" /> Marquer mes règles
          </button>
        )}
        {!isCurrentMonth && (
          <button onClick={() => setViewDate(new Date())} className="text-xs text-rose-vif font-medium">Aujourd'hui</button>
        )}
      </div>

      {/* Selected day info */}
      {selectedInfo && selectedDay && (
        <div className="rounded-2xl bg-white/80 border border-border/50 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">
              {new Date(year, month, selectedDay).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </span>
            <button onClick={() => setSelectedDay(null)} className="text-foreground/30 hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          {selectedInfo.cycleDay && (
            <p className="text-xs text-foreground/40 mb-1">Jour {selectedInfo.cycleDay} du cycle</p>
          )}
          <div className="flex items-center gap-2 mb-1">
            <span className={`h-2.5 w-2.5 rounded-full ${phaseColor(selectedInfo.phase)}`} />
            <span className="text-sm font-semibold">{selectedInfo.label}</span>
          </div>
          <p className="text-xs text-foreground/60">{selectedInfo.desc}</p>
        </div>
      )}

      {/* Cycle progress */}
      {currentCycleDay && (
        <div className="rounded-2xl bg-white/70 border border-border/50 p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-medium">Jour {currentCycleDay} sur {cycleLength}</span>
            <span className="text-foreground/40">{cycleLength - currentCycleDay} jours avant les prochaines règles</span>
          </div>
          <div className="h-2 rounded-full bg-border/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux transition-all"
              style={{ width: `${(currentCycleDay / cycleLength) * 100}%` }}
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}

function cellStyle(phase: string | null, logMode: boolean) {
  if (logMode && phase === "period") return "bg-rose-vif text-white";
  switch (phase) {
    case "period": return "bg-rose-vif text-white";
    case "ovulation": return "bg-violet-doux text-white ring-2 ring-violet-doux/40";
    case "fertile": return "bg-orange-100 text-orange-800 border border-orange-300";
    case "luteal": return "bg-sky-50 text-sky-700";
    case "follicular": return "bg-emerald-50/50 text-foreground/60";
    default: return logMode ? "bg-white/50 hover:bg-rose-pastel/50 text-foreground/60" : "bg-white/30 text-foreground/50";
  }
}

function phaseColor(phase: string | null) {
  switch (phase) {
    case "period": return "bg-rose-vif";
    case "ovulation": return "bg-violet-doux";
    case "fertile": return "bg-orange-400";
    case "luteal": return "bg-sky-300";
    case "follicular": return "bg-emerald-300";
    default: return "bg-border";
  }
}
