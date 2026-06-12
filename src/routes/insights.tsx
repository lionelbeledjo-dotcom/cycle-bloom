import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { Download, TrendingUp, Target } from "lucide-react";
import { toast } from "sonner";
import { getUserProfile } from "@/lib/user-store";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Rapports — CycleBloom AI" }] }),
  component: Insights,
});

const defaultCycleHistory = [
  { cycle: "Cycle 1", length: 28 },
  { cycle: "Cycle 2", length: 29 },
  { cycle: "Cycle 3", length: 27 },
  { cycle: "Cycle 4", length: 28 },
  { cycle: "Cycle 5", length: 30 },
  { cycle: "Cycle 6", length: 28 },
];

const defaultSymptomFrequency = [
  { symptom: "Fatigue", count: 18 },
  { symptom: "Crampes", count: 15 },
  { symptom: "Maux de tête", count: 12 },
  { symptom: "Ballonnements", count: 10 },
  { symptom: "Irritabilité", count: 9 },
  { symptom: "Acné", count: 7 },
];

const tempData = [
  { day: 1, temp: 36.3 }, { day: 3, temp: 36.2 }, { day: 5, temp: 36.4 },
  { day: 7, temp: 36.3 }, { day: 9, temp: 36.2 }, { day: 11, temp: 36.3 },
  { day: 13, temp: 36.5 }, { day: 14, temp: 36.8 }, { day: 16, temp: 36.9 },
  { day: 18, temp: 37.0 }, { day: 20, temp: 36.9 }, { day: 22, temp: 36.8 },
  { day: 24, temp: 36.7 }, { day: 26, temp: 36.6 }, { day: 28, temp: 36.4 },
];

const moodByPhase = [
  { phase: "Menstruation", happy: 30, neutral: 45, low: 25 },
  { phase: "Folliculaire", happy: 65, neutral: 25, low: 10 },
  { phase: "Ovulation", happy: 75, neutral: 20, low: 5 },
  { phase: "Lutéale", happy: 35, neutral: 35, low: 30 },
];

function computeSymptomFrequency(): { symptom: string; count: number }[] | null {
  try {
    const raw = localStorage.getItem("cyclebloom_symptoms");
    if (!raw) return null;
    const entries = JSON.parse(raw) as { physical?: string[]; moods?: string[] }[];
    if (!entries.length) return null;

    const counts: Record<string, number> = {};
    for (const entry of entries) {
      for (const s of entry.physical || []) {
        counts[s] = (counts[s] || 0) + 1;
      }
      for (const m of entry.moods || []) {
        counts[m] = (counts[m] || 0) + 1;
      }
    }

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([symptom, count]) => ({ symptom, count }));

    return sorted.length > 0 ? sorted : null;
  } catch {
    return null;
  }
}

