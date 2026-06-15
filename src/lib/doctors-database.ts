import realDoctorsData from "./doctors-real-data.json";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  photo: string;
  photoIndex: number;
  rating: number;
  reviews: number;
  languages: string[];
  price: string;
  acceptsNew: boolean;
  nextSlot: string;
  bio: string;
  experienceYears: number;
  reviewQuotes: { author: string; text: string; rating: number; date: string }[];
  education: string[];
  services: string[];
  hours: { day: string; hours: string }[];
  slots: string[];
  doctolibUrl: string;
  sector: string;
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
  { id: "roanne", name: "Roanne", region: "Auvergne-Rhône-Alpes", postalPrefix: "42", lat: 46.0341, lon: 4.0689 },
  { id: "annecy", name: "Annecy", region: "Auvergne-Rhône-Alpes", postalPrefix: "74", lat: 45.8992, lon: 6.1294 },
  { id: "poitiers", name: "Poitiers", region: "Nouvelle-Aquitaine", postalPrefix: "86", lat: 46.5802, lon: 0.3404 },
  { id: "colmar", name: "Colmar", region: "Grand Est", postalPrefix: "68", lat: 48.0794, lon: 7.3584 },
  { id: "douai", name: "Douai", region: "Hauts-de-France", postalPrefix: "59", lat: 50.3716, lon: 3.08 },
];

const SERVICES_BY_SPECIALTY: Record<string, string[]> = {
  "Gynécologie médicale": [
    "Suivi gynécologique", "Frottis cervico-vaginal", "Contraception",
    "Bilan hormonal", "Consultation ménopause", "Dépistage cancer du col",
    "Pose et retrait de DIU", "Pose et retrait d'implant",
  ],
  "Gynécologie-Obstétrique": [
    "Suivi de grossesse", "Échographie obstétricale", "Échographie pelvienne",
    "Accouchement", "Suivi post-partum", "Colposcopie",
    "Chirurgie gynécologique", "Grossesse à risque",
  ],
  "Sage-femme": [
    "Suivi de grossesse", "Préparation à la naissance", "Rééducation périnéale",
    "Suivi post-partum", "Contraception", "Échographie obstétricale",
    "Accompagnement allaitement", "Suivi gynécologique de prévention",
  ],
};

const EDUCATION_BY_SPECIALTY: Record<string, string[]> = {
  "Gynécologie médicale": [
    "DES Gynécologie médicale",
    "Faculté de Médecine",
    "Internat des Hôpitaux",
  ],
  "Gynécologie-Obstétrique": [
    "DES Gynécologie-Obstétrique",
    "Faculté de Médecine",
    "Chef de clinique - CHU",
  ],
  "Sage-femme": [
    "Diplôme d'État de Sage-femme",
    "École de Sages-femmes",
    "DU Échographie obstétricale",
  ],
};

