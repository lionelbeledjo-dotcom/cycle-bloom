import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — CycleBloom AI" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="bg-bloom flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/70 glass p-8 shadow-bloom sm:p-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
            <Flower2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-bold leading-none">CycleBloom</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-violet-doux">AI</div>
          </div>
        </Link>

        <h1 className="mt-8 font-display text-3xl font-bold">Bon retour ✨</h1>
        <p className="mt-1 text-sm text-muted-foreground">Connectez-vous pour suivre votre cycle.</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
        >
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-foreground/70">Email</label>
            <input
              type="email"
              required
              placeholder="vous@exemple.com"
              className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-foreground/70">Mot de passe</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom transition hover:scale-[1.01]"
          >
            Se connecter
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
          <Link to="/" className="font-semibold text-rose-vif story-link">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
