export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  photo: string;
  rating: number;
  reviews: number;
  languages: string[];
  price: string;
  acceptsNew: boolean;
  nextSlot: string;
  bio: string;
  education: string[];
  services: string[];
  hours: { day: string; hours: string }[];
  slots: string[];
}

export const CITIES = [
  { id: "paris", name: "Paris", region: "Île-de-France", postalPrefix: "75", lat: 48.8566, lon: 2.3522 },
  { id: "marseille", name: "Marseille", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "13", lat: 43.2965, lon: 5.3698 },
  { id: "lyon", name: "Lyon", region: "Auvergne-Rhône-Alpes", postalPrefix: "69", lat: 45.764, lon: 4.8357 },
  { id: "toulouse", name: "Toulouse", region: "Occitanie", postalPrefix: "31", lat: 43.6047, lon: 1.4442 },
  { id: "nice", name: "Nice", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "06", lat: 43.7102, lon: 7.262 },
  { id: "nantes", name: "Nantes", region: "Pays de la Loire", postalPrefix: "44", lat: 47.2184, lon: -1.5536 },
  { id: "montpellier", name: "Montpellier", region: "Occitanie", postalPrefix: "34", lat: 43.6108, lon: 3.8767 },
  { id: "strasbourg", name: "Strasbourg", region: "Grand Est", postalPrefix: "67", lat: 48.5734, lon: 7.7521 },
  { id: "bordeaux", name: "Bordeaux", region: "Nouvelle-Aquitaine", postalPrefix: "33", lat: 44.8378, lon: -0.5792 },
  { id: "lille", name: "Lille", region: "Hauts-de-France", postalPrefix: "59", lat: 50.6292, lon: 3.0573 },
  { id: "rennes", name: "Rennes", region: "Bretagne", postalPrefix: "35", lat: 48.1173, lon: -1.6778 },
  { id: "reims", name: "Reims", region: "Grand Est", postalPrefix: "51", lat: 49.2583, lon: 4.0317 },
  { id: "saint-etienne", name: "Saint-Étienne", region: "Auvergne-Rhône-Alpes", postalPrefix: "42", lat: 45.4397, lon: 4.3872 },
  { id: "toulon", name: "Toulon", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "83", lat: 43.1242, lon: 5.928 },
  { id: "le-havre", name: "Le Havre", region: "Normandie", postalPrefix: "76", lat: 49.4944, lon: 0.1079 },
  { id: "grenoble", name: "Grenoble", region: "Auvergne-Rhône-Alpes", postalPrefix: "38", lat: 45.1885, lon: 5.7245 },
  { id: "dijon", name: "Dijon", region: "Bourgogne-Franche-Comté", postalPrefix: "21", lat: 47.322, lon: 5.0415 },
  { id: "angers", name: "Angers", region: "Pays de la Loire", postalPrefix: "49", lat: 47.4784, lon: -0.5632 },
  { id: "nimes", name: "Nîmes", region: "Occitanie", postalPrefix: "30", lat: 43.8367, lon: 4.3601 },
  { id: "villeurbanne", name: "Villeurbanne", region: "Auvergne-Rhône-Alpes", postalPrefix: "69", lat: 45.7676, lon: 4.8799 },
  { id: "clermont-ferrand", name: "Clermont-Ferrand", region: "Auvergne-Rhône-Alpes", postalPrefix: "63", lat: 45.7772, lon: 3.087 },
  { id: "aix-en-provence", name: "Aix-en-Provence", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "13", lat: 43.5297, lon: 5.4474 },
  { id: "brest", name: "Brest", region: "Bretagne", postalPrefix: "29", lat: 48.3904, lon: -4.4861 },
  { id: "tours", name: "Tours", region: "Centre-Val de Loire", postalPrefix: "37", lat: 47.3941, lon: 0.6848 },
  { id: "amiens", name: "Amiens", region: "Hauts-de-France", postalPrefix: "80", lat: 49.894, lon: 2.2958 },
  { id: "limoges", name: "Limoges", region: "Nouvelle-Aquitaine", postalPrefix: "87", lat: 45.8336, lon: 1.2611 },
  { id: "perpignan", name: "Perpignan", region: "Occitanie", postalPrefix: "66", lat: 42.6986, lon: 2.8956 },
  { id: "besancon", name: "Besançon", region: "Bourgogne-Franche-Comté", postalPrefix: "25", lat: 47.2378, lon: 6.0241 },
  { id: "metz", name: "Metz", region: "Grand Est", postalPrefix: "57", lat: 49.1193, lon: 6.1757 },
  { id: "orleans", name: "Orléans", region: "Centre-Val de Loire", postalPrefix: "45", lat: 47.9029, lon: 1.909 },
  { id: "rouen", name: "Rouen", region: "Normandie", postalPrefix: "76", lat: 49.4432, lon: 1.0999 },
  { id: "mulhouse", name: "Mulhouse", region: "Grand Est", postalPrefix: "68", lat: 47.7508, lon: 7.3359 },
  { id: "caen", name: "Caen", region: "Normandie", postalPrefix: "14", lat: 49.1829, lon: -0.3707 },
  { id: "nancy", name: "Nancy", region: "Grand Est", postalPrefix: "54", lat: 48.6921, lon: 6.1844 },
  { id: "argenteuil", name: "Argenteuil", region: "Île-de-France", postalPrefix: "95", lat: 48.9472, lon: 2.2467 },
  { id: "montreuil", name: "Montreuil", region: "Île-de-France", postalPrefix: "93", lat: 48.8638, lon: 2.4484 },
  { id: "saint-denis", name: "Saint-Denis", region: "Île-de-France", postalPrefix: "93", lat: 48.9362, lon: 2.3574 },
  { id: "avignon", name: "Avignon", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "84", lat: 43.9493, lon: 4.8055 },
  { id: "versailles", name: "Versailles", region: "Île-de-France", postalPrefix: "78", lat: 48.8014, lon: 2.1301 },
  { id: "pau", name: "Pau", region: "Nouvelle-Aquitaine", postalPrefix: "64", lat: 43.2951, lon: -0.3708 },
  { id: "la-rochelle", name: "La Rochelle", region: "Nouvelle-Aquitaine", postalPrefix: "17", lat: 46.1603, lon: -1.1511 },
  { id: "cannes", name: "Cannes", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "06", lat: 43.5528, lon: 7.0174 },
  { id: "antibes", name: "Antibes", region: "Provence-Alpes-Côte d'Azur", postalPrefix: "06", lat: 43.5804, lon: 7.1251 },
  { id: "calais", name: "Calais", region: "Hauts-de-France", postalPrefix: "62", lat: 50.9513, lon: 1.8587 },
  { id: "dunkerque", name: "Dunkerque", region: "Hauts-de-France", postalPrefix: "59", lat: 51.0343, lon: 2.3768 },
  { id: "bayonne", name: "Bayonne", region: "Nouvelle-Aquitaine", postalPrefix: "64", lat: 43.4933, lon: -1.4753 },
  { id: "chambery", name: "Chambéry", region: "Auvergne-Rhône-Alpes", postalPrefix: "73", lat: 45.5646, lon: 5.9178 },
  { id: "lorient", name: "Lorient", region: "Bretagne", postalPrefix: "56", lat: 47.7483, lon: -3.3702 },
  { id: "saint-nazaire", name: "Saint-Nazaire", region: "Pays de la Loire", postalPrefix: "44", lat: 47.2733, lon: -2.2137 },
  { id: "valence", name: "Valence", region: "Auvergne-Rhône-Alpes", postalPrefix: "26", lat: 44.9334, lon: 4.8924 },
];

