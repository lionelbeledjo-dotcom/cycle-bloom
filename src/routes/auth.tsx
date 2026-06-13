import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flower2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { PasswordField } from "@/components/PasswordField";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Connexion — CycleBloom AI" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [inlineError, setInlineError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError("");
    if (!email || !password) return setInlineError("Saisissez votre adresse email et votre mot de passe.");
    if (mode === "signup" && password.length < 8) return toast.error("Mot de passe : 8 caractères minimum");

    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/dashboard",
            data: { first_name: firstName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Compte créé", { description: "Consultez votre email pour confirmer votre inscription avant de vous connecter." });
          setMode("signin");
          setPassword("");
          return;
        }
        toast.success("Compte créé ! Bienvenue.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
        if (error) throw error;
        if (!data.session) throw new Error("La session n’a pas pu être créée. Réessayez.");
        toast.success("Bon retour !");
      }
      navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      const message = getAuthErrorMessage(err);
      setInlineError(message);
      toast.error("Connexion impossible", { description: message });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setInlineError("");
    if (!email) return setInlineError("Saisissez l’adresse email associée à votre compte.");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      const message = getAuthErrorMessage(error);
      setInlineError(message);
      return;
    }
    toast.success("Email envoyé", { description: "Si un compte existe, vous recevrez un lien de réinitialisation." });
    setForgotMode(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (result.error) {
      toast.error("Connexion Google impossible");
      setLoading(false);
      return;
    }
    if (result.redirected) return; // browser navigates
    navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="bg-bloom flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/70 glass p-6 sm:p-8 shadow-bloom">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">CycleBloom</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-violet-doux">AI</div>
            </div>
          </Link>

          <h1 className="mt-6 font-display text-2xl sm:text-3xl font-bold">
            {forgotMode ? "Mot de passe oublié" : mode === "signin" ? "Bon retour" : "Créer un compte"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {forgotMode ? "Recevez un lien sécurisé pour choisir un nouveau mot de passe." : mode === "signin"
              ? "Connectez-vous à votre espace CycleBloom."
              : "Commencez à suivre votre cycle en quelques secondes."}
          </p>

          {inlineError && <div role="alert" className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{inlineError}</div>}

          <form className="mt-6 space-y-4" onSubmit={forgotMode ? handlePasswordReset : handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Marie"
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
              </div>
            )}
            <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
              />
            </div>
            {!forgotMode && <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Mot de passe</label>
              <PasswordField label="" required autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "signup" ? "Min. 8 caractères" : "••••••••"} />
              {mode === "signin" && <button type="button" onClick={() => { setForgotMode(true); setInlineError(""); }} className="mt-2 text-xs font-semibold text-rose-vif hover:underline">Mot de passe oublié ?</button>}
            </div>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.01] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {forgotMode ? "Envoyer le lien" : mode === "signin" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          {forgotMode && <button type="button" onClick={() => { setForgotMode(false); setInlineError(""); }} className="mt-4 w-full text-center text-xs font-semibold text-rose-vif hover:underline">Retour à la connexion</button>}

          {!forgotMode && <><div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white py-3 text-sm font-semibold hover:border-rose-vif transition disabled:opacity-60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.32z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuer avec Google
          </button></>

          {!forgotMode && <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "signin" ? "Pas encore de compte ?" : "Déjà inscrite ?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-semibold text-rose-vif hover:underline"
            >
              {mode === "signin" ? "Créer un compte" : "Se connecter"}
            </button>
          </p>}
        </div>
      </div>
    </div>
  );
}

function getAuthErrorMessage(error: unknown) {
  const raw = error instanceof Error ? error.message.toLowerCase() : "";
  if (raw.includes("invalid login credentials")) return "Email ou mot de passe incorrect. Vérifiez vos informations ou réinitialisez votre mot de passe.";
  if (raw.includes("email not confirmed")) return "Votre adresse email n’est pas encore confirmée. Ouvrez l’email d’activation reçu lors de l’inscription.";
  if (raw.includes("too many requests") || raw.includes("rate limit")) return "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
  if (raw.includes("user already registered")) return "Un compte existe déjà avec cette adresse. Connectez-vous ou réinitialisez votre mot de passe.";
  if (raw.includes("password")) return "Le mot de passe est invalide ou ne respecte pas les règles de sécurité.";
  return error instanceof Error ? error.message : "Une erreur inattendue empêche la connexion. Réessayez.";
}
