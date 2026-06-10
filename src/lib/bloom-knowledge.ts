export interface BloomResponse {
  answer: string;
  sources?: string[];
  followUp?: string[];
}

const KNOWLEDGE_BASE: Record<string, BloomResponse> = {
  "retard règles": {
    answer: "Un retard de règles peut avoir de nombreuses causes au-delà de la grossesse : stress (l'hormone cortisol perturbe l'axe hypothalamo-hypophyso-ovarien), perte ou prise de poids rapide, syndrome des ovaires polykystiques (SOPK), dysfonction thyroïdienne, ou changement de contraception. Un retard occasionnel de 1 à 7 jours est considéré normal. Si vos règles sont absentes depuis plus de 3 mois (aménorrhée), consultez un gynécologue.",
    sources: ["American College of Obstetricians and Gynecologists (ACOG) 2023", "OMS – Santé reproductive"],
    followUp: ["Faites-vous un test de grossesse ?", "Avez-vous récemment changé de contraception ?", "Votre niveau de stress a-t-il augmenté ?"],
  },
  "douleurs règles": {
    answer: "Les douleurs menstruelles (dysménorrhée) sont causées par les prostaglandines qui provoquent les contractions utérines. Remèdes validés scientifiquement : ibuprofène 400mg (anti-prostaglandines, à prendre dès le début des douleurs), chaleur locale (bouillotte 40°C, efficacité prouvée équivalente à l'ibuprofène selon Cochrane 2019), exercice modéré (libère des endorphines), et magnésium (300-400mg/j). Si les douleurs vous empêchent de fonctionner normalement, consultez pour exclure une endométriose.",
    sources: ["Cochrane Database of Systematic Reviews 2019", "NICE Guidelines - Heavy menstrual bleeding"],
    followUp: ["Les anti-douleurs classiques vous soulagent-ils ?", "La douleur irradie-t-elle vers le dos ou les jambes ?", "Souhaitez-vous des exercices spécifiques pour les crampes ?"],
  },
  "sopk": {
    answer: "Le syndrome des ovaires polykystiques (SOPK) touche 8-13% des femmes en âge de procréer (OMS 2023). Il se caractérise par des cycles irréguliers, un excès d'androgènes (acné, hirsutisme), et/ou des ovaires d'aspect polykystique à l'échographie. Le diagnostic nécessite au moins 2 critères sur 3 (critères de Rotterdam). Les traitements incluent : modifications du mode de vie (exercice 150min/semaine, alimentation à index glycémique bas), metformine si résistance à l'insuline, contraceptifs oraux combinés pour réguler les cycles, ou spironolactone pour l'hyperandrogénie.",
    sources: ["International PCOS Network Guidelines 2023", "The Lancet - PCOS 2022"],
    followUp: ["Avez-vous des cycles de plus de 35 jours ?", "Avez-vous remarqué une pilosité excessive ?", "Votre médecin a-t-il fait un bilan hormonal ?"],
  },
  "fertilité": {
    answer: "La fenêtre de fertilité dure environ 6 jours : les 5 jours avant l'ovulation et le jour de l'ovulation. Les spermatozoïdes survivent 3-5 jours dans le tractus génital féminin, tandis que l'ovule vit 12-24h. Pour maximiser vos chances : rapports tous les 1-2 jours pendant la fenêtre fertile, suivi de la glaire cervicale (aspect blanc d'œuf = fertile), température basale (hausse de 0.2-0.5°C après ovulation), et tests d'ovulation (pic de LH 24-36h avant). 85% des couples conçoivent dans les 12 mois de rapports non protégés.",
    sources: ["NICE Fertility Guidelines 2023", "Practice Committee of ASRM 2022"],
    followUp: ["Depuis combien de temps essayez-vous ?", "Connaissez-vous la durée de vos cycles ?", "Suivez-vous votre glaire cervicale ?"],
  },
  "contraception": {
    answer: "Les options contraceptives se classent par efficacité : LARC (DIU cuivre 99.2%, DIU hormonal 99.8%, implant 99.9%) > hormonaux courts (pilule 91%, patch 91%, anneau 91%) > barrière (préservatif masculin 82%, féminin 79%) > naturels (symptothermie 76-99% selon rigueur). Le choix dépend de : tolérance aux hormones, désir de règles ou non, durée souhaitée, antécédents thromboemboliques, et projet de grossesse futur. Un DIU peut être posé même sans avoir eu d'enfant.",
    sources: ["OMS - Critères de recevabilité 2022", "HAS - Contraception 2023"],
    followUp: ["Avez-vous déjà essayé une contraception hormonale ?", "Avez-vous des antécédents de thrombose ?", "Souhaitez-vous une méthode réversible rapidement ?"],
  },
  "endométriose": {
    answer: "L'endométriose touche environ 10% des femmes en âge de procréer (176 millions dans le monde). Le tissu semblable à l'endomètre se développe hors de l'utérus, causant douleurs chroniques, dysménorrhée sévère, dyspareunie, et parfois infertilité. Le diagnostic moyen prend 7-10 ans. Symptômes clés : douleurs pelviennes invalidantes, douleurs pendant les rapports, troubles digestifs cycliques, fatigue chronique. Le diagnostic gold standard est la cœlioscopie, mais l'IRM est de plus en plus utilisée. Traitements : contraceptifs en continu, progestatifs, agonistes GnRH, ou chirurgie conservatrice.",
    sources: ["World Endometriosis Society 2023", "ESHRE Guidelines 2022"],
    followUp: ["Vos douleurs sont-elles présentes en dehors des règles aussi ?", "Avez-vous des douleurs pendant les rapports ?", "Un membre de votre famille a-t-il été diagnostiqué ?"],
  },
  "grossesse symptômes": {
    answer: "Les premiers signes de grossesse apparaissent généralement 1-2 semaines après la fécondation (soit avant même le retard de règles) : nausées (touchent 70-80% des femmes, pic à 8-12 SA), seins tendus et volumineux, fatigue intense, envies fréquentes d'uriner, et parfois spotting d'implantation (6-12 jours post-ovulation). Un test urinaire est fiable dès le premier jour de retard (sensibilité 99% si HCG > 25 mUI/mL). Un test sanguin (bêta-HCG) est positif dès 10 jours post-ovulation.",
    sources: ["ACOG - Early Pregnancy 2023", "BMJ Best Practice - Pregnancy diagnosis"],
    followUp: ["Avez-vous fait un test de grossesse ?", "À quand remonte votre dernier rapport non protégé ?", "Avez-vous des nausées matinales ?"],
  },
  "pertes vaginales": {
    answer: "Les pertes vaginales (leucorrhées) sont normales et varient selon le cycle : après les règles (sèche), phase folliculaire (blanche/crémeuse), pré-ovulation (blanc d'œuf, filante, transparente = pic de fertilité), post-ovulation (épaisse, collante). Consultez si : odeur de poisson (vaginose bactérienne), pertes vertes/jaunes épaisses (infection), démangeaisons + pertes blanches grumeleuses (mycose candidose), ou pertes grises. La mycose touche 75% des femmes au moins une fois. Traitement : fluconazole 150mg dose unique (mycose) ou métronidazole (vaginose).",
    sources: ["CDC STI Treatment Guidelines 2021", "SOGC Clinical Practice Guideline"],
    followUp: ["Quelle est la couleur de vos pertes ?", "Avez-vous des démangeaisons ?", "Y a-t-il une odeur inhabituelle ?"],
  },
  "ménopause": {
    answer: "La ménopause survient en moyenne à 51 ans (45-55 ans). La périménopause peut commencer 4-8 ans avant, avec : cycles irréguliers, bouffées de chaleur (75% des femmes), sueurs nocturnes, sécheresse vaginale, troubles du sommeil, irritabilité. Le diagnostic est clinique (12 mois sans règles après 45 ans). Le traitement hormonal de la ménopause (THM) reste le plus efficace pour les symptômes vasomoteurs. Alternatives : phytoestrogènes (isoflavones de soja), ISRS à faible dose, acupuncture. L'exercice régulier réduit les bouffées de chaleur de 50%.",
    sources: ["North American Menopause Society (NAMS) 2022", "IMS Recommendations 2023"],
    followUp: ["Quel est votre âge ?", "Les bouffées de chaleur perturbent-elles votre sommeil ?", "Avez-vous discuté du THM avec votre médecin ?"],
  },
  "alimentation cycle": {
    answer: "L'alimentation peut être adaptée à chaque phase du cycle : Phase menstruelle (J1-5) : aliments riches en fer (lentilles, épinards, viande rouge) et anti-inflammatoires (oméga-3, curcuma). Phase folliculaire (J6-13) : protéines légères, légumes crucifères (brocoli, chou-fleur) qui aident le métabolisme des œstrogènes. Phase ovulatoire (J14-16) : fibres, antioxydants, zinc. Phase lutéale (J17-28) : magnésium (chocolat noir, noix), B6 (banane, poulet), calcium pour réduire le SPM. Hydratation : 2L/jour minimum.",
    sources: ["Journal of Clinical Endocrinology & Metabolism", "Nutritional Neuroscience 2021"],
    followUp: ["Dans quelle phase de votre cycle êtes-vous ?", "Souffrez-vous de SPM ?", "Avez-vous des carences connues en fer ?"],
  },
  "sport cycle": {
    answer: "L'entraînement synchronisé au cycle optimise les performances : Phase menstruelle (J1-5) : yoga doux, marche, stretching — écoutez votre corps. Phase folliculaire (J6-13) : oestrogènes élevés = force et endurance maximales, idéal pour HIIT, musculation lourde, sports intenses. Phase ovulatoire (J14-16) : pic de performance, attention accrue au risque de blessure ligamentaire (laxité due aux œstrogènes). Phase lutéale (J17-28) : progestérone dominante, privilégiez le pilates, natation, exercices modérés. La progestérone augmente la température corporelle (+0.3-0.5°C), hydratez-vous davantage.",
    sources: ["British Journal of Sports Medicine 2020", "Medicine & Science in Sports & Exercise 2022"],
    followUp: ["Quel type d'exercice pratiquez-vous ?", "Ressentez-vous plus de fatigue en phase lutéale ?", "Souhaitez-vous un programme adapté ?"],
  },
  "santé mentale cycle": {
    answer: "Les hormones du cycle affectent directement la sérotonine et le GABA : Phase folliculaire : œstrogènes augmentent la sérotonine → énergie, optimisme, créativité. Phase lutéale : chute pré-menstruelle des œstrogènes → irritabilité, anxiété, humeur dépressive chez 75% des femmes. Le trouble dysphorique prémenstruel (TDPM) touche 3-8% des femmes avec des symptômes sévères. Solutions validées : exercice aérobique (30min 3-5x/semaine augmente la sérotonine), calcium 1200mg/j, vitamine B6, ISRS en phase lutéale (si TDPM diagnostiqué), thérapie cognitive comportementale.",
    sources: ["ACOG Practice Bulletin - Premenstrual Syndrome 2023", "Lancet Psychiatry - PMDD 2022"],
    followUp: ["Vos symptômes d'humeur sont-ils cycliques ?", "Perturbent-ils votre vie quotidienne ?", "Avez-vous envisagé d'en parler à un professionnel ?"],
  },
};

