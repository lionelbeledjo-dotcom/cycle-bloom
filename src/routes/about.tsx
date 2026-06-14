import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Heart, Users, Sparkles, Target, Globe, Award, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "À propos — CycleBloom AI" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">CycleBloom</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">← Retour</Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
            <Heart className="h-8 w-8 text-rose-vif" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">À propos de CycleBloom AI</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Nous révolutionnons la santé féminine grâce à l'intelligence artificielle, en rendant le suivi de cycle accessible, intelligent et bienveillant.</p>
        </div>

        <div className="mb-16 rounded-3xl bg-gradient-to-br from-rose-vif/5 via-violet-doux/5 to-lavande/5 p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-6 w-6 text-rose-vif" />
                <h2 className="font-display text-2xl font-bold text-gray-900">Notre mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">Accompagner chaque femme dans la compréhension de son corps et de son cycle, grâce à une technologie de pointe qui respecte sa vie privée et sa singularité.</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-6 w-6 text-violet-doux" />
                <h2 className="font-display text-2xl font-bold text-gray-900">Notre vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">Un monde où chaque femme dispose des outils et des connaissances nécessaires pour prendre soin de sa santé reproductive avec confiance et sérénité.</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-10">Ce qui nous différencie</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sparkles, title: "IA avancée", desc: "Algorithmes personnalisés qui apprennent de votre cycle unique" },
              { icon: Heart, title: "Bienveillance", desc: "Conçu par des femmes, pour des femmes, avec empathie" },
              { icon: Globe, title: "Accessibilité", desc: "Disponible partout, dans plusieurs langues" },
              { icon: Award, title: "Confidentialité", desc: "Vos données vous appartiennent, toujours" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg transition">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
                  <item.icon className="h-6 w-6 text-rose-vif" />
                </div>
                <h3 className="font-display font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 text-center mb-10">L'équipe</h2>
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-6 w-6 text-violet-doux" />
              <h3 className="font-display text-xl font-bold text-gray-900">LB Group</h3>
            </div>
            <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">CycleBloom AI est développé par LB Group, une équipe passionnée de développeurs, designers et experts en santé féminine basée entre Paris et Douala. Nous combinons expertise technologique et sensibilité médicale pour créer l'application de santé féminine la plus complète du marché.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 text-center">
          {[
            { value: "50K+", label: "Utilisatrices actives" },
            { value: "99.2%", label: "Précision des prédictions" },
            { value: "4.9/5", label: "Note moyenne" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-100 p-6">
              <div className="font-display text-3xl font-bold bg-gradient-to-r from-rose-vif to-violet-doux bg-clip-text text-transparent">{stat.value}</div>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
