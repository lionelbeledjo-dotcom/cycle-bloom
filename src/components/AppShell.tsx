import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2, Circle, Calendar, BookOpen, Sparkles, User, LogOut, Activity, LineChart, Users, Bell, Baby, Stethoscope, Crown } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Mon Cycle", icon: Circle },
  { to: "/calendar", label: "Calendrier", icon: Calendar },
  { to: "/symptoms", label: "Symptômes", icon: Activity },
  { to: "/insights", label: "Rapports", icon: LineChart },
  { to: "/articles", label: "Magazine", icon: BookOpen },
  { to: "/bloom-ai", label: "Bloom AI", icon: Sparkles },
  { to: "/community", label: "Communauté", icon: Users },
  { to: "/doctors", label: "Médecins", icon: Stethoscope },
  { to: "/reminders", label: "Rappels", icon: Bell },
  { to: "/pregnancy", label: "Grossesse", icon: Baby },
  { to: "/subscription", label: "Premium", icon: Crown },
  { to: "/profile", label: "Profil", icon: User },
] as const;

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="bg-bloom min-h-screen">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/60 bg-white/60 backdrop-blur-xl lg:flex">
        <div className="flex h-20 items-center gap-2 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
            <Flower2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display text-xl font-bold leading-none">CycleBloom</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-violet-doux">AI</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white shadow-bloom"
                    : "text-foreground/70 hover:bg-white hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Déconnexion
          </Link>
        </div>
      </aside>

      {/* Bottom nav mobile */}
      <nav className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-around rounded-3xl border border-white/60 bg-white/80 px-3 py-2 shadow-bloom backdrop-blur-xl lg:hidden">
        {[nav[0], nav[1], nav[5], nav[7], nav[11]].map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          const mobileLabel = item.to === "/dashboard" ? "Cycle" : item.label.split(" ")[0];
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[10px] font-medium transition ${
                active ? "text-rose-vif" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {mobileLabel}
            </Link>
          );
        })}
      </nav>

      <main className="pb-28 lg:pb-8 lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-12">
          {title && (
            <h1 className="mb-8 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