const KEYWORD_MAP: Record<string, string> = {
  "retard": "retard règles",
  "pas de règles": "retard règles",
  "règles en retard": "retard règles",
  "aménorrhée": "retard règles",
  "douleur": "douleurs règles",
  "crampe": "douleurs règles",
  "dysménorrhée": "douleurs règles",
  "mal au ventre": "douleurs règles",
  "ovaires polykystiques": "sopk",
  "SOPK": "sopk",
  "polykystique": "sopk",
  "ovaire": "sopk",
  "enceinte": "grossesse symptômes",
  "grossesse": "grossesse symptômes",
  "bébé": "grossesse symptômes",
  "nausée": "grossesse symptômes",
  "test de grossesse": "grossesse symptômes",
  "fertile": "fertilité",
  "ovulation": "fertilité",
  "concevoir": "fertilité",
  "tomber enceinte": "fertilité",
  "contracepti": "contraception",
  "pilule": "contraception",
  "stérilet": "contraception",
  "DIU": "contraception",
  "implant": "contraception",
  "préservatif": "contraception",
  "endométri": "endométriose",
  "perte": "pertes vaginales",
  "leucorrhée": "pertes vaginales",
  "mycose": "pertes vaginales",
  "démangeaison": "pertes vaginales",
  "odeur": "pertes vaginales",
  "ménopause": "ménopause",
  "bouffée de chaleur": "ménopause",
  "péri-ménopause": "ménopause",
  "alimentation": "alimentation cycle",
  "manger": "alimentation cycle",
  "nutrition": "alimentation cycle",
  "régime": "alimentation cycle",
  "sport": "sport cycle",
  "exercice": "sport cycle",
  "entraînement": "sport cycle",
  "fitness": "sport cycle",
  "yoga": "sport cycle",
  "humeur": "santé mentale cycle",
  "déprime": "santé mentale cycle",
  "anxiété": "santé mentale cycle",
  "irritable": "santé mentale cycle",
  "SPM": "santé mentale cycle",
  "stress": "santé mentale cycle",
};

