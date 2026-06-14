import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Heart, Calendar, ThermometerSun, Droplet, Brain, Microscope, Baby, TrendingUp, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/guide-fertilite")({
  head: () => ({ meta: [{ title: "Guide complet — Fenêtre de fertilité — CycleBloom AI" }] }),
  component: GuideFertilitePage,
});

function GuideFertilitePage() {
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
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-200">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900">Fenêtre de fertilité</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Découvrez vos jours les plus fertiles avec précision grâce à l'IA et maximisez vos chances de conception.</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Mis à jour : Juin 2026</span>
          </div>
        </div>

        {/* Bloc 1 : Comprendre la fertilité */}
        <section className="mb-12 rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50/50 to-white p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
              <Microscope className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Comprendre votre fertilité</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">La fertilité féminine est un processus cyclique. Chaque mois, un ovule est libéré lors de l'ovulation et reste viable pendant <strong>12 à 24 heures</strong>. Les spermatozoïdes, eux, peuvent survivre dans le corps féminin pendant <strong>3 à 5 jours</strong>.</p>
          <p className="text-gray-700 leading-relaxed mb-6">Cela signifie que votre <strong>fenêtre de fertilité</strong> s'étend sur environ <strong>6 jours par cycle</strong> : les 5 jours précédant l'ovulation et le jour de l'ovulation lui-même.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white border border-purple-100 p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">6</p>
              <p className="text-xs text-gray-500 mt-1">jours fertiles par cycle</p>
            </div>
            <div className="rounded-2xl bg-white border border-purple-100 p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">12-24h</p>
              <p className="text-xs text-gray-500 mt-1">durée de vie de l'ovule</p>
            </div>
            <div className="rounded-2xl bg-white border border-purple-100 p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">3-5j</p>
              <p className="text-xs text-gray-500 mt-1">survie des spermatozoïdes</p>
            </div>
          </div>
        </section>

        {/* Bloc 2 : Signes de l'ovulation */}
        <section className="mb-12 rounded-3xl border border-gray-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
              <ThermometerSun className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Les signes de l'ovulation</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">Votre corps vous envoie des signaux clairs pendant l'ovulation. Apprendre à les reconnaître améliore significativement vos chances de conception.</p>
          <div className="space-y-4">
            {[
              { title: "Glaire cervicale", desc: "Elle devient transparente, filante et élastique (comme du blanc d'œuf). C'est le signe le plus fiable d'ovulation imminente. Cette consistance facilite le passage des spermatozoïdes.", icon: <Droplet className="h-5 w-5 text-blue-500" /> },
              { title: "Température basale", desc: "Votre température au repos augmente de 0.2 à 0.5°C après l'ovulation sous l'effet de la progestérone. Prenez-la chaque matin avant de vous lever pour détecter le pattern.", icon: <ThermometerSun className="h-5 w-5 text-orange-500" /> },
              { title: "Douleur ovulatoire (Mittelschmerz)", desc: "Une légère douleur ou tiraillement d'un côté du bas-ventre au moment de la libération de l'ovule. Environ 20% des femmes la ressentent clairement.", icon: <AlertTriangle className="h-5 w-5 text-amber-500" /> },
              { title: "Libido accrue", desc: "Le pic d'œstrogène et de testostérone autour de l'ovulation augmente naturellement le désir sexuel. C'est un mécanisme biologique favorisant la reproduction.", icon: <Heart className="h-5 w-5 text-rose-500" /> },
              { title: "Modifications cervicales", desc: "Le col de l'utérus s'ouvre légèrement, se ramollit et remonte. Ces changements facilitent l'entrée des spermatozoïdes vers l'ovule.", icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" /> },
            ].map(sign => (
              <div key={sign.title} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shrink-0 shadow-sm">{sign.icon}</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{sign.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">{sign.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bloc 3 : Maximiser ses chances */}
        <section className="mb-12 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <Baby className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Maximiser vos chances de conception</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Timing optimal", desc: "Ayez des rapports tous les 1-2 jours pendant votre fenêtre fertile, en commençant 5 jours avant l'ovulation estimée." },
              { title: "Acide folique", desc: "Commencez une supplémentation en acide folique (400µg/jour) au moins 3 mois avant la conception pour prévenir les anomalies du tube neural." },
              { title: "Mode de vie sain", desc: "Arrêtez tabac et alcool, maintenez un IMC entre 19 et 25, dormez 7-9h et réduisez le stress chronique." },
              { title: "Alimentation fertile", desc: "Privilégiez les antioxydants (baies, légumes verts), les oméga-3 (poissons gras), le zinc et la vitamine D." },
              { title: "Activité physique", desc: "30 minutes d'exercice modéré par jour améliore la fertilité. Évitez les entraînements trop intenses qui peuvent perturber l'ovulation." },
              { title: "Suivi médical", desc: "Consultez un gynécologue si vous n'avez pas conçu après 12 mois (6 mois si vous avez plus de 35 ans)." },
            ].map(tip => (
              <div key={tip.title} className="rounded-2xl bg-white border border-emerald-100 p-5">
                <p className="text-sm font-bold text-gray-900 mb-1">{tip.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bloc 4 : CycleBloom AI */}
        <section className="mb-12 rounded-3xl border border-gray-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
              <Brain className="h-6 w-6 text-violet-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Comment CycleBloom prédit votre ovulation</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">Notre algorithme d'intelligence artificielle combine plusieurs facteurs pour estimer votre jour d'ovulation avec une précision remarquable :</p>
          <ol className="space-y-4">
            {[
              "Analyse de vos 6 derniers cycles pour calculer votre longueur moyenne et votre variabilité",
              "Prise en compte de vos symptômes enregistrés (glaire, douleur, libido)",
              "Ajustement dynamique basé sur les données récentes (un cycle plus court ou plus long est immédiatement intégré)",
              "Modèle statistique bayésien qui affine ses prédictions à chaque cycle complété",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold shrink-0">{i + 1}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Bloc 5 : Actualités */}
        <section className="mb-12 rounded-3xl border border-gray-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Recherche & Actualités — Mai/Juin 2026</h2>
          </div>
          <div className="space-y-4">
            <NewsItem date="8 juin 2026" title="Nouveau test de réserve ovarienne à domicile" text="Un kit de test AMH à domicile vient d'être approuvé en France (marquage CE). Il permet d'évaluer sa réserve ovarienne avec un simple prélèvement sanguin capillaire, sans ordonnance." />
            <NewsItem date="22 mai 2026" title="IA et fertilité : étude de l'Université de Cambridge" text="Une étude démontre que les algorithmes de prédiction d'ovulation basés sur l'IA sont plus précis (95.8%) que les tests LH classiques (92.1%) pour identifier la fenêtre fertile." />
            <NewsItem date="10 mai 2026" title="PMA : extension du remboursement en France" text="La Sécurité sociale étend le remboursement de la PMA jusqu'à 45 ans (contre 43 auparavant) et inclut désormais la congélation préventive d'ovocytes sur demande." />
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 p-10 text-white">
          <h2 className="font-display text-2xl font-bold">Suivez votre fertilité</h2>
          <p className="mt-2 text-white/80">Identifiez votre fenêtre fertile et recevez des alertes au bon moment.</p>
          <Link to="/calendar" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-purple-600 shadow-lg hover:scale-105 transition">
            <Heart className="h-4 w-4" /> Voir mon calendrier fertile
          </Link>
        </div>
      </main>
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
