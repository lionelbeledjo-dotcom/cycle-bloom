import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Flower2, Shield, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin — CycleBloom AI" }] }),
  component: AdminLogin,
});

function AdminLogin() {
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

    if (email !== "lbcloudadmin@gmail.com" || password !== "CycleBloom@Admin2026!") {
      setError("Identifiants incorrects.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/admin" });
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1629] px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-lg">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white leading-none">CycleBloom</div>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-rose-vif">
                <Shield className="h-2.5 w-2.5" /> Administration
              </div>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold text-white">Connexion Admin</h1>
          <p className="mt-1 text-xs text-white/50">Accès réservé aux administrateurs de la plateforme.</p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Email administrateur</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@cyclebloom.ai"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Mot de passe</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
            >
              {loading ? "Vérification..." : "Accéder au panneau"}
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-white/30">
            Accès sécurisé · Toute tentative non autorisée est enregistrée
          </p>
        </div>
      </div>
    </div>
  );
}
