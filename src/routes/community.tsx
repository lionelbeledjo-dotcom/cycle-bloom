import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { MessageCircle, Heart, TrendingUp, Plus, ChevronLeft, Send, Shield, CheckCircle2, Crown, Lock, X } from "lucide-react";
import { isPremium } from "@/lib/premium-gate";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Communauté — CycleBloom AI" }] }),
  component: Community,
});

const CATEGORIES = ["Tout", "Cycles", "Fertilité", "Grossesse", "Bien-être", "SOPK", "Endométriose", "Contraception"];

export interface Post {
  id: number;
  author: string;
  avatar: string;
  cat: string;
  title: string;
  preview: string;
  replies: Reply[];
  likes: number;
  time: string;
  verified?: boolean;
}

export interface Reply {
  author: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
  isExpert?: boolean;
  expertTitle?: string;
}

export const POSTS: Post[] = [
  {
    id: 1,
    author: "Sophie M.",
    avatar: "S",
    cat: "Cycles",
    title: "Cycles irréguliers après arrêt de la pilule — retour d'expérience",
    preview: "Ça fait 3 mois que j'ai arrêté ma pilule et mes cycles sont complètement déréglés (35 à 45 jours). Est-ce normal ? Combien de temps ça a pris pour vous ?",
    likes: 47,
    time: "Il y a 2h",
    replies: [
      { author: "Dr. Aminata D.", avatar: "A", text: "C'est tout à fait normal, Sophie. Après l'arrêt d'une contraception hormonale, il faut en moyenne 3 à 6 mois pour que le corps retrouve ses cycles naturels. L'axe hypothalamo-hypophyso-ovarien doit se « réveiller ». Si après 6 mois vos cycles dépassent toujours 45 jours, un bilan hormonal (FSH, LH, AMH, TSH) serait recommandé pour exclure un SOPK ou un problème thyroïdien.", likes: 34, time: "Il y a 1h", isExpert: true, expertTitle: "Gynécologue" },
      { author: "Marie L.", avatar: "M", text: "Pour moi ça a pris 5 mois après 8 ans de pilule. Mon premier cycle sans pilule faisait 52 jours ! Puis progressivement : 42, 38, 31, et maintenant je suis stable à 29-30 jours. Courage, ça revient !", likes: 23, time: "Il y a 1h30" },
      { author: "Fatou K.", avatar: "F", text: "J'ai eu le même problème. Mon gynéco m'a prescrit du Gattilier (Vitex agnus-castus) pendant 3 mois et mes cycles se sont régularisés. C'est une plante qui agit sur l'axe hormonal. Demande à ton médecin.", likes: 18, time: "Il y a 45min" },
      { author: "Clara R.", avatar: "C", text: "Pareil ici ! 4 mois de chaos puis retour à la normale. Les tests d'ovulation m'ont aidée à comprendre que j'ovulais quand même, juste plus tard que « prévu ».", likes: 12, time: "Il y a 30min" },
    ],
  },
  {
    id: 2,
    author: "Amina D.",
    avatar: "A",
    cat: "Fertilité",
    title: "Glaire cervicale et ovulation — comment vous la repérez ?",
    preview: "J'essaie de tomber enceinte et je suis la méthode de la glaire. Parfois j'ai du blanc d'œuf pendant 3 jours, parfois 1 seul jour. C'est normal cette variation ?",
    likes: 56,
    time: "Il y a 4h",
    replies: [
      { author: "Dr. Léa Bernard", avatar: "L", text: "La durée de la glaire fertile (type blanc d'œuf) peut varier d'un cycle à l'autre, c'est parfaitement normal. Ce qui compte c'est d'identifier le DERNIER jour de glaire fertile (appelé « jour sommet ») — l'ovulation survient dans les 24h qui suivent dans 80% des cas. Combinez avec les tests d'ovulation (LH) et la température basale pour trianguler.", likes: 42, time: "Il y a 3h", isExpert: true, expertTitle: "Spécialiste fertilité" },
      { author: "Inès M.", avatar: "I", text: "Moi j'ai mis 3 cycles à vraiment savoir la reconnaître. Le truc qui m'a aidée : la vérifier au col (désolée si c'est TMI 😅) plutôt qu'aux sous-vêtements. C'est beaucoup plus fiable car la glaire peut se mélanger avec d'autres sécrétions.", likes: 28, time: "Il y a 2h30" },
      { author: "Julie B.", avatar: "J", text: "J'ai eu 1 seul jour de blanc d'œuf pendant 3 cycles et je suis quand même tombée enceinte ! Certaines femmes n'en produisent pas beaucoup mais ovulent très bien. La sensation de « glisse » à la vulve est aussi un bon indicateur.", likes: 19, time: "Il y a 2h" },
    ],
  },
  {
    id: 3,
    author: "Julie B.",
    avatar: "J",
    cat: "Bien-être",
    title: "Yoga et règles douloureuses : protocole qui a changé ma vie",
    preview: "J'avais des crampes incapacitantes (ibuprofène 800mg/jour pendant 3 jours). Depuis que je fais ces postures spécifiques, j'ai réduit à 1 seul comprimé le premier jour. Voici ce qui marche :",
    likes: 89,
    time: "Il y a 6h",
    verified: true,
    replies: [
      { author: "Julie B.", avatar: "J", text: "Mon protocole : Phase lutéale (J21-28) : Supta Baddha Konasana (papillon allongé) 5min, Balasana (enfant) 3min, torsions douces. Jour 1-2 des règles : PAS d'inversions, juste Child's pose, Cat-Cow très lent, et Savasana avec bouillotte. J3-5 : reprendre doucement avec Pigeon pose et étirements du psoas. Études montrent que 20min de yoga/jour réduit l'intensité des crampes de 50% (étude publiée dans JAMS 2017).", likes: 67, time: "Il y a 6h" },
      { author: "Dr. Fatou N.", avatar: "F", text: "Excellent partage Julie ! Le yoga agit sur les crampes via plusieurs mécanismes : réduction du cortisol (stress amplifie les prostaglandines), amélioration de la circulation pelvienne, et activation du système nerveux parasympathique. Je recommande aussi le magnésium bisglycinate 300mg/j en phase lutéale en complément.", likes: 45, time: "Il y a 5h", isExpert: true, expertTitle: "Sage-femme" },
      { author: "Clara R.", avatar: "C", text: "Merci Julie !! J'ai commencé ton protocole il y a 2 cycles et je confirme : énorme différence. Surtout le papillon allongé avec la bouillotte, c'est magique pour les crampes basses.", likes: 31, time: "Il y a 4h" },
    ],
  },
  {
    id: 4,
    author: "Léa F.",
    avatar: "L",
    cat: "SOPK",
    title: "Diagnostiquée SOPK à 26 ans — mon parcours et conseils",
    preview: "Je viens d'être diagnostiquée après 2 ans de cycles de 45-90 jours, acné kystique et hirsutisme. Mon gynéco m'a prescrit metformine + changement d'alimentation. Besoin de vos retours.",
    likes: 112,
    time: "Il y a 8h",
    replies: [
      { author: "Dr. Marie-Claire O.", avatar: "M", text: "Léa, le SOPK est le trouble endocrinien le plus fréquent chez les femmes (10-13%). La metformine est un excellent choix si vous avez une résistance à l'insuline (HOMA-IR > 2.5). Côté alimentation, visez un index glycémique bas : remplacez les féculents blancs par des légumineuses, ajoutez des fibres à chaque repas (ralentit l'absorption du sucre), et privilégiez les protéines le matin. L'exercice est crucial : 150min/semaine de cardio + renforcement musculaire améliorent la sensibilité à l'insuline de 20-30%.", likes: 78, time: "Il y a 7h", isExpert: true, expertTitle: "Endocrinologue" },
      { author: "Fatou K.", avatar: "F", text: "Diagnostiquée à 24 ans, aujourd'hui 29. La metformine + alimentation anti-inflammatoire + inositol (myo-inositol 4g/j) a transformé mes cycles : passée de 60-90 jours à 32-35 jours en 6 mois. Mon acné a disparu en 4 mois. Ne lâche pas, ça prend du temps mais ça marche.", likes: 56, time: "Il y a 6h" },
      { author: "Sophie M.", avatar: "S", text: "J'ai un SOPK léger et la combinaison qui marche pour moi : jeûne intermittent 16:8, marche 10 000 pas/jour, magnésium + zinc + vitamine D, et Vitex. Mes cycles sont passés de 45j à 31j en 4 mois.", likes: 34, time: "Il y a 5h" },
      { author: "Inès M.", avatar: "I", text: "Courage Léa ! Le diagnostic c'est le plus dur psychologiquement mais une fois qu'on sait, on peut agir. Rejoins aussi le groupe @SOPK_France sur les réseaux, c'est une communauté super soutenante.", likes: 23, time: "Il y a 4h" },
    ],
  },
  {
    id: 5,
    author: "Clara R.",
    avatar: "C",
    cat: "Grossesse",
    title: "Premier trimestre : nausées 24h/24 — ce qui m'a VRAIMENT aidée",
    preview: "8 SA et les nausées sont terribles. Le gingembre seul ne marchait pas. Voici la combinaison qui m'a permis de fonctionner :",
    likes: 67,
    time: "Hier",
    replies: [
      { author: "Clara R.", avatar: "C", text: "Ce qui a fonctionné : 1) Vitamine B6 25mg 3x/jour (validé par ACOG). 2) Manger AVANT d'avoir faim — toutes les 2h, petites portions protéinées. 3) Acupression point P6 (bracelets Sea-Band). 4) Gingembre EN CAPSULES (pas en tisane, dosage trop faible). 5) Citron frais à sentir en cas de crise. L'estomac vide est l'ennemi #1. Je garde des crackers sur ma table de nuit.", likes: 45, time: "Hier" },
      { author: "Dr. Léa B.", avatar: "L", text: "Bon résumé Clara ! La B6 (pyridoxine) est le traitement de première intention selon l'ACOG. Si ça ne suffit pas, l'association B6 + doxylamine (Diclectin/Cariban) est sûre en grossesse. N'hésitez pas à consulter si les vomissements sont > 3-4/jour ou si vous perdez du poids — l'hyperemesis gravidarum nécessite parfois un traitement IV.", likes: 38, time: "Hier", isExpert: true, expertTitle: "Obstétricienne" },
      { author: "Marie L.", avatar: "M", text: "La B6 m'a sauvé la vie aussi ! Et les smoothies le matin plutôt que de manger solide. Accrochez-vous, pour 80% des femmes ça passe vers 12-14 SA.", likes: 22, time: "Hier" },
    ],
  },
  {
    id: 6,
    author: "Fatou N.",
    avatar: "F",
    cat: "Endométriose",
    title: "Endométriose stade 3 : comment j'ai réduit mes douleurs de 80%",
    preview: "Diagnostiquée en 2022 après 8 ans d'errance médicale. Voici mon approche multidisciplinaire qui a changé ma qualité de vie :",
    likes: 134,
    time: "Hier",
    replies: [
      { author: "Fatou N.", avatar: "F", text: "Mon protocole : 1) Dienogest en continu (plus de règles = moins d'inflammation). 2) Alimentation anti-inflammatoire stricte : zéro gluten, zéro produits laitiers, beaucoup d'oméga-3. 3) Ostéopathie spécialisée pelvi-périnéale 1x/mois. 4) Yoga adapté (pas d'abdos classiques !). 5) Curcumine liposomale 1g/j. Résultat : douleur passée de 8/10 quotidien à 2/10 occasionnel en 6 mois.", likes: 89, time: "Hier" },
      { author: "Dr. Sophie M.", avatar: "S", text: "Fatou, votre approche est exemplaire. Le Dienogest (Visanne) est effectivement le progestatif de référence pour l'endométriose avec le meilleur rapport efficacité/effets secondaires. L'alimentation anti-inflammatoire a montré des résultats significatifs dans plusieurs études (réduction de 30-50% des douleurs). L'important est cette approche MULTIMODALE — aucun traitement seul ne suffit pour l'endométriose.", likes: 67, time: "Il y a 22h", isExpert: true, expertTitle: "Gynécologue spécialisée endométriose" },
      { author: "Léa F.", avatar: "L", text: "8 ans d'errance... c'est malheureusement la moyenne. Merci de partager ton parcours, ça aide tellement de savoir qu'on peut retrouver une qualité de vie. Je vais demander à mon gynéco pour le Dienogest.", likes: 34, time: "Il y a 20h" },
    ],
  },
  {
    id: 7,
    author: "Inès M.",
    avatar: "I",
    cat: "Contraception",
    title: "DIU cuivre : mon retour après 2 ans (sans hormones !)",
    preview: "Pour celles qui hésitent à passer au DIU cuivre, voici mon expérience complète après 2 ans : avantages, inconvénients, et ce que j'aurais aimé savoir avant.",
    likes: 78,
    time: "Il y a 2j",
    replies: [
      { author: "Inès M.", avatar: "I", text: "Avantages : aucune hormone, posé et tranquille pour 5-10 ans, retour fertilité immédiat si retrait. Inconvénients réels : les 3 premiers mois mes règles étaient plus abondantes (+2 jours) et les crampes plus fortes. MAIS : à partir du 4e mois tout s'est calmé. Aujourd'hui : règles normales, pas d'effets secondaires, je ne pense jamais à la contraception. Conseil : prenez ibuprofène 1h avant la pose, et faites-le poser pendant les règles (col plus ouvert).", likes: 56, time: "Il y a 2j" },
      { author: "Dr. Aminata D.", avatar: "A", text: "Merci Inès pour ce retour ! Le DIU cuivre est une excellente option pour les femmes qui ne souhaitent pas d'hormones. Efficacité > 99%. Les règles plus abondantes les premiers mois sont l'effet secondaire le plus fréquent mais transitoire. Contre-indications : maladie de Wilson, allergie au cuivre, malformation utérine, infection pelvienne active. Le DIU peut être posé à tout âge, même sans avoir eu d'enfant (contrairement à une idée reçue).", likes: 45, time: "Il y a 2j", isExpert: true, expertTitle: "Gynécologue" },
      { author: "Sophie M.", avatar: "S", text: "J'ai le même depuis 3 ans et je confirme tout ! Les premiers mois sont un investissement mais après c'est le bonheur de ne penser à rien. Pour les crampes des premiers cycles : bouillotte + magnésium = combo gagnant.", likes: 23, time: "Il y a 1j" },
    ],
  },
];

