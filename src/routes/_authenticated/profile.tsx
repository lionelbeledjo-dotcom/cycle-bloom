import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { Loader2, LogOut } from "lucide-react";
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

  if (isLoading) {
    return <AppShell title="Profil"><div className="flex justify-center py-32"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div></AppShell>;
  }

  return (
    <AppShell title="Profil">
      <div className="max-w-2xl space-y-6">
        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom space-y-4">
          <h3 className="font-display text-lg font-semibold">Informations personnelles</h3>
          <Field label="Email">
            <input value={email} disabled className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground" />
          </Field>
          <Field label="Prénom">
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" />
          </Field>
        </div>

        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom space-y-4">
          <h3 className="font-display text-lg font-semibold">Mon cycle</h3>
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
            className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-3 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.02] disabled:opacity-60">
            {update.isPending ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>

        <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
          <button onClick={signOut} className="flex items-center gap-2 text-sm font-medium text-rose-vif hover:text-rose-vif/80">
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
