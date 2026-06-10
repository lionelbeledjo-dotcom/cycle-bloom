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
  { id: "paris", name: "Paris", region: "Île-de-France" },
  { id: "lyon", name: "Lyon", region: "Auvergne-Rhône-Alpes" },
  { id: "marseille", name: "Marseille", region: "Provence-Alpes-Côte d'Azur" },
  { id: "toulouse", name: "Toulouse", region: "Occitanie" },
  { id: "bordeaux", name: "Bordeaux", region: "Nouvelle-Aquitaine" },
  { id: "lille", name: "Lille", region: "Hauts-de-France" },
  { id: "nantes", name: "Nantes", region: "Pays de la Loire" },
  { id: "strasbourg", name: "Strasbourg", region: "Grand Est" },
  { id: "montpellier", name: "Montpellier", region: "Occitanie" },
  { id: "nice", name: "Nice", region: "Provence-Alpes-Côte d'Azur" },
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
  "Suivi gynécologique",
  "Frottis cervico-vaginal",
  "Pose et retrait de DIU",
  "Pose et retrait d'implant",
  "Échographie pelvienne",
  "Échographie obstétricale",
  "Suivi de grossesse",
  "Préparation à l'accouchement",
  "Colposcopie",
  "Hystéroscopie diagnostique",
  "Consultation fertilité",
  "Bilan hormonal",
  "Traitement de l'endométriose",
  "Suivi SOPK",
  "Contraception",
  "Rééducation périnéale",
  "IVG médicamenteuse",
  "Consultation ménopause",
  "PMA / FIV",
  "Chirurgie gynécologique mini-invasive",
];