const TRENDING = [
  { text: "Comment gérer le SPM naturellement", cat: "Bien-être" },
  { text: "Retour de couches : à quoi s'attendre", cat: "Grossesse" },
  { text: "Endométriose et alimentation anti-inflammatoire", cat: "Endométriose" },
  { text: "SOPK : myo-inositol vs metformine", cat: "SOPK" },
  { text: "Cycle et libido : comprendre les fluctuations", cat: "Cycles" },
];

function Community() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem("cyclebloom_community_posts");
    return stored ? JSON.parse(stored) : [];
  });

  const allPosts = [...userPosts, ...POSTS].sort((a, b) => b.id - a.id);
  const filteredPosts = activeCategory === "Tout"
    ? allPosts
    : allPosts.filter(p => p.cat === activeCategory);

  const handleNewPost = (title: string, content: string, category: string) => {
    const post: Post = {
      id: Date.now(),
      author: "Moi",
      avatar: "M",
      cat: category,
      title,
      preview: content,
      replies: [],
      likes: 0,
      time: "À l'instant",
    };
    const updated = [post, ...userPosts];
    setUserPosts(updated);
    localStorage.setItem("cyclebloom_community_posts", JSON.stringify(updated));
    setShowNewPost(false);
    toast.success("Post publié !", { description: "Votre discussion est maintenant visible." });
  };

  const handleTrendingClick = (cat: string) => {
    setActiveCategory(cat);
  };

  if (selectedPost) {
    return (
      <AppShell title="Communauté">
        <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      </AppShell>
    );
  }

  if (showNewPost) {
    return (
      <AppShell title="Communauté">
        <NewPostForm onSubmit={handleNewPost} onCancel={() => setShowNewPost(false)} />
      </AppShell>
    );
  }

  return (
    <AppShell title="Communauté">
      <div className="flex items-center justify-between -mt-4 mb-6">
        <p className="text-sm text-foreground/70">Espace d'entraide bienveillant entre femmes — modéré par des professionnels de santé</p>
        {isPremium() ? (
          <button onClick={() => setShowNewPost(true)} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
            <Plus className="h-4 w-4" /> Nouveau post
          </button>
        ) : (
          <Link to="/subscription" className="flex items-center gap-2 rounded-full bg-foreground/5 border border-border px-5 py-2.5 text-sm font-semibold text-foreground/60 hover:bg-foreground/10 transition">
            <Lock className="h-3.5 w-3.5" /> Poster <Crown className="h-3.5 w-3.5 text-rose-vif" />
          </Link>
        )}
      </div>

      <div className="-mx-2 mb-6 flex gap-2 overflow-x-auto px-2 pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeCategory === c
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
          {filteredPosts.map(post => (
            <Link
              to="/discussion/$discussionId"
              params={{ discussionId: String(post.id) }}
              key={post.id}
              className="rounded-3xl border border-white/70 glass p-5 shadow-bloom transition hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold">{post.author}</span>
                    <span className="rounded-full bg-lavande px-2 py-0.5 text-[9px] font-medium text-violet-doux">{post.cat}</span>
                    {post.verified && (
                      <span className="flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-medium text-green-700">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Vérifié
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground ml-auto">{post.time}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold leading-tight">{post.title}</h3>
                  <p className="mt-1.5 text-xs text-foreground/60 line-clamp-2">{post.preview}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.replies.length} réponses</span>
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {post.likes}</span>
                    {post.replies.some(r => r.isExpert) && (
                      <span className="flex items-center gap-1 text-violet-doux font-medium">
                        <Shield className="h-3.5 w-3.5" /> Réponse experte
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
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
                <button key={i} onClick={() => handleTrendingClick(t.cat)} className="flex items-start gap-2 cursor-pointer group w-full text-left">
                  <span className="text-xs font-bold text-rose-vif mt-0.5">#{i + 1}</span>
                  <span className="text-xs text-foreground/70 group-hover:text-foreground transition">{t.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <h3 className="font-display text-sm font-semibold mb-3">Statistiques</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-white/60 p-3">
                <div className="font-display text-xl font-bold text-rose-vif">12.4k</div>
                <div className="text-[10px] text-muted-foreground">Membres</div>
              </div>
              <div className="rounded-2xl bg-white/60 p-3">
                <div className="font-display text-xl font-bold text-violet-doux">847</div>
                <div className="text-[10px] text-muted-foreground">Discussions</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-5 text-white shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest">Modération</div>
            <ul className="mt-3 space-y-2 text-xs text-white/85">
              <li>• Bienveillance et respect mutuel</li>
              <li>• Réponses vérifiées par des médecins</li>
              <li>• Anonymat et confidentialité</li>
              <li>• Contenu inapproprié signalé sous 24h</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function NewPostForm({ onSubmit, onCancel }: { onSubmit: (title: string, content: string, cat: string) => void; onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Cycles");

  return (
    <div>
      <button onClick={onCancel} className="flex items-center gap-1 text-sm text-violet-doux hover:text-rose-vif transition mb-6">
        <ChevronLeft className="h-4 w-4" /> Retour
      </button>
      <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
        <h2 className="font-display text-xl font-bold mb-6">Nouvelle discussion</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Catégorie</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c !== "Tout").map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${category === c ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white" : "bg-white/70 border border-border text-foreground/60 hover:text-foreground"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Titre</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Résumez votre question ou sujet..."
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Contenu</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Décrivez votre situation, posez vos questions..."
              className="w-full rounded-2xl border border-border bg-white/80 p-4 text-sm outline-none resize-none h-32 focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={onCancel} className="text-sm text-foreground/50 hover:text-foreground">Annuler</button>
            <button
              onClick={() => { if (title.trim() && content.trim()) onSubmit(title, content, category); }}
              disabled={!title.trim() || !content.trim()}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-3.5 w-3.5" /> Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostDetail({ post, onBack }: { post: Post; onBack: () => void }) {
  const [liked, setLiked] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localReplies, setLocalReplies] = useState<Reply[]>(post.replies);

  const sendReply = () => {
    if (!replyText.trim()) return;
    const newReply: Reply = {
      author: "Moi",
      avatar: "M",
      text: replyText,
      likes: 0,
      time: "À l'instant",
    };
    setLocalReplies([...localReplies, newReply]);
    setReplyText("");
    toast.success("Réponse publiée !");
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-violet-doux hover:text-rose-vif transition mb-6">
        <ChevronLeft className="h-4 w-4" /> Retour à la communauté
      </button>

      <article className="rounded-3xl border border-white/70 glass p-6 shadow-bloom mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-lg font-bold text-white shrink-0">
            {post.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.author}</span>
              <span className="rounded-full bg-lavande px-2 py-0.5 text-[9px] font-medium text-violet-doux">{post.cat}</span>
            </div>
            <span className="text-xs text-muted-foreground">{post.time}</span>
          </div>
        </div>
        <h2 className="font-display text-xl font-bold mb-3">{post.title}</h2>
        <p className="text-sm text-foreground/80 leading-relaxed">{post.preview}</p>
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition ${liked ? "bg-rose-vif text-white" : "bg-white/70 text-foreground/60 hover:bg-white"}`}
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-white" : ""}`} />
            {post.likes + (liked ? 1 : 0)}
          </button>
          <span className="text-xs text-muted-foreground">{localReplies.length} réponses</span>
        </div>
      </article>

      {/* Replies */}
      <div className="space-y-4 mb-6">
        {localReplies.map((reply, i) => (
          <div key={i} className={`rounded-2xl p-5 ${reply.isExpert ? "border-2 border-violet-doux/30 bg-violet-doux/5" : "border border-white/70 glass"}`}>
            <div className="flex items-start gap-3">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${reply.isExpert ? "bg-violet-doux text-white" : "bg-gradient-to-br from-rose-poudre to-rose-vif/50 text-white"}`}>
                {reply.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold">{reply.author}</span>
                  {reply.isExpert && (
                    <span className="flex items-center gap-0.5 rounded-full bg-violet-doux/10 px-2 py-0.5 text-[9px] font-bold text-violet-doux">
                      <Shield className="h-2.5 w-2.5" /> {reply.expertTitle}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground ml-auto">{reply.time}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{reply.text}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" /> {reply.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply input */}
      {isPremium() ? (
        <div className="rounded-3xl border border-white/70 glass p-4 shadow-bloom">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Partagez votre expérience ou posez une question..."
            className="w-full rounded-2xl border border-border bg-white/80 p-4 text-sm outline-none resize-none h-24 focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
          />
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-muted-foreground">Soyez bienveillante et respectueuse</p>
            <button onClick={sendReply} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
              <Send className="h-3.5 w-3.5" /> Répondre
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-rose-vif/20 bg-rose-pastel/20 p-5 text-center">
          <Lock className="h-5 w-5 text-rose-vif mx-auto mb-2" />
          <p className="text-sm font-semibold mb-1">Fonctionnalité Premium</p>
          <p className="text-xs text-foreground/60 mb-3">Passez à Premium pour répondre aux discussions et partager votre expérience.</p>
          <Link to="/subscription" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
            <Crown className="h-4 w-4" /> Débloquer Premium
          </Link>
        </div>
      )}
    </div>
  );
}