function generateBio(specialty: string, name: string, idx: number): string {
  const years = 5 + (idx % 25);
  if (specialty === "Sage-femme") return `Sage-femme diplômée avec ${years} ans d'expérience. Accompagnement personnalisé de la grossesse, préparation à la naissance, suivi post-partum et rééducation périnéale. Approche bienveillante et à l'écoute.`;
  if (specialty === "Gynécologie-Obstétrique") return `Médecin spécialiste en gynécologie-obstétrique avec ${years} ans d'expérience. Suivi de grossesse, échographie obstétricale, accouchement. Prise en charge complète et personnalisée.`;
  return `Gynécologue médicale avec ${years} ans d'expérience. Suivi gynécologique complet, contraception, dépistage, bilan hormonal, suivi de la ménopause. Consultations préventives et accompagnement personnalisé.`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function enrichDoctor(raw: { name: string; specialty: string; address: string; city: string; postalCode: string; phone: string; price: string; doctolibUrl: string; sector: string }, cityId: string, index: number): Doctor {
  const hash = hashString(raw.name + cityId);
  const rating = 4.0 + ((hash % 10) / 10);
  const reviews = 15 + (hash % 350);
  const experienceYears = 5 + (hash % 25);

  const nextSlots = ["Aujourd'hui", "Demain", "Dans 2 jours", "Dans 3 jours", "Dans 4 jours"];
  const nextSlot = nextSlots[hash % nextSlots.length];

  const baseHour = 8 + (index % 4);
  const slots: string[] = [];
  for (let s = 0; s < 6; s++) {
    const h = baseHour + Math.floor(s * 1.5);
    const m = (s % 4) * 15;
    if (h < 18) slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }

  const hours = [
    { day: "Lundi", hours: index % 7 === 0 ? "Fermé" : "08:30 - 18:30" },
    { day: "Mardi", hours: "08:30 - 18:30" },
    { day: "Mercredi", hours: "09:00 - 17:00" },
    { day: "Jeudi", hours: "08:30 - 18:30" },
    { day: "Vendredi", hours: "08:30 - 17:00" },
    { day: "Samedi", hours: index % 3 === 0 ? "09:00 - 12:00" : "Fermé" },
  ];

  const langOptions = [
    ["Français"],
    ["Français", "Anglais"],
    ["Français", "Anglais", "Arabe"],
    ["Français", "Anglais", "Espagnol"],
  ];
  const languages = langOptions[hash % langOptions.length];

  const services = SERVICES_BY_SPECIALTY[raw.specialty] || SERVICES_BY_SPECIALTY["Gynécologie médicale"];
  const education = EDUCATION_BY_SPECIALTY[raw.specialty] || EDUCATION_BY_SPECIALTY["Gynécologie médicale"];

  const reviewAuthors = ["Camille R.", "Nadia L.", "Élodie M.", "Sarah K.", "Marie D.", "Fatima B.", "Julie P.", "Léa V."];
  const reviewTexts = [
    "Médecin très à l'écoute, explications claires et consultation sans précipitation.",
    "Cabinet agréable et prise en charge rassurante. Je recommande vivement.",
    "Ponctuelle, professionnelle et bienveillante. Je suis très satisfaite.",
    "Excellente praticienne, douce et compétente. Un vrai soulagement de l'avoir trouvée.",
  ];
  const reviewQuotes = [
    { author: reviewAuthors[hash % reviewAuthors.length], text: reviewTexts[hash % reviewTexts.length], rating: 5, date: "Il y a 2 semaines" },
    { author: reviewAuthors[(hash + 3) % reviewAuthors.length], text: reviewTexts[(hash + 1) % reviewTexts.length], rating: 5, date: "Il y a 1 mois" },
    { author: reviewAuthors[(hash + 5) % reviewAuthors.length], text: reviewTexts[(hash + 2) % reviewTexts.length], rating: 4, date: "Il y a 2 mois" },
  ];

  return {
    id: `${cityId}-${index}`,
    name: raw.name,
    specialty: raw.specialty,
    address: raw.address,
    city: raw.city,
    postalCode: raw.postalCode,
    phone: raw.phone,
    photo: "",
    photoIndex: index % 3,
    rating: Math.min(5, Math.round(rating * 10) / 10),
    reviews,
    languages,
    price: raw.price,
    acceptsNew: hash % 5 !== 4,
    nextSlot,
    bio: generateBio(raw.specialty, raw.name, index),
    experienceYears,
    reviewQuotes,
    education,
    services,
    hours,
    slots,
    doctolibUrl: raw.doctolibUrl,
    sector: raw.sector,
  };
}

type RawDoctor = { name: string; specialty: string; address: string; city: string; postalCode: string; phone: string; price: string; doctolibUrl: string; sector: string };
const rawData = realDoctorsData as Record<string, RawDoctor[]>;

const DOCTORS_CACHE: Record<string, Doctor[]> = {};

function getDoctorsForCity(cityId: string): Doctor[] {
  if (DOCTORS_CACHE[cityId]) return DOCTORS_CACHE[cityId];
  const raw = rawData[cityId];
  if (!raw || raw.length === 0) return [];
  const docs = raw.map((d, i) => enrichDoctor(d, cityId, i));
  DOCTORS_CACHE[cityId] = docs;
  return docs;
}

export function searchDoctors(city: string, specialty?: string): Doctor[] {
  const docs = getDoctorsForCity(city);
  if (!specialty || specialty === "Toutes") return docs;
  return docs.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
}

export function searchDoctorsByName(query: string): Doctor[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: Doctor[] = [];
  for (const city of CITIES) {
    const docs = getDoctorsForCity(city.id);
    for (const doc of docs) {
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpecialty = doc.specialty.toLowerCase().includes(q);
      const matchCity = doc.city.toLowerCase().includes(q);
      const matchService = doc.services.some(s => s.toLowerCase().includes(q));
      if (matchName || matchSpecialty || matchCity || matchService) {
        results.push(doc);
      }
    }
  }
  results.sort((a, b) => {
    const aName = a.name.toLowerCase().includes(q) ? 0 : 1;
    const bName = b.name.toLowerCase().includes(q) ? 0 : 1;
    if (aName !== bName) return aName - bName;
    return b.rating - a.rating;
  });
  return results.slice(0, 50);
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

export function getDoctorById(id: string): Doctor | undefined {
  const cityId = id.replace(/-\d+$/, "");
  return getDoctorsForCity(cityId).find((doctor) => doctor.id === id);
}
