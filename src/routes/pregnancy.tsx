import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Baby, Heart, Calendar, Activity, Scale, AlertTriangle, Plus, RotateCcw, Check } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/pregnancy")({
  head: () => ({ meta: [{ title: "Grossesse — CycleBloom AI" }] }),
  component: Pregnancy,
});

const FRUIT_SIZES = [
  { week: 4, fruit: "🌰", name: "Graine de pavot", size: "0.2 cm", weight: "<1g" },
  { week: 8, fruit: "🫐", name: "Myrtille", size: "1.6 cm", weight: "1g" },
  { week: 12, fruit: "🍑", name: "Prune", size: "5.4 cm", weight: "14g" },
  { week: 16, fruit: "🍋", name: "Citron", size: "11.6 cm", weight: "100g" },
  { week: 20, fruit: "🍌", name: "Banane", size: "25 cm", weight: "300g" },
  { week: 24, fruit: "🌽", name: "Épi de maïs", size: "30 cm", weight: "600g" },
  { week: 28, fruit: "🍆", name: "Aubergine", size: "37 cm", weight: "1 kg" },
  { week: 32, fruit: "🥥", name: "Noix de coco", size: "42 cm", weight: "1.7 kg" },
  { week: 36, fruit: "🍉", name: "Melon", size: "47 cm", weight: "2.6 kg" },
  { week: 40, fruit: "🎃", name: "Citrouille", size: "51 cm", weight: "3.4 kg" },
];

const SYMPTOMS_TO_WATCH = [
  "Saignements vaginaux",
  "Douleurs abdominales intenses",
  "Maux de tête sévères",
  "Vision floue",
  "Gonflement soudain visage/mains",
  "Diminution des mouvements du bébé",
];

interface PregnancyData {
  startDate: string;
  weightEntries: { week: number; weight: number }[];
  kickSessions: { date: string; count: number }[];
  appointments: { date: string; type: string; doctor: string; done: boolean }[];
}

function getPregnancyData(): PregnancyData {
  const stored = localStorage.getItem("cyclebloom_pregnancy");
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  return {
    startDate: "",
    weightEntries: [],
    kickSessions: [],
    appointments: [],
  };
}

function savePregnancyData(data: PregnancyData) {
  localStorage.setItem("cyclebloom_pregnancy", JSON.stringify(data));
}

