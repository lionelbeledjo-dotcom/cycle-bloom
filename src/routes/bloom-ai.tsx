import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/bloom-ai")({
  head: () => ({ meta: [{ title: "Bloom AI — CycleBloom AI" }] }),
  component: BloomAI,
});

const messages = [
  { from: "ai" as const, text: "Bonjour Camille 💜 Je suis Bloom, votre conseillère IA. Comment puis-je vous aider aujourd'hui ?" },
  { from: "me" as const, text: "Pourquoi je me sens fatiguée juste avant mes règles ?" },
  {
    from: "ai" as const,
    text: "C'est très courant ! En phase lutéale tardive, la chute de la progestérone et des œstrogènes affecte la sérotonine — ce qui peut provoquer fatigue et baisse d'énergie. Misez sur le fer, le magnésium et un sommeil de qualité ✨",
  },
];

function BloomAI() {
  return (
    <AppShell title="Bloom AI">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex h-[70vh] flex-col rounded-3xl border border-white/70 glass shadow-bloom">
          <div className="flex items-center gap-3 border-b border-border/60 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux text-white shadow-bloom">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold leading-none">Bloom</div>
              <div className="text-[10px] uppercase tracking-widest text-violet-doux">En ligne · IA conseillère</div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-3xl px-5 py-3 text-sm leading-relaxed ${
                    m.from === "me"
                      ? "rounded-br-md bg-gradient-to-br from-rose-vif to-violet-doux text-white shadow-bloom"
                      : "rounded-bl-md bg-white/90 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            className="flex gap-2 border-t border-border/60 p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              placeholder="Posez votre question à Bloom…"
              className="flex-1 rounded-full border border-border bg-white/80 px-5 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
            />
            <button className="rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-5 py-3 text-sm font-semibold text-white shadow-bloom">
              Envoyer
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/70 glass p-6 shadow-bloom">
            <h3 className="font-display text-lg font-semibold">Suggestions</h3>
            <div className="mt-4 space-y-2">
              {[
                "Mes cycles sont-ils réguliers ?",
                "Comment soulager mes crampes ?",
                "Quels aliments en phase lutéale ?",
                "Comment booster ma fertilité ?",
              ].map((s) => (
                <button
                  key={s}
                  className="w-full rounded-2xl bg-white/70 px-4 py-3 text-left text-xs font-medium transition hover:bg-white hover:text-rose-vif"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-rose-vif to-violet-doux p-6 text-white shadow-bloom">
            <div className="text-[10px] uppercase tracking-widest">Premium</div>
            <h3 className="mt-2 font-display text-xl font-bold">Bloom AI illimitée</h3>
            <p className="mt-2 text-sm text-white/85">Conseils personnalisés, analyses approfondies et historique sauvegardé.</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