const SPECIALTIES = [
  "Gynécologie médicale",
  "Gynécologie-Obstétrique",
  "Sage-femme",
  "Endocrinologie gynécologique",
  "Médecine de la reproduction",
  "Gynécologie chirurgicale",
];

const SERVICES_POOL = [
  "Suivi gynécologique", "Frottis cervico-vaginal", "Pose et retrait de DIU",
  "Pose et retrait d'implant", "Échographie pelvienne", "Échographie obstétricale",
  "Suivi de grossesse", "Préparation à l'accouchement", "Colposcopie",
  "Hystéroscopie diagnostique", "Consultation fertilité", "Bilan hormonal",
  "Traitement de l'endométriose", "Suivi SOPK", "Contraception",
  "Rééducation périnéale", "IVG médicamenteuse", "Consultation ménopause",
  "PMA / FIV", "Chirurgie gynécologique mini-invasive",
];

const FIRST_NAMES = [
  "Marie", "Sophie", "Claire", "Isabelle", "Catherine", "Anne", "Nathalie", "Sandrine",
  "Valérie", "Christine", "Élisabeth", "Françoise", "Hélène", "Caroline", "Stéphanie",
  "Laurence", "Patricia", "Sylvie", "Dominique", "Brigitte", "Béatrice", "Florence",
  "Céline", "Audrey", "Émilie", "Julie", "Pauline", "Camille", "Charlotte", "Alice",
  "Fatima", "Amina", "Leila", "Sarah", "Rachida", "Khadija", "Aïcha", "Inès",
  "Léa", "Clara", "Manon", "Lucie", "Margot", "Zoé", "Eva", "Jade", "Lina",
  "Nora", "Yasmine", "Samira",
];

