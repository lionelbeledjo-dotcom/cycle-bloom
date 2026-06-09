import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { FileText, Eye, Heart, Plus, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  head: () => ({ meta: [{ title: "Contenu — Admin CycleBloom" }] }),
  component: AdminContent,
});

const ARTICLES = [
  { id: 1, title: "5 signes que vous êtes en pleine ovulation", cat: "Fertilité", author: "Dr. Léa Bernard", status: "published", views: 4520, likes: 312, date: "2025-05-28" },
  { id: 2, title: "Comprendre le SOPK et ses cycles irréguliers", cat: "SOPK", author: "Dr. Anaïs Roy", status: "published", views: 3890, likes: 278, date: "2025-05-25" },
  { id: 3, title: "Nutrition : que manger en phase lutéale ?", cat: "Nutrition", author: "Marie Dubois", status: "published", views: 2950, likes: 198, date: "2025-05-20" },
  { id: 4, title: "Endométriose : reconnaître les premiers signes", cat: "Endométriose", author: "Dr. Camille T.", status: "published", views: 5100, likes: 402, date: "2025-05-15" },
  { id: 5, title: "Le yoga pendant les règles : 6 postures", cat: "Bien-être", author: "Sophie M.", status: "published", views: 2200, likes: 156, date: "2025-05-10" },
  { id: 6, title: "Préparer son corps à la grossesse", cat: "Grossesse", author: "Sage-femme Léna", status: "published", views: 3400, likes: 245, date: "2025-05-05" },
  { id: 7, title: "Périménopause : les premiers signes à surveiller", cat: "Hormones", author: "Dr. Anaïs Roy", status: "draft", views: 0, likes: 0, date: "2025-06-08" },
  { id: 8, title: "Booster sa libido naturellement", cat: "Bien-être", author: "Marie Dubois", status: "draft", views: 0, likes: 0, date: "2025-06-07" },
];

function AdminContent() {
  const published = ARTICLES.filter(a => a.status === "published").length;
  const drafts = ARTICLES.filter(a => a.status === "draft").length;
  const totalViews = ARTICLES.reduce((s, a) => s + a.views, 0);

  return (
    <AdminShell title="Gestion du contenu">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">{published} publiés</span>
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">{drafts} brouillons</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">{totalViews.toLocaleString()} vues totales</span>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-vif to-violet-doux px-4 py-2.5 text-sm font-semibold text-white shadow-bloom">
          <Plus className="h-4 w-4" /> Nouvel article
        </button>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Article</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Catégorie</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Auteur</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Statut</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Vues</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Likes</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {ARTICLES.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="font-medium text-white max-w-[280px] truncate">{a.title}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium text-violet-300">{a.cat}</span>
                </td>
                <td className="px-4 py-3 text-white/60">{a.author}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    a.status === "published" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {a.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">
                  <div className="flex items-center gap-1"><Eye className="h-3 w-3" /> {a.views.toLocaleString()}</div>
                </td>
                <td className="px-4 py-3 text-white/60">
                  <div className="flex items-center gap-1"><Heart className="h-3 w-3" /> {a.likes}</div>
                </td>
                <td className="px-4 py-3 text-white/40">{new Date(a.date).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-white"><Edit className="h-3.5 w-3.5" /></button>
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
