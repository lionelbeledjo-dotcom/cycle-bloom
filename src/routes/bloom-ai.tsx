import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, BookOpen, Lightbulb, Shield, Crown, Lock } from "lucide-react";
import { getBloomResponse, SUGGESTED_TOPICS, type BloomResponse } from "@/lib/bloom-knowledge";
import { isPremium, getMonthlyUsage, incrementUsage, PREMIUM_FEATURES } from "@/lib/premium-gate";

export const Route = createFileRoute("/bloom-ai")({
  head: () => ({ meta: [{ title: "Bloom AI — CycleBloom AI" }] }),
  component: BloomAI,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  followUp?: string[];
  timestamp: Date;
}

function BloomAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis Bloom, votre assistante de santé féminine. Je suis formée sur les dernières recherches médicales en gynécologie, fertilité, contraception et bien-être hormonal. Posez-moi n'importe quelle question — mes réponses sont sourcées et basées sur des publications scientifiques validées. Comment puis-je vous aider aujourd'hui ?",
      followUp: ["J'ai un retard de règles", "Mes crampes sont très douloureuses", "Je veux comprendre mon cycle", "Comment optimiser ma fertilité ?"],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const freeLimit = PREMIUM_FEATURES.bloomAiUnlimited.freeLimit!;
  const [usageCount, setUsageCount] = useState(getMonthlyUsage("bloomAi"));
  const userIsPremium = isPremium();
  const canAsk = userIsPremium || usageCount < freeLimit;

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    if (!canAsk) return;

    if (!userIsPremium) {
      incrementUsage("bloomAi");
      setUsageCount(prev => prev + 1);
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response: BloomResponse = getBloomResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        followUp: response.followUp,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AppShell title="Bloom AI">
      <div className="flex h-[calc(100vh-180px)] flex-col lg:flex-row gap-6">
        {/* Chat area */}
        <div className="flex flex-1 flex-col rounded-3xl border border-white/70 glass shadow-bloom overflow-hidden">
          {/* Header */}
          <div className="border-b border-border/30 bg-gradient-to-r from-rose-vif to-violet-doux p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold">Bloom AI</h3>
                <p className="text-[10px] text-white/80">Assistante santé féminine · Réponses basées sur la recherche médicale</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] backdrop-blur">
                <Shield className="h-3 w-3" /> Confidentiel
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${msg.role === "user" ? "order-2" : ""}`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-rose-vif to-violet-doux text-white rounded-br-md"
                      : "bg-white/80 border border-border/50 text-foreground rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex items-start gap-1.5 px-2">
                      <BookOpen className="h-3 w-3 text-violet-doux mt-0.5 shrink-0" />
                      <div className="text-[10px] text-muted-foreground">
                        {msg.sources.map((s, i) => (
                          <span key={i}>{s}{i < msg.sources!.length - 1 ? " · " : ""}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.followUp && msg.followUp.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 px-1">
                      {msg.followUp.map(q => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="rounded-full bg-rose-pastel/50 border border-rose-vif/20 px-3 py-1 text-[11px] text-rose-vif hover:bg-rose-pastel transition"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-white/80 border border-border/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-vif/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-rose-vif/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-rose-vif/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {canAsk ? (
            <form onSubmit={handleSubmit} className="border-t border-border/30 bg-white/50 p-4">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question santé..."
                  className="flex-1 rounded-full border border-border bg-white px-5 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="h-11 w-11 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux flex items-center justify-center text-white shadow-bloom hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground">
                  Bloom AI ne remplace pas un avis médical. En cas d'urgence, contactez le 15 (SAMU) ou le 112.
                </p>
                {!userIsPremium && (
                  <span className="text-[10px] text-foreground/50 font-medium">
                    {usageCount}/{freeLimit} questions ce mois
                  </span>
                )}
              </div>
            </form>
          ) : (
            <div className="border-t border-border/30 bg-gradient-to-r from-rose-pastel/50 to-lavande/50 p-5">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-vif/10 px-4 py-2 mb-3">
                  <Lock className="h-4 w-4 text-rose-vif" />
                  <span className="text-sm font-semibold text-rose-vif">Limite atteinte</span>
                </div>
                <p className="text-xs text-foreground/70 mb-3">
                  Vous avez utilisé vos {freeLimit} questions gratuites ce mois-ci.
                  Passez à Premium pour un accès illimité à Bloom AI.
                </p>
                <Link
                  to="/subscription"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-vif to-violet-doux px-6 py-2.5 text-sm font-semibold text-white shadow-bloom hover:scale-[1.02] transition"
                >
                  <Crown className="h-4 w-4" /> Passer à Premium
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - suggested topics */}
        <aside className="hidden lg:block w-72 space-y-4">
          <div className="rounded-3xl border border-white/70 glass p-5 shadow-bloom">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-4 w-4 text-violet-doux" />
              <h3 className="font-display font-semibold text-sm">Sujets populaires</h3>
            </div>
            <div className="space-y-2">
              {SUGGESTED_TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => sendMessage(topic)}
                  className="w-full text-left rounded-xl bg-white/60 p-3 text-xs text-foreground/80 hover:bg-white hover:text-rose-vif transition"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-rose-pastel to-lavande p-5 border border-rose-vif/10">
            <h4 className="font-display font-bold text-sm text-rose-vif">Sources médicales</h4>
            <p className="mt-2 text-[11px] text-foreground/70 leading-relaxed">
              Bloom AI est basée sur les publications de l'OMS, ACOG, NICE, Cochrane Reviews, et les sociétés savantes de gynécologie francophone.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
