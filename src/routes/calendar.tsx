import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Droplet, Heart, Flower, Sun, Moon, X } from "lucide-react";
import { getCycleData, getOvulationDay } from "@/lib/user-store";
import { toast } from "sonner";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendrier — CycleBloom AI" }] }),
  component: CalendarPage,
});

type Phase = "period" | "fertile" | "ovulation" | "luteal" | "follicular" | "predicted" | null;

interface DayInfo {
  phase: Phase;
  cycleDay: number | null;
  description: string;
  details: string[];
}

function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [markedPeriods, setMarkedPeriods] = useState<string[]>(() => {
    const stored = localStorage.getItem("cyclebloom_periods");
    return stored ? JSON.parse(stored) : [];
  });
  const [showLog, setShowLog] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const { cycleLength, periodLength, lastPeriod } = getCycleData();
  const ovulationOffset = getOvulationDay();

  const getDayInfo = (d: number): DayInfo => {
    const date = new Date(year, month, d);
    const dateStr = date.toISOString().split("T")[0];

    if (markedPeriods.includes(dateStr)) {
      return { phase: "period", cycleDay: null, description: "Règles (marqué manuellement)", details: ["Vous avez indiqué avoir vos règles ce jour."] };
    }

    if (!lastPeriod) return { phase: null, cycleDay: null, description: "Aucune donnée", details: ["Renseignez la date de vos dernières règles dans votre profil pour activer les prédictions."] };

    const diff = Math.floor((date.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { phase: null, cycleDay: null, description: "Avant le suivi", details: [] };

    const dayInCycle = (diff % cycleLength) + 1;

    if (dayInCycle <= periodLength) {
      return {
        phase: "period",
        cycleDay: dayInCycle,
        description: `Règles — Jour ${dayInCycle}/${periodLength}`,
        details: [
          "Période menstruelle active.",
          "Conseil : Reposez-vous, restez hydratée, évitez les efforts intenses.",
          "Fertilité : Très basse.",
        ],
      };
    }

    if (dayInCycle === ovulationOffset + 1) {
      return {
        phase: "ovulation",
        cycleDay: dayInCycle,
        description: `Ovulation — Jour ${dayInCycle}`,
        details: [
          "C'est le jour de l'ovulation !",
          "Fertilité : MAXIMALE — Pic de chances de conception.",
          "Votre ovule est libéré et peut être fécondé pendant 12-24h.",
          "Symptômes possibles : glaire cervicale transparente, légère douleur abdominale, libido élevée.",
        ],
      };
    }

    if (dayInCycle >= ovulationOffset - 2 && dayInCycle <= ovulationOffset + 2) {
      const fertileDay = dayInCycle - (ovulationOffset - 2);
      return {
        phase: "fertile",
        cycleDay: dayInCycle,
        description: `Fenêtre fertile — Jour ${dayInCycle}`,
        details: [
          `Jour ${fertileDay}/5 de votre fenêtre fertile.`,
          "Fertilité : ÉLEVÉE — Forte probabilité de conception.",
          "Les spermatozoïdes survivent 3-5 jours. Un rapport aujourd'hui peut mener à une grossesse.",
          dayInCycle < ovulationOffset + 1
            ? "Conseil : Si vous souhaitez concevoir, c'est le moment idéal."
            : "L'ovule peut encore être fécondé dans les prochaines heures.",
        ],
      };
    }

    if (dayInCycle > periodLength && dayInCycle < ovulationOffset - 2) {
      return {
        phase: "follicular",
        cycleDay: dayInCycle,
        description: `Phase folliculaire — Jour ${dayInCycle}`,
        details: [
          "Votre corps prépare l'ovulation.",
          "Énergie en hausse, bonne humeur, peau plus nette.",
          "Fertilité : Basse (mais augmente progressivement).",
          "Conseil : Profitez de cette énergie pour l'exercice intense (HIIT, course).",
        ],
      };
    }

    if (dayInCycle > ovulationOffset + 2) {
      const daysUntilPeriod = cycleLength - dayInCycle + 1;
      return {
        phase: "luteal",
        cycleDay: dayInCycle,
        description: `Phase lutéale — Jour ${dayInCycle}`,
        details: [
          `${daysUntilPeriod} jour${daysUntilPeriod > 1 ? "s" : ""} avant les prochaines règles.`,
          "Progestérone en hausse. Possible SPM (fatigue, ballonnements, irritabilité).",
          "Fertilité : Très basse.",
          "Conseil : Privilégiez le yoga, la marche et une alimentation anti-inflammatoire.",
        ],
      };
    }

    return { phase: null, cycleDay: dayInCycle, description: `Jour ${dayInCycle}`, details: [] };
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => setViewDate(new Date());

  const togglePeriodDay = (d: number) => {
    const dateStr = new Date(year, month, d).toISOString().split("T")[0];
    const updated = markedPeriods.includes(dateStr)
      ? markedPeriods.filter(p => p !== dateStr)
      : [...markedPeriods, dateStr];
    setMarkedPeriods(updated);
    localStorage.setItem("cyclebloom_periods", JSON.stringify(updated));
    toast.success(markedPeriods.includes(dateStr) ? "Jour de règles retiré" : "Jour de règles marqué");
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay - 1 }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const currentCycleDay = (() => {
    if (!lastPeriod) return null;
    const diff = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    return (diff % cycleLength) + 1;
  })();

  const selectedDayInfo = selectedDay ? getDayInfo(selectedDay) : null;

  return (
    <AppShell title="Calendrier">
      {/* Header with nav */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="font-display text-xl sm:text-2xl font-semibold capitalize min-w-[180px] text-center">{monthName}</h2>
          <button onClick={nextMonth} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
            <ChevronRight className="h-4 w-4" />
          </button>
          {!isCurrentMonth && (
            <button onClick={goToday} className="rounded-full bg-rose-vif/10 px-3 py-1 text-xs font-medium text-rose-vif hover:bg-rose-vif/20 transition">
              Aujourd'hui
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLog(!showLog)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold shadow-bloom transition ${
              showLog
                ? "bg-rose-vif text-white"
                : "bg-gradient-to-r from-rose-vif to-violet-doux text-white hover:scale-[1.02]"
            }`}
          >
            <Droplet className="h-3.5 w-3.5" /> {showLog ? "Fin du marquage" : "Marquer mes règles"}
          </button>
        </div>
      </div>

      {/* Legend - always visible */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-rose-vif" />
          <span>Règles</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-orange-400" />
          <span>Fertile (chance de grossesse)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-violet-doux ring-2 ring-violet-doux ring-offset-2" />
          <span>Ovulation (pic fertilité)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-200" />
          <span>Folliculaire</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-indigo-200" />
          <span>Lutéale (pré-règles)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-dashed border-rose-vif/60 bg-white" />
          <span>Règles prévues</span>
        </div>
      </div>

      {showLog && (
        <div className="mb-4 rounded-2xl border border-rose-vif/20 bg-rose-pastel/20 p-4">
          <p className="text-sm text-foreground/80">
            <Droplet className="h-4 w-4 inline text-rose-vif mr-1" />
            <strong>Mode marquage actif :</strong> Cliquez sur les jours pour indiquer vos jours de règles. Recliquez pour retirer.
          </p>
        </div>
      )}

      {/* Current cycle info */}
      {currentCycleDay && (
        <div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Jour du cycle</div>
            <div className="mt-1 font-display text-2xl font-bold text-rose-vif">J{currentCycleDay}</div>
            <div className="text-[10px] text-muted-foreground">sur {cycleLength}</div>
          </div>
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Phase</div>
            <div className="mt-1 font-display text-sm font-bold text-violet-doux">
              {currentCycleDay <= periodLength ? "Règles" :
               currentCycleDay < ovulationOffset - 2 ? "Folliculaire" :
               currentCycleDay >= ovulationOffset - 2 && currentCycleDay <= ovulationOffset + 2 ? "Fertile" :
               "Lutéale"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ovulation</div>
            <div className="mt-1 font-display text-2xl font-bold text-violet-doux">J{ovulationOffset + 1}</div>
            <div className="text-[10px] text-muted-foreground">
              {currentCycleDay <= ovulationOffset + 1
                ? `dans ${ovulationOffset + 1 - currentCycleDay}j`
                : "passée"}
            </div>
          </div>
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Prochaines règles</div>
            <div className="mt-1 font-display text-2xl font-bold text-rose-vif">
              {cycleLength - currentCycleDay + 1}j
            </div>
            <div className="text-[10px] text-muted-foreground">restants</div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Calendar grid */}
        <div className="rounded-3xl border border-white/70 glass p-4 sm:p-6 shadow-bloom">
          <div className="mb-3 grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const info = getDayInfo(d);
              const isTodayCell = isCurrentMonth && d === today.getDate();
              const isSelected = selectedDay === d;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (showLog) {
                      togglePeriodDay(d);
                    } else {
                      setSelectedDay(isSelected ? null : d);
                    }
                  }}
                  className={`relative aspect-square rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition flex flex-col items-center justify-center ${
                    isSelected ? "ring-2 ring-foreground ring-offset-1 scale-105" : ""
                  } ${isTodayCell ? "ring-2 ring-rose-vif ring-offset-2" : ""} ${cellClass(info.phase)}`}
                >
                  <span>{d}</span>
                  {info.phase === "ovulation" && (
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-violet-doux ring-2 ring-white" />
                  )}
                  {info.phase === "fertile" && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-white" />
                  )}
                  {info.cycleDay && (
                    <span className="text-[8px] opacity-60">J{info.cycleDay}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
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
              <div className={`rounded-2xl p-4 mb-3 ${phaseDetailBg(selectedDayInfo.phase)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {phaseIcon(selectedDayInfo.phase)}
                  <span className="text-sm font-bold">{selectedDayInfo.description}</span>
                </div>
                {selectedDayInfo.cycleDay && (
                  <div className="text-xs text-foreground/60">Jour {selectedDayInfo.cycleDay} sur {cycleLength}</div>
                )}
              </div>
              <div className="space-y-2">
                {selectedDayInfo.details.map((detail, idx) => (
                  <p key={idx} className="text-xs text-foreground/80 leading-relaxed flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current shrink-0 opacity-40" />
                    {detail}
                  </p>
                ))}
              </div>
              {selectedDayInfo.phase === "fertile" || selectedDayInfo.phase === "ovulation" ? (
                <div className="mt-4 rounded-xl bg-orange-50 border border-orange-200 p-3">
                  <p className="text-[10px] font-bold text-orange-800 uppercase tracking-wider mb-1">Fertilité élevée</p>
                  <p className="text-xs text-orange-700">
                    {selectedDayInfo.phase === "ovulation"
                      ? "C'est le jour le plus fertile de votre cycle. Un rapport aujourd'hui a la plus forte probabilité de mener à une conception."
                      : "Vous êtes dans votre fenêtre fertile. Les rapports durant cette période ont une chance significative de mener à une grossesse."}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom text-center">
              <div className="text-muted-foreground text-sm py-8">
                <CalendarIcon className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Cliquez sur un jour</p>
                <p className="text-xs mt-1">pour voir le détail de votre cycle et les conseils personnalisés.</p>
              </div>
            </div>
          )}

          {/* Cycle summary */}
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <h3 className="font-display text-sm font-bold mb-3">Résumé du cycle</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-vif" /> Règles</span>
                <span className="font-medium">Jours 1 à {periodLength}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-300" /> Folliculaire</span>
                <span className="font-medium">Jours {periodLength + 1} à {ovulationOffset - 2}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-400" /> Fertile</span>
                <span className="font-medium">Jours {ovulationOffset - 2} à {ovulationOffset + 2}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-doux" /> Ovulation</span>
                <span className="font-medium">Jour {ovulationOffset + 1}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-indigo-300" /> Lutéale</span>
                <span className="font-medium">Jours {ovulationOffset + 3} à {cycleLength}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs italic text-muted-foreground">
        Prédictions basées sur vos données ({cycleLength} jours, règles {periodLength} jours). Cliquez sur chaque jour pour des détails. Ne constitue pas un diagnostic médical.
      </p>
    </AppShell>
  );
}

function cellClass(phase: Phase) {
  switch (phase) {
    case "period":
      return "bg-rose-vif text-white shadow-sm";
    case "ovulation":
      return "bg-violet-doux text-white shadow-bloom ring-2 ring-violet-doux ring-offset-1";
    case "fertile":
      return "bg-orange-100 border-2 border-orange-400 text-orange-900";
    case "follicular":
      return "bg-emerald-50 text-foreground";
    case "luteal":
      return "bg-indigo-50 text-foreground";
    case "predicted":
      return "border-2 border-dashed border-rose-vif/60 text-rose-vif bg-white/60";
    default:
      return "bg-white/60 text-foreground hover:bg-white";
  }
}

function phaseDetailBg(phase: Phase) {
  switch (phase) {
    case "period": return "bg-rose-pastel/50";
    case "ovulation": return "bg-violet-doux/10";
    case "fertile": return "bg-orange-50";
    case "follicular": return "bg-emerald-50";
    case "luteal": return "bg-indigo-50";
    default: return "bg-white/50";
  }
}

function phaseIcon(phase: Phase) {
  switch (phase) {
    case "period": return <Droplet className="h-4 w-4 text-rose-vif" />;
    case "ovulation": return <Flower className="h-4 w-4 text-violet-doux" />;
    case "fertile": return <Heart className="h-4 w-4 text-orange-500" />;
    case "follicular": return <Sun className="h-4 w-4 text-emerald-500" />;
    case "luteal": return <Moon className="h-4 w-4 text-indigo-500" />;
    default: return null;
  }
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
