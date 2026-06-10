import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Phone, Video, MessageCircle, AlertTriangle, MapPin, Clock, Star, Shield, Globe } from "lucide-react";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [{ title: "Consultation médicale — CycleBloom AI" }] }),
  component: Doctors,
});

const EMERGENCY_NUMBERS = [
  { country: "France", flag: "🇫🇷", samu: "15", urgences: "112", sos_femmes: "3919" },
  { country: "Cameroun", flag: "🇨🇲", samu: "119", urgences: "112", sos_femmes: "+237 222 20 44 45" },
  { country: "Belgique", flag: "🇧🇪", samu: "112", urgences: "100", sos_femmes: "0800 30 030" },
  { country: "Suisse", flag: "🇨🇭", samu: "144", urgences: "112", sos_femmes: "0848 233 233" },
  { country: "Canada", flag: "🇨🇦", samu: "911", urgences: "911", sos_femmes: "1-800-363-9010" },
  { country: "Côte d'Ivoire", flag: "🇨🇮", samu: "185", urgences: "110", sos_femmes: "+225 20 32 63 51" },
  { country: "Sénégal", flag: "🇸🇳", samu: "1515", urgences: "17", sos_femmes: "+221 33 869 70 70" },
  { country: "RD Congo", flag: "🇨🇩", samu: "112", urgences: "112", sos_femmes: "+243 81 555 0000" },
];

const DOCTORS = [
  { name: "Dr. Aminata Diallo", specialty: "Gynécologie-Obstétrique", rating: 4.9, reviews: 312, available: true, languages: ["Français", "Anglais"], location: "Douala, Cameroun", price: "15 000 FCFA", photo: "AD" },
  { name: "Dr. Léa Bernard", specialty: "Gynécologie médicale", rating: 4.8, reviews: 245, available: true, languages: ["Français"], location: "Paris, France", price: "45 €", photo: "LB" },
  { name: "Dr. Fatou Ndiaye", specialty: "Sage-femme spécialisée", rating: 4.9, reviews: 189, available: true, languages: ["Français", "Wolof"], location: "Dakar, Sénégal", price: "10 000 FCFA", photo: "FN" },
  { name: "Dr. Claire Dupont", specialty: "Endocrinologie gynécologique", rating: 4.7, reviews: 156, available: false, languages: ["Français", "Anglais"], location: "Bruxelles, Belgique", price: "55 €", photo: "CD" },
  { name: "Dr. Marie-Claire Owona", specialty: "Gynécologie-Obstétrique", rating: 4.8, reviews: 203, available: true, languages: ["Français", "Anglais", "Ewondo"], location: "Yaoundé, Cameroun", price: "12 000 FCFA", photo: "MO" },
  { name: "Dr. Sophie Martin", specialty: "Médecine de la fertilité", rating: 4.9, reviews: 178, available: true, languages: ["Français", "Anglais"], location: "Genève, Suisse", price: "80 CHF", photo: "SM" },
];

const SPECIALTIES = ["Toutes", "Gynécologie", "Sage-femme", "Fertilité", "Endocrinologie"];

const URGENT_SYMPTOMS = [
  "Saignement abondant inhabituel",
  "Douleur pelvienne intense",
  "Fièvre > 38.5°C avec douleurs abdominales",
  "Grossesse + saignement",
  "Douleur thoracique sous contraception",
  "Agression sexuelle",
];

