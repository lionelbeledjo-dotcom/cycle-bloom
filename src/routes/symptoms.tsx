import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/symptoms")({
  head: () => ({ meta: [{ title: "Symptômes — CycleBloom AI" }] }),
  component: Symptoms,
});

const MOODS = [
  { emoji: "😊", label: "Bien" },
  { emoji: "😌", label: "Calme" },
  { emoji: "😰", label: "Anxieuse" },
  { emoji: "😤", label: "Irritée" },
  { emoji: "😢", label: "Triste" },
  { emoji: "🔥", label: "Énergique" },
  { emoji: "🥺", label: "Sensible" },
  { emoji: "✨", label: "Motivée" },
];

const PHYSICAL = [
  "Crampes", "Maux de tête", "Ballonnements", "Seins sensibles",
  "Mal de dos", "Fatigue", "Nausées", "Acné", "Vertiges", "Insomnie",
];

const FLOW = [
  { id: "none", label: "Aucun", color: "bg-white/60" },
  { id: "spotting", label: "Spotting", color: "bg-rose-poudre" },
  { id: "light", label: "Léger", color: "bg-rose-vif/40" },
  { id: "medium", label: "Moyen", color: "bg-rose-vif/70" },
  { id: "heavy", label: "Abondant", color: "bg-rose-vif" },
];

const DISCHARGE = ["Aucune", "Blanc d'œuf", "Crémeuse", "Aqueuse", "Collante"];

function Symptoms() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([]);
  const [flow, setFlow] = useState("none");
  const [discharge, setDischarge] = useState("Aucune");
  const [temp, setTemp] = useState("");
  const [sleep, setSleep] = useState(3);
  const [saved, setSaved] = useState(false);

  const toggleMood = (m: string) => setSelectedMoods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  const togglePhysical = (p: string) => setSelectedPhysical(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <AppShell title="Suivi du jour">
      <div className="text-xs uppercase tracking-[0.2em] text-violet-doux -mt-6 mb-6">{today}</div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Flow */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold mb-4">Flux menstruel</h3>
          <div className="flex gap-2">
            {FLOW.map(f => (
              <button
                key={f.id}
                onClick={() => setFlow(f.id)}
                className={`flex-1 rounded-2xl py-3 text-xs font-medium transition ${
                  flow === f.id
                    ? `${f.color} ${f.id !== "none" ? "text-white" : "text-foreground"} ring-2 ring-rose-vif ring-offset-2`
                    : "bg-white/60 text-foreground/60 hover:bg-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold mb-4">Humeur</h3>
          <div className="flex flex-wrap gap-2">
            {MOODS.map(m => (
              <button
                key={m.label}
                onClick={() => toggleMood(m.label)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  selectedMoods.includes(m.label)
                    ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-bloom"
                    : "bg-white/70 text-foreground/70 hover:bg-white hover:text-foreground"
                }`}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Physical symptoms */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold mb-4">Symptômes physiques</h3>
          <div className="flex flex-wrap gap-2">
            {PHYSICAL.map(p => (
              <button
                key={p}
                onClick={() => togglePhysical(p)}
                className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
                  selectedPhysical.includes(p)
                    ? "bg-rose-vif text-white shadow-bloom"
                    : "border border-border bg-white/70 text-foreground/70 hover:border-rose-vif hover:text-rose-vif"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Discharge */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold mb-4">Glaire cervicale</h3>
          <div className="flex flex-wrap gap-2">
            {DISCHARGE.map(d => (
              <button
                key={d}
                onClick={() => setDischarge(d)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  discharge === d
                    ? "bg-violet-doux text-white shadow-bloom"
                    : "bg-white/70 text-foreground/70 hover:bg-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold mb-4">Température basale (BBT)</h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.1"
              min="35"
              max="40"
              placeholder="36.5"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="w-32 rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
            <span className="text-sm text-muted-foreground">°C</span>
          </div>
        </div>

        {/* Sleep */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <h3 className="font-display text-lg font-semibold mb-4">Qualité du sommeil</h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => setSleep(s)}
                className={`h-10 w-10 rounded-full text-lg transition ${
                  s <= sleep ? "bg-violet-doux text-white shadow-bloom" : "bg-white/60 text-foreground/40"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {sleep === 1 ? "Très mauvais" : sleep === 2 ? "Mauvais" : sleep === 3 ? "Moyen" : sleep === 4 ? "Bon" : "Excellent"}
          </p>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-6 rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-semibold mb-4">Notes du jour</h3>
        <textarea
          placeholder="Comment vous sentez-vous aujourd'hui ? Quelque chose à noter..."
          className="w-full rounded-2xl border border-border bg-white/80 p-4 text-sm outline-none resize-none h-24 focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
        />
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            const entry = {
              date: new Date().toISOString().split("T")[0],
              moods: selectedMoods,
              physical: selectedPhysical,
              flow,
              discharge,
              temp: temp || null,
              sleep,
            };
            const stored = localStorage.getItem("cyclebloom_symptoms");
            const history = stored ? JSON.parse(stored) : [];
            const existing = history.findIndex((h: any) => h.date === entry.date);
            if (existing >= 0) history[existing] = entry;
            else history.push(entry);
            localStorage.setItem("cyclebloom_symptoms", JSON.stringify(history));
            setSaved(true);
          }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-8 py-3.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.02]"
        >
          {saved ? <><Check className="h-4 w-4" /> Enregistré !</> : "Enregistrer le suivi"}
        </button>
      </div>
    </AppShell>
  );
}
