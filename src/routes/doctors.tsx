import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Phone, Video, MapPin, Clock, Star, Shield, Globe, Search, ChevronLeft, Calendar, CheckCircle2, AlertTriangle, Navigation } from "lucide-react";
import { CITIES, DOCTORS_DB, searchDoctors, type Doctor } from "@/lib/doctors-database";

export const Route = createFileRoute("/doctors")({
  head: () => ({ meta: [{ title: "Trouver un médecin — CycleBloom AI" }] }),
  component: Doctors,
});

const SPECIALTIES_FILTER = ["Toutes", "Gynécologie médicale", "Gynécologie-Obstétrique", "Sage-femme", "Endocrinologie", "Reproduction"];

const EMERGENCY_NUMBERS = [
  { label: "SAMU", number: "15", desc: "Urgence médicale" },
  { label: "Urgences européennes", number: "112", desc: "Tous pays UE" },
  { label: "SOS Femmes Violences", number: "3919", desc: "Écoute et orientation" },
  { label: "Fil Santé Jeunes", number: "0 800 235 236", desc: "Gratuit et anonyme" },
];

function Doctors() {
  const [selectedCity, setSelectedCity] = useState("paris");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Toutes");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [detecting, setDetecting] = useState(false);

  const doctors = searchDoctors(selectedCity, selectedSpecialty).filter(d =>
    !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const detectLocation = () => {
    setDetecting(true);
    setTimeout(() => {
      setSelectedCity("paris");
      setDetecting(false);
    }, 1500);
  };

  if (selectedDoctor) {
    return (
      <AppShell>
        <DoctorProfile
          doctor={selectedDoctor}
          onBack={() => { setSelectedDoctor(null); setShowBooking(false); setBookingConfirmed(false); }}
          showBooking={showBooking}
          setShowBooking={setShowBooking}
          bookingConfirmed={bookingConfirmed}
          setBookingConfirmed={setBookingConfirmed}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </AppShell>
    );
  }

  return (
    <AppShell title="Trouver un médecin">
      <p className="-mt-4 mb-6 text-sm text-foreground/70">
        Prenez rendez-vous avec un gynécologue, une sage-femme ou un spécialiste près de chez vous.
      </p>

      {/* Emergency banner */}
      <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <h3 className="text-sm font-bold text-red-800">Urgence médicale ?</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {EMERGENCY_NUMBERS.map(e => (
            <a key={e.number} href={`tel:${e.number.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full bg-white border border-red-200 px-3 py-1.5 text-xs hover:bg-red-50 transition">
              <Phone className="h-3 w-3 text-red-600" />
              <span className="font-semibold text-red-800">{e.label} : {e.number}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Rechercher un médecin, une spécialité..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-white/80 py-3 pl-11 pr-4 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
          />
        </div>
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif"
        >
          {CITIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button
          onClick={detectLocation}
          disabled={detecting}
          className="flex items-center gap-2 rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm hover:border-rose-vif transition disabled:opacity-50"
        >
          <Navigation className="h-4 w-4 text-rose-vif" />
          {detecting ? "Détection..." : "Ma position"}
        </button>
      </div>

      {/* Specialty filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {SPECIALTIES_FILTER.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSpecialty(s)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition ${
              selectedSpecialty === s ? "bg-rose-vif text-white shadow-bloom" : "bg-white/70 text-foreground/60 hover:bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-foreground/60">
          <span className="font-semibold text-foreground">{doctors.length} médecins</span> disponibles à {CITIES.find(c => c.id === selectedCity)?.name}
        </p>
        <select className="rounded-xl border border-border bg-white/80 px-3 py-1.5 text-xs outline-none">
          <option>Prochain créneau</option>
          <option>Mieux noté</option>
          <option>Plus proche</option>
        </select>
      </div>

      {/* Doctor list */}
      <div className="space-y-3">
        {doctors.map(doc => (
          <DoctorListItem key={doc.id} doctor={doc} onClick={() => setSelectedDoctor(doc)} />
        ))}
      </div>
    </AppShell>
  );
}

function DoctorListItem({ doctor, onClick }: { doctor: Doctor; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full text-left rounded-2xl border border-white/70 glass p-4 shadow-sm hover:shadow-bloom hover:-translate-y-0.5 transition">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-white font-bold text-sm shrink-0">
          {doctor.photo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-sm">{doctor.name}</h3>
              <p className="text-xs text-violet-doux font-medium">{doctor.specialty}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-bold text-rose-vif">{doctor.price}</div>
              {doctor.acceptsNew && (
                <span className="text-[9px] text-green-600 font-medium">Accepte nouvelles patientes</span>
              )}
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {doctor.address}, {doctor.city}</span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-muted-foreground">({doctor.reviews} avis)</span>
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Globe className="h-3 w-3" /> {doctor.languages.join(", ")}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Clock className="h-3 w-3 text-green-600" />
            <span className="text-xs font-medium text-green-700">Prochain RDV : {doctor.nextSlot}</span>
            <div className="ml-auto flex gap-1.5">
              {doctor.slots.slice(0, 3).map(slot => (
                <span key={slot} className="rounded-md bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] font-medium text-green-700">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function DoctorProfile({
  doctor, onBack, showBooking, setShowBooking, bookingConfirmed, setBookingConfirmed, selectedSlot, setSelectedSlot
}: {
  doctor: Doctor;
  onBack: () => void;
  showBooking: boolean;
  setShowBooking: (v: boolean) => void;
  bookingConfirmed: boolean;
  setBookingConfirmed: (v: boolean) => void;
  selectedSlot: string;
  setSelectedSlot: (v: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(0);

  const dates = [
    { label: "Aujourd'hui", date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) },
    { label: "Demain", date: new Date(Date.now() + 86400000).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) },
    { label: new Date(Date.now() + 172800000).toLocaleDateString("fr-FR", { weekday: "short" }), date: new Date(Date.now() + 172800000).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) },
    { label: new Date(Date.now() + 259200000).toLocaleDateString("fr-FR", { weekday: "short" }), date: new Date(Date.now() + 259200000).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) },
    { label: new Date(Date.now() + 345600000).toLocaleDateString("fr-FR", { weekday: "short" }), date: new Date(Date.now() + 345600000).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) },
  ];

  if (bookingConfirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="font-display text-2xl font-bold">Rendez-vous confirmé !</h2>
        <p className="mt-2 text-sm text-foreground/70">Votre consultation avec {doctor.name} est réservée.</p>
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-foreground/60">Médecin</span><span className="font-medium">{doctor.name}</span></div>
            <div className="flex justify-between"><span className="text-foreground/60">Spécialité</span><span className="font-medium">{doctor.specialty}</span></div>
            <div className="flex justify-between"><span className="text-foreground/60">Date</span><span className="font-medium">{dates[selectedDate].label} — {dates[selectedDate].date}</span></div>
            <div className="flex justify-between"><span className="text-foreground/60">Heure</span><span className="font-medium">{selectedSlot}</span></div>
            <div className="flex justify-between"><span className="text-foreground/60">Adresse</span><span className="font-medium">{doctor.address}, {doctor.city}</span></div>
            <div className="flex justify-between"><span className="text-foreground/60">Tarif</span><span className="font-medium">{doctor.price}</span></div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-rose-pastel/50 p-4 text-xs text-foreground/70">
          Un email de confirmation a été envoyé. Pensez à apporter votre carte vitale et votre mutuelle.
        </div>
        <div className="mt-6 flex gap-3 justify-center">
          <a href={`tel:${doctor.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full border border-border bg-white/70 px-5 py-2.5 text-sm font-medium hover:bg-white transition">
            <Phone className="h-4 w-4" /> Appeler le cabinet
          </a>
          <button onClick={onBack} className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
            Retour aux résultats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-violet-doux hover:text-rose-vif transition mb-6">
        <ChevronLeft className="h-4 w-4" /> Retour aux résultats
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Main info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {doctor.photo}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold">{doctor.name}</h1>
                <p className="text-sm text-violet-doux font-medium">{doctor.specialty}</p>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-semibold">{doctor.rating}/5</span>
                    <span className="text-muted-foreground">({doctor.reviews} avis)</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" /> {doctor.languages.join(", ")}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {doctor.address}, {doctor.postalCode} {doctor.city}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {doctor.acceptsNew ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-[10px] font-medium text-green-700">
                      <CheckCircle2 className="h-3 w-3" /> Accepte nouvelles patientes
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-medium text-amber-700">
                      Liste d'attente
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-bold mb-3">Présentation</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{doctor.bio}</p>
          </div>

          {/* Services */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-bold mb-3">Actes et spécialités</h3>
            <div className="flex flex-wrap gap-2">
              {doctor.services.map(s => (
                <span key={s} className="rounded-full bg-rose-pastel/40 border border-rose-vif/10 px-3 py-1.5 text-xs font-medium text-foreground/80">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-bold mb-3">Formation</h3>
            <ul className="space-y-2">
              {doctor.education.map((e, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="h-3.5 w-3.5 text-violet-doux shrink-0" /> {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-bold mb-3">Horaires d'ouverture</h3>
            <div className="space-y-2">
              {doctor.hours.map(h => (
                <div key={h.day} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{h.day}</span>
                  <span className={h.hours === "Fermé" ? "text-red-500" : "text-foreground/70"}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="space-y-4 lg:sticky lg:top-8">
          {/* Price */}
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Tarif consultation</div>
            <div className="font-display text-3xl font-bold text-rose-vif mt-1">{doctor.price}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Conventionné secteur 1 · Carte vitale acceptée</p>
          </div>

          {/* Contact */}
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <h3 className="font-display font-bold text-sm mb-3">Contact</h3>
            <a href={`tel:${doctor.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 hover:bg-white transition mb-2">
              <Phone className="h-4 w-4 text-rose-vif" />
              <span className="text-sm font-medium">{doctor.phone}</span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
              <MapPin className="h-4 w-4 text-violet-doux" />
              <span className="text-xs">{doctor.address}, {doctor.postalCode} {doctor.city}</span>
            </div>
          </div>

          {/* Booking */}
          <div className="rounded-3xl border-2 border-rose-vif/30 bg-white p-5 shadow-bloom">
            <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-rose-vif" /> Prendre rendez-vous
            </h3>

            {/* Date selection */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(i)}
                  className={`shrink-0 rounded-xl px-3 py-2 text-center transition ${
                    selectedDate === i
                      ? "bg-rose-vif text-white shadow-bloom"
                      : "bg-white/70 border border-border hover:border-rose-vif"
                  }`}
                >
                  <div className="text-[10px] font-medium">{d.label}</div>
                  <div className="text-[9px] opacity-70">{d.date}</div>
                </button>
              ))}
            </div>

            {/* Time slots */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {doctor.slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => { setSelectedSlot(slot); setShowBooking(true); }}
                  className={`rounded-xl border py-2 text-xs font-medium transition ${
                    selectedSlot === slot
                      ? "border-rose-vif bg-rose-vif text-white"
                      : "border-green-200 bg-green-50 text-green-700 hover:border-rose-vif hover:text-rose-vif"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {showBooking && selectedSlot && (
              <div className="border-t border-border/30 pt-4">
                <div className="rounded-2xl bg-rose-pastel/30 p-3 mb-3">
                  <p className="text-xs font-medium">RDV : {dates[selectedDate].label} à {selectedSlot}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{doctor.name} · {doctor.price}</p>
                </div>
                <div className="space-y-2 mb-4">
                  <input
                    placeholder="Votre nom complet"
                    className="w-full rounded-xl border border-border bg-white/80 px-3 py-2.5 text-xs outline-none focus:border-rose-vif"
                  />
                  <input
                    placeholder="Votre téléphone"
                    className="w-full rounded-xl border border-border bg-white/80 px-3 py-2.5 text-xs outline-none focus:border-rose-vif"
                  />
                  <select className="w-full rounded-xl border border-border bg-white/80 px-3 py-2.5 text-xs outline-none focus:border-rose-vif">
                    <option value="">Motif de consultation</option>
                    <option>Suivi gynécologique</option>
                    <option>Contraception</option>
                    <option>Suivi de grossesse</option>
                    <option>Problème urgent</option>
                    <option>Fertilité</option>
                    <option>Ménopause</option>
                    <option>Autre</option>
                  </select>
                </div>
                <button
                  onClick={() => setBookingConfirmed(true)}
                  className="w-full rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-3 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
                >
                  Confirmer le rendez-vous
                </button>
                <p className="mt-2 text-center text-[9px] text-muted-foreground">
                  Annulation gratuite jusqu'à 24h avant
                </p>
              </div>
            )}
          </div>

          {/* Teleconsultation */}
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-4 w-4 text-violet-doux" />
              <h3 className="font-display font-bold text-sm">Téléconsultation</h3>
            </div>
            <p className="text-[10px] text-muted-foreground mb-3">Disponible pour les suivis et renouvellements d'ordonnance.</p>
            <button className="w-full rounded-xl border border-violet-doux/30 bg-violet-doux/5 py-2.5 text-xs font-semibold text-violet-doux hover:bg-violet-doux/10 transition">
              Prendre un RDV vidéo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
