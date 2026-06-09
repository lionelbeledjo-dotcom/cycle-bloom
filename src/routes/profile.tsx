import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — CycleBloom AI" }] }),
  component: Profile,
});

function Profile() {
  return (
    <AppShell title="Mon profil">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/70 glass p-8 text-center shadow-bloom lg:col-span-1">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-vif to-violet-doux text-3xl font-bold text-white shadow-bloom">
            C
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold">Camille Martin</h2>
          <p className="text-xs text-muted-foreground">camille@exemple.com</p>
          <button className="mt-6 w-full rounded-full bg-gradient-to-r from-rose-vif to-violet-doux py-2.5 text-sm font-semibold text-white shadow-bloom">
            Changer la photo
          </button>
        </div>

        <div className="rounded-3xl border border-white/70 glass p-8 shadow-bloom lg:col-span-2">
          <h3 className="font-display text-xl font-semibold">Informations personnelles</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Prénom", value: "Camille" },
              { label: "Nom", value: "Martin" },
              { label: "Date de naissance", value: "12 / 03 / 1995" },
              { label: "Pays", value: "France" },
              { label: "Langue", value: "Français" },
              { label: "Fuseau horaire", value: "Europe / Paris" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{f.label}</label>
                <input
                  defaultValue={f.value}
                  className="mt-1 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
              </div>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom">
            Enregistrer
          </button>
        </div>
      </div>
    </AppShell>
  );
}
