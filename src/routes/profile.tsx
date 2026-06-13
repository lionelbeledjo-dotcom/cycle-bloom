import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { User, Heart, Calendar, Activity, Target, Sparkles, LineChart, Crown } from "lucide-react";
import { getUserProfile, updateUserProfile, getUserStats } from "@/lib/user-store";
import { isPremium } from "@/lib/premium-gate";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Mon profil — CycleBloom AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey(k => k + 1);

  return (
    <AppShell title="Mon profil">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]" key={refreshKey}>
        <div className="space-y-6">
          <PersonalInfo onSave={refresh} />
          <CycleInfo onSave={refresh} />
          <HealthInfo onSave={refresh} />
          <GoalsInfo onSave={refresh} />
        </div>
        <aside className="space-y-4">
          <StatsCard />
          <PremiumCard />
        </aside>
      </div>
    </AppShell>
  );
}

function PersonalInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [birthYear, setBirthYear] = useState(profile?.birthYear || "");
  const [city, setCity] = useState(profile?.city || "");

  const save = () => {
    updateUserProfile({ firstName, email, birthYear, city });
    toast.success("Informations personnelles enregistrées");
    onSave();
  };

  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-4 w-4 text-rose-vif" />
        <h3 className="font-display text-lg font-semibold">Informations personnelles</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Prénom</label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Année de naissance</label>
          <input value={birthYear} onChange={e => setBirthYear(e.target.value)} type="number" min="1950" max="2010" className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Ville</label>
          <input value={city} onChange={e => setCity(e.target.value)} className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
      </div>
      <button onClick={save} className="mt-4 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Enregistrer
      </button>
    </div>
  );
}

function CycleInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [cycleLength, setCycleLength] = useState(profile?.cycleLength || 28);
  const [periodLength, setPeriodLength] = useState(profile?.periodLength || 5);
  const [lastPeriod, setLastPeriod] = useState(profile?.lastPeriod || "");
  const [irregular, setIrregular] = useState(profile?.irregular || false);

  const save = () => {
    updateUserProfile({ cycleLength, periodLength, lastPeriod, irregular });
    toast.success("Informations de cycle enregistrées");
    onSave();
  };

  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-4 w-4 text-violet-doux" />
        <h3 className="font-display text-lg font-semibold">Mon cycle</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Durée du cycle (jours)</label>
          <input value={cycleLength} onChange={e => setCycleLength(Number(e.target.value))} type="number" min="18" max="45" className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Durée des règles (jours)</label>
          <input value={periodLength} onChange={e => setPeriodLength(Number(e.target.value))} type="number" min="2" max="10" className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1 block">Dernières règles</label>
          <input value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} type="date" className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={irregular} onChange={e => setIrregular(e.target.checked)} id="irregular" className="h-4 w-4 rounded border-border text-rose-vif focus:ring-rose-vif/20" />
          <label htmlFor="irregular" className="text-xs font-medium text-foreground/60">Cycles irréguliers</label>
        </div>
      </div>
      <button onClick={save} className="mt-4 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Enregistrer
      </button>
    </div>
  );
}

function HealthInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [contraception, setContraception] = useState(profile?.contraception || "");
  const [conditions, setConditions] = useState<string[]>(profile?.conditions || []);

  const conditionOptions = ["SOPK", "Endométriose", "Fibromes", "Thyroïde", "Diabète", "Aucune"];

  const toggleCondition = (c: string) => {
    setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const save = () => {
    updateUserProfile({ contraception, conditions });
    toast.success("Informations de santé enregistrées");
    onSave();
  };

  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-4 w-4 text-rose-vif" />
        <h3 className="font-display text-lg font-semibold">Santé</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1.5 block">Contraception actuelle</label>
          <select value={contraception} onChange={e => setContraception(e.target.value)} className="w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-rose-vif">
            <option value="">Aucune</option>
            <option value="pilule">Pilule</option>
            <option value="diu-cuivre">DIU Cuivre</option>
            <option value="diu-hormonal">DIU Hormonal</option>
            <option value="implant">Implant</option>
            <option value="preservatif">Préservatif</option>
            <option value="anneau">Anneau vaginal</option>
            <option value="patch">Patch</option>
            <option value="naturelle">Méthode naturelle</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 mb-1.5 block">Conditions médicales</label>
          <div className="flex flex-wrap gap-2">
            {conditionOptions.map(c => (
              <button
                key={c}
                onClick={() => toggleCondition(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${conditions.includes(c) ? "bg-rose-vif text-white" : "bg-white/70 border border-border text-foreground/60 hover:border-rose-vif"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={save} className="mt-4 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Enregistrer
      </button>
    </div>
  );
}

function GoalsInfo({ onSave }: { onSave: () => void }) {
  const profile = getUserProfile();
  const [goals, setGoals] = useState<string[]>(profile?.goals || []);

  const goalOptions = [
    "Comprendre mon cycle",
    "Tomber enceinte",
    "Éviter une grossesse",
    "Gérer mes symptômes",
    "Suivi de grossesse",
    "Préparer la ménopause",
    "Bien-être général",
  ];

  const toggleGoal = (g: string) => {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const save = () => {
    updateUserProfile({ goals });
    toast.success("Objectifs enregistrés");
    onSave();
  };

  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-4 w-4 text-violet-doux" />
        <h3 className="font-display text-lg font-semibold">Mes objectifs</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {goalOptions.map(g => (
          <button
            key={g}
            onClick={() => toggleGoal(g)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${goals.includes(g) ? "bg-violet-doux text-white" : "bg-white/70 border border-border text-foreground/60 hover:border-violet-doux"}`}
          >
            {g}
          </button>
        ))}
      </div>
      <button onClick={save} className="mt-4 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Enregistrer
      </button>
    </div>
  );
}

function StatsCard() {
  const stats = getUserStats();

  return (
    <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
      <h3 className="font-display text-sm font-bold mb-4">Mon suivi</h3>
      <div className="space-y-3">
        <Link to="/calendar" className="flex items-center justify-between hover:text-rose-vif transition">
          <div className="flex items-center gap-2 text-xs"><Calendar className="h-3.5 w-3.5 text-rose-vif" /> Cycles suivis</div>
          <span className="font-display font-bold text-sm">{stats.cyclesTracked}</span>
        </Link>
        <Link to="/symptoms" className="flex items-center justify-between hover:text-rose-vif transition">
          <div className="flex items-center gap-2 text-xs"><Activity className="h-3.5 w-3.5 text-violet-doux" /> Symptômes enregistrés</div>
          <span className="font-display font-bold text-sm">{stats.symptomsLogged}</span>
        </Link>
        <Link to="/bloom-ai" className="flex items-center justify-between hover:text-rose-vif transition">
          <div className="flex items-center gap-2 text-xs"><Sparkles className="h-3.5 w-3.5 text-rose-vif" /> Questions Bloom AI</div>
          <span className="font-display font-bold text-sm">{stats.bloomQuestions}</span>
        </Link>
        <Link to="/insights" className="flex items-center justify-between hover:text-rose-vif transition">
          <div className="flex items-center gap-2 text-xs"><LineChart className="h-3.5 w-3.5 text-violet-doux" /> Jours suivis</div>
          <span className="font-display font-bold text-sm">{stats.daysTracked}</span>
        </Link>
      </div>
      <div className="mt-4 pt-3 border-t border-border/30 text-center">
        <span className="text-[10px] text-foreground/40">Membre depuis {stats.memberSince}</span>
      </div>
    </div>
  );
}

function PremiumCard() {
  const premium = isPremium();

  if (premium) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-5 text-white shadow-bloom">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="h-4 w-4" />
          <span className="text-sm font-bold">Premium actif</span>
        </div>
        <p className="text-xs text-white/80">Vous profitez de toutes les fonctionnalités.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-rose-vif/20 bg-rose-pastel/20 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Crown className="h-4 w-4 text-rose-vif" />
        <span className="text-sm font-bold">Passer à Premium</span>
      </div>
      <p className="text-xs text-foreground/60 mb-3">Bloom AI illimité, prédictions avancées, téléconsultation.</p>
      <Link to="/subscription" className="block w-full text-center rounded-full bg-gradient-to-r from-rose-vif to-violet-doux py-2.5 text-xs font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Voir les offres
      </Link>
    </div>
  );
}