const LAST_NAMES = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand",
  "Leroy", "Moreau", "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David",
  "Bertrand", "Roux", "Vincent", "Fournier", "Morel", "Girard", "André", "Mercier",
  "Dupont", "Lambert", "Bonnet", "François", "Martinez", "Nguyen", "Diallo", "Ndiaye",
  "Benali", "El Amrani", "Koné", "Traoré", "Bamba", "Cissé", "Hadj", "Ben Ahmed",
  "Lefèvre", "Gauthier", "Perrin", "Robin", "Masson", "Muller", "Fontaine", "Chevalier",
  "Rousseau", "Blanc",
];

const STREETS = [
  "rue de la République", "avenue Victor Hugo", "boulevard Pasteur",
  "rue du Docteur Roux", "avenue de la Liberté", "rue Jean Jaurès",
  "place de la Mairie", "rue Gambetta", "avenue Foch", "rue Voltaire",
  "boulevard de Strasbourg", "rue du Maréchal Leclerc", "avenue des Ternes",
  "rue de la Paix", "boulevard Haussmann", "rue Nationale", "avenue de Verdun",
  "rue Saint-Honoré", "boulevard de la Marne", "rue de Rivoli",
  "place Bellecour", "cours Lafayette", "rue Paradis", "allée de Brienne",
  "cours de l'Intendance", "rue Faidherbe", "quai de la Fosse",
  "rue des Francs-Bourgeois", "avenue de la Gare", "rue Sainte-Catherine",
  "rue du Commerce", "avenue Jean Moulin", "rue Pierre Curie", "boulevard Carnot",
  "rue de Strasbourg", "avenue de la Paix", "rue Émile Zola", "place du Marché",
  "rue des Lilas", "avenue Clemenceau", "boulevard Victor Hugo", "rue Pasteur",
  "avenue du Général de Gaulle", "rue de Lyon", "rue de Bordeaux", "rue de Toulouse",
  "rue de Marseille", "avenue de Paris", "boulevard de la Liberté", "place de la République",
];

const EDUCATION_POOL = [
  "Faculté de Médecine Paris Descartes", "Université Claude Bernard Lyon 1",
  "Faculté de Médecine de Marseille", "CHU de Toulouse", "Université de Bordeaux",
  "Faculté de Médecine de Lille", "CHU de Nantes", "Faculté de Médecine de Strasbourg",
  "Université de Montpellier", "Faculté de Médecine de Nice",
  "Hôpital Cochin (Paris)", "Hôpital de la Pitié-Salpêtrière",
  "Maternité Port-Royal", "Institut Mutualiste Montsouris",
  "CHU Rennes", "Université Paris-Saclay", "CHU Grenoble-Alpes",
];

