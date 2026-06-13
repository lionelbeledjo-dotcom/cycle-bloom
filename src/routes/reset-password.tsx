import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flower2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PasswordField } from "@/components/PasswordField";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Nouveau mot de passe — CycleBloom AI" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const recovery = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    supabase.auth.getSession().then(({ data }) => setReady(recovery || Boolean(data.session)));
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) return toast.error("Le mot de passe doit contenir au moins 8 caractères.");
    if (password !== confirmation) return toast.error("Les deux mots de passe ne correspondent pas.");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error("Impossible de modifier le mot de passe", { description: error.message });
    toast.success("Mot de passe modifié. Vous pouvez vous connecter.");
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="bg-bloom flex min-h-screen items-center justify-center px-4 py-10">
      <section className="glass w-full max-w-md rounded-3xl border border-white/70 p-6 shadow-bloom sm:p-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold"><Flower2 className="h-5 w-5 text-rose-vif" /> CycleBloom AI</Link>
        <h1 className="mt-6 font-display text-3xl font-bold">Nouveau mot de passe</h1>
        {!ready ? (
          <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            Ce lien de récupération est invalide ou expiré. <Link to="/auth" className="font-semibold text-rose-vif">Demander un nouveau lien</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <PasswordField label="Nouveau mot de passe" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <PasswordField label="Confirmer le mot de passe" required minLength={8} autoComplete="new-password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom disabled:opacity-60">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer
            </button>
          </form>
        )}
      </section>
    </main>
  );
}