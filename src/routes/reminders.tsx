import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Bell, Droplet, Thermometer, Pill, Moon, Dumbbell, Check } from "lucide-react";

export const Route = createFileRoute("/reminders")({
  head: () => ({ meta: [{ title: "Rappels — CycleBloom AI" }] }),
  component: Reminders,
});

const REMINDERS = [
  { id: "period", icon: Droplet, label: "Rappel règles", desc: "Notification X jours avant les prochaines règles", defaultOn: true, defaultTime: "09:00", extra: "days_before", defaultDays: 2 },
  { id: "pill", icon: Pill, label: "Pilule / médicament", desc: "Rappel quotidien pour votre contraception", defaultOn: false, defaultTime: "08:00" },
  { id: "temp", icon: Thermometer, label: "Température basale", desc: "Rappel chaque matin pour prendre votre BBT", defaultOn: true, defaultTime: "06:30" },
  { id: "symptoms", icon: Bell, label: "Suivi quotidien", desc: "Rappel pour enregistrer vos symptômes du jour", defaultOn: true, defaultTime: "21:00" },
  { id: "water", icon: Droplet, label: "Hydratation", desc: "Rappels réguliers pour boire de l'eau", defaultOn: false, defaultTime: "10:00" },
  { id: "sleep", icon: Moon, label: "Heure de coucher", desc: "Notification pour aller dormir à l'heure", defaultOn: false, defaultTime: "22:30" },
  { id: "exercise", icon: Dumbbell, label: "Activité physique", desc: "Rappel d'exercice adapté à votre phase", defaultOn: false, defaultTime: "18:00" },
];

const HISTORY = [
  { text: "Rappel règles : prochaines dans 2 jours", time: "Aujourd'hui, 09:00", read: true },
  { text: "N'oubliez pas de prendre votre température", time: "Aujourd'hui, 06:30", read: true },
  { text: "Comment vous sentez-vous ? Notez vos symptômes", time: "Hier, 21:00", read: true },
  { text: "Hydratation : pensez à boire un verre d'eau", time: "Hier, 14:00", read: false },
  { text: "Phase folliculaire : moment idéal pour le cardio !", time: "Avant-hier, 18:00", read: true },
];

function Reminders() {
  return (
    <AppShell title="Rappels">
      <p className="-mt-4 mb-8 text-sm text-foreground/70">Configurez vos notifications pour ne rien oublier.</p>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {REMINDERS.map(r => (
            <ReminderCard key={r.id} reminder={r} />
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-semibold mb-4">Historique</h3>
            <div className="space-y-3">
              {HISTORY.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${h.read ? "bg-muted-foreground/30" : "bg-rose-vif"}`} />
                  <div>
                    <div className="text-xs text-foreground/80">{h.text}</div>
                    <div className="text-[10px] text-muted-foreground">{h.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-6 text-white shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest">Astuce</div>
            <h3 className="mt-2 font-display text-lg font-bold">Rappels intelligents</h3>
            <p className="mt-2 text-sm text-white/85">
              Bloom AI adapte automatiquement vos rappels en fonction de votre phase de cycle. Activez le mode intelligent !
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function ReminderCard({ reminder }: { reminder: typeof REMINDERS[0] }) {
  const [on, setOn] = useState(reminder.defaultOn);
  const [time, setTime] = useState(reminder.defaultTime);
  const Icon = reminder.icon;

  return (
    <div className={`rounded-3xl border glass p-5 shadow-bloom transition ${on ? "border-rose-vif/30" : "border-white/70"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
            on ? "bg-gradient-to-br from-rose-vif to-violet-doux text-white shadow-bloom" : "bg-white/60 text-foreground/40"
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">{reminder.label}</h4>
            <p className="text-[11px] text-muted-foreground">{reminder.desc}</p>
          </div>
        </div>
        <button
          onClick={() => setOn(!on)}
          className={`relative h-7 w-12 rounded-full transition ${on ? "bg-rose-vif" : "bg-border"}`}
        >
          <span
            className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform"
            style={{ left: "4px", transform: on ? "translateX(20px)" : "translateX(0)" }}
          />
        </button>
      </div>
      {on && (
        <div className="mt-4 flex items-center gap-4 pl-[52px]">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Heure</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block rounded-xl border border-border bg-white/80 px-3 py-2 text-sm outline-none focus:border-rose-vif"
            />
          </div>
          {reminder.extra === "days_before" && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Jours avant</label>
              <input
                type="number"
                min="1"
                max="7"
                defaultValue={reminder.defaultDays}
                className="mt-1 block w-16 rounded-xl border border-border bg-white/80 px-3 py-2 text-sm outline-none focus:border-rose-vif"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
