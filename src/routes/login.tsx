import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Flower2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — CycleBloom AI" }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/dashboard" });
    }, 1000);
  };

  return (
    <div className="bg-bloom flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/70 glass p-8 shadow-bloom sm:p-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">CycleBloom</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-violet-doux">AI</div>
            </div>
          </Link>

          <h1 className="mt-8 font-display text-3xl font-bold">Bon retour</h1>
          <p className="mt-1 text-sm text-muted-foreground">Connectez-vous pour accéder à votre espace personnel.</p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Mot de passe</label>
                <a href="#" className="text-[10px] text-rose-vif hover:underline">Mot de passe oublié ?</a>
              </div>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 pr-12 text-sm outline-none transition focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.01] disabled:opacity-70"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> ou continuer avec <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["Google", "Apple", "Facebook"].map((p) => (
              <button
                key={p}
                className="rounded-2xl border border-border bg-white/80 py-2.5 text-xs font-semibold transition hover:border-rose-vif hover:text-rose-vif"
              >
                {p}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-semibold text-rose-vif hover:underline">
              Créer un compte gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
