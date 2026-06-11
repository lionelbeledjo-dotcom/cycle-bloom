import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Flower2, ArrowRight, ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { saveUserProfile } from "@/lib/user-store";
import { onUserRegistered, onTrialStarted } from "@/lib/email-system";
import { setUserSubscription } from "@/lib/premium-gate";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Créer un compte — CycleBloom AI" }] }),
  component: Register,
});

type Step = "account" | "goal" | "cycle" | "health" | "ready";

function Register() {
  const [step, setStep] = useState<Step>("account");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
    birthYear: "",
    goal: "",
    cycleLength: "28",
    periodLength: "5",
    lastPeriod: "",
    irregular: false,
    conditions: [] as string[],
    contraception: "none",
    acceptTerms: false,
  });

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const steps: Step[] = ["account", "goal", "cycle", "health", "ready"];
  const currentIdx = steps.indexOf(step);
  const progress = ((currentIdx + 1) / steps.length) * 100;

  const next = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };
  const prev = () => {
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  return (
    <div className="bg-bloom min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
            <Flower2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold">CycleBloom</span>
        </Link>
        <Link to="/login" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
          Déjà un compte ? Se connecter
        </Link>
      </header>

      {/* Progress bar */}
      <div className="px-6">
        <div className="mx-auto max-w-lg h-1.5 rounded-full bg-border/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          Étape {currentIdx + 1} sur {steps.length}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {step === "account" && (
            <StepCard title="Créez votre compte" subtitle="Rejoignez 50 000+ femmes qui comprennent enfin leur corps.">
              <div className="space-y-4">
                <Field label="Prénom" value={form.firstName} onChange={v => update("firstName", v)} placeholder="Votre prénom" />
                <Field label="Email" type="email" value={form.email} onChange={v => update("email", v)} placeholder="vous@exemple.com" />
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Mot de passe</label>
                  <div className="relative mt-1.5">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={e => update("password", e.target.value)}
                      placeholder="8 caractères minimum"
                      className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 pr-12 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.password.length > 0 && form.password.length < 8 && (
                    <p className="mt-1 text-[10px] text-red-500">Le mot de passe doit contenir au moins 8 caractères</p>
                  )}
                </div>
                <Field label="Année de naissance" type="number" value={form.birthYear} onChange={v => update("birthYear", v)} placeholder="1995" />

                <div className="flex items-start gap-2 mt-4">
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={e => update("acceptTerms", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-rose-vif"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    J'accepte les <a href="#" className="text-rose-vif underline">Conditions d'utilisation</a> et la <a href="#" className="text-rose-vif underline">Politique de confidentialité</a>
                  </p>
                </div>

                <div className="my-4 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> ou s'inscrire avec <span className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Google", "Apple", "Facebook"].map(p => (
                    <button key={p} className="rounded-2xl border border-border bg-white/80 py-2.5 text-xs font-semibold hover:border-rose-vif hover:text-rose-vif transition">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </StepCard>
          )}

          {step === "goal" && (
            <StepCard title="Quel est votre objectif ?" subtitle="CycleBloom adapte ses prédictions et conseils en fonction de votre besoin.">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "track", label: "Suivre mon cycle", desc: "Comprendre et anticiper mes règles" },
                  { id: "conceive", label: "Tomber enceinte", desc: "Optimiser ma fertilité" },
                  { id: "avoid", label: "Éviter une grossesse", desc: "Méthode naturelle de contraception" },
                  { id: "pregnancy", label: "Suivre ma grossesse", desc: "Je suis déjà enceinte" },
                  { id: "health", label: "Santé hormonale", desc: "Équilibrer mes hormones" },
                  { id: "perimenopause", label: "Périménopause", desc: "Gérer cette transition" },
                ].map(g => (
                  <button
                    key={g.id}
                    onClick={() => update("goal", g.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      form.goal === g.id
                        ? "border-rose-vif bg-rose-pastel/30 shadow-bloom"
                        : "border-border bg-white/70 hover:border-rose-vif/50"
                    }`}
                  >
                    <div className="text-sm font-semibold">{g.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step === "cycle" && (
            <StepCard title="Parlons de votre cycle" subtitle="Ces informations nous permettent de faire des prédictions précises dès le premier jour.">
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Date de vos dernières règles</label>
                  <input
                    type="date"
                    value={form.lastPeriod}
                    onChange={e => update("lastPeriod", e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">Approximative si vous ne vous souvenez pas exactement</p>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Durée habituelle du cycle</label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min="21"
                      max="45"
                      value={form.cycleLength}
                      onChange={e => update("cycleLength", e.target.value)}
                      className="flex-1 accent-rose-vif"
                    />
                    <span className="w-14 text-center font-display text-xl font-bold text-rose-vif">{form.cycleLength}j</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Moyenne : 28 jours (21-35 jours est normal)</p>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Durée habituelle des règles</label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={form.periodLength}
                      onChange={e => update("periodLength", e.target.value)}
                      className="flex-1 accent-rose-vif"
                    />
                    <span className="w-14 text-center font-display text-xl font-bold text-violet-doux">{form.periodLength}j</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 p-4">
                  <input
                    type="checkbox"
                    checked={form.irregular}
                    onChange={e => update("irregular", e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-rose-vif"
                  />
                  <div>
                    <div className="text-sm font-medium">Mes cycles sont irréguliers</div>
                    <div className="text-[10px] text-muted-foreground">La durée varie de plus de 7 jours d'un mois à l'autre</div>
                  </div>
                </div>
              </div>
            </StepCard>
          )}

          {step === "health" && (
            <StepCard title="Votre profil santé" subtitle="Optionnel mais recommandé — améliore la précision de nos prédictions de 30%.">
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Contraception actuelle</label>
                  <select
                    value={form.contraception}
                    onChange={e => update("contraception", e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif"
                  >
                    <option value="none">Aucune</option>
                    <option value="pill">Pilule combinée</option>
                    <option value="mini-pill">Pilule progestative</option>
                    <option value="iud-copper">DIU cuivre</option>
                    <option value="iud-hormonal">DIU hormonal</option>
                    <option value="implant">Implant</option>
                    <option value="condom">Préservatif</option>
                    <option value="natural">Méthode naturelle</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2 block">Conditions connues (optionnel)</label>
                  <div className="flex flex-wrap gap-2">
                    {["SOPK", "Endométriose", "Fibrome", "Thyroïde", "Diabète", "Migraine", "Aucune"].map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          if (c === "Aucune") {
                            update("conditions", []);
                          } else {
                            update("conditions", form.conditions.includes(c)
                              ? form.conditions.filter(x => x !== c)
                              : [...form.conditions, c]);
                          }
                        }}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                          form.conditions.includes(c) || (c === "Aucune" && form.conditions.length === 0)
                            ? "bg-rose-vif text-white shadow-bloom"
                            : "border border-border bg-white/70 hover:border-rose-vif"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepCard>
          )}

          {step === "ready" && (
            <StepCard title="Tout est prêt !" subtitle="Votre CycleBloom AI est configuré. Voici ce qui vous attend :">
              <div className="space-y-3 mb-6">
                {[
                  "Prédictions de règles et d'ovulation dès aujourd'hui",
                  "Bloom AI disponible pour répondre à vos questions",
                  "Suivi quotidien de vos symptômes et humeur",
                  "Magazine santé avec articles vérifiés",
                  "Communauté bienveillante de 12 000+ femmes",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-rose-pastel/50 border border-rose-vif/20 p-4 text-center">
                <p className="text-sm font-medium text-rose-vif">7 jours Premium offerts</p>
                <p className="text-[10px] text-muted-foreground mt-1">Profitez de toutes les fonctionnalités sans engagement</p>
              </div>
            </StepCard>
          )}

          {/* Navigation buttons */}
          <div className="mt-6 flex items-center justify-between max-w-lg mx-auto">
            {currentIdx > 0 ? (
              <button onClick={prev} className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition">
                <ArrowLeft className="h-4 w-4" /> Retour
              </button>
            ) : <div />}

            {step === "ready" ? (
              <button
                onClick={() => {
                  saveUserProfile({
                    firstName: form.firstName,
                    email: form.email,
                    birthYear: form.birthYear,
                    goal: form.goal,
                    cycleLength: parseInt(form.cycleLength),
                    periodLength: parseInt(form.periodLength),
                    lastPeriod: form.lastPeriod,
                    irregular: form.irregular,
                    conditions: form.conditions,
                    contraception: form.contraception,
                    registeredAt: new Date().toISOString(),
                  });
                  setUserSubscription({ plan: "premium_monthly", status: "trial", trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() });
                  onUserRegistered({ name: form.firstName, email: form.email });
                  onTrialStarted({ name: form.firstName, email: form.email }, 7, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR"));
                  navigate({ to: "/dashboard" });
                }}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-8 py-3.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
              >
                Accéder à mon espace <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={next}
                disabled={step === "account" && (!form.email || !form.password || form.password.length < 8 || !form.acceptTerms)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-3 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100"
              >
                Continuer <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/70 glass p-8 shadow-bloom">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground mb-6">{subtitle}</p>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
      />
    </div>
  );
}