function Pregnancy() {
  const [data, setData] = useState<PregnancyData>(getPregnancyData);
  const [kickCount, setKickCount] = useState(0);
  const [showSetup, setShowSetup] = useState(!data.startDate);
  const [startInput, setStartInput] = useState(data.startDate || "");

  const update = (updates: Partial<PregnancyData>) => {
    const newData = { ...data, ...updates };
    setData(newData);
    savePregnancyData(newData);
  };

  const handleSetStart = () => {
    if (!startInput) return;
    update({ startDate: startInput });
    setShowSetup(false);
    toast.success("Date de début enregistrée !");
  };

  const today = new Date();
  const startDate = data.startDate ? new Date(data.startDate) : null;
  const daysSinceStart = startDate ? Math.floor((today.getTime() - startDate.getTime()) / 86400000) : 0;
  const currentWeek = Math.min(40, Math.max(1, Math.floor(daysSinceStart / 7) + 1));
  const trimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;
  const dueDate = startDate ? new Date(startDate.getTime() + 280 * 86400000) : null;
  const daysLeft = dueDate ? Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / 86400000)) : 0;
  const dueDateStr = dueDate ? dueDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const currentFruit = FRUIT_SIZES.reduce((prev, curr) => curr.week <= currentWeek ? curr : prev, FRUIT_SIZES[0]);

  const todayKicks = data.kickSessions.find(s => s.date === today.toISOString().split("T")[0]);

  const addKick = () => {
    const dateStr = today.toISOString().split("T")[0];
    const sessions = [...data.kickSessions];
    const existing = sessions.findIndex(s => s.date === dateStr);
    const newCount = kickCount + 1;
    setKickCount(newCount);
    if (existing >= 0) {
      sessions[existing] = { date: dateStr, count: newCount };
    } else {
      sessions.push({ date: dateStr, count: newCount });
    }
    update({ kickSessions: sessions });
  };

  const resetKicks = () => {
    setKickCount(0);
    const dateStr = today.toISOString().split("T")[0];
    const sessions = data.kickSessions.filter(s => s.date !== dateStr);
    update({ kickSessions: sessions });
    toast.success("Compteur réinitialisé");
  };

  const toggleAppointment = (index: number) => {
    const appointments = [...data.appointments];
    appointments[index] = { ...appointments[index], done: !appointments[index].done };
    update({ appointments });
  };

  if (showSetup) {
    return (
      <AppShell title="Mode Grossesse">
        <div className="max-w-md mx-auto rounded-3xl border border-white/70 glass p-8 shadow-bloom text-center">
          <Baby className="h-12 w-12 text-rose-vif mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Configurez votre suivi</h2>
          <p className="text-sm text-foreground/60 mb-6">Entrez la date de vos dernières règles (DDR) pour calculer automatiquement votre semaine de grossesse et votre date de terme.</p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block text-left">Date des dernières règles</label>
              <input
                type="date"
                value={startInput}
                onChange={(e) => setStartInput(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
              />
            </div>
            <button
              onClick={handleSetStart}
              disabled={!startInput}
              className="w-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux py-3 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition disabled:opacity-40"
            >
              Commencer le suivi
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Mode Grossesse">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Week counter */}
        <div className="rounded-3xl border border-white/70 glass p-8 shadow-bloom lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] items-center">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest text-violet-doux">Semaine</div>
              <div className="font-display text-7xl font-bold text-gradient-bloom">{currentWeek}</div>
              <div className="text-xs text-muted-foreground">Trimestre {trimester}/3</div>
            </div>
            <div>
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Début</span>
                  <span>Terme ({dueDateStr})</span>
                </div>
                <div className="h-3 rounded-full bg-lavande overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux transition-all"
                    style={{ width: `${(currentWeek / 40) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/70 p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Restant</div>
                  <div className="font-display text-lg font-bold text-rose-vif">{daysLeft}j</div>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Trimestre</div>
                  <div className="font-display text-lg font-bold text-violet-doux">{trimester}</div>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">Poids bébé</div>
                  <div className="font-display text-lg font-bold text-violet-doux">~{currentFruit.weight}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Baby size */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom text-center">
          <div className="text-[10px] uppercase tracking-widest text-violet-doux mb-2">Taille du bébé</div>
          <div className="text-7xl my-4">{currentFruit.fruit}</div>
          <div className="font-display text-xl font-bold">{currentFruit.name}</div>
          <div className="text-sm text-muted-foreground">{currentFruit.size}</div>
          <div className="mt-4 flex justify-center gap-1">
            {FRUIT_SIZES.map((f, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${f.week <= currentWeek ? "bg-rose-vif" : "bg-lavande"}`}
              />
            ))}
          </div>
        </div>

        {/* Weight chart */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-violet-doux" />
              <h3 className="font-display text-lg font-semibold">Suivi du poids</h3>
            </div>
            <WeightInput onAdd={(w) => {
              const entries = [...data.weightEntries, { week: currentWeek, weight: w }];
              update({ weightEntries: entries });
              toast.success(`${w} kg enregistré`);
            }} />
          </div>
          {data.weightEntries.length > 1 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.weightEntries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--lavande)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} label={{ value: "Semaine", position: "insideBottom", offset: -5, fontSize: 10 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} unit=" kg" />
                <Tooltip contentStyle={{ background: "white", border: "1px solid var(--border)", borderRadius: 16 }} formatter={(v: number) => `${v} kg`} />
                <Line type="monotone" dataKey="weight" stroke="var(--rose-vif)" strokeWidth={2.5} dot={{ fill: "var(--rose-vif)", r: 4 }} name="Poids" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-sm text-foreground/40">
              Ajoutez au moins 2 pesées pour voir le graphique
            </div>
          )}
        </div>

        {/* Kick counter */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-6 text-white shadow-bloom">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold">Compteur de coups</h3>
            </div>
            <button onClick={resetKicks} className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-sm text-white/80 mb-4">Comptez les mouvements de bébé sur 1 heure</p>
          <div className="text-center">
            <div className="font-display text-5xl font-bold">{kickCount}</div>
            <div className="text-xs text-white/60 mt-1">mouvements</div>
          </div>
          <button onClick={addKick} className="mt-4 w-full rounded-2xl bg-white/20 py-3 text-sm font-semibold backdrop-blur hover:bg-white/30 active:scale-95 transition">
            + Ajouter un mouvement
          </button>
          {kickCount >= 10 && (
            <p className="mt-3 text-xs text-white/80 text-center">10+ mouvements/heure = activite normale</p>
          )}
        </div>

        {/* Appointments */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-violet-doux" />
              <h3 className="font-display text-lg font-semibold">Rendez-vous</h3>
            </div>
            <AppointmentAdd onAdd={(appt) => {
              update({ appointments: [...data.appointments, appt] });
              toast.success("Rendez-vous ajouté !");
            }} />
          </div>
          <div className="space-y-3">
            {data.appointments.length === 0 ? (
              <p className="text-xs text-foreground/40 text-center py-4">Aucun rendez-vous. Ajoutez-en un !</p>
            ) : (
              data.appointments
                .sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1)
                .map((a, i) => (
                  <button key={i} onClick={() => toggleAppointment(i)} className={`flex items-start gap-3 w-full text-left ${a.done ? "opacity-50" : ""}`}>
                    <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${a.done ? "bg-emerald-400" : "bg-rose-vif"}`} />
                    <div>
                      <div className="text-xs font-semibold">{a.type}</div>
                      <div className="text-[10px] text-muted-foreground">{a.date} · {a.doctor}</div>
                    </div>
                    {a.done && <Check className="h-3 w-3 text-emerald-500 ml-auto mt-1" />}
                  </button>
                ))
            )}
          </div>
        </div>

        {/* Symptoms to watch */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h3 className="font-display text-lg font-semibold">Symptômes à surveiller</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Consultez immédiatement si vous ressentez :</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SYMPTOMS_TO_WATCH.map(s => (
              <div key={s} className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-xs font-medium text-amber-800">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {s}
              </div>
            ))}
          </div>
        </div>

        {/* Reconfigure */}
        <div className="lg:col-span-3">
          <button onClick={() => setShowSetup(true)} className="text-xs text-foreground/40 hover:text-foreground/60 transition">
            Modifier la date de début de grossesse
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function WeightInput({ onAdd }: { onAdd: (w: number) => void }) {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");

  if (!show) {
    return (
      <button onClick={() => setShow(true)} className="h-8 w-8 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
        <Plus className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        step="0.1"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="kg"
        className="w-20 rounded-xl border border-border bg-white/80 px-3 py-1.5 text-xs outline-none focus:border-rose-vif"
        autoFocus
      />
      <button
        onClick={() => { const w = parseFloat(val); if (w > 0) { onAdd(w); setVal(""); setShow(false); } }}
        className="rounded-full bg-rose-vif px-3 py-1.5 text-xs font-semibold text-white"
      >
        OK
      </button>
    </div>
  );
}

function AppointmentAdd({ onAdd }: { onAdd: (a: { date: string; type: string; doctor: string; done: boolean }) => void }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [doctor, setDoctor] = useState("");

  if (!show) {
    return (
      <button onClick={() => setShow(true)} className="h-8 w-8 rounded-full bg-white/70 border border-border flex items-center justify-center hover:bg-white transition">
        <Plus className="h-3.5 w-3.5" />
      </button>
    );
  }

  const submit = () => {
    if (!date || !type) return;
    const formatted = new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    onAdd({ date: formatted, type, doctor: doctor || "—", done: false });
    setDate(""); setType(""); setDoctor(""); setShow(false);
  };

  return (
    <div className="absolute right-4 top-4 z-10 w-64 rounded-2xl border border-border bg-white p-4 shadow-xl space-y-2">
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-border px-3 py-1.5 text-xs outline-none" />
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type (ex: Échographie T2)" className="w-full rounded-xl border border-border px-3 py-1.5 text-xs outline-none" />
      <input value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Médecin (optionnel)" className="w-full rounded-xl border border-border px-3 py-1.5 text-xs outline-none" />
      <div className="flex gap-2">
        <button onClick={() => setShow(false)} className="flex-1 rounded-xl border border-border py-1.5 text-xs">Annuler</button>
        <button onClick={submit} className="flex-1 rounded-xl bg-rose-vif py-1.5 text-xs font-semibold text-white">Ajouter</button>
      </div>
    </div>
  );
}
