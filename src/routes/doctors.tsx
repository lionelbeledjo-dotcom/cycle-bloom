import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { Phone, Video, MapPin, Clock, Star, Shield, Globe, Search, ChevronLeft, Calendar, CheckCircle2, AlertTriangle, Navigation, Loader2, History, BadgeCheck } from "lucide-react";
import { CITIES, searchDoctors, searchDoctorsByName, findNearestCity, type Doctor } from "@/lib/doctors-database";
import { toast } from "sonner";
import { reverseGeocode } from "@/lib/geocoding.functions";

export const Route = createFileRoute("/doctors")({
  ssr: false,
  head: () => ({ meta: [{ title: "Trouver un médecin — CycleBloom AI" }] }),
  component: Doctors,
});

const SPECIALTIES_FILTER = ["Toutes", "Gynécologie médicale", "Gynécologie-Obstétrique", "Sage-femme", "Endocrinologie", "Reproduction"];

function DoctorAvatar({ doctor, size = "sm" }: { doctor: Doctor; size?: "sm" | "lg" }) {
  const colors = [
    "from-rose-400 to-pink-500",
    "from-violet-400 to-purple-500",
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-fuchsia-400 to-pink-500",
    "from-lime-400 to-emerald-500",
  ];
  const idx = doctor.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradient = colors[idx % colors.length];
  const initials = doctor.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("").slice(0, 2);
  const sizeClass = size === "lg" ? "h-20 w-20 text-2xl" : "h-14 w-14 text-base";
  return (
    <div className={`${sizeClass} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg shrink-0`}>
      {initials}
    </div>
  );
}

const EMERGENCY_NUMBERS = [
  { label: "SAMU", number: "15", desc: "Urgence médicale" },
  { label: "Urgences européennes", number: "112", desc: "Tous pays UE" },
  { label: "SOS Femmes Violences", number: "3919", desc: "Écoute et orientation" },
  { label: "Fil Santé Jeunes", number: "0 800 235 236", desc: "Gratuit et anonyme" },
];

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  address: string;
  city: string;
  status: "upcoming" | "done" | "cancelled";
}

function getAppointments(): Appointment[] {
  const stored = localStorage.getItem("cyclebloom_appointments");
  return stored ? JSON.parse(stored) : [];
}

function saveAppointment(appt: Appointment) {
  const current = getAppointments();
  current.unshift(appt);
  localStorage.setItem("cyclebloom_appointments", JSON.stringify(current));
}

