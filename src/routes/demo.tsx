import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flower2, CheckCircle2, Stethoscope, Shield, Clock, Users, Star } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({ meta: [{ title: "Démo Professionnelle — CycleBloom AI" }] }),
  component: Demo,
});

function Demo() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    organization: "",
    country: "",
    reason: "",
    patients: "",
    acceptTerms: false,
  });

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-bloom min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl border border-white/70 glass p-10 shadow-bloom text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold">Demande envoyée !</h1>
          <p className="mt-3 text-sm text-foreground/70 max-w-sm mx-auto">
            Merci, {form.firstName}. Notre équipe va examiner votre demande et vous envoyer vos accès sous 24h ouvrées.
          </p>
          <div className="mt-6 rounded-2xl bg-rose-pastel/50 p-4 text-left">
            <h3 className="font-semibold text-sm mb-2">Ce qui vous attend :</h3>
            <ul className="space-y-2 text-xs text-foreground/70">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Accès Premium complet pendant 2 mois</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Tableau de bord professionnel dédié</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Support prioritaire par email</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Données de test pré-remplies sur 3 cycles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Rapport de précision des prédictions</li>
            </ul>
          </div>
          <div className="mt-8 flex gap-3 justify-center">
            <Link to="/" className="rounded-full border border-border bg-white/70 px-6 py-2.5 text-sm font-medium hover:bg-white transition">
              Retour à l'accueil
            </Link>
            <Link to="/dashboard" className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bloom min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
            <Flower2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold">CycleBloom</span>
        </Link>
        <Link to="/dashboard" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
          Connexion
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Left - info */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-doux/10 px-4 py-1.5 text-xs font-semibold text-violet-doux mb-4">
              <Stethoscope className="h-3.5 w-3.5" /> Réservé aux professionnelles de santé
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Testez CycleBloom AI <span className="text-gradient-bloom">gratuitement pendant 2 mois</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/70 max-w-xl">
              Évaluez la fiabilité de nos algorithmes de prédiction, la qualité de notre contenu médical et l'expérience de vos patientes — sans aucun engagement.
            </p>

            {/* Benefits */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <BenefitCard icon={Clock} title="2 mois d'accès complet" desc="Testez sur au moins 2 cycles complets pour évaluer la précision des prédictions. Aucune carte bancaire requise." />
              <BenefitCard icon={Shield} title="Données pré-remplies" desc="3 cycles de données simulées pour tester immédiatement les rapports et l'IA, sans attendre." />
              <BenefitCard icon={Star} title="Rapport de précision" desc="À la fin de votre test, recevez un rapport détaillé sur la précision des prédictions vs vos données réelles." />
              <BenefitCard icon={Users} title="Multi-patientes" desc="Créez jusqu'à 5 profils de test pour simuler différents cas cliniques (SOPK, endométriose, etc)." />
            </div>

            {/* Testimonial */}
            <div className="mt-10 rounded-2xl border border-white/70 glass p-6">
              <p className="text-sm italic text-foreground/80">
                "J'ai testé CycleBloom sur 3 mois avec 15 patientes volontaires. La précision des prédictions était de 96% pour les règles et 89% pour l'ovulation. Je le recommande désormais en consultation."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-violet-doux flex items-center justify-center text-white font-bold text-sm">MD</div>
                <div>
                  <div className="text-sm font-semibold">Dr. Marie Diallo</div>
                  <div className="text-[10px] text-muted-foreground">Gynécologue-Obstétricienne, Douala</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div className="rounded-3xl border border-white/70 glass p-8 shadow-bloom h-fit sticky top-8">
            <h2 className="font-display text-xl font-bold mb-1">Demander votre accès</h2>
            <p className="text-xs text-muted-foreground mb-6">Réponse sous 24h ouvrées</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Prénom" value={form.firstName} onChange={v => update("firstName", v)} required />
                <FormField label="Nom" value={form.lastName} onChange={v => update("lastName", v)} required />
              </div>
              <FormField label="Email professionnel" type="email" value={form.email} onChange={v => update("email", v)} required placeholder="nom@clinique.com" />
              <FormField label="Téléphone" type="tel" value={form.phone} onChange={v => update("phone", v)} placeholder="+33 6..." />

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Profession</label>
                <select
                  value={form.profession}
                  onChange={e => update("profession", e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif"
                >
                  <option value="">Sélectionner...</option>
                  <option value="gynecologist">Gynécologue</option>
                  <option value="obstetrician">Obstétricien·ne</option>
                  <option value="midwife">Sage-femme</option>
                  <option value="gp">Médecin généraliste</option>
                  <option value="endocrinologist">Endocrinologue</option>
                  <option value="nurse">Infirmier·e</option>
                  <option value="nutritionist">Nutritionniste</option>
                  <option value="psychologist">Psychologue</option>
                  <option value="researcher">Chercheur·se</option>
                  <option value="other">Autre professionnel·le de santé</option>
                </select>
              </div>

              <FormField label="Établissement / cabinet" value={form.organization} onChange={v => update("organization", v)} placeholder="Clinique, hôpital..." />

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Pays</label>
                <select
                  value={form.country}
                  onChange={e => update("country", e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif"
                >
                  <option value="">Sélectionner...</option>
                  <option value="CM">Cameroun</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="CA">Canada</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="SN">Sénégal</option>
                  <option value="CD">RD Congo</option>
                  <option value="GA">Gabon</option>
                  <option value="TN">Tunisie</option>
                  <option value="MA">Maroc</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Nombre de patientes suivies / mois</label>
                <select
                  value={form.patients}
                  onChange={e => update("patients", e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif"
                >
                  <option value="">Sélectionner...</option>
                  <option value="1-20">1-20</option>
                  <option value="21-50">21-50</option>
                  <option value="51-100">51-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Pourquoi souhaitez-vous tester CycleBloom ?</label>
                <textarea
                  value={form.reason}
                  onChange={e => update("reason", e.target.value)}
                  placeholder="Recommandation aux patientes, recherche, évaluation clinique..."
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none resize-none h-20 focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={e => update("acceptTerms", e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 rounded border-border accent-rose-vif"
                />
                <p className="text-[10px] text-muted-foreground">
                  J'accepte que mes données soient utilisées pour créer mon compte démo. Aucune donnée patient n'est collectée pendant la période de test.
                </p>
              </div>

              <button
                type="submit"
                disabled={!form.email || !form.firstName || !form.lastName || !form.profession || !form.acceptTerms}
                className="w-full rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.01] disabled:opacity-50"
              >
                Envoyer ma demande
              </button>

              <p className="text-center text-[10px] text-muted-foreground">
                Accès sous 24h · Aucune carte bancaire · 2 mois gratuits
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc }: { icon: typeof Clock; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/70 glass p-5">
      <Icon className="h-6 w-6 text-violet-doux mb-3" />
      <h3 className="font-display text-sm font-bold">{title}</h3>
      <p className="mt-1 text-[11px] text-foreground/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function FormField({ label, value, onChange, type = "text", placeholder = "", required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
      />
    </div>
  );
}