function generateDoctors(city: string, postalPrefix: string, phonePrefix: string): Doctor[] {
  const firstNames = [
    "Marie", "Sophie", "Claire", "Isabelle", "Catherine", "Anne", "Nathalie", "Sandrine",
    "Valérie", "Christine", "Élisabeth", "Françoise", "Hélène", "Caroline", "Stéphanie",
    "Laurence", "Patricia", "Sylvie", "Dominique", "Brigitte", "Béatrice", "Florence",
    "Céline", "Audrey", "Émilie", "Julie", "Pauline", "Camille", "Charlotte", "Alice",
    "Fatima", "Amina", "Leila", "Sarah", "Rachida",
  ];
  const lastNames = [
    "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand",
    "Leroy", "Moreau", "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David",
    "Bertrand", "Roux", "Vincent", "Fournier", "Morel", "Girard", "André", "Mercier",
    "Dupont", "Lambert", "Bonnet", "François", "Martinez", "Nguyen", "Diallo", "Ndiaye",
    "Benali", "El Amrani", "Koné",
  ];

  const streets = [
    "rue de la République", "avenue Victor Hugo", "boulevard Pasteur",
    "rue du Docteur Roux", "avenue de la Liberté", "rue Jean Jaurès",
    "place de la Mairie", "rue Gambetta", "avenue Foch", "rue Voltaire",
    "boulevard de Strasbourg", "rue du Maréchal Leclerc", "avenue des Ternes",
    "rue de la Paix", "boulevard Haussmann", "rue Nationale", "avenue de Verdun",
    "rue Saint-Honoré", "boulevard de la Marne", "rue de Rivoli",
    "place Bellecour", "cours Lafayette", "rue Paradis", "allée de Brienne",
    "cours de l'Intendance", "rue Faidherbe", "quai de la Fosse",
    "rue des Francs-Bourgeois", "avenue de la Gare", "rue Sainte-Catherine",
  ];

  const education = [
    "Faculté de Médecine Paris Descartes",
    "Université Claude Bernard Lyon 1",
    "Faculté de Médecine de Marseille",
    "CHU de Toulouse",
    "Université de Bordeaux",
    "Faculté de Médecine de Lille",
    "CHU de Nantes",
    "Faculté de Médecine de Strasbourg",
    "Université de Montpellier",
    "Faculté de Médecine de Nice",
    "Hôpital Cochin (Paris)",
    "Hôpital de la Pitié-Salpêtrière",
    "Maternité Port-Royal",
    "Institut Mutualiste Montsouris",
  ];

  const doctors: Doctor[] = [];

  for (let i = 0; i < 30; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const specialty = SPECIALTIES[i % SPECIALTIES.length];
    const streetNum = 1 + (i * 7) % 150;
    const street = streets[i % streets.length];
    const postal = `${postalPrefix}${String((i % 20) + 1).padStart(3, "0")}`;
    const phoneSuffix = String(1000000 + i * 37291).slice(0, 7);
    const phone = `${phonePrefix}${phoneSuffix.slice(0, 2)} ${phoneSuffix.slice(2, 4)} ${phoneSuffix.slice(4, 6)} ${phoneSuffix.slice(6)}`;

    const numServices = 4 + (i % 5);
    const services: string[] = [];
    for (let s = 0; s < numServices; s++) {
      services.push(SERVICES_POOL[(i + s * 3) % SERVICES_POOL.length]);
    }

    const numEdu = 2 + (i % 2);
    const edu: string[] = [];
    for (let e = 0; e < numEdu; e++) {
      edu.push(education[(i + e * 4) % education.length]);
    }

    const hours = [
      { day: "Lundi", hours: i % 3 === 0 ? "Fermé" : "08:30 - 18:30" },
      { day: "Mardi", hours: "08:30 - 18:30" },
      { day: "Mercredi", hours: "09:00 - 17:00" },
      { day: "Jeudi", hours: "08:30 - 18:30" },
      { day: "Vendredi", hours: "08:30 - 17:00" },
      { day: "Samedi", hours: i % 2 === 0 ? "09:00 - 12:00" : "Fermé" },
    ];

    const baseHour = 8 + (i % 10);
    const slots: string[] = [];
    for (let s = 0; s < 6; s++) {
      const h = baseHour + Math.floor(s * 1.5);
      const m = (s % 2) * 30;
      if (h < 18) slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }

    const rating = 4.5 + (((i * 17) % 5) / 10);
    const reviews = 50 + ((i * 23) % 300);

    doctors.push({
      id: `${city}-${i}`,
      name: `Dr. ${firstName} ${lastName}`,
      specialty,
      address: `${streetNum} ${street}`,
      city,
      postalCode: postal,
      phone: `04 ${phone}`,
      photo: `${firstName[0]}${lastName[0]}`,
      rating: Math.round(rating * 10) / 10,
      reviews,
      languages: i % 4 === 0 ? ["Français", "Anglais", "Arabe"] : i % 3 === 0 ? ["Français", "Anglais"] : ["Français"],
      price: specialty.includes("Sage-femme") ? "23 €" : i % 5 === 0 ? "60 €" : "50 €",
      acceptsNew: i % 4 !== 3,
      nextSlot: i % 3 === 0 ? "Aujourd'hui" : i % 3 === 1 ? "Demain" : "Dans 2 jours",
      bio: `${specialty === "Sage-femme" ? "Sage-femme diplômée" : "Médecin spécialiste en " + specialty.toLowerCase()} avec ${10 + (i % 20)} ans d'expérience. ${specialty.includes("Obstétrique") ? "Spécialisée dans le suivi de grossesse à risque et l'échographie obstétricale." : specialty.includes("Sage-femme") ? "Accompagnement personnalisé de la grossesse, préparation à la naissance et rééducation périnéale." : specialty.includes("Endocrinologie") ? "Prise en charge des troubles hormonaux féminins : SOPK, endométriose, ménopause, fertilité." : specialty.includes("reproduction") ? "Spécialiste de la procréation médicalement assistée (PMA). Membre de la Société Française de Médecine de la Reproduction." : "Suivi gynécologique complet, contraception, dépistage et prévention."}`,
      education: edu,
      services,
      hours,
      slots,
    });
  }

  return doctors;
}

export const DOCTORS_DB: Record<string, Doctor[]> = {
  paris: generateDoctors("Paris", "75", "12 34"),
  lyon: generateDoctors("Lyon", "69", "78 56"),
  marseille: generateDoctors("Marseille", "13", "91 23"),
  toulouse: generateDoctors("Toulouse", "31", "61 45"),
  bordeaux: generateDoctors("Bordeaux", "33", "56 78"),
  lille: generateDoctors("Lille", "59", "20 34"),
  nantes: generateDoctors("Nantes", "44", "40 56"),
  strasbourg: generateDoctors("Strasbourg", "67", "88 12"),
  montpellier: generateDoctors("Montpellier", "34", "67 89"),
  nice: generateDoctors("Nice", "06", "93 45"),
};

export function searchDoctors(city: string, specialty?: string): Doctor[] {
  const docs = DOCTORS_DB[city] || [];
  if (!specialty || specialty === "Toutes") return docs;
  return docs.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
}
