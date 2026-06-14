import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CycleRing } from "@/components/CycleRing";
import { Sparkles, Droplet, Heart, Plus, Loader2, Moon, Sun, Zap, ThermometerSun, Apple, Activity, Calendar, TrendingUp, Baby, ChevronRight, Flower2 } from "lucide-react";
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

  const daysUntilPeriod = info.nextPeriod ? Math.max(0, Math.ceil((info.nextPeriod.getTime() - today.getTime()) / 86400000)) : null;
  const daysUntilOvulation = info.cycleDay && info.ovulationOffset ? Math.max(0, info.ovulationOffset + 1 - info.cycleDay) : null;
  const todaySymptom = symptoms.find(s => s.date === today.toISOString().slice(0, 10));
  const fertilityLevel = info.phase === "fertile" || info.phase === "ovulation" ? "Élevée" : info.phase === "follicular" ? "Moyenne" : "Faible";

  const phaseConfig = getPhaseConfig(info.phase, daysUntilPeriod, daysUntilOvulation, info.cycleDay, info.periodLength);
  const recommendations = getRecommendations(info.phase);

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-foreground/50 capitalize">{monthDay}</p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1">
          Bonjour {firstName} <span className="inline-block animate-[bloom-pulse_3s_ease-in-out_infinite]">🌸</span>
        </h1>
      </div>

      {!info.anchor ? (
        <OnboardingState />
      ) : (
        <div className="space-y-6">
          {/* Phase Hero Card */}
          <div className={`rounded-3xl p-6 sm:p-8 shadow-bloom border ${phaseConfig.borderClass} ${phaseConfig.bgClass}`}>
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
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
              <div className="flex-1 text-center lg:text-left space-y-3">
                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${phaseConfig.badgeClass}`}>
                  {phaseConfig.icon}
                  {phaseConfig.label}
                </span>
                <div>
                  <p className="text-sm text-foreground/60">{phaseConfig.subtitle}</p>
                  <p className={`font-display text-4xl sm:text-5xl font-bold mt-1 ${phaseConfig.valueClass}`}>
                    {phaseConfig.mainValue}
                  </p>
                  <p className="text-base font-medium text-foreground/70 mt-1">{phaseConfig.mainLabel}</p>
                </div>
                <p className="text-sm text-foreground/50 max-w-sm">
                  {phaseConfig.conception}
                </p>
                <Link
                  to="/calendar"
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition ${phaseConfig.buttonClass}`}
                >
                  <Droplet className="h-4 w-4" /> {phaseConfig.cta}
                </Link>
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

          {/* Daily Recommendations */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-vif" />
                Mes conseils quotidiens — Aujourd'hui
              </h2>
              <Link to="/bloom-ai" className="text-xs font-medium text-rose-vif hover:text-rose-vif/80 flex items-center gap-1">
                Voir plus <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.map((rec, i) => (
                <Link key={i} to={rec.link} className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 border border-white/80 hover:shadow-bloom hover:-translate-y-0.5 transition group">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-xl ${rec.bg} flex items-center justify-center`}>
                    {rec.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground/90 group-hover:text-rose-vif transition">{rec.title}</p>
                    <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">{rec.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Predictions Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PredictionCard
              to="/calendar"
              icon={<Droplet className="h-5 w-5" />}
              iconBg="bg-rose-100 text-rose-600"
              title="Prochaines règles"
              value={daysUntilPeriod !== null ? `${daysUntilPeriod}j` : "—"}
              subtitle={info.nextPeriod ? info.nextPeriod.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : ""}
            />
            <PredictionCard
              to="/calendar"
              icon={<Sun className="h-5 w-5" />}
              iconBg="bg-orange-100 text-orange-600"
              title="Ovulation"
              value={daysUntilOvulation !== null && daysUntilOvulation > 0 ? `${daysUntilOvulation}j` : info.phase === "ovulation" ? "Auj." : "—"}
              subtitle={`Jour estimé : J${info.ovulationOffset + 1}`}
            />
            <PredictionCard
              to="/symptoms"
              icon={<Activity className="h-5 w-5" />}
              iconBg="bg-violet-100 text-violet-600"
              title="Suivi du jour"
              value={todaySymptom ? `${todaySymptom.moods.length + todaySymptom.physical.length}` : "0"}
              subtitle={todaySymptom ? "Symptômes notés" : "Aucun enregistré"}
            />
          </div>

          {/* Phase-specific goal cards (Flo-style) */}
          <div className="grid gap-4 sm:grid-cols-3">
            <GoalCard
              to="/calendar"
              active={info.phase === "period" || info.phase === "follicular" || info.phase === "luteal"}
              gradient="from-rose-400 to-pink-500"
              emoji="🩸"
              title="Suivre mes règles"
              subtitle="Suivi du cycle menstruel"
            />
            <GoalCard
              to="/calendar"
              active={info.phase === "fertile" || info.phase === "ovulation"}
              gradient="from-violet-400 to-purple-500"
              emoji="🥚"
              title="Suivi de l'ovulation"
              subtitle="Pour tomber enceinte"
            />
            <GoalCard
              to="/pregnancy"
              active={false}
              gradient="from-orange-400 to-amber-500"
              emoji="🤰"
              title="Suivi de grossesse"
              subtitle="40 semaines de suivi"
            />
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
              <SummaryItem label="Fertilité" value={fertilityLevel} />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function OnboardingState() {
  return (
    <div className="space-y-8">
      {/* Hero CTA */}
      <div className="text-center">
        <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center mb-6 shadow-bloom">
          <Flower2 className="h-16 w-16 text-rose-vif opacity-50" />
        </div>
        <p className="font-display text-2xl font-bold mb-2">Commencez votre suivi</p>
        <p className="text-sm text-foreground/60 max-w-md mx-auto mb-5">
          Marquez le premier jour de vos dernières règles pour activer toutes les prédictions, recommandations personnalisées et le suivi intelligent de votre cycle.
        </p>
        <Link to="/calendar" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-8 py-4 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
          <Droplet className="h-4 w-4" /> Marquer mes règles
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <OnboardFeature
          gradient="from-rose-400 to-pink-500"
          emoji="🩸"
          title="Suivi du cycle"
          desc="Prédictions de règles et d'ovulation basées sur l'IA"
        />
        <OnboardFeature
          gradient="from-violet-400 to-purple-500"
          emoji="🥚"
          title="Fenêtre de fertilité"
          desc="Identifiez vos jours les plus fertiles avec précision"
        />
        <OnboardFeature
          gradient="from-orange-400 to-amber-500"
          emoji="🤰"
          title="Suivi de grossesse"
          desc="40 semaines de suivi personnalisé et conseils"
        />
      </div>

      {/* Daily Tips (static for onboarding) */}
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h2 className="font-display text-lg font-bold flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-rose-vif" />
          Ce que CycleBloom vous offre
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 border border-white/80">
            <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5 text-rose-vif" />
            </div>
            <div>
              <p className="text-sm font-semibold">Calendrier intelligent</p>
              <p className="text-xs text-foreground/60 mt-0.5">Visualisez votre cycle et planifiez en un coup d'œil</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 border border-white/80">
            <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5 text-violet-doux" />
            </div>
            <div>
              <p className="text-sm font-semibold">Suivi des symptômes</p>
              <p className="text-xs text-foreground/60 mt-0.5">Enregistrez humeur, douleurs, énergie au quotidien</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 border border-white/80">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-semibold">IA personnalisée</p>
              <p className="text-xs text-foreground/60 mt-0.5">Conseils adaptés à chaque phase de votre cycle</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 border border-white/80">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <Heart className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">Communauté bienveillante</p>
              <p className="text-xs text-foreground/60 mt-0.5">Échangez avec des femmes et des experts santé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick start guide */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-vif/5 via-violet-doux/5 to-lavande/5 border border-white/70 p-6">
        <h3 className="font-display text-base font-bold mb-4">Comment démarrer ?</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-vif text-white text-xs font-bold">1</span>
            <p className="text-sm">Marquez la date de vos dernières règles dans le calendrier</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-doux text-white text-xs font-bold">2</span>
            <p className="text-sm">L'IA calcule automatiquement vos prédictions</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lavande text-white text-xs font-bold">3</span>
            <p className="text-sm">Recevez des conseils personnalisés chaque jour</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardFeature({ gradient, emoji, title, desc }: { gradient: string; emoji: string; title: string; desc: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-bloom`}>
      <div className="text-2xl mb-2">{emoji}</div>
      <p className="text-sm font-bold">{title}</p>
      <p className="text-xs text-white/80 mt-1">{desc}</p>
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
      <p className="text-2xl font-bold mt-0.5">{value}</p>
      <p className="text-[11px] text-foreground/50 mt-1">{subtitle}</p>
    </Link>
  );
}

function GoalCard({ to, active, gradient, emoji, title, subtitle }: { to: string; active: boolean; gradient: string; emoji: string; title: string; subtitle: string }) {
  return (
    <Link to={to} className={`rounded-2xl p-5 transition hover:scale-[1.02] ${active ? `bg-gradient-to-br ${gradient} text-white shadow-bloom` : "border border-white/70 glass shadow-sm"}`}>
      <div className="text-2xl mb-2">{emoji}</div>
      <p className={`text-sm font-bold ${active ? "text-white" : "text-foreground"}`}>{title}</p>
      <p className={`text-[11px] mt-0.5 ${active ? "text-white/80" : "text-foreground/50"}`}>{subtitle}</p>
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

function getPhaseConfig(phase: string | null, daysUntilPeriod: number | null, daysUntilOvulation: number | null, cycleDay: number | null, periodLength: number) {
  const daysLeft = phase === "period" ? Math.max(1, periodLength - (cycleDay ?? 0) + 1) : null;

  switch (phase) {
    case "period":
      return {
        label: "Menstruation",
        subtitle: `Jour ${cycleDay} des règles`,
        mainValue: `${daysLeft}`,
        mainLabel: "jour(s) restant(s)",
        conception: "Faible probabilité de conception",
        cta: "Suivre mes règles",
        bgClass: "bg-gradient-to-br from-rose-50 to-pink-50",
        borderClass: "border-rose-200",
        badgeClass: "bg-rose-100 text-rose-700",
        valueClass: "text-rose-vif",
        buttonClass: "bg-gradient-to-r from-rose-500 to-pink-600",
        icon: <Droplet className="h-3 w-3" />,
      };
    case "follicular":
      return {
        label: "Phase folliculaire",
        subtitle: "Prochaines règles dans",
        mainValue: daysUntilPeriod !== null ? `${daysUntilPeriod}` : "—",
        mainLabel: "jours",
        conception: "Faible probabilité de conception",
        cta: "Voir le calendrier",
        bgClass: "bg-gradient-to-br from-emerald-50 to-teal-50",
        borderClass: "border-emerald-200",
        badgeClass: "bg-emerald-100 text-emerald-700",
        valueClass: "text-emerald-600",
        buttonClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
        icon: <Sun className="h-3 w-3" />,
      };
    case "fertile":
      return {
        label: "Fenêtre fertile",
        subtitle: "Ovulation dans",
        mainValue: daysUntilOvulation !== null ? `${daysUntilOvulation}` : "—",
        mainLabel: "jours",
        conception: "Forte probabilité de conception",
        cta: "Tomber enceinte",
        bgClass: "bg-gradient-to-br from-violet-50 to-purple-50",
        borderClass: "border-violet-200",
        badgeClass: "bg-violet-100 text-violet-700",
        valueClass: "text-violet-doux",
        buttonClass: "bg-gradient-to-r from-violet-500 to-purple-600",
        icon: <Heart className="h-3 w-3" />,
      };
    case "ovulation":
      return {
        label: "Jour d'ovulation",
        subtitle: "Prévision :",
        mainValue: "Aujourd'hui",
        mainLabel: "jour de l'ovulation",
        conception: "Probabilité maximale de conception",
        cta: "Tomber enceinte",
        bgClass: "bg-gradient-to-br from-purple-50 to-indigo-50",
        borderClass: "border-purple-200",
        badgeClass: "bg-purple-100 text-purple-700",
        valueClass: "text-purple-600",
        buttonClass: "bg-gradient-to-r from-purple-500 to-indigo-600",
        icon: <Sun className="h-3 w-3" />,
      };
    case "luteal":
      return {
        label: "Phase lutéale",
        subtitle: "Prochaines règles dans",
        mainValue: daysUntilPeriod !== null ? `${daysUntilPeriod}` : "—",
        mainLabel: "jours",
        conception: "Faible probabilité de conception",
        cta: "Enregistrer les règles",
        bgClass: "bg-gradient-to-br from-indigo-50 to-blue-50",
        borderClass: "border-indigo-200",
        badgeClass: "bg-indigo-100 text-indigo-700",
        valueClass: "text-indigo-600",
        buttonClass: "bg-gradient-to-r from-indigo-500 to-blue-600",
        icon: <Moon className="h-3 w-3" />,
      };
    default:
      return {
        label: "Mon Cycle",
        subtitle: "Règles dans",
        mainValue: daysUntilPeriod !== null ? `${daysUntilPeriod}` : "—",
        mainLabel: "jours",
        conception: "",
        cta: "Voir le calendrier",
        bgClass: "bg-gradient-to-br from-rose-50 to-pink-50",
        borderClass: "border-rose-200",
        badgeClass: "bg-rose-100 text-rose-700",
        valueClass: "text-foreground",
        buttonClass: "bg-gradient-to-r from-rose-vif to-violet-doux",
        icon: <Flower2 className="h-3 w-3" />,
      };
  }
}

function getRecommendations(phase: string | null) {
  switch (phase) {
    case "period":
      return [
        { icon: <ThermometerSun className="h-5 w-5 text-rose-vif" />, bg: "bg-rose-50", title: "Chaleur apaisante", description: "Bouillotte sur le bas-ventre pour soulager les crampes.", link: "/symptoms" },
        { icon: <Apple className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50", title: "Fer & vitamine C", description: "Épinards, lentilles, agrumes pour compenser.", link: "/articles" },
        { icon: <Moon className="h-5 w-5 text-indigo-500" />, bg: "bg-indigo-50", title: "Sommeil prioritaire", description: "8h minimum pour récupérer.", link: "/reminders" },
        { icon: <Zap className="h-5 w-5 text-amber-500" />, bg: "bg-amber-50", title: "Exercice doux", description: "Marche, yoga doux ou étirements légers.", link: "/articles" },
      ];
    case "follicular":
      return [
        { icon: <Zap className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50", title: "Énergie montante", description: "Idéal pour les entraînements intenses.", link: "/articles" },
        { icon: <Apple className="h-5 w-5 text-orange-500" />, bg: "bg-orange-50", title: "Protéines & fibres", description: "Nourrissez vos muscles.", link: "/articles" },
        { icon: <Sparkles className="h-5 w-5 text-violet-doux" />, bg: "bg-violet-50", title: "Créativité", description: "Phase idéale pour les nouveaux projets.", link: "/bloom-ai" },
        { icon: <Sun className="h-5 w-5 text-amber-500" />, bg: "bg-amber-50", title: "Cardio & musculation", description: "Votre corps récupère mieux.", link: "/articles" },
      ];
    case "fertile":
    case "ovulation":
      return [
        { icon: <Sun className="h-5 w-5 text-orange-500" />, bg: "bg-orange-50", title: "Pic d'énergie", description: "Sommet de votre vitalité.", link: "/symptoms" },
        { icon: <Apple className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50", title: "Antioxydants", description: "Baies, oméga-3 pour la fertilité.", link: "/articles" },
        { icon: <Heart className="h-5 w-5 text-rose-vif" />, bg: "bg-rose-50", title: "Sociabilité", description: "Confiance et communication au max.", link: "/community" },
        { icon: <Zap className="h-5 w-5 text-amber-500" />, bg: "bg-amber-50", title: "Sport intense", description: "HIIT, danse — performance optimale.", link: "/articles" },
      ];
    case "luteal":
      return [
        { icon: <Moon className="h-5 w-5 text-indigo-500" />, bg: "bg-indigo-50", title: "Relaxation", description: "Magnésium et bains chauds.", link: "/reminders" },
        { icon: <Apple className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50", title: "Anti-inflammatoire", description: "Curcuma, gingembre, moins de sel.", link: "/articles" },
        { icon: <ThermometerSun className="h-5 w-5 text-rose-vif" />, bg: "bg-rose-50", title: "Sommeil réparateur", description: "Couchez-vous plus tôt.", link: "/reminders" },
        { icon: <Flower2 className="h-5 w-5 text-violet-doux" />, bg: "bg-violet-50", title: "Yoga & méditation", description: "Activités calmes recommandées.", link: "/articles" },
      ];
    default:
      return [
        { icon: <Droplet className="h-5 w-5 text-blue-500" />, bg: "bg-blue-50", title: "Hydratation", description: "2L d'eau par jour.", link: "/reminders" },
        { icon: <Apple className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50", title: "Alimentation équilibrée", description: "Variez votre alimentation.", link: "/articles" },
        { icon: <Moon className="h-5 w-5 text-indigo-500" />, bg: "bg-indigo-50", title: "Sommeil régulier", description: "7-9h par nuit.", link: "/reminders" },
        { icon: <Zap className="h-5 w-5 text-amber-500" />, bg: "bg-amber-50", title: "Mouvement quotidien", description: "30 min d'activité chaque jour.", link: "/articles" },
      ];
  }
}