function Doctors() {
  const [tab, setTab] = useState<"consult" | "emergency">("consult");
  const [specialty, setSpecialty] = useState("Toutes");
  const [showUrgent, setShowUrgent] = useState(false);

  return (
    <AppShell title="Consultation médicale">
      <p className="-mt-4 mb-6 text-sm text-foreground/70">
        Consultez un professionnel de santé spécialisé en santé féminine, où que vous soyez.
      </p>

      {/* Urgent banner */}
      <button
        onClick={() => setShowUrgent(true)}
        className="mb-6 flex w-full items-center gap-3 rounded-2xl bg-red-50 border border-red-200 p-4 text-left hover:bg-red-100 transition"
      >
        <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-800">Urgence médicale ?</h3>
          <p className="text-xs text-red-600">Touchez ici pour accéder aux numéros d'urgence de votre pays</p>
        </div>
      </button>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("consult")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${tab === "consult" ? "bg-rose-vif text-white shadow-bloom" : "bg-white/70 text-foreground/60 hover:bg-white"}`}
        >
          Téléconsultation
        </button>
        <button
          onClick={() => setTab("emergency")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${tab === "emergency" ? "bg-rose-vif text-white shadow-bloom" : "bg-white/70 text-foreground/60 hover:bg-white"}`}
        >
          Urgences & contacts
        </button>
      </div>

      {tab === "consult" && (
        <>
          {/* Specialties filter */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {SPECIALTIES.map(s => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition ${specialty === s ? "bg-violet-doux text-white" : "bg-white/70 text-foreground/60 hover:bg-white"}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Doctors list */}
          <div className="grid gap-4 md:grid-cols-2">
            {DOCTORS.map(doc => (
              <DoctorCard key={doc.name} doctor={doc} />
            ))}
          </div>

          {/* Info section */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard icon={Shield} title="Consultations sécurisées" desc="Chiffrement de bout en bout, données médicales protégées RGPD/HIPAA." />
            <InfoCard icon={Globe} title="Disponible partout" desc="Médecins francophones en Afrique, Europe et Amérique du Nord." />
            <InfoCard icon={Clock} title="Réponse rapide" desc="Délai moyen de mise en relation : moins de 15 minutes." />
          </div>
        </>
      )}

      {tab === "emergency" && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-red-200 bg-red-50/50 p-6">
            <h3 className="font-display text-lg font-bold text-red-800 mb-2">Quand appeler les urgences ?</h3>
            <ul className="space-y-2">
              {URGENT_SYMPTOMS.map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-red-700">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {EMERGENCY_NUMBERS.map(e => (
              <div key={e.country} className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{e.flag}</span>
                  <h4 className="font-display font-bold">{e.country}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <a href={`tel:${e.samu}`} className="flex items-center gap-2 text-rose-vif hover:underline">
                    <Phone className="h-3.5 w-3.5" /> SAMU : {e.samu}
                  </a>
                  <a href={`tel:${e.urgences}`} className="flex items-center gap-2 text-rose-vif hover:underline">
                    <Phone className="h-3.5 w-3.5" /> Urgences : {e.urgences}
                  </a>
                  <a href={`tel:${e.sos_femmes.replace(/\s/g, "")}`} className="flex items-center gap-2 text-violet-doux hover:underline">
                    <Phone className="h-3.5 w-3.5" /> SOS Femmes : {e.sos_femmes}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Urgent modal */}
      {showUrgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowUrgent(false)}>
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-red-800">Urgence</h3>
                <p className="text-xs text-red-600">Appelez immédiatement si vous êtes en danger</p>
              </div>
            </div>
            <div className="space-y-3">
              <a href="tel:15" className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 hover:bg-red-100 transition">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold text-red-800">SAMU — 15</div>
                  <div className="text-xs text-red-600">Urgence médicale (France)</div>
                </div>
              </a>
              <a href="tel:112" className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 hover:bg-red-100 transition">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold text-red-800">112</div>
                  <div className="text-xs text-red-600">Numéro d'urgence européen / international</div>
                </div>
              </a>
              <a href="tel:119" className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 hover:bg-red-100 transition">
                <Phone className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold text-red-800">119</div>
                  <div className="text-xs text-red-600">SAMU (Cameroun)</div>
                </div>
              </a>
              <a href="tel:3919" className="flex items-center gap-3 rounded-2xl bg-violet-doux/10 p-4 hover:bg-violet-doux/20 transition">
                <Phone className="h-5 w-5 text-violet-doux" />
                <div>
                  <div className="font-semibold text-violet-doux">3919</div>
                  <div className="text-xs text-foreground/60">Violences Femmes Info (France)</div>
                </div>
              </a>
            </div>
            <button onClick={() => setShowUrgent(false)} className="mt-6 w-full rounded-full bg-foreground/10 py-3 text-sm font-medium hover:bg-foreground/20 transition">
              Fermer
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function DoctorCard({ doctor }: { doctor: typeof DOCTORS[0] }) {
  const [booking, setBooking] = useState(false);

  return (
    <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-white font-bold text-lg shrink-0">
          {doctor.photo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display font-bold text-sm">{doctor.name}</h4>
            {doctor.available && <span className="h-2.5 w-2.5 rounded-full bg-green-500 shrink-0 mt-1.5" />}
          </div>
          <p className="text-xs text-violet-doux font-medium">{doctor.specialty}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {doctor.location}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 text-amber-500" />
            <span className="font-medium">{doctor.rating}</span>
            <span className="text-muted-foreground">({doctor.reviews} avis)</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
            <Globe className="h-3 w-3" /> {doctor.languages.join(", ")}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-bold text-rose-vif">{doctor.price}</span>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition" title="Chat">
            <MessageCircle className="h-4 w-4 text-foreground/60" />
          </button>
          <button className="h-9 w-9 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition" title="Appel">
            <Phone className="h-4 w-4 text-foreground/60" />
          </button>
          <button
            onClick={() => setBooking(true)}
            className="flex items-center gap-1.5 rounded-full bg-rose-vif px-4 py-2 text-xs font-semibold text-white hover:bg-rose-vif/90 transition"
          >
            <Video className="h-3.5 w-3.5" /> Consulter
          </button>
        </div>
      </div>

      {booking && (
        <div className="mt-4 rounded-2xl bg-rose-pastel/50 p-4">
          <p className="text-xs font-medium text-rose-vif mb-2">Choisissez un créneau :</p>
          <div className="flex flex-wrap gap-2">
            {["Maintenant", "Aujourd'hui 14h", "Aujourd'hui 16h", "Demain 9h", "Demain 11h"].map(slot => (
              <button key={slot} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:ring-2 hover:ring-rose-vif transition">
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon: Icon, title, desc }: { icon: typeof Shield; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/70 glass p-5">
      <Icon className="h-6 w-6 text-violet-doux mb-3" />
      <h4 className="font-display font-bold text-sm">{title}</h4>
      <p className="mt-1 text-xs text-foreground/60">{desc}</p>
    </div>
  );
}
