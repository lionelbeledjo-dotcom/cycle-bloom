import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MessageCircle, Heart, TrendingUp, Plus } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Communauté — CycleBloom AI" }] }),
  component: Community,
});

const CATEGORIES = ["Tout", "Cycles", "Fertilité", "Grossesse", "Bien-être", "SOPK", "Questions"];

const POSTS = [
  { id: 1, author: "Sophie M.", avatar: "S", cat: "Cycles", title: "Cycles irréguliers après arrêt de la pilule", preview: "Ça fait 3 mois que j'ai arrêté ma pilule et mes cycles sont complètement déréglés (35 à 45 jours). Est-ce normal ?", replies: 14, likes: 23, time: "Il y a 2h" },
  { id: 2, author: "Amina D.", avatar: "A", cat: "Fertilité", title: "Glaire cervicale et ovulation — votre expérience ?", preview: "Comment vous repérez votre ovulation ? Moi c'est surtout la glaire type blanc d'œuf mais parfois je doute...", replies: 22, likes: 38, time: "Il y a 4h" },
  { id: 3, author: "Julie B.", avatar: "J", cat: "Bien-être", title: "Yoga et règles douloureuses : ça marche vraiment ?", preview: "J'ai commencé le yoga spécial cycle et honnêtement ça change tout. Qui d'autre a essayé ?", replies: 31, likes: 56, time: "Il y a 6h" },
  { id: 4, author: "Léa F.", avatar: "L", cat: "SOPK", title: "Diagnostiquée SOPK à 26 ans — besoin de soutien", preview: "Je viens d'être diagnostiquée. Mon gynéco m'a prescrit de la metformine. Des retours d'expérience ?", replies: 45, likes: 89, time: "Il y a 8h" },
  { id: 5, author: "Clara R.", avatar: "C", cat: "Grossesse", title: "Premier trimestre : les nausées 24h/24", preview: "Je suis à 8SA et les nausées sont terribles. Qu'est-ce qui vous a aidé ? Le gingembre ne marche pas pour moi.", replies: 28, likes: 42, time: "Hier" },
  { id: 6, author: "Fatou N.", avatar: "F", cat: "Questions", title: "Spotting entre les règles — quand consulter ?", preview: "J'ai des petites pertes rosées au milieu du cycle depuis 2 mois. Mon médecin dit que c'est normal mais ça m'inquiète.", replies: 11, likes: 17, time: "Hier" },
  { id: 7, author: "Inès M.", avatar: "I", cat: "Cycles", title: "Flux très abondant — astuces ?", preview: "Mes règles sont devenues très abondantes ces derniers mois (changement toutes les 2h). Ça vous est arrivé ?", replies: 19, likes: 31, time: "Il y a 2j" },
];

const TRENDING = [
  "Comment gérer le SPM naturellement",
  "Retour de couches : à quoi s'attendre",
  "Les meilleures apps de suivi (comparatif)",
  "Endométriose et alimentation anti-inflammatoire",
];

function Community() {
  return (
    <AppShell title="Communauté">
      <div className="flex items-center justify-between -mt-4 mb-6">
        <p className="text-sm text-foreground/70">Un espace bienveillant entre femmes 💜</p>
        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom">
          <Plus className="h-4 w-4" /> Nouveau post
        </button>
      </div>

      <div className="-mx-2 mb-6 flex gap-2 overflow-x-auto px-2 pb-1">
        {CATEGORIES.map((c, i) => (
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

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {POSTS.map(post => (
            <article key={post.id} className="rounded-3xl border border-white/70 glass p-5 shadow-bloom transition hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold">{post.author}</span>
                    <span className="rounded-full bg-lavande px-2 py-0.5 text-[9px] font-medium text-violet-doux">{post.cat}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{post.time}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold leading-tight">{post.title}</h3>
                  <p className="mt-1.5 text-xs text-foreground/60 line-clamp-2">{post.preview}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.replies} réponses</span>
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {post.likes}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-rose-vif" />
              <h3 className="font-display text-base font-semibold">Tendances</h3>
            </div>
            <div className="space-y-3">
              {TRENDING.map((t, i) => (
                <div key={i} className="flex items-start gap-2 cursor-pointer group">
                  <span className="text-xs font-bold text-rose-vif mt-0.5">#{i + 1}</span>
                  <span className="text-xs text-foreground/70 group-hover:text-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-5 text-white shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest">Règles de la communauté</div>
            <ul className="mt-3 space-y-2 text-xs text-white/85">
              <li>💜 Bienveillance et respect</li>
              <li>🚫 Pas de diagnostic médical</li>
              <li>🔒 Anonymat respecté</li>
              <li>⚠️ Signaler le contenu inapproprié</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
