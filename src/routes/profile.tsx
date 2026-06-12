import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { toast } from "sonner";
import { Crown, Shield, Bell, Lock, Download, Trash2, LogOut, ChevronRight, Heart, Droplet, Moon, Dumbbell, Pill, Baby, Activity, Globe, Calendar } from "lucide-react";
import { getUserProfile, updateUserProfile, getCycleData, getUserStats } from "@/lib/user-store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — CycleBloom AI" }] }),
  component: Profile,
});

function Profile() {
  const [activeTab, setActiveTab] = useState<"info" | "health" | "cycle" | "goals" | "settings">("info");
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(k => k + 1);
  const profile = getUserProfile();
  const firstName = profile?.firstName || "Utilisatrice";
  const email = profile?.email || "email@exemple.com";
  const initial = firstName.charAt(0).toUpperCase();
  const stats = getUserStats();

  return (
    <AppShell title="Mon profil">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left sidebar - profile card */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/70 glass p-6 text-center shadow-bloom">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-vif to-violet-doux text-2xl font-bold text-white shadow-bloom">
              {initial}
            </div>
            <h2 className="mt-3 font-display text-lg font-bold">{firstName}</h2>
            <p className="text-xs text-muted-foreground">{email}</p>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-rose-pastel px-3 py-1 text-[10px] font-semibold text-rose-vif">
              <Crown className="h-3 w-3" /> Premium
            </div>
            <button className="mt-4 w-full rounded-full border border-border bg-white/70 py-2 text-xs font-medium hover:bg-white transition">
              Changer la photo
            </button>
          </div>

          {/* Stats card */}
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <h3 className="font-display text-sm font-semibold mb-3">Mon suivi</h3>
            <div className="space-y-1">
              <Link to="/calendar" className="flex items-center justify-between py-2 px-2 rounded-xl hover:bg-white/80 transition">
                <span className="text-xs text-foreground/60">Cycles suivis</span>
                <span className="text-xs font-semibold">{stats.cyclesTracked} →</span>
              </Link>
              <Link to="/symptoms" className="flex items-center justify-between py-2 px-2 rounded-xl hover:bg-white/80 transition">
                <span className="text-xs text-foreground/60">Jours de suivi</span>
                <span className="text-xs font-semibold">{stats.daysTracked} →</span>
              </Link>
              <Link to="/symptoms" className="flex items-center justify-between py-2 px-2 rounded-xl hover:bg-white/80 transition">
                <span className="text-xs text-foreground/60">Symptômes enregistrés</span>
                <span className="text-xs font-semibold">{stats.symptomsLogged} →</span>
              </Link>
              <Link to="/bloom-ai" className="flex items-center justify-between py-2 px-2 rounded-xl hover:bg-white/80 transition">
                <span className="text-xs text-foreground/60">Questions Bloom AI</span>
                <span className="text-xs font-semibold">{stats.bloomQuestions} →</span>
              </Link>
              <div className="flex items-center justify-between py-2 px-2">
                <span className="text-xs text-foreground/60">Membre depuis</span>
                <span className="text-xs font-semibold">{stats.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Subscription CTA */}
          <Link to="/subscription" className="block rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-5 text-white shadow-bloom hover:-translate-y-0.5 transition">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-semibold">Premium actif</span>
            </div>
            <p className="text-xs text-white/85">Prochain renouvellement : 15 juillet 2026</p>
            <p className="mt-2 text-[10px] text-white/70">Gérer mon abonnement →</p>
          </Link>
        </div>

        {/* Right content */}
        <div>
          {/* Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {[
              { id: "info" as const, label: "Personnel" },
              { id: "health" as const, label: "Santé" },
              { id: "cycle" as const, label: "Cycle" },
              { id: "goals" as const, label: "Objectifs" },
              { id: "settings" as const, label: "Paramètres" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-bloom"
                    : "bg-white/70 text-foreground/60 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "info" && <PersonalInfo onSave={refresh} />}
          {activeTab === "health" && <HealthInfo onSave={refresh} />}
          {activeTab === "cycle" && <CycleInfo onSave={refresh} />}
          {activeTab === "goals" && <GoalsInfo onSave={refresh} />}
          {activeTab === "settings" && <SettingsInfo />}
        </div>
      </div>
    </AppShell>
  );
}

function PersonalInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [birthYear, setBirthYear] = useState(profile?.birthYear || "1995");
  const [country, setCountry] = useState(profile?.country || "France");
  const [city, setCity] = useState(profile?.city || "");
  const [language, setLanguage] = useState(profile?.language || "Français");
  const [timezone, setTimezone] = useState(profile?.timezone || "Europe/Paris (UTC+1)");
  const age = new Date().getFullYear() - parseInt(birthYear);

  const handleSave = () => {
    updateUserProfile({ firstName, email, birthYear, country, city, language, timezone });
    toast.success("Informations personnelles enregistrées !", {
      description: "Vos modifications ont bien été prises en compte.",
    });
    onSave();
  };

  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <h3 className="font-display text-lg font-bold mb-6">Informations personnelles</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <EditField label="Prénom" value={firstName} onChange={setFirstName} />
        <EditField label="Email" value={email} onChange={setEmail} type="email" />
        <EditField label="Année de naissance" value={birthYear} onChange={setBirthYear} />
        <Field label="Âge" value={`${age} ans`} disabled />
        <EditField label="Pays" value={country} onChange={setCountry} />
        <EditField label="Ville" value={city} onChange={setCity} />
        <EditField label="Langue" value={language} onChange={setLanguage} />
        <EditField label="Fuseau horaire" value={timezone} onChange={setTimezone} />
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
        >
          Enregistrer
        </button>
        <button className="rounded-full border border-border bg-white/70 px-6 py-2.5 text-sm font-medium hover:bg-white transition">
          Annuler
        </button>
      </div>
    </div>
  );
}

function HealthInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [height, setHeight] = useState(profile?.height || "");
  const [weight, setWeight] = useState(profile?.weight || "");
  const [bloodType, setBloodType] = useState(profile?.bloodType || "");
  const [firstPeriodAge, setFirstPeriodAge] = useState(profile?.firstPeriodAge || "");
  const [pregnancies, setPregnancies] = useState(profile?.pregnancies || "0");
  const [deliveries, setDeliveries] = useState(profile?.deliveries || "0");
  const [ivgMiscarriage, setIvgMiscarriage] = useState(profile?.ivgMiscarriage || "Non");
  const [surgery, setSurgery] = useState(profile?.surgery || "Non");
  const [lastPap, setLastPap] = useState(profile?.lastPap || "");
  const [contraception, setContraception] = useState(profile?.contraception || "none");
  const [allergies, setAllergies] = useState(profile?.allergies || "Aucune connue");
  const [medications, setMedications] = useState(profile?.medications || "");
  const [selectedConditions, setSelectedConditions] = useState<string[]>(profile?.conditions || []);

  const bmi = height && weight ? (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1) : "";
  const bmiLabel = bmi ? (parseFloat(bmi) < 18.5 ? "maigreur" : parseFloat(bmi) < 25 ? "normal" : parseFloat(bmi) < 30 ? "surpoids" : "obésité") : "";

  const handleSave = () => {
    updateUserProfile({
      height, weight, bloodType, firstPeriodAge, pregnancies, deliveries,
      ivgMiscarriage, surgery, lastPap, contraception, allergies, medications,
      conditions: selectedConditions,
    });
    toast.success("Profil santé enregistré !", {
      description: "Vos informations de santé ont bien été mises à jour.",
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-6">Profil de santé</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <EditField label="Taille (cm)" value={height} onChange={setHeight} placeholder="165" />
          <EditField label="Poids (kg)" value={weight} onChange={setWeight} placeholder="58" />
          <EditField label="Groupe sanguin" value={bloodType} onChange={setBloodType} placeholder="A+" />
          <Field label="IMC" value={bmi ? `${bmi} (${bmiLabel})` : "Renseigner taille et poids"} disabled />
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Antécédents gynécologiques</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <EditField label="Âge premières règles" value={firstPeriodAge} onChange={setFirstPeriodAge} placeholder="13" />
          <EditField label="Nombre de grossesses" value={pregnancies} onChange={setPregnancies} />
          <EditField label="Nombre d'accouchements" value={deliveries} onChange={setDeliveries} />
          <EditField label="IVG / fausse couche" value={ivgMiscarriage} onChange={setIvgMiscarriage} />
          <EditField label="Chirurgie gynécologique" value={surgery} onChange={setSurgery} />
          <EditField label="Dernier frottis" value={lastPap} onChange={setLastPap} placeholder="Mars 2026" />
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Contraception actuelle</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Type</label>
            <select
              value={contraception}
              onChange={e => setContraception(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif"
            >
              <option value="none">Aucune</option>
              <option value="pill">Pilule combinée</option>
              <option value="mini-pill">Pilule progestative</option>
              <option value="iud-copper">DIU cuivre</option>
              <option value="iud-hormonal">DIU hormonal</option>
              <option value="implant">Implant</option>
              <option value="patch">Patch</option>
              <option value="ring">Anneau</option>
              <option value="condom">Préservatif</option>
              <option value="natural">Méthode naturelle</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Conditions médicales</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {["SOPK", "Endométriose", "Fibrome", "Kyste ovarien", "Thyroïde", "Diabète", "Anémie", "Migraine", "Dépression/anxiété"].map(c => (
            <button
              key={c}
              onClick={() => setSelectedConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                selectedConditions.includes(c)
                  ? "border-rose-vif bg-rose-vif text-white"
                  : "border-border bg-white/70 hover:border-rose-vif hover:text-rose-vif"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <EditField label="Allergies médicamenteuses" value={allergies} onChange={setAllergies} />
        <div className="mt-4">
          <EditField label="Médicaments actuels" value={medications} onChange={setMedications} placeholder="Ex: Vitamine D 1000 UI/j" />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
      >
        Enregistrer le profil santé
      </button>
    </div>
  );
}

function CycleInfo({ onSave }: { onSave: () => void }) {
  const { cycleLength: initCycleLength, periodLength: initPeriodLength, lastPeriod } = getCycleData();
  const profile = getUserProfile();
  const [cycleLength, setCycleLength] = useState(String(initCycleLength));
  const [periodLength, setPeriodLength] = useState(String(initPeriodLength));
  const [lastPeriodDate, setLastPeriodDate] = useState(profile?.lastPeriod || "");
  const [irregular, setIrregular] = useState(profile?.irregular || false);

  const lastPeriodStr = lastPeriod ? lastPeriod.toLocaleDateString("fr-FR") : "Non renseigné";

  const handleSave = () => {
    updateUserProfile({
      cycleLength: parseInt(cycleLength),
      periodLength: parseInt(periodLength),
      lastPeriod: lastPeriodDate,
      irregular,
    });
    toast.success("Configuration du cycle enregistrée !", {
      description: `Durée du cycle : ${cycleLength} jours, durée des règles : ${periodLength} jours.`,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-6">Configuration du cycle</h3>
        <div className="space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Durée moyenne du cycle</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min="21"
                max="45"
                value={cycleLength}
                onChange={e => setCycleLength(e.target.value)}
                className="flex-1 accent-rose-vif"
              />
              <span className="w-14 text-center font-display text-xl font-bold text-rose-vif">{cycleLength}j</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Moyenne : 28 jours (21-35 jours est normal)</p>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Durée moyenne des règles</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min="2"
                max="10"
                value={periodLength}
                onChange={e => setPeriodLength(e.target.value)}
                className="flex-1 accent-rose-vif"
              />
              <span className="w-14 text-center font-display text-xl font-bold text-violet-doux">{periodLength}j</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Date des dernières règles</label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={e => setLastPeriodDate(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 p-4">
            <input
              type="checkbox"
              checked={irregular}
              onChange={e => setIrregular(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-rose-vif"
            />
            <div>
              <div className="text-sm font-medium">Mes cycles sont irréguliers</div>
              <div className="text-[10px] text-muted-foreground">La durée varie de plus de 7 jours d'un mois à l'autre</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Prédictions IA</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-rose-pastel/50 p-4 text-center">
            <Droplet className="h-5 w-5 text-rose-vif mx-auto mb-2" />
            <div className="text-xs font-medium">Prochaines règles</div>
            <div className="font-display text-lg font-bold text-rose-vif">
              {lastPeriodDate ? new Date(new Date(lastPeriodDate).getTime() + parseInt(cycleLength) * 86400000).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "—"}
            </div>
          </div>
          <div className="rounded-2xl bg-violet-doux/10 p-4 text-center">
            <Heart className="h-5 w-5 text-violet-doux mx-auto mb-2" />
            <div className="text-xs font-medium">Prochaine ovulation</div>
            <div className="font-display text-lg font-bold text-violet-doux">
              {lastPeriodDate ? new Date(new Date(lastPeriodDate).getTime() + (parseInt(cycleLength) - 14) * 86400000).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "—"}
            </div>
          </div>
          <div className="rounded-2xl bg-lavande p-4 text-center">
            <Activity className="h-5 w-5 text-foreground/60 mx-auto mb-2" />
            <div className="text-xs font-medium">Fenêtre fertile</div>
            <div className="font-display text-lg font-bold">
              {lastPeriodDate ? (() => {
                const ovDay = parseInt(cycleLength) - 14;
                const start = new Date(new Date(lastPeriodDate).getTime() + (ovDay - 3) * 86400000);
                const end = new Date(new Date(lastPeriodDate).getTime() + (ovDay + 1) * 86400000);
                return `${start.getDate()}-${end.getDate()} ${end.toLocaleDateString("fr-FR", { month: "short" })}`;
              })() : "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalsInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [goals, setGoals] = useState<Record<string, boolean>>({
    tracking: profile?.goals?.includes("tracking") ?? true,
    fertility: profile?.goals?.includes("fertility") ?? false,
    pregnancy: profile?.goals?.includes("pregnancy") ?? false,
    health: profile?.goals?.includes("health") ?? false,
    fitness: profile?.goals?.includes("fitness") ?? false,
    contraception: profile?.goals?.includes("contraception") ?? false,
  });
  const [activity, setActivity] = useState(profile?.activity || "moderate");
  const [stress, setStress] = useState(profile?.stress || "moderate");
  const [sleep, setSleep] = useState(profile?.sleep || "good");
  const [diet, setDiet] = useState(profile?.diet || "omnivore");

  const handleSave = () => {
    const selectedGoals = Object.entries(goals).filter(([_, v]) => v).map(([k]) => k);
    updateUserProfile({ goals: selectedGoals, activity, stress, sleep, diet });
    toast.success("Objectifs mis à jour !", {
      description: "Vos préférences et objectifs ont bien été enregistrés.",
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-2">Mon objectif principal</h3>
        <p className="text-xs text-muted-foreground mb-6">CycleBloom adapte ses recommandations en fonction de votre objectif.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { id: "tracking", icon: Calendar, label: "Suivi de cycle", desc: "Comprendre et suivre mes cycles" },
            { id: "fertility", icon: Baby, label: "Conception", desc: "Optimiser mes chances de grossesse" },
            { id: "pregnancy", icon: Heart, label: "Grossesse", desc: "Suivre ma grossesse semaine par semaine" },
            { id: "health", icon: Activity, label: "Santé hormonale", desc: "Équilibrer mes hormones naturellement" },
            { id: "fitness", icon: Dumbbell, label: "Fitness & cycle", desc: "Adapter mon sport à mon cycle" },
            { id: "contraception", icon: Pill, label: "Contraception", desc: "Suivre ma contraception et ses effets" },
          ].map(goal => (
            <button
              key={goal.id}
              onClick={() => setGoals(prev => ({ ...prev, [goal.id]: !prev[goal.id] }))}
              className={`flex items-start gap-3 rounded-2xl p-4 text-left transition ${
                goals[goal.id]
                  ? "border-2 border-rose-vif bg-rose-pastel/30 shadow-bloom"
                  : "border border-border bg-white/60 hover:bg-white"
              }`}
            >
              <goal.icon className={`h-5 w-5 shrink-0 mt-0.5 ${goals[goal.id] ? "text-rose-vif" : "text-foreground/40"}`} />
              <div>
                <div className="text-sm font-semibold">{goal.label}</div>
                <div className="text-[10px] text-muted-foreground">{goal.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Mode de vie</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Activité physique</label>
            <select value={activity} onChange={e => setActivity(e.target.value)} className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option value="sedentary">Sédentaire</option>
              <option value="light">Légèrement active (1-2x/semaine)</option>
              <option value="moderate">Modérément active (3-4x/semaine)</option>
              <option value="very-active">Très active (5-6x/semaine)</option>
              <option value="athlete">Athlète</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Niveau de stress</label>
            <select value={stress} onChange={e => setStress(e.target.value)} className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option value="low">Faible</option>
              <option value="moderate">Modéré</option>
              <option value="high">Élevé</option>
              <option value="very-high">Très élevé</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Qualité du sommeil</label>
            <select value={sleep} onChange={e => setSleep(e.target.value)} className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option value="poor">Mauvaise</option>
              <option value="average">Moyenne</option>
              <option value="good">Bonne</option>
              <option value="excellent">Excellente</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Régime alimentaire</label>
            <select value={diet} onChange={e => setDiet(e.target.value)} className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option value="omnivore">Omnivore</option>
              <option value="vegetarian">Végétarien</option>
              <option value="vegan">Végétalien</option>
              <option value="gluten-free">Sans gluten</option>
              <option value="anti-inflammatory">Anti-inflammatoire</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
      >
        Mettre à jour mes objectifs
      </button>
    </div>
  );
}

function SettingsInfo() {
  const handleSaveNotifications = () => {
    toast.success("Notifications mises à jour !", {
      description: "Vos préférences de notifications ont été enregistrées.",
    });
  };

  const handleSavePrivacy = () => {
    toast.success("Paramètres de confidentialité mis à jour !", {
      description: "Vos préférences de confidentialité ont été enregistrées.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Notifications</h3>
        <div className="space-y-3">
          <Toggle label="Rappels de cycle" desc="Notifications avant les règles et l'ovulation" defaultOn />
          <Toggle label="Rappels quotidiens" desc="Rappel pour enregistrer vos symptômes" defaultOn />
          <Toggle label="Bloom AI" desc="Conseils personnalisés basés sur votre phase" defaultOn />
          <Toggle label="Communauté" desc="Réponses à vos posts et mentions" defaultOn={false} />
          <Toggle label="Newsletter santé" desc="Articles et actualités hebdomadaires" defaultOn={false} />
        </div>
        <button
          onClick={handleSaveNotifications}
          className="mt-4 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2 text-xs font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
        >
          Enregistrer les notifications
        </button>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Confidentialité</h3>
        <div className="space-y-3">
          <Toggle label="Profil communauté visible" desc="Les autres membres peuvent voir votre profil" defaultOn={false} />
          <Toggle label="Données anonymisées pour la recherche" desc="Contribuer à l'amélioration des prédictions (données anonymes)" defaultOn />
          <Toggle label="Verrouillage biométrique" desc="Face ID / empreinte pour accéder à l'app" defaultOn />
        </div>
        <button
          onClick={handleSavePrivacy}
          className="mt-4 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2 text-xs font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
        >
          Enregistrer la confidentialité
        </button>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Compte</h3>
        <div className="space-y-3">
          <SettingRow icon={Globe} label="Langue" value="Français" />
          <SettingRow icon={Lock} label="Changer le mot de passe" />
          <SettingRow icon={Download} label="Exporter mes données" value="PDF / CSV" />
          <SettingRow icon={Shield} label="Authentification 2FA" value="Activé" />
          <Link to="/subscription" className="flex items-center justify-between py-3 border-b border-border/30 hover:text-rose-vif transition">
            <div className="flex items-center gap-3">
              <Crown className="h-4 w-4 text-foreground/40" />
              <span className="text-sm">Gérer l'abonnement</span>
            </div>
            <ChevronRight className="h-4 w-4 text-foreground/30" />
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-red-100 bg-red-50/30 p-6">
        <h3 className="font-display text-lg font-bold text-red-800 mb-4">Zone dangereuse</h3>
        <div className="space-y-3">
          <button className="flex items-center gap-3 text-sm text-red-600 hover:text-red-800 transition">
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
          <button className="flex items-center gap-3 text-sm text-red-600 hover:text-red-800 transition">
            <Trash2 className="h-4 w-4" /> Supprimer mon compte et toutes mes données
          </button>
        </div>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
      />
    </div>
  );
}

function Field({ label, value, disabled = false }: { label: string; value: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type="text"
        defaultValue={value}
        disabled={disabled}
        className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none opacity-60"
      />
    </div>
  );
}


function Toggle({ label, desc, defaultOn = true }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[10px] text-muted-foreground">{desc}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-10 rounded-full transition ${on ? "bg-rose-vif" : "bg-border"}`}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
          style={{ left: "2px", transform: on ? "translateX(16px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}

function SettingRow({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value?: string }) {
  return (
    <button className="flex w-full items-center justify-between py-3 border-b border-border/30 hover:text-rose-vif transition">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-foreground/40" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-muted-foreground">{value}</span>}
        <ChevronRight className="h-4 w-4 text-foreground/30" />
      </div>
    </button>
  );
}