export function getBloomResponse(message: string): BloomResponse {
  const lower = message.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  for (const [keyword, topic] of Object.entries(KEYWORD_MAP)) {
    const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (lower.includes(normalizedKeyword)) {
      return KNOWLEDGE_BASE[topic];
    }
  }

  return {
    answer: "Je comprends votre question. En tant qu'assistante de santé féminine, je peux vous aider sur de nombreux sujets : cycles menstruels, fertilité, contraception, grossesse, SOPK, endométriose, alimentation adaptée au cycle, sport et cycle, santé mentale et hormones, ou ménopause. Pourriez-vous me préciser votre question pour que je puisse vous donner des informations basées sur la recherche médicale ?",
    followUp: ["Parlez-moi de vos symptômes", "J'ai une question sur mon cycle", "Je veux des conseils nutrition", "Je cherche un médecin"],
  };
}

export const SUGGESTED_TOPICS = [
  "Pourquoi ai-je un retard de règles ?",
  "Comment soulager mes douleurs menstruelles ?",
  "Quels sont les signes de l'ovulation ?",
  "Quelle contraception me convient ?",
  "Est-ce que je pourrais avoir de l'endométriose ?",
  "Quels aliments manger pendant mes règles ?",
  "Comment adapter mon sport à mon cycle ?",
  "Quels sont les premiers signes de grossesse ?",
  "Comment gérer mon SPM naturellement ?",
  "Qu'est-ce que le SOPK ?",
];