function Doctors() {
  const [selectedCity, setSelectedCity] = useState("paris");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Toutes");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [detectedAddress, setDetectedAddress] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [sortBy, setSortBy] = useState<"slot" | "rating" | "distance">("slot");
  const geocode = useServerFn(reverseGeocode);

  const globalResults = searchQuery.length >= 2 ? searchDoctorsByName(searchQuery) : null;

  const effectiveCity = (() => {
    if (citySearch.length >= 2) {
      const match = CITIES.find(c => c.name.toLowerCase() === citySearch.toLowerCase());
      if (match) return match.id;
      const partial = CITIES.find(c => c.name.toLowerCase().includes(citySearch.toLowerCase()));
      if (partial) return partial.id;
    }
    return selectedCity;
  })();

  const matchedDoctors = globalResults
    ? globalResults.filter(d => selectedSpecialty === "Toutes" || d.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()))
    : searchDoctors(effectiveCity, selectedSpecialty);
  const doctors = [...matchedDoctors].sort((a, b) => sortBy === "rating" ? b.rating - a.rating : sortBy === "slot" ? a.nextSlot.localeCompare(b.nextSlot) : 0);

  const filteredCities = citySearch
    ? CITIES.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()))
    : CITIES;

  const detectLocation = async () => {
    setDetecting(true);
    setGeoError("");
    setDetectedAddress("");
    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n’est pas disponible sur votre appareil.");
      setDetecting(false);
      return;
    }
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });
      const { latitude, longitude } = position.coords;
      const nearest = findNearestCity(latitude, longitude);
      setSelectedCity(nearest);
      const cityName = CITIES.find((city) => city.id === nearest)?.name || "Ville détectée";
      try {
        const location = await geocode({ data: { latitude, longitude } });
        setDetectedAddress(location.formattedAddress);
        setCitySearch(location.city || cityName);
        toast.success("Position détectée", { description: location.formattedAddress });
      } catch {
        setDetectedAddress(cityName);
        setCitySearch(cityName);
        toast.success("Position détectée", { description: `Ville la plus proche : ${cityName}` });
      }
    } catch (err: unknown) {
      const geoErr = err as GeolocationPositionError;
      const messages: Record<number, string> = {
        1: "Autorisation refusée. Activez la localisation dans les réglages de votre navigateur, puis réessayez.",
        2: "Votre position est indisponible. Vérifiez le GPS ou sélectionnez votre ville manuellement.",
        3: "La détection a expiré. Rapprochez-vous d’une fenêtre ou sélectionnez votre ville manuellement.",
      };
      setGeoError(geoErr?.code ? messages[geoErr.code] : "Impossible de détecter votre position. Sélectionnez votre ville manuellement.");
    } finally {
      setDetecting(false);
    }
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

  if (showHistory) {
    return (
      <AppShell title="Mes rendez-vous">
        <button onClick={() => setShowHistory(false)} className="flex items-center gap-1 text-sm text-violet-doux hover:text-rose-vif transition mb-6">
          <ChevronLeft className="h-4 w-4" /> Retour
        </button>
        <AppointmentHistory />
      </AppShell>
    );
  }

  return (
    <AppShell title="Trouver un médecin">
      <div className="-mt-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/70">
            Prenez rendez-vous avec un gynécologue, une sage-femme ou un spécialiste près de chez vous.
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[10px] text-green-700 font-medium">
            <BadgeCheck className="h-3.5 w-3.5" /> Données officielles — Annuaire Santé (RPPS / Ameli)
          </p>
        </div>
        <button onClick={() => setShowHistory(true)} className="flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-medium hover:bg-white transition shrink-0">
          <History className="h-3.5 w-3.5 text-violet-doux" /> Mes RDV
        </button>
      </div>

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
      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Nom du médecin, spécialité, ville..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-white/80 py-3 pl-11 pr-4 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tapez votre ville..."
            value={citySearch}
            onChange={e => setCitySearch(e.target.value)}
            className="w-full rounded-2xl border border-border bg-white/80 py-3 pl-11 pr-4 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
          />
          {citySearch && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 z-20 rounded-2xl border border-border bg-white shadow-lg max-h-60 overflow-y-auto">
              {filteredCities.slice(0, 15).map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCity(c.id); setCitySearch(""); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-pastel/30 transition flex items-center justify-between"
                >
                  <span>{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={detectLocation}
          disabled={detecting}
          className="flex items-center gap-2 rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm hover:border-rose-vif transition disabled:opacity-50"
        >
          {detecting ? <Loader2 className="h-4 w-4 text-rose-vif animate-spin" /> : <Navigation className="h-4 w-4 text-rose-vif" />}
          {detecting ? "Détection..." : "📍 Me localiser"}
        </button>
      </div>

      {/* City selector chips */}
      {!citySearch && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="rounded-full border border-border bg-white/80 px-4 py-1.5 text-xs font-medium outline-none focus:border-rose-vif"
          >
            {CITIES.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.region})</option>
            ))}
          </select>
        </div>
      )}

      {geoError && (
        <div className="mb-4 rounded-2xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
          ⚠️ {geoError}
        </div>
      )}
      {detectedAddress && !geoError && <p className="mb-4 flex items-center gap-2 text-xs text-foreground/70"><MapPin className="h-3.5 w-3.5 text-rose-vif" /> {detectedAddress}</p>}

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
          <span className="font-semibold text-foreground">{doctors.length} médecins</span> {globalResults ? `trouvés pour "${searchQuery}"` : `disponibles à ${CITIES.find(c => c.id === effectiveCity)?.name || CITIES.find(c => c.id === selectedCity)?.name}`}
        </p>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value as "slot" | "rating" | "distance")} className="rounded-xl border border-border bg-white/80 px-3 py-1.5 text-xs outline-none">
          <option value="slot">Prochain créneau</option>
          <option value="rating">Mieux noté</option>
          <option value="distance">Plus proche</option>
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
    <div className="block w-full text-left rounded-2xl border border-white/70 glass p-4 shadow-sm hover:shadow-bloom hover:-translate-y-0.5 transition">
      <div className="flex items-start gap-4">
        <DoctorAvatar doctor={doctor} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link to="/doctor/$doctorId" params={{ doctorId: doctor.id }} onClick={onClick} className="hover:text-rose-vif transition">
              <h3 className="font-display font-bold text-sm">{doctor.name}</h3>
              <p className="text-xs text-violet-doux font-medium">{doctor.specialty}</p>
            </Link>
            <div className="text-right shrink-0">
              <div className="text-sm font-bold text-rose-vif">{doctor.price}</div>
              {doctor.acceptsNew && (
                <span className="text-[9px] text-green-600 font-medium">Accepte nouvelles patientes</span>
              )}
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {doctor.address}, {doctor.city}</span>
            {doctor.phone && (
              <a href={`tel:${doctor.phone}`} className="flex items-center gap-1 text-rose-vif hover:underline" onClick={e => e.stopPropagation()}>
                <Phone className="h-3 w-3" /> {doctor.phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}
              </a>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-muted-foreground">({doctor.reviews} avis)</span>
            </span>
            {doctor.sector && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Shield className="h-3 w-3" /> {doctor.sector}
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground">
              <Globe className="h-3 w-3" /> {doctor.languages.join(", ")}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Clock className="h-3 w-3 text-green-600" />
            <span className="text-xs font-medium text-green-700">Prochain RDV : {doctor.nextSlot}</span>
            <a
              href={doctor.doctolibUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="ml-auto rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-blue-700 transition"
            >
              Prendre RDV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DoctorProfile({
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
          <a href={doctor.doctolibUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition">
            <Calendar className="h-4 w-4" /> Voir sur Doctolib
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
              <DoctorAvatar doctor={doctor} size="lg" />
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
            <p className="mt-3 text-sm font-semibold text-violet-doux">{doctor.experienceYears} ans d’expérience</p>
          </div>

          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-bold mb-3">Avis de patientes</h3>
            <div className="space-y-4">
              {doctor.reviewQuotes.map((review) => (
                <blockquote key={review.author} className="border-l-2 border-rose-vif/40 pl-4">
                  <div className="flex items-center gap-1 text-amber-500" aria-label={`${review.rating} étoiles`}>{Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-3 w-3 fill-current" />)}</div>
                  <p className="mt-1 text-sm text-foreground/80">“{review.text}”</p>
                  <footer className="mt-1 text-xs text-muted-foreground">{review.author} · {review.date}</footer>
                </blockquote>
              ))}
            </div>
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
            <h3 className="font-display font-bold text-sm mb-3">Localisation</h3>
            <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 mb-2">
              <MapPin className="h-4 w-4 text-violet-doux" />
              <span className="text-xs">{doctor.address}, {doctor.postalCode} {doctor.city}</span>
            </div>
            <a href={doctor.doctolibUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-blue-50 border border-blue-200 p-3 hover:bg-blue-100 transition">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Voir disponibilités sur Doctolib</span>
            </a>
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
                  onClick={() => {
                    saveAppointment({
                      id: Date.now(),
                      doctorName: doctor.name,
                      specialty: doctor.specialty,
                      date: `${dates[selectedDate].label} — ${dates[selectedDate].date}`,
                      time: selectedSlot,
                      address: `${doctor.address}, ${doctor.city}`,
                      city: doctor.city,
                      status: "upcoming",
                    });
                    setBookingConfirmed(true);
                    toast.success("Rendez-vous confirmé !");
                  }}
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
            <button
              onClick={() => toast.info("La téléconsultation sera disponible sous peu.")}
              className="w-full rounded-xl border border-violet-doux/30 bg-violet-doux/5 py-2.5 text-xs font-semibold text-violet-doux hover:bg-violet-doux/10 transition"
            >
              Prendre un RDV vidéo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentHistory() {
  const [appointments, setAppointments] = useState<Appointment[]>(getAppointments);

  const cancelAppointment = (id: number) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: "cancelled" as const } : a);
    setAppointments(updated);
    localStorage.setItem("cyclebloom_appointments", JSON.stringify(updated));
    toast.success("Rendez-vous annulé");
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
        <h3 className="font-display text-lg font-bold text-foreground/50">Aucun rendez-vous</h3>
        <p className="text-sm text-foreground/40 mt-1">Vos rendez-vous pris apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map(a => (
        <div key={a.id} className={`rounded-2xl border p-4 ${a.status === "cancelled" ? "border-red-200 bg-red-50/50 opacity-60" : a.status === "done" ? "border-green-200 bg-green-50/50" : "border-white/70 glass shadow-sm"}`}>
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-display text-sm font-bold">{a.doctorName}</h4>
              <p className="text-xs text-violet-doux font-medium">{a.specialty}</p>
              <div className="mt-1.5 space-y-0.5 text-xs text-foreground/60">
                <p>{a.date} à {a.time}</p>
                <p>{a.address}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                a.status === "upcoming" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                a.status === "done" ? "bg-green-50 text-green-700 border border-green-200" :
                "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {a.status === "upcoming" ? "À venir" : a.status === "done" ? "Terminé" : "Annulé"}
              </span>
              {a.status === "upcoming" && (
                <button onClick={() => cancelAppointment(a.id)} className="mt-2 block text-[10px] text-red-500 hover:text-red-700">
                  Annuler
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
