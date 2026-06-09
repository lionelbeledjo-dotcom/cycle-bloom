import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendrier — CycleBloom AI" }] }),
  component: CalendarPage,
});

type DayType = "period" | "fertile" | "ovulation" | "predicted" | null;

function CalendarPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay() || 7; // Mon=1..Sun=7
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();

  // Demo cycle: period days 1-5, fertile 11-16, ovulation 14, next predicted 29-? (clamped)
  const typeFor = (d: number): DayType => {
    if (d >= 1 && d <= 5) return "period";
    if (d === 14) return "ovulation";
    if (d >= 11 && d <= 16) return "fertile";
    if (d >= 29 && d <= daysInMonth) return "predicted";
    return null;
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay - 1 }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <AppShell title="Calendrier">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold capitalize">{monthName}</h2>
        <Legend />
      </div>

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
            const isToday = d === today;
            return (
              <button
                key={i}
                className={`relative aspect-square rounded-2xl text-sm font-medium transition hover:scale-[1.03] ${
                  isToday ? "ring-2 ring-rose-vif ring-offset-2" : ""
                } ${cellClass(t)}`}
              >
                {d}
                {t === "ovulation" && (
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-xs italic text-muted-foreground">
        Prédiction basée sur les données enregistrées. Ne constitue pas un diagnostic médical.
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
