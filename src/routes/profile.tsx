import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Crown, Shield, Bell, Lock, Download, Trash2, LogOut, ChevronRight, Heart, Droplet, Moon, Dumbbell, Pill, Baby, Activity, Globe, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — CycleBloom AI" }] }),
  component: Profile,
});

function Profile() {
  const [activeTab, setActiveTab] = useState<"info" | "health" | "cycle" | "goals" | "settings">("info");

  return (
    <AppShell title="Mon profil">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left sidebar - profile card */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/70 glass p-6 text-center shadow-bloom">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-vif to-violet-doux text-2xl font-bold text-white shadow-bloom">
              C
            </div>
            <h2 className="mt-3 font-display text-lg font-bold">Camille Martin</h2>
            <p className="text-xs text-muted-foreground">camille@exemple.com</p>
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
            <div className="space-y-3">
              <StatRow label="Cycles suivis" value="14" />
              <StatRow label="Jours de suivi" value="387" />
              <StatRow label="Symptômes enregistrés" value="892" />
              <StatRow label="Questions Bloom AI" value="156" />
              <StatRow label="Membre depuis" value="Oct 2024" />
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

          {activeTab === "info" && <PersonalInfo />}
          {activeTab === "health" && <HealthInfo />}
          {activeTab === "cycle" && <CycleInfo />}
          {activeTab === "goals" && <GoalsInfo />}
          {activeTab === "settings" && <SettingsInfo />}
        </div>
      </div>
    </AppShell>
  );
}

function PersonalInfo() {
  return (
    <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
      <h3 className="font-display text-lg font-bold mb-6">Informations personnelles</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" value="Camille" />
        <Field label="Nom" value="Martin" />
        <Field label="Date de naissance" value="12/03/1995" type="date" />
        <Field label="Âge" value="31 ans" disabled />
        <Field label="Pays" value="France" />
        <Field label="Ville" value="Paris" />
        <Field label="Langue" value="Français" />
        <Field label="Fuseau horaire" value="Europe/Paris (UTC+1)" />
        <Field label="Téléphone" value="+33 6 12 34 56 78" />
        <Field label="Contact d'urgence" value="+33 6 98 76 54 32" />
      </div>
      <div className="mt-6 flex gap-3">
        <button className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
          Enregistrer
        </button>
        <button className="rounded-full border border-border bg-white/70 px-6 py-2.5 text-sm font-medium hover:bg-white transition">
          Annuler
        </button>
      </div>
    </div>
  );
}

function HealthInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-6">Profil de santé</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Taille" value="165 cm" />
          <Field label="Poids" value="58 kg" />
          <Field label="Groupe sanguin" value="A+" />
          <Field label="IMC" value="21.3 (normal)" disabled />
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Antécédents gynécologiques</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Âge premières règles" value="13 ans" />
          <Field label="Nombre de grossesses" value="0" />
          <Field label="Nombre d'accouchements" value="0" />
          <Field label="IVG / fausse couche" value="Non" />
          <Field label="Chirurgie gynécologique" value="Non" />
          <Field label="Dernier frottis" value="Mars 2026" />
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Contraception actuelle</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Type</label>
            <select className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option>Aucune</option>
              <option>Pilule combinée</option>
              <option>Pilule progestative</option>
              <option>DIU cuivre</option>
              <option selected>DIU hormonal</option>
              <option>Implant</option>
              <option>Patch</option>
              <option>Anneau</option>
              <option>Préservatif</option>
              <option>Méthode naturelle</option>
            </select>
          </div>
          <Field label="Depuis" value="Janvier 2024" />
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Conditions médicales</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {["SOPK", "Endométriose", "Fibrome", "Kyste ovarien", "Thyroïde", "Diabète", "Anémie", "Migraine", "Dépression/anxiété"].map(c => (
            <button key={c} className="rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-xs font-medium hover:border-rose-vif hover:text-rose-vif transition">
              {c}
            </button>
          ))}
        </div>
        <Field label="Allergies médicamenteuses" value="Aucune connue" />
        <div className="mt-4">
          <Field label="Médicaments actuels" value="Vitamine D 1000 UI/j, Magnésium 300mg" />
        </div>
      </div>

      <button className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Enregistrer le profil santé
      </button>
    </div>
  );
}

function CycleInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-6">Configuration du cycle</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Durée moyenne du cycle" value="28 jours" />
          <Field label="Durée moyenne des règles" value="5 jours" />
          <Field label="Régularité" value="Régulier (±2 jours)" disabled />
          <Field label="Dernières règles" value="28/05/2026" />
          <Field label="Flux habituel" value="Moyen" />
          <Field label="Syndrome prémenstruel" value="Modéré" />
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Historique récent</h3>
        <div className="space-y-3">
          {[
            { start: "28 mai 2026", length: "28j", duration: "5j" },
            { start: "30 avril 2026", length: "27j", duration: "4j" },
            { start: "3 avril 2026", length: "29j", duration: "5j" },
            { start: "5 mars 2026", length: "28j", duration: "5j" },
            { start: "5 février 2026", length: "28j", duration: "4j" },
            { start: "8 janvier 2026", length: "30j", duration: "5j" },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl bg-white/60 p-3">
              <div>
                <span className="text-xs font-medium">Début : {c.start}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-muted-foreground">
                <span>Cycle : {c.length}</span>
                <span>Règles : {c.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Prédictions IA</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-rose-pastel/50 p-4 text-center">
            <Droplet className="h-5 w-5 text-rose-vif mx-auto mb-2" />
            <div className="text-xs font-medium">Prochaines règles</div>
            <div className="font-display text-lg font-bold text-rose-vif">25 juin</div>
            <div className="text-[10px] text-muted-foreground">Confiance : 94%</div>
          </div>
          <div className="rounded-2xl bg-violet-doux/10 p-4 text-center">
            <Heart className="h-5 w-5 text-violet-doux mx-auto mb-2" />
            <div className="text-xs font-medium">Prochaine ovulation</div>
            <div className="font-display text-lg font-bold text-violet-doux">11 juin</div>
            <div className="text-[10px] text-muted-foreground">Confiance : 89%</div>
          </div>
          <div className="rounded-2xl bg-lavande p-4 text-center">
            <Activity className="h-5 w-5 text-foreground/60 mx-auto mb-2" />
            <div className="text-xs font-medium">Fenêtre fertile</div>
            <div className="font-display text-lg font-bold">8-12 juin</div>
            <div className="text-[10px] text-muted-foreground">Confiance : 91%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalsInfo() {
  const [goals, setGoals] = useState({
    tracking: true,
    fertility: false,
    pregnancy: false,
    health: true,
    fitness: true,
  });

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
              onClick={() => setGoals(prev => ({ ...prev, [goal.id]: !prev[goal.id as keyof typeof prev] }))}
              className={`flex items-start gap-3 rounded-2xl p-4 text-left transition ${
                goals[goal.id as keyof typeof goals]
                  ? "border-2 border-rose-vif bg-rose-pastel/30 shadow-bloom"
                  : "border border-border bg-white/60 hover:bg-white"
              }`}
            >
              <goal.icon className={`h-5 w-5 shrink-0 mt-0.5 ${goals[goal.id as keyof typeof goals] ? "text-rose-vif" : "text-foreground/40"}`} />
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
            <select className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option>Sédentaire</option>
              <option>Légèrement active (1-2x/semaine)</option>
              <option selected>Modérément active (3-4x/semaine)</option>
              <option>Très active (5-6x/semaine)</option>
              <option>Athlète</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Niveau de stress</label>
            <select className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option>Faible</option>
              <option selected>Modéré</option>
              <option>Élevé</option>
              <option>Très élevé</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Qualité du sommeil</label>
            <select className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option>Mauvaise</option>
              <option>Moyenne</option>
              <option selected>Bonne</option>
              <option>Excellente</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Régime alimentaire</label>
            <select className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif">
              <option selected>Omnivore</option>
              <option>Végétarien</option>
              <option>Végétalien</option>
              <option>Sans gluten</option>
              <option>Anti-inflammatoire</option>
            </select>
          </div>
        </div>
      </div>

      <button className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
        Mettre à jour mes objectifs
      </button>
    </div>
  );
}

function SettingsInfo() {
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
      </div>

      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h3 className="font-display text-lg font-bold mb-4">Confidentialité</h3>
        <div className="space-y-3">
          <Toggle label="Profil communauté visible" desc="Les autres membres peuvent voir votre profil" defaultOn={false} />
          <Toggle label="Données anonymisées pour la recherche" desc="Contribuer à l'amélioration des prédictions (données anonymes)" defaultOn />
          <Toggle label="Verrouillage biométrique" desc="Face ID / empreinte pour accéder à l'app" defaultOn />
        </div>
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

function Field({ label, value, type = "text", disabled = false }: { label: string; value: string; type?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className={`mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20 ${disabled ? "opacity-60" : ""}`}
      />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-foreground/60">{label}</span>
      <span className="text-xs font-semibold">{value}</span>
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
