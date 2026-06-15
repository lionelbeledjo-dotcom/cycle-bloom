import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, CheckCircle2, Clock, Globe, MapPin, Star, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getDoctorById, type Doctor } from "@/lib/doctors-database";

function DoctorAvatar({ doctor }: { doctor: Doctor }) {
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
  return (
    <div className={`h-28 w-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0`}>
      {initials}
    </div>
  );
}

export const Route = createFileRoute("/doctor/$doctorId")({
  loader: ({ params }) => {
    const doctor = getDoctorById(params.doctorId);
    if (!doctor) throw notFound();
    return doctor;
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.name} — CycleBloom` : "Médecin — CycleBloom" }] }),
  component: DoctorDetailPage,
});

function DoctorDetailPage() {
  const doctor = Route.useLoaderData() as Doctor;
  return (
    <AppShell>
      <Link to="/doctors" className="text-sm font-semibold text-violet-doux">← Retour aux médecins</Link>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom">
            <div className="flex flex-col gap-5 sm:flex-row">
              <DoctorAvatar doctor={doctor} />
              <div>
                <h1 className="font-display text-3xl font-bold">{doctor.name}</h1>
                <p className="font-semibold text-violet-doux">{doctor.specialty}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-500" /> {doctor.rating} ({doctor.reviews} avis)</span>
                  <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {doctor.languages.join(", ")}</span>
                </div>
                <p className="mt-3 flex items-center gap-1 text-sm"><MapPin className="h-4 w-4 text-rose-vif" /> {doctor.address}, {doctor.postalCode} {doctor.city}</p>
              </div>
            </div>
          </section>
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom">
            <h2 className="font-display text-xl font-bold">Biographie et expérience</h2>
            <p className="mt-3 leading-relaxed text-foreground/75">{doctor.bio}</p>
            <p className="mt-3 font-semibold text-violet-doux">{doctor.experienceYears} ans d'expérience</p>
          </section>
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom">
            <h2 className="font-display text-xl font-bold">Expertises</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {doctor.services.map((service: string) => <span key={service} className="rounded-full bg-rose-pastel/50 px-3 py-1.5 text-xs font-medium">{service}</span>)}
            </div>
          </section>
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom">
            <h2 className="font-display text-xl font-bold">Avis des patientes</h2>
            <div className="mt-4 space-y-4">
              {doctor.reviewQuotes.map((review: Doctor["reviewQuotes"][number]) => (
                <blockquote key={review.author} className="border-l-2 border-rose-vif pl-4">
                  <p className="text-sm">"{review.text}"</p>
                  <footer className="mt-1 text-xs text-muted-foreground">{review.author} · {review.rating}/5 · {review.date}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <section className="rounded-3xl border-2 border-rose-vif/20 bg-white p-5 shadow-bloom">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Consultation</p>
            <p className="mt-1 font-display text-3xl font-bold text-rose-vif">{doctor.price}</p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> {doctor.acceptsNew ? "Nouvelles patientes acceptées" : "Liste d'attente"}
            </p>
            <a
              href={doctor.doctolibUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              <ExternalLink className="h-4 w-4" /> Prendre RDV sur Doctolib
            </a>
            <p className="mt-2 text-center text-[9px] text-muted-foreground">Vous serez redirigé vers Doctolib.fr</p>
          </section>
          <section className="glass rounded-3xl border border-white/70 p-5 shadow-bloom">
            <h2 className="font-display font-bold">Prochains créneaux indicatifs</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {doctor.slots.slice(0, 6).map((slot: string) => (
                <span key={slot} className="rounded-xl bg-green-50 p-2 text-center text-xs font-semibold text-green-700">
                  <Clock className="mx-auto mb-1 h-3 w-3" />{slot}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground text-center">Créneaux indicatifs — vérifiez la disponibilité réelle sur Doctolib</p>
          </section>
          <section className="glass rounded-3xl border border-white/70 p-5 shadow-bloom">
            <h2 className="font-display font-bold text-sm mb-2">Adresse du cabinet</h2>
            <p className="flex items-center gap-2 text-xs text-foreground/70"><MapPin className="h-3.5 w-3.5 text-rose-vif" /> {doctor.address}, {doctor.postalCode} {doctor.city}</p>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
