import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { useState } from "react";
import { Search, Eye, Ban, Trash2, Mail, Crown, Clock, CalendarPlus, X, Check, Download } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Utilisatrices — Admin CycleBloom" }] }),
  component: AdminUsers,
});

interface User {
  id: number;
  name: string;
  email: string;
  plan: "premium_monthly" | "premium_yearly" | "trial" | "free" | "cancelled";
  joined: string;
  lastActive: string;
  cycleDay: number;
  city: string;
  emailVerified: boolean;
  welcomeEmail: boolean;
  trialEnd?: string;
}

const USERS: User[] = [
  { id: 1, name: "Sophie Martin", email: "sophie.m@gmail.com", plan: "premium_yearly", joined: "2026-01-15", lastActive: "Aujourd'hui", cycleDay: 14, city: "Paris", emailVerified: true, welcomeEmail: true },
  { id: 2, name: "Julie Dubois", email: "julie.dbs@outlook.fr", plan: "free", joined: "2026-03-22", lastActive: "Aujourd'hui", cycleDay: 7, city: "Lyon", emailVerified: true, welcomeEmail: true },
  { id: 3, name: "Léa Bernard", email: "lea.b@gmail.com", plan: "premium_monthly", joined: "2026-02-08", lastActive: "Hier", cycleDay: 21, city: "Marseille", emailVerified: true, welcomeEmail: true },
  { id: 4, name: "Amina Diallo", email: "amina.d@yahoo.fr", plan: "trial", joined: "2026-06-03", lastActive: "Aujourd'hui", cycleDay: 3, city: "Toulouse", emailVerified: true, welcomeEmail: true, trialEnd: "2026-06-17" },
  { id: 5, name: "Camille Petit", email: "camille.p@gmail.com", plan: "premium_yearly", joined: "2025-11-20", lastActive: "Il y a 2j", cycleDay: 18, city: "Bordeaux", emailVerified: true, welcomeEmail: true },
  { id: 6, name: "Fatou Ndiaye", email: "fatou.n@hotmail.com", plan: "trial", joined: "2026-05-29", lastActive: "Aujourd'hui", cycleDay: 10, city: "Nice", emailVerified: true, welcomeEmail: true, trialEnd: "2026-06-05" },
  { id: 7, name: "Marie Nguyen", email: "marie.ng@gmail.com", plan: "cancelled", joined: "2025-09-15", lastActive: "Il y a 5j", cycleDay: 25, city: "Nantes", emailVerified: true, welcomeEmail: true },
  { id: 8, name: "Clara Fontaine", email: "clara.f@icloud.com", plan: "premium_monthly", joined: "2026-01-30", lastActive: "Aujourd'hui", cycleDay: 1, city: "Lille", emailVerified: true, welcomeEmail: true },
  { id: 9, name: "Awa Traoré", email: "awa.t@gmail.com", plan: "trial", joined: "2026-06-04", lastActive: "Hier", cycleDay: 12, city: "Montpellier", emailVerified: true, welcomeEmail: true, trialEnd: "2026-06-11" },
  { id: 10, name: "Inès Moreau", email: "ines.m@outlook.fr", plan: "premium_yearly", joined: "2026-02-14", lastActive: "Aujourd'hui", cycleDay: 6, city: "Strasbourg", emailVerified: true, welcomeEmail: true },
  { id: 11, name: "Nadia Koné", email: "nadia.k@gmail.com", plan: "trial", joined: "2026-06-01", lastActive: "Aujourd'hui", cycleDay: 19, city: "Lyon", emailVerified: true, welcomeEmail: true, trialEnd: "2026-06-08" },
  { id: 12, name: "Rachida Benali", email: "rachida.b@gmail.com", plan: "free", joined: "2026-05-20", lastActive: "Il y a 3j", cycleDay: 8, city: "Paris", emailVerified: true, welcomeEmail: true },
  { id: 13, name: "Pauline Lefèvre", email: "pauline.l@icloud.com", plan: "premium_monthly", joined: "2026-04-12", lastActive: "Aujourd'hui", cycleDay: 23, city: "Bordeaux", emailVerified: true, welcomeEmail: true },
  { id: 14, name: "Charlotte Girard", email: "charlotte.g@gmail.com", plan: "free", joined: "2026-06-05", lastActive: "Aujourd'hui", cycleDay: 1, city: "Toulouse", emailVerified: false, welcomeEmail: true },
  { id: 15, name: "Émilie Roux", email: "emilie.r@outlook.fr", plan: "free", joined: "2026-05-15", lastActive: "Il y a 4j", cycleDay: 16, city: "Nantes", emailVerified: true, welcomeEmail: true },
];

