import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { Search, MoreHorizontal, Eye, Ban, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Utilisatrices — Admin CycleBloom" }] }),
  component: AdminUsers,
});

const USERS = [
  { id: 1, name: "Sophie Martin", email: "sophie.m@gmail.com", plan: "premium", joined: "2025-01-15", lastActive: "Aujourd'hui", cycleDay: 14, city: "Paris" },
  { id: 2, name: "Julie Dubois", email: "julie.dbs@outlook.fr", plan: "free", joined: "2025-03-22", lastActive: "Aujourd'hui", cycleDay: 7, city: "Lyon" },
  { id: 3, name: "Léa Bernard", email: "lea.b@gmail.com", plan: "premium", joined: "2025-02-08", lastActive: "Hier", cycleDay: 21, city: "Marseille" },
  { id: 4, name: "Amina Diallo", email: "amina.d@yahoo.fr", plan: "free", joined: "2025-04-10", lastActive: "Aujourd'hui", cycleDay: 3, city: "Toulouse" },
  { id: 5, name: "Camille Petit", email: "camille.p@gmail.com", plan: "premium", joined: "2024-11-20", lastActive: "Il y a 2j", cycleDay: 18, city: "Bordeaux" },
  { id: 6, name: "Fatou Ndiaye", email: "fatou.n@hotmail.com", plan: "free", joined: "2025-05-01", lastActive: "Aujourd'hui", cycleDay: 10, city: "Dakar" },
  { id: 7, name: "Marie Nguyen", email: "marie.ng@gmail.com", plan: "cancelled", joined: "2024-09-15", lastActive: "Il y a 5j", cycleDay: 25, city: "Nantes" },
  { id: 8, name: "Clara Fontaine", email: "clara.f@icloud.com", plan: "premium", joined: "2025-01-30", lastActive: "Aujourd'hui", cycleDay: 1, city: "Lille" },
  { id: 9, name: "Awa Traoré", email: "awa.t@gmail.com", plan: "free", joined: "2025-06-01", lastActive: "Hier", cycleDay: 12, city: "Abidjan" },
  { id: 10, name: "Inès Moreau", email: "ines.m@outlook.fr", plan: "premium", joined: "2025-02-14", lastActive: "Aujourd'hui", cycleDay: 6, city: "Strasbourg" },
];

function AdminUsers() {
  const premiumCount = USERS.filter(u => u.plan === "premium").length;
  const freeCount = USERS.filter(u => u.plan === "free").length;

  return (
    <AdminShell title="Utilisatrices">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input placeholder="Rechercher par nom ou email..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif/50" />
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">{premiumCount} premium</span>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">{freeCount} gratuites</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">{USERS.length} total</span>
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
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Dernière activité</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Inscrite</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
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
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    u.plan === "premium" ? "bg-violet-500/20 text-violet-300" :
                    u.plan === "cancelled" ? "bg-red-500/20 text-red-300" :
                    "bg-white/10 text-white/50"
                  }`}>
                    {u.plan === "premium" ? "Premium" : u.plan === "cancelled" ? "Résiliée" : "Gratuit"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">{u.city}</td>
                <td className="px-4 py-3">
                  <span className="text-rose-vif font-medium">J{u.cycleDay}</span>
                </td>
                <td className="px-4 py-3 text-white/60">{u.lastActive}</td>
                <td className="px-4 py-3 text-white/40">{new Date(u.joined).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-white"><Eye className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-amber-400"><Ban className="h-3.5 w-3.5" /></button>
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
