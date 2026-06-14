import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Baby, Calendar, Heart, Apple, Stethoscope, Brain, AlertTriangle, ArrowLeft, CheckCircle2, Clock, Shield } from "lucide-react";

export const Route = createFileRoute("/guide-grossesse")({
  head: () => ({ meta: [{ title: "Guide complet — Suivi de grossesse — CycleBloom AI" }] }),
  component: GuideGrossessePage,
});

function GuideGrossessePage() {
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
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200">
            <Baby className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900">Suivi de grossesse</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">40 semaines de suivi personnalisé, conseils et accompagnement bienveillant pour vivre votre grossesse sereinement.</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Mis à jour : Juin 2026</span>
          </div>
        </div>

        {/* Bloc 1 : Les trimestres */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">Les 3 trimestres de grossesse</h2>
          <div className="space-y-6">
            <TrimesterBlock
              number={1}
              title="Premier trimestre"
              weeks="Semaines 1 à 13"
              color="from-orange-400 to-amber-500"
              bgColor="bg-orange-50"
              borderColor="border-orange-200"
              description="C'est le trimestre de la formation. Tous les organes du bébé se développent durant cette période cruciale. Votre corps subit d'importants changements hormonaux."
              development={[
                "Semaine 4 : le cœur commence à battre",
                "Semaine 6 : formation du système nerveux",
                "Semaine 8 : tous les organes principaux sont présents",
                "Semaine 10 : le fœtus mesure 3 cm",
                "Semaine 12 : les doigts et orteils sont formés",
              ]}
              symptoms={["Nausées matinales (50-80% des femmes)", "Fatigue intense", "Seins tendus et gonflés", "Envies et dégoûts alimentaires", "Besoin fréquent d'uriner"]}
              tips={["Prenez de l'acide folique (400µg/jour)", "Mangez peu mais souvent contre les nausées", "Reposez-vous autant que possible", "Première échographie à 12 semaines", "Évitez alcool, tabac et aliments crus"]}
            />
            <TrimesterBlock
              number={2}
              title="Deuxième trimestre"
              weeks="Semaines 14 à 27"
              color="from-emerald-400 to-teal-500"
              bgColor="bg-emerald-50"
              borderColor="border-emerald-200"
              description="Souvent appelé la « lune de miel » de la grossesse. Les nausées disparaissent, l'énergie revient et le ventre commence à s'arrondir. Vous ressentez les premiers mouvements du bébé."
              development={[
                "Semaine 16 : premiers mouvements perceptibles",
                "Semaine 18 : le sexe est visible à l'échographie",
                "Semaine 20 : le bébé mesure 25 cm (mi-parcours !)",
                "Semaine 22 : audition fonctionnelle — bébé vous entend",
                "Semaine 26 : les yeux s'ouvrent pour la première fois",
              ]}
              symptoms={["Ventre visible et en croissance", "Premiers coups de bébé (16-22 semaines)", "Ligne brune sur le ventre (linea nigra)", "Appétit accru", "Possible douleur du ligament rond"]}
              tips={["Échographie morphologique à 22 semaines", "Commencez les exercices prénataux", "Investissez dans des vêtements de maternité", "Inscrivez-vous aux cours de préparation", "Photographiez l'évolution de votre ventre"]}
            />
            <TrimesterBlock
              number={3}
              title="Troisième trimestre"
              weeks="Semaines 28 à 40"
              color="from-indigo-400 to-blue-500"
              bgColor="bg-indigo-50"
              borderColor="border-indigo-200"
              description="La dernière ligne droite. Bébé prend du poids rapidement et se met en position pour la naissance. Votre corps se prépare à l'accouchement."
              development={[
                "Semaine 28 : bébé ouvre et ferme les yeux",
                "Semaine 32 : les poumons maturent progressivement",
                "Semaine 34 : position tête en bas (généralement)",
                "Semaine 37 : grossesse à terme !",
                "Semaine 40 : date prévue d'accouchement",
              ]}
              symptoms={["Essoufflement (utérus appuie sur le diaphragme)", "Contractions de Braxton Hicks", "Insomnie et difficultés à dormir", "Brûlures d'estomac", "Gonflement des pieds et chevilles", "Envie fréquente d'uriner (retour)"]}
              tips={["Préparez votre valise de maternité (semaine 36)", "Connaissez les signes du travail", "Cours de préparation à l'accouchement", "Aménagez la chambre de bébé", "Repos et position latérale gauche pour dormir", "Rendez-vous mensuels puis bimensuels"]}
            />
          </div>
        </section>

        {/* Bloc 2 : Rendez-vous obligatoires */}
        <section className="mb-12 rounded-3xl border border-gray-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Rendez-vous et examens essentiels</h2>
          </div>
          <div className="space-y-3">
            {[
              { week: "Avant 10 SA", exam: "Déclaration de grossesse", desc: "Prise de sang (toxoplasmose, rubéole, VIH, groupe sanguin)" },
              { week: "12 SA", exam: "Échographie T1 (datation)", desc: "Date de terme, clarté nucale, dépistage trisomie 21" },
              { week: "16 SA", exam: "2ème consultation prénatale", desc: "Examen clinique, prise de sang si nécessaire" },
              { week: "22 SA", exam: "Échographie T2 (morphologie)", desc: "Vérification de tous les organes, mesures, sexe du bébé" },
              { week: "24-28 SA", exam: "Test de glucose (O'Sullivan)", desc: "Dépistage du diabète gestationnel" },
              { week: "32 SA", exam: "Échographie T3 (croissance)", desc: "Position du bébé, quantité de liquide, poids estimé" },
              { week: "35 SA", exam: "Prélèvement vaginal", desc: "Dépistage du streptocoque B" },
              { week: "36-40 SA", exam: "Monitoring hebdomadaire", desc: "Rythme cardiaque fœtal, contractions" },
            ].map(rdv => (
              <div key={rdv.week} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex h-10 items-center justify-center rounded-xl bg-blue-100 px-3 shrink-0">
                  <span className="text-xs font-bold text-blue-700">{rdv.week}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{rdv.exam}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{rdv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bloc 3 : Nutrition */}
        <section className="mb-12 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <Apple className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Nutrition pendant la grossesse</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white border border-emerald-100 p-5">
              <p className="text-sm font-bold text-emerald-700 mb-2">À privilégier</p>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />Acide folique : légumes verts, lentilles</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />Fer : viande rouge, épinards, légumineuses</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />Calcium : produits laitiers pasteurisés</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />Oméga-3 : poissons gras (2x/semaine)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />Fibres : fruits, céréales complètes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />Eau : au moins 1.5L par jour</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-red-100 p-5">
              <p className="text-sm font-bold text-red-700 mb-2">À éviter absolument</p>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />Alcool (zéro tolérance)</li>
                <li className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />Viandes et poissons crus (sushi, tartare)</li>
                <li className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />Fromages au lait cru (listeria)</li>
                <li className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />Charcuterie non cuite (toxoplasmose)</li>
                <li className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />Caféine excessive (max 200mg/jour)</li>
                <li className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />Tabac et drogues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bloc 4 : CycleBloom Grossesse */}
        <section className="mb-12 rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50/50 to-white p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
              <Brain className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">CycleBloom vous accompagne</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <Calendar className="h-5 w-5 text-orange-500" />, title: "Suivi semaine par semaine", desc: "Découvrez le développement de votre bébé et les changements de votre corps chaque semaine." },
              { icon: <Clock className="h-5 w-5 text-blue-500" />, title: "Rappels de rendez-vous", desc: "Ne manquez aucun examen prénatal grâce à nos rappels automatiques personnalisés." },
              { icon: <Heart className="h-5 w-5 text-rose-500" />, title: "Compteur de mouvements", desc: "Enregistrez les coups de bébé à partir de la semaine 28 pour surveiller son bien-être." },
              { icon: <Shield className="h-5 w-5 text-emerald-500" />, title: "Alertes de vigilance", desc: "Soyez informée des symptômes nécessitant une consultation urgente." },
            ].map(feature => (
              <div key={feature.title} className="rounded-2xl bg-white border border-orange-100 p-5">
                <div className="flex items-center gap-2 mb-2">{feature.icon}<p className="text-sm font-bold text-gray-900">{feature.title}</p></div>
                <p className="text-xs text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bloc 5 : Actualités */}
        <section className="mb-12 rounded-3xl border border-gray-100 p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
              <Stethoscope className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Actualités obstétrique — Mai/Juin 2026</h2>
          </div>
          <div className="space-y-4">
            <NewsItem date="10 juin 2026" title="Congé maternité : allongement à 20 semaines en discussion" text="Le Parlement examine un projet de loi portant le congé maternité post-natal de 10 à 14 semaines pour les primipares, alignant la France sur les recommandations de l'OMS." />
            <NewsItem date="1er juin 2026" title="Nouveau protocole de dépistage prénatal non-invasif" text="La HAS valide un nouveau test ADN fœtal (DPNI) de 2ème génération, capable de dépister 7 anomalies chromosomiques à partir de 10 SA avec une simple prise de sang." />
            <NewsItem date="20 mai 2026" title="Télésurveillance de grossesse : remboursement étendu" text="La télésurveillance des grossesses à risque via capteurs connectés (monitoring fœtal, tensiomètre) est désormais remboursée à 100% sur tout le territoire français." />
            <NewsItem date="8 mai 2026" title="Maisons de naissance : 30 nouveaux établissements en 2026" text="Le plan périnatalité 2026-2030 prévoit l'ouverture de 30 maisons de naissance supplémentaires pour offrir des alternatives à l'accouchement hospitalier classique." />
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 p-10 text-white">
          <h2 className="font-display text-2xl font-bold">Commencez votre suivi de grossesse</h2>
          <p className="mt-2 text-white/80">Semaine par semaine, on vous accompagne jusqu'à la naissance.</p>
          <Link to="/pregnancy" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-orange-600 shadow-lg hover:scale-105 transition">
            <Baby className="h-4 w-4" /> Activer le mode grossesse
          </Link>
        </div>
      </main>
    </div>
  );
}

function TrimesterBlock({ number, title, weeks, color, bgColor, borderColor, description, development, symptoms, tips }: {
  number: number; title: string; weeks: string; color: string; bgColor: string; borderColor: string; description: string; development: string[]; symptoms: string[]; tips: string[];
}) {
  return (
    <div className={`rounded-3xl border ${borderColor} ${bgColor} p-6 sm:p-8`}>
      <div className="flex items-start gap-4 mb-5">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white font-bold text-sm shrink-0`}>
          T{number}
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{weeks}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Développement bébé</p>
          <ul className="space-y-1.5">
            {development.map(d => (
              <li key={d} className="flex items-start gap-2 text-xs text-gray-700">
                <Baby className="h-3 w-3 mt-0.5 text-orange-400 shrink-0" />{d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Vos symptômes</p>
          <ul className="space-y-1.5">
            {symptoms.map(s => (
              <li key={s} className="flex items-start gap-2 text-xs text-gray-700">
                <Heart className="h-3 w-3 mt-0.5 text-rose-400 shrink-0" />{s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Conseils</p>
          <ul className="space-y-1.5">
            {tips.map(t => (
              <li key={t} className="flex items-start gap-2 text-xs text-gray-700">
                <CheckCircle2 className="h-3 w-3 mt-0.5 text-emerald-400 shrink-0" />{t}
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
