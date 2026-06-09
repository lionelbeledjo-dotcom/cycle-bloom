import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Sparkles, Heart, Brain, Calendar, LineChart, ShieldCheck, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CycleBloom AI — Santé féminine intelligente" },
      { name: "description", content: "Suivi de cycle, fertilité, grossesse et bien-être propulsé par l'IA. Plus complet que les apps classiques." },
      { property: "og:title", content: "CycleBloom AI" },
      { property: "og:description", content: "La plateforme de santé féminine la plus complète, propulsée par l'IA." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="bg-bloom min-h-screen overflow-hidden">
      {/* Header */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display text-xl font-bold leading-none">CycleBloom</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-violet-doux">AI</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
            <a href="#features" className="hover:text-foreground">Fonctionnalités</a>
            <a href="#magazine" className="hover:text-foreground">Magazine</a>
            <a href="#pricing" className="hover:text-foreground">Premium</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground sm:inline">
              Connexion
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.02]"
            >
              Essayer gratuitement
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <FloatingBlobs />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-doux shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Propulsé par l'IA
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Votre cycle,
              <br />
              <span className="text-gradient-bloom">compris à 98%.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-foreground/70">
              CycleBloom AI prédit vos règles, votre ovulation et votre fertilité avec une précision inégalée. Un magazine santé, une IA conseillère et un design pensé pour vous.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-7 py-3.5 text-base font-semibold text-white shadow-bloom transition hover:scale-[1.03]"
              >
                Commencer maintenant
              </Link>
              <a href="#features" className="story-link text-sm font-semibold text-foreground/80">
                Découvrir les fonctionnalités →
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-violet-doux" /> RGPD & chiffré
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-rose-vif" /> 4.9 / 5
              </div>
            </div>
          </div>

          {/* Hero visual: phone mockup */}
          <div className="relative z-10 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-rose-pastel via-rose-poudre to-lavande opacity-70 blur-2xl" />
              <div className="relative w-[300px] rounded-[2.5rem] border border-white/70 glass-dark p-5 shadow-bloom">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xs font-medium text-muted-foreground">Aujourd'hui</div>
                  <div className="text-xs font-semibold text-rose-vif">Confiance 98%</div>
                </div>
                <MiniRing />
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Stat label="Prochaines règles" value="J-9" tint="rose" />
                  <Stat label="Ovulation" value="Demain" tint="violet" />
                </div>
                <div className="mt-3 rounded-2xl bg-white/70 p-3 text-xs leading-relaxed text-foreground/70">
                  💜 Pic d'énergie attendu — c'est le moment idéal pour bouger.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Tout ce dont vous avez besoin, <span className="text-gradient-bloom">en une app.</span>
          </h2>
          <p className="mt-4 text-foreground/70">
            Cycles, fertilité, grossesse, périménopause, symptômes, magazine, IA — pensée pour chaque étape de votre vie.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl border border-white/70 glass p-6 shadow-bloom transition hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux text-white shadow-bloom">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="relative mx-auto max-w-5xl px-6 pb-32">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-vif to-violet-doux p-10 text-white shadow-bloom sm:p-16">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              Premium
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Allez plus loin avec Bloom AI.
            </h2>
            <p className="mt-3 text-white/85">
              IA conseillère illimitée, rapports détaillés, prévisions affinées et conseils personnalisés.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-rose-vif shadow-lg transition hover:scale-[1.02]"
              >
                Démarrer l'essai
              </Link>
              <span className="text-sm text-white/80">7 jours offerts · sans engagement</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-white/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} CycleBloom AI — Tous droits réservés</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Confidentialité</a>
            <a href="#" className="hover:text-foreground">CGU</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  { icon: Sparkles, title: "IA prédictive", desc: "Algorithme entraîné sur vos cycles, humeur et symptômes. Précision affichée en temps réel." },
  { icon: Heart, title: "Suivi fertilité", desc: "Fenêtre fertile, ovulation et chances de conception sur un calendrier coloré." },
  { icon: Calendar, title: "Calendrier intelligent", desc: "Vue mois, semaine et jour avec règles, symptômes et fertilité." },
  { icon: Brain, title: "Bloom AI", desc: "Une conseillère IA féminine pour répondre à toutes vos questions, 24/7." },
  { icon: LineChart, title: "Rapports avancés", desc: "Graphiques détaillés et export PDF pour partager avec votre gynéco." },
  { icon: ShieldCheck, title: "Privé et chiffré", desc: "Vos données médicales sont chiffrées de bout en bout. RGPD conforme." },
];

function Stat({ label, value, tint }: { label: string; value: string; tint: "rose" | "violet" }) {
  return (
    <div className="rounded-2xl bg-white/70 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-lg font-bold ${tint === "rose" ? "text-rose-vif" : "text-violet-doux"}`}>{value}</div>
    </div>
  );
}

function MiniRing() {
  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
      <svg width={176} height={176} className="-rotate-90">
        <circle cx={88} cy={88} r={76} stroke="var(--lavande)" strokeWidth={14} fill="none" />
        <circle cx={88} cy={88} r={76} stroke="var(--rose-vif)" strokeWidth={14} fill="none" strokeDasharray="80 1000" strokeLinecap="round" />
        <circle cx={88} cy={88} r={76} stroke="var(--violet-doux)" strokeWidth={14} fill="none" strokeDasharray="60 1000" strokeDashoffset="-180" strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="text-[10px] uppercase tracking-widest text-violet-doux">Jour</div>
        <div className="font-display text-4xl font-bold text-gradient-bloom">14</div>
      </div>
    </div>
  );
}

function FloatingBlobs() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: "var(--rose-pastel)", animation: "float-slow 10s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--lavande)", animation: "float-slow 14s ease-in-out infinite" }}
      />
    </>
  );
}