function AdminUsers() {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = USERS.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "all" || u.plan === filterPlan || (filterPlan === "premium" && (u.plan === "premium_monthly" || u.plan === "premium_yearly"));
    return matchSearch && matchPlan;
  });

  const premiumCount = USERS.filter(u => u.plan === "premium_monthly" || u.plan === "premium_yearly").length;
  const trialCount = USERS.filter(u => u.plan === "trial").length;
  const freeCount = USERS.filter(u => u.plan === "free").length;

  return (
    <AdminShell title="Utilisatrices">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif/50"
          />
        </div>
        <select
          value={filterPlan}
          onChange={e => setFilterPlan(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none"
        >
          <option value="all">Tous les plans</option>
          <option value="premium">Premium</option>
          <option value="trial">Essai gratuit</option>
          <option value="free">Gratuit</option>
          <option value="cancelled">Résiliées</option>
        </select>
        <div className="flex gap-2">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"><Crown className="h-3 w-3 inline mr-1" />{premiumCount} premium</span>
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300"><Clock className="h-3 w-3 inline mr-1" />{trialCount} essais</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">{freeCount} gratuites</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/30">{USERS.length} total</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Utilisatrice</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Forfait</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Ville</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Jour cycle</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Email vérifié</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Dernière activité</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Inscrite</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-[10px] font-bold text-white">
                      {u.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium text-white">{u.name}</div>
                      <div className="text-[11px] text-white/40">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <PlanBadge plan={u.plan} />
                  {u.trialEnd && (
                    <div className="text-[9px] text-amber-400/70 mt-0.5">expire {new Date(u.trialEnd).toLocaleDateString("fr-FR")}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-white/60">{u.city}</td>
                <td className="px-4 py-3">
                  <span className="text-rose-vif font-medium">J{u.cycleDay}</span>
                </td>
                <td className="px-4 py-3">
                  {u.emailVerified ? (
                    <span className="text-emerald-400 text-xs">✓ Vérifié</span>
                  ) : (
                    <span className="text-amber-400 text-xs">⏳ En attente</span>
                  )}
                </td>
                <td className="px-4 py-3 text-white/60 text-xs">{u.lastActive}</td>
                <td className="px-4 py-3 text-white/40 text-xs">{new Date(u.joined).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedUser(u)} className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-white" title="Voir détails"><Eye className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-blue-400" title="Envoyer email"><Mail className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-amber-400" title="Suspendre"><Ban className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-white/30">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs text-white/50 hover:bg-white/5">
          <Download className="h-3.5 w-3.5" /> Exporter CSV
        </button>
      </div>

      {selectedUser && <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </AdminShell>
  );
}

function PlanBadge({ plan }: { plan: User["plan"] }) {
  const config = {
    premium_monthly: { label: "Premium Mensuel", class: "bg-violet-500/20 text-violet-300" },
    premium_yearly: { label: "Premium Annuel", class: "bg-emerald-500/20 text-emerald-300" },
    trial: { label: "Essai gratuit", class: "bg-amber-500/20 text-amber-300" },
    free: { label: "Gratuit", class: "bg-white/10 text-white/50" },
    cancelled: { label: "Résiliée", class: "bg-red-500/20 text-red-300" },
  };
  const c = config[plan];
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${c.class}`}>{c.label}</span>;
}

function UserDetailModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-[oklch(0.18_0.02_260)] border border-white/10 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-sm font-bold text-white">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-xs text-white/40">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-white/30 hover:bg-white/10"><X className="h-4 w-4" /></button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] text-white/40 uppercase">Plan</div>
            <div className="mt-1"><PlanBadge plan={user.plan} /></div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] text-white/40 uppercase">Jour du cycle</div>
            <div className="mt-1 text-lg font-bold text-rose-vif">J{user.cycleDay}</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] text-white/40 uppercase">Ville</div>
            <div className="mt-1 text-sm text-white">{user.city}</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] text-white/40 uppercase">Inscrite le</div>
            <div className="mt-1 text-sm text-white">{new Date(user.joined).toLocaleDateString("fr-FR")}</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] text-white/40 uppercase">Email vérifié</div>
            <div className="mt-1 text-sm">{user.emailVerified ? <span className="text-emerald-400">✓ Oui</span> : <span className="text-amber-400">⏳ Non</span>}</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-[10px] text-white/40 uppercase">Dernière activité</div>
            <div className="mt-1 text-sm text-white">{user.lastActive}</div>
          </div>
        </div>

        {user.trialEnd && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-4">
            <div className="text-xs text-amber-300">⏰ Essai gratuit expire le {new Date(user.trialEnd).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</div>
          </div>
        )}

        <div className="rounded-xl bg-white/5 p-4 mb-6">
          <h4 className="text-xs font-semibold text-white/60 mb-3">Emails envoyés</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-white/60">Email de bienvenue</span><span className="text-emerald-400">✓ Envoyé</span></div>
            <div className="flex justify-between"><span className="text-white/60">Confirmation inscription</span><span className="text-emerald-400">✓ Envoyé</span></div>
            {user.plan === "trial" && <div className="flex justify-between"><span className="text-white/60">Confirmation essai gratuit</span><span className="text-emerald-400">✓ Envoyé</span></div>}
            {(user.plan === "premium_monthly" || user.plan === "premium_yearly") && <div className="flex justify-between"><span className="text-white/60">Confirmation paiement</span><span className="text-emerald-400">✓ Envoyé</span></div>}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs text-white/60 hover:bg-white/5">
            <Mail className="h-3.5 w-3.5" /> Envoyer email
          </button>
          {user.plan === "trial" && (
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/30 py-2.5 text-xs text-amber-300 hover:bg-amber-500/30">
              <CalendarPlus className="h-3.5 w-3.5" /> Prolonger essai
            </button>
          )}
          <button className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 py-2.5 px-4 text-xs text-red-400 hover:bg-red-500/10">
            <Ban className="h-3.5 w-3.5" /> Suspendre
          </button>
        </div>
      </div>
    </div>
  );
}
