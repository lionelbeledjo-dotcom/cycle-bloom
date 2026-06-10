import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { useState } from "react";
import { Check, X, Clock, Eye, Mail, CalendarPlus, Search, Download, Building2, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/demos")({
  head: () => ({ meta: [{ title: "Demandes Démo — Admin CycleBloom" }] }),
  component: AdminDemos,
});

type DemoStatus = "pending" | "approved" | "rejected" | "expired";

interface DemoRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  profession: string;
  organization: string;
  city: string;
  country: string;
  patientsCount: string;
  reason: string;
  status: DemoStatus;
  requestDate: string;
  trialStart?: string;
  trialEnd?: string;
  emailSent: boolean;
}

const DEMO_REQUESTS: DemoRequest[] = [
  {
    id: 1,
    name: "Dr. Claire Martin",
    email: "dr.martin@chu-lyon.fr",
    phone: "+33 4 72 11 23 45",
    profession: "Gynécologue",
    organization: "CHU Lyon",
    city: "Lyon",
    country: "France",
    patientsCount: "200+",
    reason: "Recommander l'app à mes patientes pour le suivi de cycle post-traitement SOPK. Besoin de tester la précision des prédictions et la qualité du contenu médical.",
    status: "pending",
    requestDate: "2026-06-04",
    emailSent: false,
  },
  {
    id: 2,
    name: "Sage-femme Aminata Koné",
    email: "aminata.k@cabinet-naissance.fr",
    phone: "+33 4 56 78 90 12",
    profession: "Sage-femme",
    organization: "Cabinet Naissance Douce",
    city: "Bordeaux",
    country: "France",
    patientsCount: "50-100",
    reason: "Intégrer l'app dans le suivi de grossesse de mes patientes. Le mode grossesse et les rappels intelligents m'intéressent.",
    status: "pending",
    requestDate: "2026-06-03",
    emailSent: false,
  },
  {
    id: 3,
    name: "Dr. Sarah Benali",
    email: "s.benali@clinique-femmes.fr",
    phone: "+33 4 91 34 56 78",
    profession: "Endocrinologue",
    organization: "Clinique des Femmes Marseille",
    city: "Marseille",
    country: "France",
    patientsCount: "100-200",
    reason: "Évaluer l'IA Bloom pour compléter mes consultations. Mes patientes SOPK ont besoin d'un suivi entre les rendez-vous.",
    status: "pending",
    requestDate: "2026-06-02",
    emailSent: false,
  },
  {
    id: 4,
    name: "Dr. Fatou Diallo",
    email: "fatou.d@maternite-paris.fr",
    phone: "+33 1 42 56 78 90",
    profession: "Gynécologue-Obstétricienne",
    organization: "Maternité Sainte-Marie Paris",
    city: "Paris",
    country: "France",
    patientsCount: "200+",
    reason: "Recommander un outil fiable à mes patientes pour le suivi post-partum et retour de couches.",
    status: "approved",
    requestDate: "2026-05-20",
    trialStart: "2026-05-21",
    trialEnd: "2026-07-21",
    emailSent: true,
  },
  {
    id: 5,
    name: "Marie Dupont",
    email: "m.dupont@planning-familial.org",
    phone: "+33 4 67 89 01 23",
    profession: "Conseillère planning familial",
    organization: "Planning Familial Montpellier",
    city: "Montpellier",
    country: "France",
    patientsCount: "50-100",
    reason: "Tester l'app pour éventuellement la recommander aux jeunes femmes qui consultent sur la contraception et le suivi de cycle naturel.",
    status: "approved",
    requestDate: "2026-05-15",
    trialStart: "2026-05-16",
    trialEnd: "2026-07-16",
    emailSent: true,
  },
  {
    id: 6,
    name: "Dr. Léna Moreau",
    email: "lena.m@hopital-nantes.fr",
    phone: "+33 2 40 12 34 56",
    profession: "Gynécologue",
    organization: "CHU Nantes",
    city: "Nantes",
    country: "France",
    patientsCount: "200+",
    reason: "Évaluation de l'outil pour intégration dans notre protocole de suivi d'endométriose.",
    status: "approved",
    requestDate: "2026-05-10",
    trialStart: "2026-05-11",
    trialEnd: "2026-07-11",
    emailSent: true,
  },
  {
    id: 7,
    name: "Isabelle Fournier",
    email: "i.fournier@clinique-toulouse.fr",
    phone: "+33 5 61 23 45 67",
    profession: "Infirmière spécialisée",
    organization: "Clinique Fertilité Toulouse",
    city: "Toulouse",
    country: "France",
    patientsCount: "50-100",
    reason: "Besoin d'un outil complet pour accompagner les patientes en PMA entre les rendez-vous.",
    status: "approved",
    requestDate: "2026-05-05",
    trialStart: "2026-05-06",
    trialEnd: "2026-07-06",
    emailSent: true,
  },
  {
    id: 8,
    name: "Dr. Philippe Laurent",
    email: "p.laurent@cabinet-nice.fr",
    phone: "+33 4 93 12 34 56",
    profession: "Médecin généraliste",
    organization: "Cabinet Médical Saint-Roch",
    city: "Nice",
    country: "France",
    patientsCount: "100-200",
    reason: "Besoin d'un outil à recommander quand mes patientes me posent des questions sur leur cycle.",
    status: "rejected",
    requestDate: "2026-04-28",
    emailSent: true,
  },
];

