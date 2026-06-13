import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/symptoms")({
  head: () => ({ meta: [{ title: "Symptômes — CycleBloom AI" }] }),
  component: Symptoms,
});

interface SymptomEntry {
  id: string;
  date: string;
  moods: string[];
  physical: string[];
  discharge: string | null;
  temperature: number | null;
  sleep_quality: number;
  notes: string | null;
}

function getSymptomHistory(): SymptomEntry[] {
  const stored = localStorage.getItem("cyclebloom_symptoms");
  return stored ? JSON.parse(stored) : [];
}

function saveSymptomEntry(entry: SymptomEntry) {
  const history = getSymptomHistory();
  const existing = history.findIndex(e => e.date === entry.date);
  if (existing >= 0) {
    history[existing] = entry;
  } else {
    history.unshift(entry);
  }
  localStorage.setItem("cyclebloom_symptoms", JSON.stringify(history));
}

const MOODS = [
  { emoji: "😊", label: "Bien" }, { emoji: "😌", label: "Calme" },
  { emoji: "😰", label: "Anxieuse" }, { emoji: "😤", label: "Irritée" },
  { emoji: "😢", label: "Triste" }, { emoji: "🔥", label: "Énergique" },
  { emoji: "🥺", label: "Sensible" }, { emoji: "✨", label: "Motivée" },
];
const PHYSICAL = ["Crampes", "Maux de tête", "Ballonnements", "Seins sensibles", "Mal de dos", "Fatigue", "Nausées", "Acné", "Vertiges", "Insomnie"];
const DISCHARGE = ["Aucune", "Blanc d'œuf", "Crémeuse", "Aqueuse", "Collante"];

function Symptoms() {
  const [history, setHistory] = useState<SymptomEntry[]>(getSymptomHistory);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([]);
  const [discharge, setDischarge] = useState("Aucune");
  const [temp, setTemp] = useState("");
  const [sleep, setSleep] = useState(3);
  const [notes, setNotes] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const todayIso = new Date().toISOString().slice(0, 10);

  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const handleSave = () => {
    const entry: SymptomEntry = {
      id: todayIso,
      date: todayIso,
      moods: selectedMoods,
      physical: selectedPhysical,
      discharge: discharge === "Aucune" ? null : discharge,
      temperature: temp ? parseFloat(temp) : null,
      sleep_quality: sleep,
      notes: notes || null,
    };
    saveSymptomEntry(entry);
    setHistory(getSymptomHistory());
    toast.success("Suivi enregistré", { description: `Vos symptômes du ${today} sont sauvegardés.` });
  };

  return (
    <AppShell title="Suivi du jour">
      <div className="text-xs uppercase tracking-[0.2em] text-violet-doux -mt-6 mb-6">{today}</div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Humeur">
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button key={m.label} onClick={() => setSelectedMoods((prev) => toggle(prev, m.label))}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${selectedMoods.includes(m.label) ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-bloom" : "bg-white/70 text-foreground/70 hover:bg-white"}`}>
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Symptômes physiques">
          <div className="flex flex-wrap gap-2">
            {PHYSICAL.map((p) => (
              <button key={p} onClick={() => setSelectedPhysical((prev) => toggle(prev, p))}
                className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${selectedPhysical.includes(p) ? "bg-rose-vif text-white shadow-bloom" : "border border-border bg-white/70 text-foreground/70 hover:border-rose-vif"}`}>
                {p}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Glaire cervicale">
          <div className="flex flex-wrap gap-2">
            {DISCHARGE.map((d) => (
              <button key={d} onClick={() => setDischarge(d)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${discharge === d ? "bg-violet-doux text-white shadow-bloom" : "bg-white/70 text-foreground/70 hover:bg-white"}`}>{d}</button>
            ))}
          </div>
        </Card>

        <Card title="Température basale">
          <div className="flex items-center gap-3">
            <input type="number" step="0.1" min="35" max="40" placeholder="36.5" value={temp} onChange={(e) => setTemp(e.target.value)}
              className="w-32 rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
            <span className="text-sm text-muted-foreground">°C</span>
          </div>
        </Card>

        <Card title="Qualité du sommeil">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setSleep(s)} className={`h-10 w-10 rounded-full text-lg transition ${s <= sleep ? "bg-violet-doux text-white shadow-bloom" : "bg-white/60 text-foreground/40"}`}>★</button>
            ))}
          </div>
        </Card>

        <Card title="Notes du jour">
          <textarea placeholder="Quelque chose à noter..." value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-2xl border border-border bg-white/80 p-4 text-sm outline-none resize-none h-24 focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={handleSave}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-8 py-3.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.02]">
          <Check className="h-4 w-4" /> Enregistrer le suivi
        </button>
      </div>

      <div className="mt-8">
        <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition">
          <Calendar className="h-4 w-4" /> Historique ({history.length} entrée{history.length > 1 ? "s" : ""})
          {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showHistory && (
          <div className="mt-4 space-y-3">
            {history.length === 0 ? <p className="text-sm text-muted-foreground">Aucun suivi enregistré pour le moment.</p>
              : history.slice(0, 30).map((e) => (
                <button key={e.id} onClick={() => setSelectedEntry(selectedEntry === e.id ? null : e.id)}
                  className="w-full text-left rounded-2xl border border-white/70 glass p-4 shadow-sm hover:shadow-bloom transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold">
                        {new Date(e.date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {e.moods.length > 0 && <span className="rounded-full bg-violet-doux/10 text-violet-doux px-2 py-0.5 text-[10px] font-medium">{e.moods.length} humeur{e.moods.length > 1 ? "s" : ""}</span>}
                        {e.physical.length > 0 && <span className="rounded-full bg-orange-100 text-orange-700 px-2 py-0.5 text-[10px] font-medium">{e.physical.length} symptôme{e.physical.length > 1 ? "s" : ""}</span>}
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-foreground/30 transition ${selectedEntry === e.id ? "rotate-180" : ""}`} />
                  </div>
                  {selectedEntry === e.id && (
                    <div className="mt-3 pt-3 border-t border-border/30 space-y-2 text-xs">
                      {e.moods.length > 0 && <div><span className="text-muted-foreground">Humeurs :</span> {e.moods.join(", ")}</div>}
                      {e.physical.length > 0 && <div><span className="text-muted-foreground">Symptômes :</span> {e.physical.join(", ")}</div>}
                      {e.discharge && <div><span className="text-muted-foreground">Glaire :</span> {e.discharge}</div>}
                      {e.temperature && <div><span className="text-muted-foreground">Température :</span> {e.temperature}°C</div>}
                      {e.sleep_quality && <div><span className="text-muted-foreground">Sommeil :</span> {"★".repeat(e.sleep_quality)}{"☆".repeat(5 - e.sleep_quality)}</div>}
                      {e.notes && <div><span className="text-muted-foreground">Notes :</span> {e.notes}</div>}
                    </div>
                  )}
                </button>
              ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <h3 className="font-display text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