function Insights() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [symptomFrequency, setSymptomFrequency] = useState(defaultSymptomFrequency);
  const [cycleHistory, setCycleHistory] = useState(defaultCycleHistory);
  const [avgCycleLength, setAvgCycleLength] = useState("28.3 jours");
  const [periodLength, setPeriodLength] = useState("4.5 jours");

  useEffect(() => {
    // Load dynamic symptom data from localStorage
    const dynamicSymptoms = computeSymptomFrequency();
    if (dynamicSymptoms) {
      setSymptomFrequency(dynamicSymptoms);
    }

    // Load user profile for cycle stats
    const profile = getUserProfile();
    if (profile) {
      const cl = profile.cycleLength || 28;
      setAvgCycleLength(`${cl} jours`);
      setPeriodLength(`${profile.periodLength || 5} jours`);

      // Generate cycle history based on user's cycle length with slight variation
      const history = Array.from({ length: 6 }, (_, i) => ({
        cycle: `Cycle ${i + 1}`,
        length: cl + Math.round((Math.random() - 0.5) * 4),
      }));
      setCycleHistory(history);
    }
  }, []);

  const handleExportPDF = () => {
    toast("Préparation de l'export...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const chartClass = (chartId: string) =>
    selectedChart === chartId
      ? "rounded-3xl border border-white/70 glass p-6 shadow-bloom lg:col-span-2 cursor-pointer transition-all"
      : "rounded-3xl border border-white/70 glass p-6 shadow-bloom cursor-pointer transition-all hover:shadow-lg";

  return (
    <AppShell title="Rapports & Insights">
      <div className="flex items-center justify-between -mt-4 mb-8">
        <p className="text-sm text-foreground/70">Analyse de vos 6 derniers cycles</p>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-violet-doux shadow-sm hover:bg-white"
        >
          <Download className="h-3.5 w-3.5" /> Exporter PDF
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatCard icon={TrendingUp} label="Cycle moyen" value={avgCycleLength} desc="Très régulier" />
        <StatCard icon={Target} label="Précision IA" value="98%" desc="Basée sur 6 cycles" />
        <StatCard icon={TrendingUp} label="Durée règles" value={periodLength} desc="Moyenne" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cycle length history */}
        <div className={chartClass("cycles")} onClick={() => setSelectedChart(selectedChart === "cycles" ? null : "cycles")}>
          <h3 className="font-display text-lg font-semibold mb-4">Longueur des cycles</h3>
          <ResponsiveContainer width="100%" height={selectedChart === "cycles" ? 300 : 200}>
            <LineChart data={cycleHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--lavande)" />
              <XAxis dataKey="cycle" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} domain={[24, 32]} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid var(--border)", borderRadius: 16 }} />
              <ReferenceLine y={28} stroke="var(--violet-doux)" strokeDasharray="3 3" label={{ value: "28j", fill: "var(--violet-doux)", fontSize: 10 }} />
              <Line type="monotone" dataKey="length" stroke="var(--rose-vif)" strokeWidth={3} dot={{ fill: "var(--rose-vif)", r: 5 }} name="Jours" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Symptom frequency */}
        <div className={chartClass("symptoms")} onClick={() => setSelectedChart(selectedChart === "symptoms" ? null : "symptoms")}>
          <h3 className="font-display text-lg font-semibold mb-4">Symptômes les plus fréquents</h3>
          <ResponsiveContainer width="100%" height={selectedChart === "symptoms" ? 300 : 200}>
            <BarChart data={symptomFrequency} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--lavande)" />
              <XAxis type="number" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} />
              <YAxis dataKey="symptom" type="category" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} width={90} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid var(--border)", borderRadius: 16 }} />
              <Bar dataKey="count" fill="var(--rose-vif)" radius={[0, 8, 8, 0]} name="Occurrences" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature curve */}
        <div className={chartClass("temp")} onClick={() => setSelectedChart(selectedChart === "temp" ? null : "temp")}>
          <h3 className="font-display text-lg font-semibold mb-1">Courbe de température</h3>
          <p className="text-xs text-muted-foreground mb-4">Décalage thermique détecté au jour 14 (ovulation)</p>
          <ResponsiveContainer width="100%" height={selectedChart === "temp" ? 300 : 200}>
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--lavande)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} label={{ value: "Jour du cycle", position: "insideBottom", offset: -5, fontSize: 10 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} domain={[36, 37.2]} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid var(--border)", borderRadius: 16 }} formatter={(v: number) => `${v}°C`} />
              <ReferenceLine x={14} stroke="var(--violet-doux)" strokeDasharray="3 3" label={{ value: "Ovulation", fill: "var(--violet-doux)", fontSize: 9 }} />
              <Line type="monotone" dataKey="temp" stroke="var(--violet-doux)" strokeWidth={2.5} dot={{ fill: "var(--violet-doux)", r: 3 }} name="Temp" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood by phase */}
        <div className={chartClass("mood")} onClick={() => setSelectedChart(selectedChart === "mood" ? null : "mood")}>
          <h3 className="font-display text-lg font-semibold mb-4">Humeur par phase</h3>
          <div className="space-y-4">
            {moodByPhase.map(p => (
              <div key={p.phase}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium">{p.phase}</span>
                  <span className="text-muted-foreground">{p.happy}% positive</span>
                </div>
                <div className="flex h-4 rounded-full overflow-hidden">
                  <div className="bg-emerald-400" style={{ width: `${p.happy}%` }} />
                  <div className="bg-amber-300" style={{ width: `${p.neutral}%` }} />
                  <div className="bg-rose-vif" style={{ width: `${p.low}%` }} />
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Positive</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-300" /> Neutre</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-vif" /> Basse</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, label, value, desc }: { icon: any; label: string; value: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Icon className="h-3.5 w-3.5 text-violet-doux" /> {label}
      </div>
      <div className="font-display text-2xl font-bold text-gradient-bloom">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}
