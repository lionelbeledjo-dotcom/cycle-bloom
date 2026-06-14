import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CycleRing } from "@/components/CycleRing";
import { Sparkles, Droplet, Heart, Plus, Loader2, Moon, Sun, Zap, ThermometerSun, Apple, Activity, Calendar, TrendingUp, Baby, ChevronRight } from "lucide-react";
import { useProfile, usePeriodLogs, useSymptomLogs, computeCycleInfo } from "@/lib/cycle-store";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Mon Cycle — CycleBloom AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: profile, isLoading: pLoad } = useProfile();
  const { data: periods = [], isLoading: lLoad } = usePeriodLogs();
  const { data: symptoms = [] } = useSymptomLogs();

  if (pLoad || lLoad) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-32 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </AppShell>
    );
  }

  const today = new Date();
  const info = computeCycleInfo(profile, periods);
  const firstName = profile?.first_name || "vous";
  const monthDay = today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  const phaseLabels: Record<string, string> = {
    period: "Menstruation",
    follicular: "Phase folliculaire",
    fertile: "Fenêtre fertile",
    ovulation: "Ovulation",
    luteal: "Phase lutéale",
  };

  const phaseDescriptions: Record<string, string> = {
    period: "Votre corps se renouvelle. Repos et hydratation sont essentiels.",
    follicular: "Énergie en hausse ! Moment idéal pour l'exercice et les projets créatifs.",
    fertile: "Vous êtes dans votre fenêtre fertile. Énergie et libido au maximum.",
    ovulation: "Jour d'ovulation. Pic de fertilité et d'énergie.",
    luteal: "Phase de repos. Privilégiez le yoga et l'alimentation anti-inflammatoire.",
  };

  const phaseColors: Record<string, string> = {
    period: "from-rose-500 to-pink-600",
    follicular: "from-emerald-400 to-teal-500",
    fertile: "from-orange-400 to-amber-500",
    ovulation: "from-violet-500 to-purple-600",
    luteal: "from-indigo-400 to-blue-500",
  };

  const phaseBgColors: Record<string, string> = {
    period: "bg-rose-50 border-rose-200",
    follicular: "bg-emerald-50 border-emerald-200",
    fertile: "bg-orange-50 border-orange-200",
    ovulation: "bg-violet-50 border-violet-200",
    luteal: "bg-indigo-50 border-indigo-200",
  };

  const fertilityLevel = info.phase === "fertile" || info.phase === "ovulation" ? "Élevée" : info.phase === "follicular" ? "Moyenne" : "Faible";
  const fertilityColor = info.phase === "fertile" || info.phase === "ovulation" ? "text-orange-600" : info.phase === "follicular" ? "text-amber-600" : "text-emerald-600";

  const daysUntilPeriod = info.nextPeriod ? Math.max(0, Math.ceil((info.nextPeriod.getTime() - today.getTime()) / 86400000)) : null;
  const daysUntilOvulation = info.cycleDay && info.ovulationOffset ? Math.max(0, info.ovulationOffset + 1 - info.cycleDay) : null;

  const todaySymptom = symptoms.find(s => s.date === today.toISOString().slice(0, 10));

  const recommendations = getRecommendations(info.phase);

  return (
    <AppShell>
      {/* Header with greeting */}
      <div className="mb-6">
        <p className="text-sm text-foreground/50 capitalize">{monthDay}</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1">
          Bonjour {firstName} <span className="text-rose-vif">🌸</span>
        </h1>
      </div>

      {!info.anchor ? (
        <div className="text-center py-12">
          <div className="mx-auto w-64 h-64 rounded-full bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center mb-8">
            <Droplet className="h-16 w-16 text-rose-vif opacity-50" />
          </div>
          <p className="font-display text-xl font-bold mb-3">Commencez votre suivi</p>
          <p className="text-sm text-foreground/70 max-w-md mx-auto mb-6">
            Marquez le premier jour de vos dernières règles pour activer toutes les prédictions et recommandations personnalisées.
          </p>
          <Link to="/calendar" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-8 py-4 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
            <Droplet className="h-4 w-4" /> Marquer mes règles
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cycle Ring + Phase Info */}
          <div className="rounded-3xl border border-white/70 glass p-6 sm:p-8 shadow-bloom">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <CycleRing
                  day={info.cycleDay ?? 1}
                  cycleLength={info.cycleLength}
                  periodLength={info.periodLength}
                  ovulationDay={info.ovulationOffset + 1}
                  fertileStart={info.ovulationOffset - 2}
                  fertileEnd={info.ovulationOffset + 2}
                />
              </div>
              <div className="flex-1 text-center lg:text-left space-y-4">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${phaseBgColors[info.phase ?? "luteal"]}`}>
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${phaseColors[info.phase ?? "luteal"]}`} />
                    {phaseLabels[info.phase ?? "luteal"]}
                  </div>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-sm">
                  {phaseDescriptions[info.phase ?? "luteal"]}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                  {daysUntilPeriod !== null && (
                    <MiniStat icon={<Droplet className="h-4 w-4 text-rose-vif" />} label="Prochaines règles" value={`${daysUntilPeriod}j`} />
                  )}
                  {daysUntilOvulation !== null && daysUntilOvulation > 0 && (
                    <MiniStat icon={<Sun className="h-4 w-4 text-orange-500" />} label="Ovulation" value={`${daysUntilOvulation}j`} />
                  )}
                  <MiniStat icon={<Baby className="h-4 w-4 text-violet-doux" />} label="Fertilité" value={fertilityLevel} className={fertilityColor} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            <QuickAction to="/calendar" icon={<Droplet className="h-5 w-5 text-rose-vif" />} label="Règles" bg="bg-rose-50" />
            <QuickAction to="/symptoms" icon={<Plus className="h-5 w-5 text-violet-doux" />} label="Symptômes" bg="bg-violet-50" />
            <QuickAction to="/insights" icon={<TrendingUp className="h-5 w-5 text-indigo-500" />} label="Rapports" bg="bg-indigo-50" />
            <QuickAction to="/bloom-ai" icon={<Sparkles className="h-5 w-5 text-amber-500" />} label="Bloom AI" bg="bg-amber-50" />
          </div>

          {/* Predictions Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <PredictionCard
              to="/calendar"
              icon={<Droplet className="h-5 w-5" />}
              iconBg="bg-rose-100 text-rose-600"
              title="Prochaines règles"
              value={daysUntilPeriod !== null ? `Dans ${daysUntilPeriod} jours` : "—"}
              subtitle={info.nextPeriod ? `Prévues le ${info.nextPeriod.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : "Données insuffisantes"}
            />
            <PredictionCard
              to="/calendar"
              icon={<Sun className="h-5 w-5" />}
              iconBg="bg-orange-100 text-orange-600"
              title="Ovulation"
              value={daysUntilOvulation !== null && daysUntilOvulation > 0 ? `Dans ${daysUntilOvulation} jours` : info.phase === "ovulation" ? "Aujourd'hui" : "Passée"}
              subtitle={`Jour estimé : J${info.ovulationOffset + 1} du cycle`}
            />
            <PredictionCard
              to="/calendar"
              icon={<Heart className="h-5 w-5" />}
              iconBg="bg-pink-100 text-pink-600"
              title="Fenêtre fertile"
              value={info.phase === "fertile" || info.phase === "ovulation" ? "En cours" : fertilityLevel}
              subtitle={`J${info.ovulationOffset - 2} à J${info.ovulationOffset + 2} du cycle`}
            />
            <PredictionCard
              to="/symptoms"
              icon={<Activity className="h-5 w-5" />}
              iconBg="bg-violet-100 text-violet-600"
              title="Suivi du jour"
              value={todaySymptom ? `${todaySymptom.moods.length + todaySymptom.physical.length} notés` : "Non rempli"}
              subtitle={todaySymptom ? "Symptômes enregistrés" : "Cliquez pour enregistrer"}
            />
          </div>

          {/* Daily Recommendations */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-vif" />
                Recommandations du jour
              </h2>
              <Link to="/bloom-ai" className="text-xs font-medium text-rose-vif hover:text-rose-vif/80 flex items-center gap-1">
                Voir plus <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 border border-white/80">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-xl ${rec.bg} flex items-center justify-center`}>
                    {rec.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground/90">{rec.title}</p>
                    <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cycle Summary */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-violet-doux" />
              Résumé du cycle
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SummaryItem label="Jour du cycle" value={`J${info.cycleDay}`} />
              <SummaryItem label="Longueur" value={`${info.cycleLength}j`} />
              <SummaryItem label="Durée règles" value={`${info.periodLength}j`} />
              <SummaryItem label="Jours notés" value={`${periods.length}`} />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function MiniStat({ icon, label, value, className = "" }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-foreground/50">{label}</p>
        <p className={`text-sm font-bold ${className}`}>{value}</p>
      </div>
    </div>
  );
}

function QuickAction({ to, icon, label, bg }: { to: string; icon: React.ReactNode; label: string; bg: string }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-2 group">
      <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl ${bg} flex items-center justify-center transition group-hover:scale-105 group-hover:shadow-bloom`}>
        {icon}
      </div>
      <span className="text-[11px] font-medium text-foreground/70">{label}</span>
    </Link>
  );
}

function PredictionCard({ to, icon, iconBg, title, value, subtitle }: { to: string; icon: React.ReactNode; iconBg: string; title: string; value: string; subtitle: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-white/70 glass p-5 shadow-sm hover:shadow-bloom transition group">
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <ChevronRight className="h-4 w-4 text-foreground/30 group-hover:text-foreground/60 transition" />
      </div>
      <p className="text-xs text-foreground/50 mt-3">{title}</p>
      <p className="text-lg font-bold mt-0.5">{value}</p>
      <p className="text-[11px] text-foreground/50 mt-1">{subtitle}</p>
    </Link>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center rounded-2xl bg-white/60 p-3 border border-white/80">
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-foreground/50 uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}

function getRecommendations(phase: string | null) {
  const base = [
    { icon: <ThermometerSun className="h-5 w-5 text-rose-vif" />, bg: "bg-rose-50", title: "", description: "" },
    { icon: <Apple className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50", title: "", description: "" },
    { icon: <Moon className="h-5 w-5 text-indigo-500" />, bg: "bg-indigo-50", title: "", description: "" },
    { icon: <Zap className="h-5 w-5 text-amber-500" />, bg: "bg-amber-50", title: "", description: "" },
  ];

  switch (phase) {
    case "period":
      base[0].title = "Chaleur apaisante";
      base[0].description = "Une bouillotte sur le bas-ventre soulage les crampes.";
      base[1].title = "Fer & vitamine C";
      base[1].description = "Épinards, lentilles, agrumes pour compenser la perte de fer.";
      base[2].title = "Sommeil prioritaire";
      base[2].description = "8h minimum. Votre corps a besoin de récupérer.";
      base[3].title = "Exercice doux";
      base[3].description = "Marche, yoga doux ou étirements légers sont idéaux.";
      break;
    case "follicular":
      base[0].title = "Énergie montante";
      base[0].description = "Profitez de cette phase pour des entraînements intenses.";
      base[1].title = "Protéines & fibres";
      base[1].description = "Nourrissez vos muscles avec des protéines complètes.";
      base[2].title = "Créativité";
      base[2].description = "Phase idéale pour démarrer de nouveaux projets.";
      base[3].title = "Cardio & musculation";
      base[3].description = "Votre corps récupère mieux — poussez vos limites !";
      break;
    case "fertile":
    case "ovulation":
      base[0].title = "Pic d'énergie";
      base[0].description = "Vous êtes au sommet de votre vitalité ce jour.";
      base[1].title = "Antioxydants";
      base[1].description = "Baies, légumes colorés, oméga-3 pour la fertilité.";
      base[2].title = "Sociabilité";
      base[2].description = "Confiance et communication sont à leur maximum.";
      base[3].title = "Sport intense";
      base[3].description = "HIIT, danse, course — votre performance est optimale.";
      break;
    case "luteal":
      base[0].title = "Relaxation";
      base[0].description = "Magnésium et bains chauds contre l'irritabilité.";
      base[1].title = "Anti-inflammatoire";
      base[1].description = "Curcuma, gingembre, évitez le sel pour les ballonnements.";
      base[2].title = "Sommeil réparateur";
      base[2].description = "Mélatonine naturelle en baisse — couchez-vous plus tôt.";
      base[3].title = "Yoga & méditation";
      base[3].description = "Préférez les activités calmes à l'intensité.";
      break;
    default:
      base[0].title = "Hydratation";
      base[0].description = "2L d'eau par jour pour un corps en pleine santé.";
      base[1].title = "Alimentation équilibrée";
      base[1].description = "Variez fruits, légumes, protéines et bons gras.";
      base[2].title = "Sommeil régulier";
      base[2].description = "7-9h par nuit à heures fixes pour votre bien-être.";
      base[3].title = "Mouvement quotidien";
      base[3].description = "30 minutes d'activité physique chaque jour.";
  }
  return base;
}