function generateDoctors(cityId: string, cityName: string, postalPrefix: string, count: number): Doctor[] {
  const doctors: Doctor[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[(i * 7 + cityId.charCodeAt(0)) % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 11 + cityId.charCodeAt(1)) % LAST_NAMES.length];
    const specialty = SPECIALTIES[i % SPECIALTIES.length];
    const streetNum = 1 + ((i * 7 + 3) % 150);
    const street = STREETS[(i + cityId.length) % STREETS.length];
    const postal = `${postalPrefix}${String((i % 20) + 1).padStart(3, "0")}`;

    const p1 = String((i * 3 + 10) % 90 + 10);
    const p2 = String((i * 7 + 20) % 90 + 10);
    const p3 = String((i * 11 + 30) % 90 + 10);
    const p4 = String((i * 13 + 40) % 90 + 10);
    const phone = `04 ${p1} ${p2} ${p3} ${p4}`;

    const numServices = 4 + (i % 5);
    const services: string[] = [];
    for (let s = 0; s < numServices; s++) {
      services.push(SERVICES_POOL[(i + s * 3) % SERVICES_POOL.length]);
    }

    const numEdu = 2 + (i % 2);
    const edu: string[] = [];
    for (let e = 0; e < numEdu; e++) {
      edu.push(EDUCATION_POOL[(i + e * 4) % EDUCATION_POOL.length]);
    }

    const hours = [
      { day: "Lundi", hours: i % 5 === 0 ? "Fermé" : "08:30 - 18:30" },
      { day: "Mardi", hours: "08:30 - 18:30" },
      { day: "Mercredi", hours: "09:00 - 17:00" },
      { day: "Jeudi", hours: "08:30 - 18:30" },
      { day: "Vendredi", hours: "08:30 - 17:00" },
      { day: "Samedi", hours: i % 3 === 0 ? "09:00 - 12:00" : "Fermé" },
    ];

    const baseHour = 8 + (i % 10);
    const slots: string[] = [];
    for (let s = 0; s < 8; s++) {
      const h = baseHour + Math.floor(s * 1.25);
      const m = (s % 4) * 15;
      if (h < 18) slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }

    const rating = 4.2 + (((i * 17 + cityId.charCodeAt(0)) % 8) / 10);
    const reviews = 30 + ((i * 23 + cityId.length * 5) % 400);

    doctors.push({
      id: `${cityId}-${i}`,
      name: `Dr. ${firstName} ${lastName}`,
      specialty,
      address: `${streetNum} ${street}`,
      city: cityName,
      postalCode: postal,
      phone,
      photo: `${firstName[0]}${lastName[0]}`,
      rating: Math.min(5, Math.round(rating * 10) / 10),
      reviews,
      languages: i % 5 === 0 ? ["Français", "Anglais", "Arabe"] : i % 4 === 0 ? ["Français", "Anglais", "Espagnol"] : i % 3 === 0 ? ["Français", "Anglais"] : ["Français"],
      price: specialty.includes("Sage-femme") ? "25 €" : i % 6 === 0 ? "70 €" : i % 4 === 0 ? "60 €" : "50 €",
      acceptsNew: i % 5 !== 4,
      nextSlot: i % 4 === 0 ? "Aujourd'hui" : i % 4 === 1 ? "Demain" : i % 4 === 2 ? "Dans 2 jours" : "Dans 3 jours",
      bio: generateBio(specialty, firstName, i),
      education: edu,
      services,
      hours,
      slots,
    });
  }

  return doctors;
}

function generateBio(specialty: string, name: string, idx: number): string {
  const years = 5 + (idx % 25);
  if (specialty.includes("Sage-femme")) return `Sage-femme diplômée avec ${years} ans d'expérience. Accompagnement personnalisé de la grossesse, préparation à la naissance, suivi post-partum et rééducation périnéale. Approche bienveillante et à l'écoute.`;
  if (specialty.includes("Obstétrique")) return `Médecin spécialiste en gynécologie-obstétrique avec ${years} ans d'expérience. Suivi de grossesse à risque, échographie obstétricale, accouchement. Prise en charge complète de la femme enceinte.`;
  if (specialty.includes("Endocrinologie")) return `Endocrinologue gynécologique avec ${years} ans d'expérience. Prise en charge des troubles hormonaux féminins : SOPK, endométriose, ménopause, troubles de la fertilité, dysthyroïdie et syndrome prémenstruel.`;
  if (specialty.includes("reproduction")) return `Spécialiste de la procréation médicalement assistée avec ${years} ans d'expérience. FIV, ICSI, insémination, don d'ovocytes. Membre de la Société Française de Médecine de la Reproduction.`;
  if (specialty.includes("chirurgicale")) return `Chirurgienne gynécologique avec ${years} ans d'expérience. Chirurgie mini-invasive (cœlioscopie, hystéroscopie), traitement chirurgical de l'endométriose, fibromes, prolapsus.`;
  return `Gynécologue médicale avec ${years} ans d'expérience. Suivi gynécologique complet, contraception, dépistage du cancer du col, bilan hormonal, suivi de la ménopause. Consultations préventives et accompagnement personnalisé.`;
}

const DOCTORS_CACHE: Record<string, Doctor[]> = {};

function getDoctorsForCity(cityId: string): Doctor[] {
  if (DOCTORS_CACHE[cityId]) return DOCTORS_CACHE[cityId];
  const city = CITIES.find(c => c.id === cityId);
  if (!city) return [];
  const docs = generateDoctors(cityId, city.name, city.postalPrefix, 50);
  DOCTORS_CACHE[cityId] = docs;
  return docs;
}

export function searchDoctors(city: string, specialty?: string): Doctor[] {
  const docs = getDoctorsForCity(city);
  if (!specialty || specialty === "Toutes") return docs;
  return docs.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
}

export function findNearestCity(lat: number, lon: number): string {
  let minDist = Infinity;
  let nearest = "paris";
  for (const city of CITIES) {
    const dist = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lon - lon, 2));
    if (dist < minDist) {
      minDist = dist;
      nearest = city.id;
    }
  }
  return nearest;
}
