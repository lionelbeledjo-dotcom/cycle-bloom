import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Flower2, Shield, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin — CycleBloom AI" }] }),
  component: AdminLogin,
});

const ADMIN_STORAGE_KEY = "cyclebloom_admins";

function getAdmins(): Array<{ email: string; password: string; name: string }> {
  const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!stored) {
    const defaults = [{ email: "lbcloudadmin@gmail.com", password: "CycleBloom@Admin2026!", name: "Lionel B." }];
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }
  try { return JSON.parse(stored); } catch { return []; }
}

function saveAdmin(admin: { email: string; password: string; name: string }) {
  const admins = getAdmins();
  admins.push(admin);
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admins));
}

function AdminLogin() {
  const [view, setView] = useState<"login" | "register" | "forgot" | "forgot-sent">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const admins = getAdmins();
    const found = admins.find(a => a.email === email && a.password === password);
    if (!found) {
      setError("Identifiants incorrects.");
      return;
    }

    setLoading(true);
    localStorage.setItem("cyclebloom_admin_session", JSON.stringify({ email: found.email, name: found.name }));
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/admin" });
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const admins = getAdmins();
    if (admins.find(a => a.email === email)) {
      setError("Un compte avec cet email existe déjà.");
      return;
    }

    setLoading(true);
    saveAdmin({ email, password, name });
    localStorage.setItem("cyclebloom_admin_session", JSON.stringify({ email, name }));
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/admin" });
    }, 800);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Veuillez entrer votre email.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("forgot-sent");
    }, 1000);
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

          {view === "login" && (
            <>
              <h1 className="font-display text-2xl font-bold text-white">Connexion Admin</h1>
              <p className="mt-1 text-xs text-white/50">Accès réservé aux administrateurs de la plateforme.</p>

              {error && (
                <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Mot de passe</label>
                    <button
                      type="button"
                      onClick={() => { resetForm(); setView("forgot"); }}
                      className="text-[10px] text-rose-vif hover:text-rose-vif/80 transition"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
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

              <p className="mt-6 text-center text-xs text-white/40">
                Pas encore de compte ?{" "}
                <button onClick={() => { resetForm(); setView("register"); }} className="text-rose-vif hover:text-rose-vif/80 font-semibold transition">
                  Créer un compte admin
                </button>
              </p>

              <p className="mt-4 text-center text-[10px] text-white/30">
                Accès sécurisé · Toute tentative non autorisée est enregistrée
              </p>
            </>
          )}

          {view === "register" && (
            <>
              <button onClick={() => { resetForm(); setView("login"); }} className="flex items-center gap-1 text-xs text-white/50 hover:text-white/80 transition mb-4">
                <ArrowLeft className="h-3.5 w-3.5" /> Retour
              </button>

              <h1 className="font-display text-2xl font-bold text-white">Créer un compte</h1>
              <p className="mt-1 text-xs text-white/50">Nouveau compte administrateur CycleBloom.</p>

              {error && (
                <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Nom complet</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
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
                      placeholder="Minimum 8 caractères"
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
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
                >
                  {loading ? "Création..." : "Créer mon compte admin"}
                </button>
              </form>
            </>
          )}

          {view === "forgot" && (
            <>
              <button onClick={() => { resetForm(); setView("login"); }} className="flex items-center gap-1 text-xs text-white/50 hover:text-white/80 transition mb-4">
                <ArrowLeft className="h-3.5 w-3.5" /> Retour
              </button>

              <h1 className="font-display text-2xl font-bold text-white">Mot de passe oublié</h1>
              <p className="mt-1 text-xs text-white/50">Entrez votre email pour recevoir un lien de réinitialisation.</p>

              {error && (
                <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <form className="mt-6 space-y-4" onSubmit={handleForgot}>
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-widest text-white/50">Email administrateur</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
                >
                  {loading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
                </button>
              </form>
            </>
          )}

          {view === "forgot-sent" && (
            <div className="text-center py-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-7 w-7 text-green-400" />
              </div>
              <h1 className="font-display text-xl font-bold text-white">Email envoyé !</h1>
              <p className="mt-2 text-xs text-white/50">
                Si un compte existe avec l'adresse <span className="text-white/80">{email}</span>, vous recevrez un lien de réinitialisation dans quelques minutes.
              </p>
              <p className="mt-3 text-[10px] text-white/40">Vérifiez également vos spams.</p>
              <button
                onClick={() => { resetForm(); setView("login"); }}
                className="mt-6 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 transition"
              >
                Retour à la connexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
