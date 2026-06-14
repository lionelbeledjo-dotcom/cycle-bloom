import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Sparkles, Heart, Brain, Calendar, LineChart, ShieldCheck, Star, Users, Stethoscope, Crown, CheckCircle2, MapPin, MessageCircle, Baby, Droplet, Sun, Activity, ArrowRight, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CycleBloom AI — Santé féminine intelligente" },
      { name: "description", content: "Suivi de cycle, fertilité, grossesse et bien-être propulsé par l'IA. Plus complet que les apps classiques." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display text-xl font-bold leading-none">CycleBloom</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-violet-doux">AI</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#features" className="hover:text-gray-900 transition">Fonctionnalités</a>
            <a href="#lifecycle" className="hover:text-gray-900 transition">Votre vie</a>
            <a href="#community" className="hover:text-gray-900 transition">Communauté</a>
            <Link to="/doctors" className="hover:text-gray-900 transition">Médecins</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="hidden text-sm font-medium text-gray-700 hover:text-gray-900 sm:inline transition">
              Connexion
            </Link>
            <Link
              to="/auth"
              className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.02]"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white" />
        <FloatingBlobs />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-600">
              <Sparkles className="h-3.5 w-3.5" /> Propulsé par l'intelligence artificielle
            </span>
            <h1 className="mt-8 font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-gray-900">
              Votre santé féminine,
              <br />
              <span className="text-gradient-bloom">enfin comprise.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              CycleBloom prédit vos règles, votre ovulation et votre fertilité avec une précision de 98%. Suivi de grossesse, IA conseillère et communauté bienveillante — tout en une app.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/auth"
                className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-8 py-4 text-base font-semibold text-white shadow-bloom transition hover:scale-[1.03]"
              >
                Commencer maintenant — c'est gratuit
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-green-500" /> RGPD & chiffré
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400" /> 4.9 / 5
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-violet-doux" /> 50k+ utilisatrices
              </div>
            </div>
          </div>

          {/* Mini app preview */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-rose-100 via-pink-50 to-violet-50 opacity-80 blur-2xl" />
              <div className="relative w-[280px] sm:w-[320px] rounded-[2.5rem] border border-gray-100 bg-white p-5 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-400">Aujourd'hui</div>
                  <div className="text-xs font-semibold text-rose-500">Confiance 98%</div>
                </div>
                <MiniRing />
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Stat label="Prochaines règles" value="5 jours" tint="rose" />
                  <Stat label="Ovulation" value="Jour 14" tint="violet" />
                </div>
                <div className="mt-3 rounded-2xl bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                  Pic d'énergie attendu — c'est le moment idéal pour bouger !
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle Section — "Une appli, avec vous pour la vie" */}
      <section id="lifecycle" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900">
              Une appli, avec vous pour la vie
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              De vos premières à vos dernières règles
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Period Tracking */}
            <LifecycleCard
              gradient="from-rose-100 to-pink-50"
              iconBg="bg-rose-500"
              icon={<Droplet className="h-6 w-6 text-white" />}
              title="Suivi des règles et du cycle"
              description="Suivez facilement vos règles et configurez des rappels concernant votre cycle. Vous saurez quand vos règles approchent et à quels symptômes vous attendre pendant les différentes phases de votre cycle."
              cta="Suivre mes règles"
              ctaLink="/auth"
            />

            {/* Ovulation */}
            <LifecycleCard
              gradient="from-blue-50 to-cyan-50"
              iconBg="bg-blue-500"
              icon={<Sun className="h-6 w-6 text-white" />}
              title="Suivi de l'ovulation pour tomber enceinte"
              description="Prédisez vos jours fertiles possibles et découvrez comment préparer votre corps pour tomber enceinte naturellement. Votre source d'informations incontournable sur la fertilité et l'ovulation !"
              cta="Tomber enceinte"
              ctaLink="/auth"
            />

            {/* Pregnancy */}
            <LifecycleCard
              gradient="from-orange-50 to-amber-50"
              iconBg="bg-orange-500"
              icon={<Baby className="h-6 w-6 text-white" />}
              title="Suivi de la grossesse semaine après semaine"
              description="Recevez du soutien dans cette aventure vers la parentalité. Découvrez comment votre bébé devrait se développer semaine après semaine et les changements que vous pourriez constater dans votre corps."
              cta="Suivre ma grossesse"
              ctaLink="/pregnancy"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-display text-4xl font-bold sm:text-5xl text-gray-900">
              Tout ce dont vous avez besoin
            </h2>
            <p className="mt-4 text-gray-600">
              Cycles, fertilité, grossesse, symptômes, IA, communauté — pour chaque étape de votre vie.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-600">
                <Users className="h-3.5 w-3.5" /> Communauté
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold text-gray-900">
                Des femmes qui s'entraident
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Rejoignez une communauté bienveillante de 12 000+ femmes. Partagez vos expériences, posez vos questions et recevez des réponses vérifiées par des professionnels de santé.
              </p>
              <div className="mt-8 space-y-4">
                <CommunityFeature icon={<MessageCircle className="h-5 w-5 text-rose-vif" />} title="Discussions thématiques" desc="Cycles, SOPK, endométriose, grossesse, contraception..." />
                <CommunityFeature icon={<ShieldCheck className="h-5 w-5 text-violet-doux" />} title="Réponses d'experts vérifiés" desc="Gynécologues et sages-femmes modèrent les discussions." />
                <CommunityFeature icon={<Heart className="h-5 w-5 text-rose-vif" />} title="Anonymat et bienveillance" desc="Espace safe, modéré et confidentiel." />
              </div>
              <Link to="/community" className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-100 transition">
                Rejoindre la communauté <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t.name} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">"{t.text}"</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-[10px] font-bold text-white">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-900">{t.name}</div>
                      <div className="text-[10px] text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <MapPin className="h-8 w-8 text-rose-vif mb-3" />
                  <p className="text-sm font-semibold text-gray-900">Géolocalisation</p>
                  <p className="text-xs text-gray-500 mt-1">Trouvez les spécialistes près de chez vous</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <Calendar className="h-8 w-8 text-violet-doux mb-3" />
                  <p className="text-sm font-semibold text-gray-900">RDV en ligne</p>
                  <p className="text-xs text-gray-500 mt-1">Réservez un créneau en quelques clics</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <Stethoscope className="h-8 w-8 text-emerald-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-900">Spécialistes vérifiés</p>
                  <p className="text-xs text-gray-500 mt-1">Gynécologues, sages-femmes, endocrinos</p>
                </div>
                <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <Star className="h-8 w-8 text-amber-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-900">Avis vérifiés</p>
                  <p className="text-xs text-gray-500 mt-1">Retours d'expérience de vraies patientes</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-600">
                <Stethoscope className="h-3.5 w-3.5" /> Médecins
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold text-gray-900">
                Trouvez votre spécialiste
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Accédez à un annuaire complet de gynécologues, sages-femmes et spécialistes de la santé féminine. Recherche par ville, spécialité ou géolocalisation.
              </p>
              <Link to="/doctors" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition">
                Trouver un médecin <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-vif to-violet-doux p-10 text-white shadow-2xl sm:p-16">
            <div className="max-w-xl">
              <Crown className="h-10 w-10 mb-4 opacity-80" />
              <h2 className="font-display text-4xl font-bold sm:text-5xl">
                Allez plus loin avec Premium.
              </h2>
              <p className="mt-4 text-white/85 text-lg">
                IA conseillère illimitée, rapports détaillés, prévisions affinées et téléconsultation incluse.
              </p>
              <div className="mt-6 space-y-2">
                {["Bloom AI illimité — réponses médicales sourcées", "Téléconsultation gynécologique incluse", "Rapports PDF partageables avec votre médecin", "Prédictions sur 12 mois avec 98% de précision"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/auth"
                  className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-rose-vif shadow-lg transition hover:scale-[1.02]"
                >
                  Essai gratuit 7 jours
                </Link>
                <span className="text-sm text-white/80">Sans engagement · À partir de 4,99€/mois</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif to-violet-doux">
                  <Flower2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-display text-lg font-bold">CycleBloom AI</span>
              </div>
              <p className="text-sm text-gray-500">Votre compagne de santé féminine intelligente, de vos premières règles à la ménopause.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Produit</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <Link to="/auth" className="block hover:text-gray-900">Mon Cycle</Link>
                <Link to="/doctors" className="block hover:text-gray-900">Médecins</Link>
                <Link to="/community" className="block hover:text-gray-900">Communauté</Link>
                <Link to="/subscription" className="block hover:text-gray-900">Premium</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <Link to="/help" className="block hover:text-gray-900">Centre d'aide</Link>
                <Link to="/contact" className="block hover:text-gray-900">Contact</Link>
                <Link to="/about" className="block hover:text-gray-900">À propos</Link>
                <Link to="/faq" className="block hover:text-gray-900">FAQ</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Légal</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <Link to="/privacy" className="block hover:text-gray-900">Confidentialité</Link>
                <Link to="/terms" className="block hover:text-gray-900">CGU</Link>
                <Link to="/disclaimer" className="block hover:text-gray-900">Avertissement médical</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <div>&copy; {new Date().getFullYear()} CycleBloom AI — Tous droits réservés</div>
            <div className="flex items-center gap-4">
              <a href="mailto:lbcloudadmin@gmail.com" className="flex items-center gap-1 hover:text-gray-600"><Mail className="h-3 w-3" /> lbcloudadmin@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LifecycleCard({ gradient, iconBg, icon, title, description, cta, ctaLink }: { gradient: string; iconBg: string; icon: React.ReactNode; title: string; description: string; cta: string; ctaLink: string }) {
  return (
    <div className="group">
      <div className={`rounded-3xl bg-gradient-to-br ${gradient} p-8 mb-6 flex items-center justify-center h-56 transition group-hover:scale-[1.02]`}>
        <div className={`h-20 w-20 rounded-full ${iconBg} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{description}</p>
      <Link to={ctaLink} className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition">
        {cta}
      </Link>
    </div>
  );
}

function CommunityFeature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

const features = [
  { icon: Sparkles, title: "IA prédictive", desc: "Algorithme entraîné sur vos cycles. Précision 98% affichée en temps réel." },
  { icon: Heart, title: "Suivi fertilité", desc: "Fenêtre fertile, ovulation et chances de conception sur un calendrier coloré." },
  { icon: Calendar, title: "Calendrier intelligent", desc: "Vue mois et jour avec règles, symptômes, fertilité et prédictions." },
  { icon: Brain, title: "Bloom AI", desc: "Une IA féminine pour répondre à vos questions santé, 24/7." },
  { icon: Activity, title: "Suivi symptômes", desc: "Humeur, douleurs, sommeil, glaire — tout en un endroit." },
  { icon: LineChart, title: "Rapports avancés", desc: "Graphiques détaillés et export PDF pour votre gynéco." },
  { icon: Stethoscope, title: "Annuaire médecins", desc: "Trouvez et réservez un rendez-vous près de chez vous." },
  { icon: Users, title: "Communauté active", desc: "12 000+ femmes et des experts de santé vérifiés." },
  { icon: ShieldCheck, title: "Privé et chiffré", desc: "Données chiffrées de bout en bout. RGPD conforme." },
];

const testimonials = [
  { name: "Aminata K.", role: "Douala", text: "Bloom AI m'a aidée à comprendre mon SOPK mieux que n'importe quel article." },
  { name: "Claire D.", role: "Paris", text: "J'ai enfin compris mon cycle après 10 ans de pilule." },
  { name: "Fatou N.", role: "Dakar", text: "La téléconsultation incluse c'est incroyable." },
  { name: "Marie L.", role: "Lyon", text: "Les prédictions sont ultra-précises, j'adore le design." },
];

function Stat({ label, value, tint }: { label: string; value: string; tint: "rose" | "violet" }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-3">
      <div className="text-[10px] uppercase tracking-wider text-gray-400">{label}</div>
      <div className={`mt-1 font-display text-lg font-bold ${tint === "rose" ? "text-rose-vif" : "text-violet-doux"}`}>{value}</div>
    </div>
  );
}

function MiniRing() {
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <svg width={160} height={160} className="-rotate-90">
        <circle cx={80} cy={80} r={68} stroke="#f3f4f6" strokeWidth={12} fill="none" />
        <circle cx={80} cy={80} r={68} stroke="var(--rose-vif)" strokeWidth={12} fill="none" strokeDasharray="72 1000" strokeLinecap="round" />
        <circle cx={80} cy={80} r={68} stroke="var(--violet-doux)" strokeWidth={12} fill="none" strokeDasharray="50 1000" strokeDashoffset="-160" strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="text-[10px] uppercase tracking-widest text-gray-400">Jour</div>
        <div className="font-display text-4xl font-bold text-gradient-bloom">14</div>
      </div>
    </div>
  );
}

function FloatingBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-rose-100 opacity-40 blur-3xl" style={{ animation: "float-slow 10s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute right-0 top-32 h-96 w-96 rounded-full bg-violet-50 opacity-40 blur-3xl" style={{ animation: "float-slow 14s ease-in-out infinite" }} />
    </>
  );
}
