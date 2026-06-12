import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useEffect } from "react";
import { Search, ChevronLeft, BookOpen, Clock, User, Share2, Heart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [{ title: "Magazine — CycleBloom AI" }] }),
  component: Articles,
});

const categories = ["Tout", "Favoris", "Menstruation", "Fertilité", "Grossesse", "Hormones", "Bien-être", "SOPK", "Endométriose", "Nutrition"];

const FAVORITES_KEY = "cyclebloom_favorites";

function getFavorites(): number[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function toggleFavorite(id: number): number[] {
  const current = getFavorites();
  const updated = current.includes(id) ? current.filter(fid => fid !== id) : [...current, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

async function shareArticle(article: Article) {
  const shareData = {
    title: article.title,
    text: `${article.title} — par ${article.author}`,
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${article.title}\n${window.location.href}`);
      toast.success("Lien copié dans le presse-papier");
    }
  } catch (err: any) {
    if (err?.name !== "AbortError") {
      await navigator.clipboard.writeText(`${article.title}\n${window.location.href}`);
      toast.success("Lien copié dans le presse-papier");
    }
  }
}

interface Article {
  id: number;
  title: string;
  cat: string;
  time: string;
  author: string;
  gradient: string;
  content: string;
  premium?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "5 signes que vous êtes en pleine ovulation",
    cat: "Fertilité",
    time: "3 min",
    author: "Dr. Léa Bernard",
    gradient: "from-rose-vif to-rose-poudre",
    content: `L'ovulation est le moment clé de votre cycle — celui où un ovule mature est libéré par l'ovaire. Voici 5 signes scientifiquement validés pour la repérer :

**1. Glaire cervicale type "blanc d'œuf"**
C'est le signe le plus fiable. Sous l'influence du pic d'œstrogènes, la glaire devient transparente, élastique et filante — similaire à du blanc d'œuf cru. Elle facilite le passage des spermatozoïdes.

**2. Légère douleur au bas-ventre (Mittelschmerz)**
Environ 20% des femmes ressentent une douleur brève d'un côté du bas-ventre au moment de l'ovulation. C'est la rupture du follicule qui libère l'ovule.

**3. Hausse de la libido**
Les études montrent un pic naturel de désir sexuel dans les jours précédant l'ovulation. L'évolution a bien fait les choses : votre corps vous "pousse" vers la reproduction au moment le plus fertile.

**4. Seins légèrement sensibles**
La montée de progestérone post-ovulation peut causer une légère tension mammaire. Si vous la ressentez, l'ovulation vient probablement de se produire.

**5. Température basale en hausse**
Après l'ovulation, la progestérone fait monter votre température de 0.2 à 0.5°C. C'est un signe rétrospectif (elle confirme que l'ovulation A EU LIEU) mais très fiable pour identifier vos patterns d'un cycle à l'autre.

**Astuce CycleBloom** : Combinez au moins 2 signes pour plus de fiabilité. La glaire + la température basale constituent la méthode symptothermique, efficace à 99.4% quand bien appliquée.`,
  },
  {
    id: 2,
    title: "Comprendre le SOPK et ses cycles irréguliers",
    cat: "SOPK",
    time: "7 min",
    author: "Dr. Anaïs Roy",
    gradient: "from-violet-doux to-rose-vif",
    content: `Le syndrome des ovaires polykystiques (SOPK) est le trouble endocrinien le plus fréquent chez les femmes en âge de procréer, touchant 8 à 13% d'entre elles selon l'OMS (2023).

**Qu'est-ce que le SOPK ?**
Contrairement à ce que son nom suggère, il ne s'agit pas de "kystes" à proprement parler, mais de follicules immatures qui ne parviennent pas à ovuler. Le diagnostic repose sur les critères de Rotterdam (2003) : au moins 2 critères sur 3 :
- Cycles irréguliers (> 35 jours) ou anovulation
- Signes d'hyperandrogénie (acné, hirsutisme, alopécie)
- Ovaires d'aspect polykystique à l'échographie (≥ 12 follicules ou volume > 10 mL)

**Pourquoi les cycles sont-ils irréguliers ?**
Dans un cycle normal, un follicule dominant émerge et ovule. Avec le SOPK, l'excès d'androgènes et la résistance à l'insuline perturbent ce processus : plusieurs follicules commencent à mûrir mais aucun ne devient dominant. Résultat : pas d'ovulation, donc pas de règles... jusqu'à ce que l'endomètre devienne trop épais et se détache (saignement de privation).

**Prise en charge moderne**
- Mode de vie : exercice 150 min/semaine, alimentation à IG bas, gestion du stress
- Myo-inositol 4g/jour : améliore la sensibilité à l'insuline et l'ovulation
- Metformine : si résistance à l'insuline confirmée (HOMA-IR > 2.5)
- Contraceptifs combinés : régulent les cycles et réduisent les androgènes
- Spironolactone : pour l'hirsutisme et l'acné androgénique

Le SOPK n'est pas une fatalité. Avec une prise en charge adaptée, la majorité des femmes retrouvent des cycles plus réguliers et une meilleure qualité de vie.`,
  },
  {
    id: 3,
    title: "Nutrition : que manger en phase lutéale ?",
    cat: "Nutrition",
    time: "5 min",
    author: "Marie Dubois, Nutritionniste",
    gradient: "from-lavande to-rose-poudre",
    content: `La phase lutéale (de l'ovulation aux règles, environ J15 à J28) est marquée par la dominance de la progestérone. Votre métabolisme augmente de 100-300 calories/jour, et vos besoins nutritionnels changent.

**Magnésium (300-400 mg/jour)**
Le magnésium est votre meilleur allié en phase lutéale. Il réduit les crampes, l'anxiété et les troubles du sommeil. Sources : chocolat noir (70%+), amandes, épinards, graines de citrouille, bananes.

**Vitamine B6 (25-50 mg/jour)**
Elle aide à la production de sérotonine (l'hormone du bonheur) et réduit la rétention d'eau. Sources : poulet, saumon, pois chiches, bananes, pommes de terre.

**Calcium (1200 mg/jour)**
Plusieurs études Cochrane ont montré que le calcium réduit significativement les symptômes du SPM (irritabilité, fatigue, ballonnements). Sources : yaourt, fromage, brocoli, amandes.

**Oméga-3**
Anti-inflammatoires naturels, ils réduisent les prostaglandines responsables des crampes. Sources : saumon sauvage, sardines, graines de lin, noix.

**Aliments à éviter**
- Sel en excès (aggrave la rétention d'eau et les ballonnements)
- Caféine (amplifie l'anxiété et perturbe le sommeil)
- Sucres raffinés (pic d'insuline → aggrave le SPM)
- Alcool (perturbe le métabolisme de la progestérone)

**Menu type phase lutéale**
- Petit-déjeuner : Porridge avoine + banane + beurre d'amande + cacao cru
- Déjeuner : Bowl saumon + quinoa + épinards + avocat + graines de citrouille
- Goûter : Chocolat noir 85% + poignée de noix
- Dîner : Poulet rôti + patate douce + brocoli + huile d'olive`,
  },
  {
    id: 4,
    title: "Endométriose : reconnaître les premiers signes",
    cat: "Endométriose",
    time: "6 min",
    author: "Dr. Camille Thierry",
    gradient: "from-rose-poudre to-violet-doux",
    content: `L'endométriose touche environ 10% des femmes en âge de procréer, soit 176 millions de personnes dans le monde. Le délai moyen de diagnostic est de 7 à 10 ans. Connaître les signes précoces est crucial.

**Les signaux d'alerte**

1. **Douleurs menstruelles invalidantes** — Ce n'est PAS normal d'être clouée au lit pendant ses règles. Si les anti-inflammatoires classiques ne suffisent pas, si la douleur vous empêche de travailler ou d'aller en cours : consultez.

2. **Douleurs pendant les rapports sexuels (dyspareunie)** — Surtout les douleurs profondes ressenties lors de la pénétration. Elles peuvent indiquer des lésions sur les ligaments utéro-sacrés ou le cul-de-sac de Douglas.

3. **Douleurs pelviennes chroniques** — Des douleurs présentes EN DEHORS des règles aussi, pas seulement pendant. L'endométriose provoque une inflammation chronique.

4. **Troubles digestifs cycliques** — Ballonnements, diarrhée ou constipation qui s'aggravent pendant les règles. L'endométriose digestive touche 5-12% des cas.

5. **Fatigue chronique inexpliquée** — L'inflammation chronique et la douleur constante épuisent le corps. 50% des femmes atteintes rapportent une fatigue invalidante.

6. **Infertilité** — 30-50% des femmes infertiles ont de l'endométriose. Si vous essayez de concevoir depuis plus de 12 mois sans succès, un bilan est recommandé.

**Que faire si vous vous reconnaissez ?**
- Tenez un journal de douleurs (CycleBloom le fait pour vous !)
- Consultez un gynécologue spécialisé en endométriose
- Demandez une IRM pelvienne (plus informative qu'une échographie standard)
- Rejoignez une association de patientes (EndoFrance, ENDOmind)

L'endométriose est une maladie chronique, mais avec une prise en charge adaptée, la qualité de vie s'améliore considérablement.`,
  },
  {
    id: 5,
    title: "Préparer son corps à la grossesse",
    cat: "Grossesse",
    time: "8 min",
    author: "Sage-femme Léna Fournier",
    gradient: "from-rose-vif to-violet-doux",
    premium: true,
    content: `Idéalement, la préparation préconceptionnelle commence 3 mois avant la conception — le temps nécessaire pour que les ovocytes mûrissent et que les réserves nutritionnelles se reconstituent.

**Les essentiels**

**Acide folique (400-800 µg/jour)** — À commencer AVANT la conception. Il réduit de 70% le risque de malformations du tube neural (spina bifida). La forme méthylée (méthylfolate) est mieux absorbée chez 30-40% des femmes porteuses de la mutation MTHFR.

**Bilan préconceptionnel** — Consultez votre médecin pour : sérologies (toxoplasmose, rubéole, VIH, hépatites), frottis cervical à jour, bilan thyroïdien (TSH), groupe sanguin et Rhésus, et glycémie à jeun.

**Arrêt de la contraception** — Selon votre méthode :
- Pilule : arrêt immédiat possible, fertilité retour 1-3 mois
- DIU : retrait en consultation, fertilité immédiate
- Implant : retrait, retour en 1 mois
- Injection : peut prendre 6-12 mois pour le retour de fertilité

**Optimiser la fertilité naturellement**
- Poids santé (IMC 20-25) : l'obésité ET la maigreur réduisent la fertilité
- Arrêt tabac et alcool (toxiques pour les ovocytes)
- Exercice modéré (pas d'excès qui perturbe l'ovulation)
- Réduction du stress (cortisol inhibe la GnRH)
- Sommeil 7-9h (mélatonine protège les ovocytes)

**Fenêtre de fertilité** — Rapports tous les 1-2 jours pendant les 5 jours avant l'ovulation et le jour J. Pas besoin de positions spécifiques (mythe !). Évitez les lubrifiants commerciaux (toxiques pour les spermatozoïdes).`,
  },
  {
    id: 6,
    title: "Le yoga pendant les règles : 6 postures soulagantes",
    cat: "Bien-être",
    time: "4 min",
    author: "Sophie Martin, Prof. de Yoga",
    gradient: "from-rose-poudre to-lavande",
    content: `Le yoga adapté au cycle menstruel est validé par la science : une méta-analyse de 2020 (Journal of Alternative and Complementary Medicine) montre une réduction de 50% de l'intensité des crampes avec une pratique régulière.

**Règles d'or pendant les règles :**
- Pas d'inversions (épaules sur tête, chandelle) — elles inversent le flux apanique (prana descendant)
- Pas de postures abdominales intenses
- Privilégier l'ouverture du bassin et la détente

**6 postures validées :**

**1. Supta Baddha Konasana (Papillon allongé)** — 5 min
Allongée sur le dos, plantes de pieds jointes, genoux ouverts. Placez un coussin sous chaque genou. Main droite sur le cœur, main gauche sur le ventre. Respirez profondément.

**2. Balasana (Posture de l'enfant)** — 3-5 min
Genoux écartés, front au sol, bras allongés devant ou le long du corps. Variante : placez un coussin entre les cuisses et le ventre pour un soutien supplémentaire.

**3. Supta Matsyendrasana (Torsion allongée)** — 2 min/côté
Allongée, amenez un genou vers la poitrine puis guidez-le vers le côté opposé. Bras en T. La torsion douce masse les organes abdominaux et soulage les ballonnements.

**4. Viparita Karani (Jambes au mur)** — 5-10 min
Fesses contre le mur, jambes à la verticale. Réduit la rétention d'eau dans les jambes et apaise le système nerveux. Note : ce n'est PAS une inversion car le bassin reste au sol.

**5. Marjaryasana-Bitilasana (Chat-Vache)** — 10 cycles
À quatre pattes, alternez dos rond (chat) et dos creusé (vache) au rythme de la respiration. Mobilise la colonne et soulage les tensions lombaires.

**6. Savasana avec bouillotte** — 10 min
Position finale de relaxation, bouillotte sur le bas-ventre. La chaleur dilate les vaisseaux et réduit les contractions utérines (efficacité prouvée équivalente à l'ibuprofène).`,
  },
  {
    id: 7,
    title: "Comment la progestérone affecte votre humeur",
    cat: "Hormones",
    time: "5 min",
    author: "Dr. Anaïs Roy",
    gradient: "from-violet-doux to-lavande",
    content: `La progestérone est souvent appelée "l'hormone du calme" — mais son histoire est plus complexe. Comprendre son action sur le cerveau explique pourquoi la phase lutéale est souvent émotionnellement turbulente.

**Progestérone et cerveau**
La progestérone se lie aux récepteurs GABA-A dans le cerveau — les mêmes que ciblent les benzodiazépines (Xanax, Valium). À doses stables, elle a un effet anxiolytique et sédatif naturel. Le problème survient lors de la CHUTE de progestérone (J25-28) : le cerveau, habitué à cette "dose", se retrouve en manque.

**Pourquoi le SPM est pire chez certaines femmes**
Ce n'est pas le NIVEAU de progestérone qui cause le SPM, mais la SENSIBILITÉ du cerveau à ses fluctuations. 3-8% des femmes ont un trouble dysphorique prémenstruel (TDPM) avec une sensibilité extrême aux changements hormonaux normaux.

**Symptômes typiques de la chute de progestérone (J25-28) :**
- Irritabilité et colère disproportionnée
- Anxiété et ruminations
- Envies de sucre et de glucides (le cerveau cherche à produire de la sérotonine)
- Insomnie (la progestérone favorise le sommeil via le GABA)
- Tristesse ou crises de larmes sans raison apparente

**Solutions validées scientifiquement :**
- Exercice aérobique : augmente la sérotonine et les endorphines
- Calcium 1200 mg/jour : réduit le SPM de 50% (étude Cochrane)
- Magnésium 300 mg/jour : réduit irritabilité et rétention d'eau
- Vitamine B6 50 mg/jour : cofacteur de la synthèse de sérotonine
- ISRS à faible dose en phase lutéale uniquement (si TDPM sévère, prescription médicale)

**Quand consulter ?**
Si les symptômes perturbent votre vie sociale, professionnelle ou relationnelle pendant plus de 2 cycles consécutifs, parlez-en à votre médecin. Le TDPM est une vraie pathologie qui se traite.`,
  },
  {
    id: 8,
    title: "Décrypter votre courbe de température basale",
    cat: "Fertilité",
    time: "6 min",
    author: "Dr. Léa Bernard",
    gradient: "from-rose-vif to-rose-poudre",
    premium: true,
    content: `La température basale (BBT) est l'outil le plus fiable pour confirmer l'ovulation. Voici comment la lire comme une pro.

**Principes de base**
- Prenez votre température chaque matin AVANT de vous lever, à heure fixe (±30 min)
- Utilisez un thermomètre basal (précision 0.01°C)
- Même voie de mesure chaque jour (buccale, vaginale, ou rectale)

**Comment lire votre courbe**
- Phase folliculaire (avant ovulation) : températures basses, 36.1-36.4°C
- Shift ovulatoire : hausse de 0.2-0.5°C en 24-48h
- Phase lutéale (après ovulation) : plateau haut, 36.5-36.8°C
- Chute pré-menstruelle : retour aux températures basses = règles imminentes

**La règle des 3 sur 6**
L'ovulation est confirmée quand 3 températures consécutives sont au-dessus des 6 précédentes. C'est la règle standard de la méthode symptothermique.

**Signaux d'alerte**
- Pas de shift : anovulation possible (normal 1-2x/an, consultez si récurrent)
- Phase lutéale < 10 jours : insuffisance lutéale, peut compliquer l'implantation
- Températures très irrégulières : vérifiez thyroïde, sommeil, alcool, stress`,
  },
];

function Articles() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>(getFavorites());

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const updated = toggleFavorite(id);
    setFavorites(updated);
    const isFav = updated.includes(id);
    toast.success(isFav ? "Ajouté aux favoris" : "Retiré des favoris");
  };

  const filteredArticles = articles.filter(a => {
    const matchesCat = (activeCategory === "Tout" || activeCategory === "Favoris") ? true : a.cat === activeCategory;
    const matchesFav = activeCategory === "Favoris" ? favorites.includes(a.id) : true;
    const matchesSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesFav && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <AppShell>
        <ArticleDetail
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
          isFavorite={favorites.includes(selectedArticle.id)}
          onToggleFavorite={() => {
            const updated = toggleFavorite(selectedArticle.id);
            setFavorites(updated);
            toast.success(updated.includes(selectedArticle.id) ? "Ajouté aux favoris" : "Retiré des favoris");
          }}
          onSelectArticle={setSelectedArticle}
        />
      </AppShell>
    );
  }

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-white/80 py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
          />
        </div>
      </div>

      <div className="-mx-2 mb-8 flex gap-2 overflow-x-auto px-2 pb-1">
        {categories.map(c => (
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map(a => (
          <article
            key={a.id}
            onClick={() => setSelectedArticle(a)}
            className="group overflow-hidden rounded-3xl border border-white/70 glass shadow-bloom transition hover:-translate-y-1 cursor-pointer"
          >
            <div className={`relative h-40 bg-gradient-to-br ${a.gradient}`}>
              {a.premium && (
                <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-bold text-violet-doux uppercase">
                  Premium
                </span>
              )}
              <button
                onClick={(e) => handleToggleFavorite(e, a.id)}
                className="absolute top-3 left-3 rounded-full bg-white/90 p-1.5 shadow-sm hover:scale-110 transition"
              >
                <Heart className={`h-4 w-4 ${favorites.includes(a.id) ? "fill-rose-vif text-rose-vif" : "text-foreground/50"}`} />
              </button>
            </div>
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-widest text-violet-doux">{a.cat}</div>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight group-hover:text-rose-vif transition">
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

function ArticleDetail({ article, onBack, isFavorite, onToggleFavorite, onSelectArticle }: {
  article: Article;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectArticle: (a: Article) => void;
}) {
  const relatedArticles = articles
    .filter(a => a.cat === article.cat && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-violet-doux hover:text-rose-vif transition mb-6">
        <ChevronLeft className="h-4 w-4" /> Retour au magazine
      </button>

      <div className={`h-48 rounded-3xl bg-gradient-to-br ${article.gradient} mb-8`} />

      <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
        <span className="rounded-full bg-lavande px-3 py-1 font-medium text-violet-doux">{article.cat}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.time}</span>
        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
      </div>

      <h1 className="font-display text-3xl font-bold mb-8">{article.title}</h1>

      <div className="prose prose-sm max-w-none">
        {article.content.split("\n\n").map((paragraph, i) => (
          <div key={i} className="mb-4">
            {paragraph.startsWith("**") && paragraph.endsWith("**") ? (
              <h3 className="font-display text-lg font-bold mt-6 mb-2">{paragraph.replace(/\*\*/g, "")}</h3>
            ) : paragraph.includes("**") ? (
              <p className="text-sm leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
              }} />
            ) : (
              <p className="text-sm leading-relaxed text-foreground/80">{paragraph}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border/30 pt-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-violet-doux" />
          <span className="text-xs text-muted-foreground">Article vérifié par un professionnel de santé</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFavorite}
            className="flex items-center gap-1.5 rounded-full bg-white/70 border border-border px-4 py-2 text-xs font-medium hover:bg-white transition"
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-vif text-rose-vif" : ""}`} />
            {isFavorite ? "Favori" : "Favoriser"}
          </button>
          <button
            onClick={() => shareArticle(article)}
            className="flex items-center gap-1.5 rounded-full bg-white/70 border border-border px-4 py-2 text-xs font-medium hover:bg-white transition"
          >
            <Share2 className="h-3.5 w-3.5" /> Partager
          </button>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold mb-6">Articles associés</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map(a => (
              <article
                key={a.id}
                onClick={() => onSelectArticle(a)}
                className="group overflow-hidden rounded-2xl border border-white/70 glass shadow-sm transition hover:-translate-y-0.5 cursor-pointer"
              >
                <div className={`h-24 bg-gradient-to-br ${a.gradient}`} />
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-violet-doux">{a.cat}</div>
                  <h3 className="mt-1 font-display text-sm font-semibold leading-tight group-hover:text-rose-vif transition">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[11px] text-muted-foreground">{a.time} · {a.author}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
