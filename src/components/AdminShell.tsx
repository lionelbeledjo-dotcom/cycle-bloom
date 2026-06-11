import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2, LayoutDashboard, Users, FileText, CreditCard, Settings, LogOut, BarChart3, FlaskConical } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Utilisatrices", icon: Users },
  { to: "/admin/subscriptions", label: "Abonnements", icon: CreditCard },
  { to: "/admin/demos", label: "Demandes Démo", icon: FlaskConical },
  { to: "/admin/content", label: "Contenu", icon: FileText },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
] as const;

export function AdminShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/80 bg-white lg:flex shadow-sm">
        <div className="flex h-16 items-center gap-2.5 px-6 border-b border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-lg shadow-rose-vif/20">
            <Flower2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 leading-none">CycleBloom</div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-rose-vif font-semibold">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-md shadow-rose-vif/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-xs font-bold text-white shadow-md shadow-rose-vif/20">L</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-800 truncate">Lionel</div>
              <div className="text-[10px] text-slate-400 truncate">Super Admin</div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 mt-2 rounded-lg px-3 py-2 text-xs text-slate-400 hover:text-rose-vif hover:bg-rose-50 transition">
            <LogOut className="h-3.5 w-3.5" /> Retour au site
          </Link>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200/80 bg-white/80 px-8 backdrop-blur-xl">
          {title && <h1 className="text-xl font-bold text-slate-800">{title}</h1>}
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
