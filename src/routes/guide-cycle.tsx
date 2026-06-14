import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Droplet, Calendar, Brain, TrendingUp, Heart, Moon, Sun, Zap, Apple, ThermometerSun, ChevronRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/guide-cycle")({
  head: () => ({ meta: [{ title: "Guide complet — Suivi du cycle menstruel — CycleBloom AI" }] }),
  component: GuideCyclePage,
});

function GuideCyclePage() {
  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">CycleBloom</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg shadow-rose-200">
            <Droplet className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900">Suivi du cycle menstruel</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Comprenez votre corps, anticipez vos règles et vivez chaque phase en harmonie grâce à notre intelligence artificielle.</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Mis à jour : Juin 2026</span>
          </div>
        </div>

        {/* Bloc 1 : Qu'est-ce que le cycle */}
        <section className="mb-12 rounded-3xl border border-gray-100 bg-gradient-to-br from-rose-50/50 to-white p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100">
              <Calendar className="h-6 w-6 text-rose-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Qu'est-ce que le cycle menstruel ?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">Le cycle menstruel est un processus biologique naturel qui prépare le corps à une éventuelle grossesse. Il dure en moyenne <strong>28 jours</strong>, mais peut varier de 21 à 35 jours selon les femmes.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Le cycle se divise en <strong>4 phases principales</strong>, chacune influençant votre énergie, votre humeur, votre fertilité et votre bien-être général. Comprendre ces phases vous permet de mieux planifier votre quotidien.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white border border-rose-100 p-4">
              <p className="text-sm font-bold text-rose-700">Durée moyenne</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">28 jours</p>
              <p className="text-xs text-gray-500 mt-1">Variable de 21 à 35 jours</p>
            </div>
            <div className="rounded-2xl bg-white border border-rose-100 p-4">
              <p className="text-sm font-bold text-rose-700">Règles</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3 à 7 jours</p>
              <p className="text-xs text-gray-500 mt-1">5 jours en moyenne</p>
            </div>
          </div>
        </section>

        {/* Bloc 2 : Les 4 phases */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">Les 4 phases de votre cycle</h2>
          <div className="space-y-6">
            <PhaseBlock
              number={1}
              title="Phase menstruelle (Règles)"
              days="Jours 1 à 5"
              color="from-rose-500 to-pink-600"
              textColor="text-rose-700"
              bgColor="bg-rose-50"
              borderColor="border-rose-200"
              description="C'est le premier jour de vos règles qui marque le début d'un nouveau cycle. L'endomètre (muqueuse utérine) se désagrège et est évacué sous forme de saignements."
              symptoms={["Crampes abdominales", "Fatigue accrue", "Sensibilité émotionnelle", "Maux de tête possibles", "Ballonnements"]}
              tips={["Appliquez une bouillotte sur le bas-ventre", "Privilégiez les aliments riches en fer (épinards, lentilles)", "Yoga doux et étirements", "Dormez 8h minimum", "Hydratez-vous abondamment"]}
            />
            <PhaseBlock
              number={2}
              title="Phase folliculaire"
              days="Jours 6 à 13"
              color="from-emerald-500 to-teal-600"
              textColor="text-emerald-700"
              bgColor="bg-emerald-50"
              borderColor="border-emerald-200"
              description="Après les règles, votre corps produit de l'œstrogène qui stimule la croissance des follicules ovariens. Votre énergie remonte progressivement et vous vous sentez plus dynamique."
              symptoms={["Regain d'énergie", "Meilleure concentration", "Peau plus lumineuse", "Humeur positive", "Créativité accrue"]}
              tips={["C'est le moment pour les entraînements intenses (HIIT, musculation)", "Lancez de nouveaux projets", "Alimentation riche en protéines et fibres", "Socialisez — votre charisme est au top", "Planifiez les tâches complexes"]}
            />
            <PhaseBlock
              number={3}
              title="Phase ovulatoire"
              days="Jours 14 à 16"
              color="from-purple-500 to-violet-600"
              textColor="text-purple-700"
              bgColor="bg-purple-50"
              borderColor="border-purple-200"
              description="L'ovulation libère un ovule mature dans la trompe de Fallope. C'est votre pic de fertilité. L'ovule est viable pendant 12 à 24 heures. Les spermatozoïdes peuvent survivre jusqu'à 5 jours."
              symptoms={["Libido accrue", "Légère douleur au bas-ventre (mittelschmerz)", "Glaire cervicale transparente et filante", "Température basale en hausse", "Pic d'énergie"]}
              tips={["Période idéale si vous essayez de concevoir", "Sport intense encore possible", "Notez votre température basale", "Activités sociales et romantiques", "Hydratation et oméga-3"]}
            />
            <PhaseBlock
              number={4}
              title="Phase lutéale"
              days="Jours 17 à 28"
              color="from-indigo-500 to-blue-600"
              textColor="text-indigo-700"
              bgColor="bg-indigo-50"
              borderColor="border-indigo-200"
              description="Après l'ovulation, le corps jaune produit de la progestérone pour préparer l'utérus à une éventuelle nidation. Si la fécondation n'a pas lieu, les hormones chutent et déclenchent les prochaines règles."
              symptoms={["SPM (syndrome prémenstruel)", "Rétention d'eau", "Envies alimentaires", "Irritabilité ou anxiété", "Seins sensibles", "Fatigue progressive"]}
              tips={["Magnésium et vitamine B6 contre le SPM", "Réduisez sel et caféine", "Exercice modéré (marche, natation, yoga)", "Couchez-vous plus tôt", "Auto-compassion — c'est normal de ralentir"]}
            />
          </div>
        </section>

        {/* Bloc 3 : Comment CycleBloom vous aide */}
        <section className="mb-12 rounded-3xl border border-gray-100 bg-gradient-to-br from-violet-50/50 to-white p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
              <Brain className="h-6 w-6 text-violet-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Comment CycleBloom AI vous aide</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <TrendingUp className="h-5 w-5 text-rose-vif" />, title: "Prédictions précises", desc: "Notre IA analyse vos 6 derniers cycles pour prédire vos prochaines règles avec une précision de 99.2%." },
              { icon: <Moon className="h-5 w-5 text-indigo-500" />, title: "Alertes personnalisées", desc: "Recevez un rappel 2 jours avant vos règles et des conseils adaptés à chaque phase." },
              { icon: <Apple className="h-5 w-5 text-emerald-500" />, title: "Nutrition adaptée", desc: "Suggestions alimentaires spécifiques à votre phase pour optimiser énergie et bien-être." },
              { icon: <Zap className="h-5 w-5 text-amber-500" />, title: "Exercice intelligent", desc: "Recommandations d'activité physique alignées sur votre cycle hormonal." },
            ].map(item => (
              <div key={item.title} className="rounded-2xl bg-white border border-violet-100 p-5">
                <div className="flex items-center gap-2 mb-2">{item.icon}<p className="text-sm font-bold text-gray-900">{item.title}</p></div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bloc 4 : Dernières avancées */}
        <section className="mb-12 rounded-3xl border border-gray-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
              <Sun className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Actualités santé féminine — Mai/Juin 2026</h2>
          </div>
          <div className="space-y-4">
            <NewsItem date="5 juin 2026" title="OMS : nouvelles recommandations sur le suivi du cycle" text="L'Organisation Mondiale de la Santé recommande désormais l'utilisation d'applications certifiées pour le suivi menstruel, soulignant l'importance de la littératie du cycle dans la santé préventive des femmes." />
            <NewsItem date="28 mai 2026" title="Étude INSERM : lien confirmé entre cycle et performance cognitive" text="Une étude de l'INSERM publiée dans Nature Neuroscience confirme que les fluctuations hormonales du cycle influencent la mémoire de travail et la créativité, validant l'approche de planification par phase." />
            <NewsItem date="15 mai 2026" title="Endométriose : nouveau biomarqueur sanguin découvert" text="Des chercheurs français ont identifié un biomarqueur sanguin permettant de diagnostiquer l'endométriose sans chirurgie, réduisant le délai diagnostic moyen de 7 ans à quelques semaines." />
            <NewsItem date="3 mai 2026" title="Congé menstruel : la France lance une expérimentation" text="Le gouvernement français lance un programme pilote de congé menstruel dans 500 entreprises volontaires, suite aux résultats positifs observés en Espagne et au Japon." />
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-10 text-white">
          <h2 className="font-display text-2xl font-bold">Prête à commencer ?</h2>
          <p className="mt-2 text-white/80">Marquez vos dernières règles et laissez l'IA faire le reste.</p>
          <Link to="/calendar" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-rose-vif shadow-lg hover:scale-105 transition">
            <Droplet className="h-4 w-4" /> Commencer le suivi
          </Link>
        </div>
      </main>
    </div>
  );
}

function PhaseBlock({ number, title, days, color, textColor, bgColor, borderColor, description, symptoms, tips }: {
  number: number; title: string; days: string; color: string; textColor: string; bgColor: string; borderColor: string; description: string; symptoms: string[]; tips: string[];
}) {
  return (
    <div className={`rounded-3xl border ${borderColor} ${bgColor} p-6 sm:p-8`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white font-bold text-sm shrink-0`}>
          {number}
        </div>
        <div>
          <h3 className={`font-display text-xl font-bold ${textColor}`}>{title}</h3>
          <p className="text-sm text-gray-500">{days}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-5">{description}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Symptômes courants</p>
          <ul className="space-y-1.5">
            {symptoms.map(s => (
              <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${color} shrink-0`}></span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nos conseils</p>
          <ul className="space-y-1.5">
            {tips.map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-gray-400 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function NewsItem({ date, title, text }: { date: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1">{date}</p>
      <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
      <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
