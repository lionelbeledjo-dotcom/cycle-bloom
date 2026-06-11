import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Droplet, Plus } from "lucide-react";
import { getCycleData, getOvulationDay } from "@/lib/user-store";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendrier — CycleBloom AI" }] }),
  component: CalendarPage,
});

type DayType = "period" | "fertile" | "ovulation" | "predicted" | null;

function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());
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

  const typeFor = (d: number): DayType => {
    const date = new Date(year, month, d);
    const dateStr = date.toISOString().split("T")[0];

    if (markedPeriods.includes(dateStr)) return "period";

    if (!lastPeriod) return null;

    const diff = Math.floor((date.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return null;

    const dayInCycle = diff % cycleLength;

    if (dayInCycle < periodLength) return "period";
    if (dayInCycle === ovulationOffset) return "ovulation";
    if (dayInCycle >= ovulationOffset - 3 && dayInCycle <= ovulationOffset + 1) return "fertile";

    const nextPeriodStart = cycleLength - dayInCycle;
    if (nextPeriodStart <= 3 && date > today) return "predicted";

    return null;
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

  return (
    <AppShell title="Calendrier">
      {/* Header with nav */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="h-9 w-9 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="font-display text-2xl font-semibold capitalize min-w-[200px] text-center">{monthName}</h2>
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
          <Legend />
          <button
            onClick={() => setShowLog(!showLog)}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-4 py-2 text-xs font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
          >
            <Droplet className="h-3.5 w-3.5" /> Marquer mes règles
          </button>
        </div>
      </div>

      {showLog && (
        <div className="mb-4 rounded-2xl border border-rose-vif/20 bg-rose-pastel/20 p-4">
          <p className="text-sm text-foreground/80">
            <Droplet className="h-4 w-4 inline text-rose-vif mr-1" />
            <strong>Mode marquage actif :</strong> Cliquez sur les jours du calendrier pour indiquer vos jours de règles. Recliquez pour retirer.
          </p>
        </div>
      )}

      {/* Current cycle info */}
      {currentCycleDay && (
        <div className="mb-6 grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Jour du cycle</div>
            <div className="mt-1 font-display text-2xl font-bold text-rose-vif">J{currentCycleDay}</div>
          </div>
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Durée du cycle</div>
            <div className="mt-1 font-display text-2xl font-bold text-violet-doux">{cycleLength}j</div>
          </div>
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ovulation prévue</div>
            <div className="mt-1 font-display text-2xl font-bold text-violet-doux">J{ovulationOffset + 1}</div>
          </div>
          <div className="rounded-2xl border border-white/70 glass p-4 shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Durée des règles</div>
            <div className="mt-1 font-display text-2xl font-bold text-rose-vif">{periodLength}j</div>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <div className="mb-3 grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const t = typeFor(d);
            const isTodayCell = isCurrentMonth && d === today.getDate();
            return (
              <button
                key={i}
                onClick={() => showLog && togglePeriodDay(d)}
                className={`relative aspect-square rounded-2xl text-sm font-medium transition ${showLog ? "cursor-pointer hover:scale-105" : "hover:scale-[1.03]"} ${
                  isTodayCell ? "ring-2 ring-rose-vif ring-offset-2" : ""
                } ${cellClass(t)}`}
              >
                {d}
                {t === "ovulation" && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white" />
                )}
                {showLog && t === "period" && (
                  <Droplet className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 text-white/80" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-xs italic text-muted-foreground">
        Prédictions basées sur vos données de cycle ({cycleLength} jours). Marquez vos règles pour améliorer la précision. Ne constitue pas un diagnostic médical.
      </p>
    </AppShell>
  );
}

function cellClass(t: DayType) {
  switch (t) {
    case "period":
      return "bg-rose-vif text-white shadow-bloom";
    case "ovulation":
      return "bg-violet-doux text-white shadow-bloom";
    case "fertile":
      return "bg-rose-poudre text-foreground";
    case "predicted":
      return "border-2 border-dashed border-rose-vif/60 text-rose-vif bg-white/60";
    default:
      return "bg-white/60 text-foreground hover:bg-white";
  }
}

function Legend() {
  const items: { label: string; cls: string }[] = [
    { label: "Règles", cls: "bg-rose-vif" },
    { label: "Fertile", cls: "bg-rose-poudre" },
    { label: "Ovulation", cls: "bg-violet-doux" },
    { label: "Prévu", cls: "border-2 border-dashed border-rose-vif/60 bg-white" },
  ];
  return (
    <div className="hidden flex-wrap items-center gap-3 text-xs text-foreground/70 sm:flex">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-full ${i.cls}`} />
          {i.label}
        </div>
      ))}
    </div>
  );
}
