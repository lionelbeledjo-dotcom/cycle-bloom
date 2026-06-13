import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, CheckCircle2, Clock, Globe, MapPin, Phone, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getDoctorById } from "@/lib/doctors-database";
import doctorPortrait1 from "@/assets/doctor-portrait-1.jpg";
import doctorPortrait2 from "@/assets/doctor-portrait-2.jpg";
import doctorPortrait3 from "@/assets/doctor-portrait-3.jpg";

const photos = [doctorPortrait1, doctorPortrait2, doctorPortrait3];

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
  const doctor = Route.useLoaderData();
  return (
    <AppShell>
      <Link to="/doctors" className="text-sm font-semibold text-violet-doux">← Retour aux médecins</Link>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom">
            <div className="flex flex-col gap-5 sm:flex-row">
              <img src={photos[doctor.photoIndex]} alt={`Portrait de ${doctor.name}`} width={768} height={768} className="h-32 w-32 rounded-3xl object-cover" />
              <div><h1 className="font-display text-3xl font-bold">{doctor.name}</h1><p className="font-semibold text-violet-doux">{doctor.specialty}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-500" /> {doctor.rating} ({doctor.reviews} avis)</span><span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {doctor.languages.join(", ")}</span></div>
                <p className="mt-3 flex items-center gap-1 text-sm"><MapPin className="h-4 w-4 text-rose-vif" /> {doctor.address}, {doctor.postalCode} {doctor.city}</p>
              </div>
            </div>
          </section>
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom"><h2 className="font-display text-xl font-bold">Biographie et expérience</h2><p className="mt-3 leading-relaxed text-foreground/75">{doctor.bio}</p><p className="mt-3 font-semibold text-violet-doux">{doctor.experienceYears} ans d’expérience</p></section>
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom"><h2 className="font-display text-xl font-bold">Expertises</h2><div className="mt-3 flex flex-wrap gap-2">{doctor.services.map((service) => <span key={service} className="rounded-full bg-rose-pastel/50 px-3 py-1.5 text-xs font-medium">{service}</span>)}</div></section>
          <section className="glass rounded-3xl border border-white/70 p-6 shadow-bloom"><h2 className="font-display text-xl font-bold">Avis des patientes</h2><div className="mt-4 space-y-4">{doctor.reviewQuotes.map((review) => <blockquote key={review.author} className="border-l-2 border-rose-vif pl-4"><p className="text-sm">“{review.text}”</p><footer className="mt-1 text-xs text-muted-foreground">{review.author} · {review.rating}/5 · {review.date}</footer></blockquote>)}</div></section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <section className="rounded-3xl border-2 border-rose-vif/20 bg-white p-5 shadow-bloom"><p className="text-xs uppercase tracking-widest text-muted-foreground">Consultation</p><p className="mt-1 font-display text-3xl font-bold text-rose-vif">{doctor.price}</p><p className="mt-3 flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-600" /> {doctor.acceptsNew ? "Nouvelles patientes acceptées" : "Liste d’attente"}</p><Link to="/doctors" search={{}} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3 text-sm font-semibold text-white"><Calendar className="h-4 w-4" /> Voir et réserver les créneaux</Link></section>
          <section className="glass rounded-3xl border border-white/70 p-5 shadow-bloom"><h2 className="font-display font-bold">Prochains créneaux</h2><div className="mt-3 grid grid-cols-3 gap-2">{doctor.slots.slice(0, 6).map((slot) => <span key={slot} className="rounded-xl bg-green-50 p-2 text-center text-xs font-semibold text-green-700"><Clock className="mx-auto mb-1 h-3 w-3" />{slot}</span>)}</div><a href={`tel:${doctor.phone.replace(/\s/g, "")}`} className="mt-4 flex items-center gap-2 text-sm font-semibold text-violet-doux"><Phone className="h-4 w-4" /> {doctor.phone}</a></section>
        </aside>
      </div>
    </AppShell>
  );
}