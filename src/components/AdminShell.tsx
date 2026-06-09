import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2, LayoutDashboard, Users, FileText, CreditCard, Settings, LogOut, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Utilisatrices", icon: Users },
  { to: "/admin/content", label: "Contenu", icon: FileText },
  { to: "/admin/subscriptions", label: "Abonnements", icon: CreditCard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
] as const;

export function AdminShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-[oklch(0.16_0.02_260)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/5 bg-[oklch(0.13_0.02_260)] lg:flex">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-white/5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
            <Flower2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-none">CycleBloom</div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/40">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-vif to-violet-doux flex items-center justify-center text-xs font-bold text-white">L</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">Lionel</div>
              <div className="text-[10px] text-white/40 truncate">Super Admin</div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 mt-2 rounded-lg px-3 py-2 text-xs text-white/40 hover:text-white/70">
            <LogOut className="h-3.5 w-3.5" /> Retour au site
          </Link>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-white/5 bg-[oklch(0.16_0.02_260)]/80 px-6 backdrop-blur">
          {title && <h1 className="text-lg font-semibold text-white">{title}</h1>}
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
