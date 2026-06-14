import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { Loader2, LogOut, User, Lock, HelpCircle, Info, Phone, Shield, FileText, AlertTriangle, BookOpen, ChevronRight, Save, Crown } from "lucide-react";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "@/lib/cycle-store";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profil — CycleBloom AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useProfile();
  const update = useUpdateProfile();

  const [firstName, setFirstName] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [lastPeriod, setLastPeriod] = useState("");
  const [email, setEmail] = useState("");
  const [showSecurity, setShowSecurity] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name ?? "");
      setCycleLength(profile.cycle_length);
      setPeriodLength(profile.period_length);
      setLastPeriod(profile.last_period_date ?? "");
    }
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, [profile]);

  const save = async () => {
    try {
      await update.mutateAsync({
        first_name: firstName,
        cycle_length: cycleLength,
        period_length: periodLength,
        last_period_date: lastPeriod || null,
      });
      toast.success("Profil mis à jour");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const resetPassword = async () => {
    if (!email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error("Erreur", { description: error.message });
    toast.success("Lien de réinitialisation envoyé à votre adresse email");
  };

  if (isLoading) {
    return <AppShell title="Profil"><div className="flex justify-center py-32"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div></AppShell>;
  }

  return (
    <AppShell title="Profil">
      <div className="max-w-2xl space-y-5">
        {/* Avatar + Name Header */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-vif to-violet-doux text-white text-xl font-bold shadow-bloom">
              {firstName ? firstName[0].toUpperCase() : "U"}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold">{firstName || "Utilisatrice"}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-medium text-amber-600">CycleBloom Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-rose-vif" />
            <h3 className="font-display text-lg font-semibold">Informations personnelles</h3>
          </div>
          <Field label="Email">
            <input value={email} disabled className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground" />
          </Field>
          <Field label="Prénom">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
          </Field>
        </div>

        {/* Cycle Settings */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-doux" />
            <h3 className="font-display text-lg font-semibold">Mon cycle</h3>
          </div>
          <Field label="Longueur moyenne du cycle (jours)">
            <input type="number" min={15} max={60} value={cycleLength} onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
          </Field>
          <Field label="Durée moyenne des règles (jours)">
            <input type="number" min={1} max={15} value={periodLength} onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
          </Field>
          <Field label="Premier jour des dernières règles">
            <input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
          </Field>
          <button onClick={save} disabled={update.isPending}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-3 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.02] disabled:opacity-60">
            <Save className="h-4 w-4" />
            {update.isPending ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>

        {/* Security */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom space-y-4">
          <button onClick={() => setShowSecurity(!showSecurity)} className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600" />
              <h3 className="font-display text-lg font-semibold">Sécurité</h3>
            </div>
            <ChevronRight className={`h-5 w-5 text-gray-400 transition ${showSecurity ? "rotate-90" : ""}`} />
          </button>
          {showSecurity && (
            <div className="space-y-3 pt-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mot de passe</p>
                    <p className="text-xs text-muted-foreground">Dernière modification : inconnue</p>
                  </div>
                  <button onClick={resetPassword} className="rounded-xl bg-white border border-gray-200 px-4 py-2 text-xs font-medium hover:bg-gray-50 transition">
                    Modifier
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Authentification à deux facteurs</p>
                    <p className="text-xs text-muted-foreground">Non activée</p>
                  </div>
                  <span className="rounded-xl bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Bientôt</span>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sessions actives</p>
                    <p className="text-xs text-muted-foreground">1 session active (cet appareil)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="rounded-3xl border border-white/70 glass shadow-bloom overflow-hidden divide-y divide-white/50">
          <NavLink to="/help" icon={HelpCircle} label="Centre d'aide" desc="FAQ, guides, tutoriels" />
          <NavLink to="/about" icon={Info} label="À propos" desc="Notre mission et équipe" />
          <NavLink to="/contact" icon={Phone} label="Contactez-nous" desc="WhatsApp, email, formulaire" />
          <NavLink to="/faq" icon={BookOpen} label="FAQ" desc="Questions fréquentes" />
        </div>

        <div className="rounded-3xl border border-white/70 glass shadow-bloom overflow-hidden divide-y divide-white/50">
          <NavLink to="/privacy" icon={Shield} label="Politique de confidentialité" desc="Protection de vos données" />
          <NavLink to="/terms" icon={FileText} label="Conditions d'utilisation" desc="Règles d'utilisation du service" />
          <NavLink to="/disclaimer" icon={AlertTriangle} label="Avertissement médical" desc="Limites de l'application" />
        </div>

        {/* Sign out */}
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <button onClick={signOut} className="flex items-center gap-2 text-sm font-medium text-rose-vif hover:text-rose-vif/80 transition">
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function NavLink({ to, icon: Icon, label, desc }: { to: string; icon: React.ElementType; label: string; desc: string }) {
  return (
    <Link to={to} className="flex items-center gap-4 px-6 py-4 hover:bg-white/50 transition">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
        <Icon className="h-5 w-5 text-rose-vif" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
    </Link>
  );
}
