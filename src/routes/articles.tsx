import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Search } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [{ title: "Magazine — CycleBloom AI" }] }),
  component: Articles,
});

const categories = ["Tout", "Menstruation", "Fertilité", "Grossesse", "Hormones", "Bien-être", "SOPK", "Endométriose", "Nutrition"];

const articles = [
  { title: "5 signes que vous êtes en pleine ovulation", cat: "Fertilité", time: "3 min", author: "Dr. Léa Bernard", gradient: "from-rose-vif to-rose-poudre" },
  { title: "Comprendre le SOPK et ses cycles irréguliers", cat: "SOPK", time: "7 min", author: "Dr. Anaïs Roy", gradient: "from-violet-doux to-rose-vif" },
  { title: "Nutrition : que manger en phase lutéale ?", cat: "Nutrition", time: "5 min", author: "Marie Dubois", gradient: "from-lavande to-rose-poudre" },
  { title: "Endométriose : reconnaître les premiers signes", cat: "Endométriose", time: "6 min", author: "Dr. Camille T.", gradient: "from-rose-poudre to-violet-doux" },
  { title: "Préparer son corps à la grossesse", cat: "Grossesse", time: "8 min", author: "Sage-femme Léna", gradient: "from-rose-vif to-violet-doux" },
  { title: "Le yoga pendant les règles : 6 postures", cat: "Bien-être", time: "4 min", author: "Sophie M.", gradient: "from-rose-poudre to-lavande" },
];

function Articles() {
  return (
    <AppShell title="Magazine">
      <p className="-mt-4 mb-8 max-w-xl text-foreground/70">
        Lectures vérifiées par des professionnel·les de santé pour vous accompagner à chaque étape.
      </p>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Rechercher un article…"
            className="w-full rounded-full border border-border bg-white/80 py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
          />
        </div>
      </div>

      <div className="-mx-2 mb-8 flex gap-2 overflow-x-auto px-2 pb-1">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
              i === 0
                ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-bloom"
                : "bg-white/80 text-foreground/70 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article
            key={a.title}
            className="group overflow-hidden rounded-3xl border border-white/70 glass shadow-bloom transition hover:-translate-y-1"
          >
            <div className={`h-40 bg-gradient-to-br ${a.gradient}`} />
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-widest text-violet-doux">{a.cat}</div>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight group-hover:text-rose-vif">
                {a.title}
              </h3>
              <p className="mt-3 text-xs text-muted-foreground">{a.time} de lecture · {a.author}</p>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