function AdminDemos() {
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<DemoRequest | null>(null);
  const [approveModal, setApproveModal] = useState<DemoRequest | null>(null);

  const filtered = DEMO_REQUESTS.filter(d => {
    const matchTab = tab === "all" || d.status === tab;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.organization.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const pending = DEMO_REQUESTS.filter(d => d.status === "pending").length;
  const approved = DEMO_REQUESTS.filter(d => d.status === "approved").length;

  return (
    <AdminShell title="Demandes Démo Pro">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">En attente</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{pending}</div>
          <div className="text-[10px] text-white/30">Action requise</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">Approuvées (actives)</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{approved}</div>
          <div className="text-[10px] text-white/30">Essai 2 mois en cours</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">Total demandes</div>
          <div className="text-2xl font-bold text-white mt-1">{DEMO_REQUESTS.length}</div>
          <div className="text-[10px] text-white/30">Depuis le lancement</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <div className="text-xs text-white/40">Taux conversion pro</div>
          <div className="text-2xl font-bold text-violet-300 mt-1">68%</div>
          <div className="text-[10px] text-white/30">Démo → recommandation</div>
        </div>
      </div>

      {/* Alert pending */}
      {pending > 0 && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 mb-6 flex items-center gap-3">
          <Clock className="h-5 w-5 text-amber-400 shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-medium text-amber-300">{pending} demande{pending > 1 ? "s" : ""} en attente de validation</div>
            <div className="text-xs text-white/40">Les professionnels attendent votre approbation pour commencer leur essai de 2 mois.</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou organisation..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-rose-vif/50"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: "all" as const, label: "Toutes" },
            { id: "pending" as const, label: "En attente" },
            { id: "approved" as const, label: "Approuvées" },
            { id: "rejected" as const, label: "Refusées" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
                tab === t.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Professionnel</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Organisation</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Profession</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Ville</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Patients</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Statut</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Période essai</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{d.name}</div>
                  <div className="text-[11px] text-white/40">{d.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-white/70 text-xs">
                    <Building2 className="h-3 w-3 text-white/30" />
                    {d.organization}
                  </div>
                </td>
                <td className="px-4 py-3 text-white/60 text-xs">{d.profession}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-white/60 text-xs">
                    <MapPin className="h-3 w-3 text-white/30" />
                    {d.city}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-white/60 text-xs">
                    <Users className="h-3 w-3 text-white/30" />
                    {d.patientsCount}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <DemoStatusBadge status={d.status} />
                </td>
                <td className="px-4 py-3 text-xs">
                  {d.trialStart && d.trialEnd ? (
                    <div>
                      <div className="text-white/60">{new Date(d.trialStart).toLocaleDateString("fr-FR")} →</div>
                      <div className="text-emerald-400/80">{new Date(d.trialEnd).toLocaleDateString("fr-FR")}</div>
                    </div>
                  ) : d.status === "pending" ? (
                    <span className="text-amber-400/60">En attente</span>
                  ) : (
                    <span className="text-white/20">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedDemo(d)} className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-white" title="Voir détails">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    {d.status === "pending" && (
                      <>
                        <button onClick={() => setApproveModal(d)} className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-emerald-400" title="Approuver">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-red-400" title="Refuser">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                    {d.status === "approved" && (
                      <button className="rounded-lg p-1.5 text-white/30 hover:bg-white/10 hover:text-amber-400" title="Prolonger">
                        <CalendarPlus className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selectedDemo && <DemoDetailModal demo={selectedDemo} onClose={() => setSelectedDemo(null)} onApprove={() => { setSelectedDemo(null); setApproveModal(selectedDemo); }} />}
      {approveModal && <ApproveModal demo={approveModal} onClose={() => setApproveModal(null)} />}
    </AdminShell>
  );
}

function DemoStatusBadge({ status }: { status: DemoStatus }) {
  const config = {
    pending: { label: "En attente", class: "bg-amber-500/20 text-amber-300" },
    approved: { label: "Approuvée", class: "bg-emerald-500/20 text-emerald-300" },
    rejected: { label: "Refusée", class: "bg-red-500/20 text-red-300" },
    expired: { label: "Expirée", class: "bg-white/10 text-white/40" },
  };
  const c = config[status];
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${c.class}`}>{c.label}</span>;
}

function DemoDetailModal({ demo, onClose, onApprove }: { demo: DemoRequest; onClose: () => void; onApprove: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-[oklch(0.18_0.02_260)] border border-white/10 p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">{demo.name}</h3>
            <p className="text-xs text-white/40">{demo.profession} — {demo.organization}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-white/30 hover:bg-white/10"><X className="h-4 w-4" /></button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <InfoBlock label="Email" value={demo.email} />
          <InfoBlock label="Téléphone" value={demo.phone} />
          <InfoBlock label="Ville" value={`${demo.city}, ${demo.country}`} />
          <InfoBlock label="Patients/mois" value={demo.patientsCount} />
          <InfoBlock label="Date demande" value={new Date(demo.requestDate).toLocaleDateString("fr-FR")} />
          <InfoBlock label="Statut" value={demo.status === "pending" ? "⏳ En attente" : demo.status === "approved" ? "✓ Approuvée" : "✗ Refusée"} />
        </div>

        <div className="rounded-xl bg-white/5 p-4 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Raison de la demande</div>
          <p className="text-sm text-white/80 leading-relaxed">{demo.reason}</p>
        </div>

        {demo.trialStart && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 mb-6">
            <div className="text-xs text-emerald-300 font-medium mb-1">Période d'essai active</div>
            <div className="text-sm text-white">
              {new Date(demo.trialStart).toLocaleDateString("fr-FR")} → {new Date(demo.trialEnd!).toLocaleDateString("fr-FR")}
              <span className="text-white/40 ml-2">(2 mois)</span>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-white/5 p-4 mb-6">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Emails envoyés</div>
          <div className="space-y-1.5 text-xs">
            {demo.emailSent ? (
              <>
                <div className="flex justify-between"><span className="text-white/60">Accusé de réception</span><span className="text-emerald-400">✓</span></div>
                {demo.status === "approved" && <div className="flex justify-between"><span className="text-white/60">Confirmation approbation + accès</span><span className="text-emerald-400">✓</span></div>}
                {demo.status === "rejected" && <div className="flex justify-between"><span className="text-white/60">Email de refus</span><span className="text-emerald-400">✓</span></div>}
              </>
            ) : (
              <div className="text-amber-400">⏳ Aucun email envoyé (en attente de validation)</div>
            )}
          </div>
        </div>

        {demo.status === "pending" && (
          <div className="flex gap-3">
            <button onClick={onApprove} className="flex-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/30">
              ✓ Approuver (2 mois d'essai)
            </button>
            <button className="flex-1 rounded-xl bg-red-500/10 border border-red-500/20 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20">
              ✗ Refuser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ApproveModal({ demo, onClose }: { demo: DemoRequest; onClose: () => void }) {
  const [duration, setDuration] = useState("60");
  const [done, setDone] = useState(false);

  const handleApprove = () => setDone(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-[oklch(0.18_0.02_260)] border border-white/10 p-6" onClick={e => e.stopPropagation()}>
        {!done ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Approuver la demande</h3>
                <p className="text-xs text-white/40">{demo.name} — {demo.organization}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1.5">Durée de l'essai professionnel</label>
                <select
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-rose-vif/50"
                >
                  <option value="30">1 mois</option>
                  <option value="60">2 mois (standard)</option>
                  <option value="90">3 mois (VIP)</option>
                </select>
              </div>

              <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 space-y-1.5">
                <div className="text-xs text-blue-300 font-medium">📧 Emails automatiques envoyés :</div>
                <div className="text-[11px] text-white/50">• Email d'approbation avec identifiants d'accès</div>
                <div className="text-[11px] text-white/50">• Guide de démarrage professionnel</div>
                <div className="text-[11px] text-white/50">• Rappel J-7 avant expiration</div>
                <div className="text-[11px] text-white/50">• Email de fin d'essai avec offre spéciale pro</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-white/60 hover:bg-white/5">
                Annuler
              </button>
              <button onClick={handleApprove} className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">
                Approuver — {duration} jours
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Demande approuvée !</h3>
            <p className="mt-2 text-sm text-white/60">
              {demo.name} va recevoir un email avec ses accès Premium Pro ({duration} jours).
            </p>
            <div className="mt-4 rounded-xl bg-white/5 p-3 text-left">
              <div className="space-y-1 text-xs text-white/60">
                <div>✓ Compte créé avec accès Premium complet</div>
                <div>✓ Email d'approbation envoyé</div>
                <div>✓ Rappels programmés (J-7, fin d'essai)</div>
              </div>
            </div>
            <button onClick={onClose} className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm text-white hover:bg-white/15">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <div className="text-[10px] text-white/40 uppercase">{label}</div>
      <div className="mt-1 text-sm text-white">{value}</div>
    </div>
  );
}
