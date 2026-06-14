import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, MessageCircle, Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contactez-nous — CycleBloom AI" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous répondrons sous 24h.");
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-vif to-violet-doux shadow-bloom">
              <Flower2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">CycleBloom</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">← Retour</Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
            <MessageCircle className="h-8 w-8 text-rose-vif" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">Contactez-nous</h1>
          <p className="mt-3 text-lg text-gray-500">Notre équipe est à votre écoute</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-sm text-gray-500">Réponse rapide</p>
                </div>
              </div>
              <a href="https://wa.me/33660061723" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">+33 6 60 06 17 23</a>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
                  <Mail className="h-5 w-5 text-rose-vif" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">Support détaillé</p>
                </div>
              </div>
              <a href="mailto:lbcloudadmin@gmail.com" className="text-rose-vif font-medium hover:underline">lbcloudadmin@gmail.com</a>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Clock className="h-5 w-5 text-violet-doux" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Horaires</h3>
                  <p className="text-sm text-gray-500">Disponibilité</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Lun - Ven : 9h - 18h (CET)<br/>Réponse sous 24h maximum</p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Siège</h3>
                  <p className="text-sm text-gray-500">LB Group</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Paris, France</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50/50 to-white p-8 space-y-5">
              <h2 className="font-display text-xl font-bold text-gray-900">Envoyez-nous un message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-widest text-gray-500">Nom</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-widest text-gray-500">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20" placeholder="votre@email.com" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-medium uppercase tracking-widest text-gray-500">Sujet</label>
                <select required value={subject} onChange={e => setSubject(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20">
                  <option value="">Choisir un sujet</option>
                  <option value="support">Support technique</option>
                  <option value="account">Mon compte</option>
                  <option value="subscription">Abonnement Premium</option>
                  <option value="feedback">Suggestion / Feedback</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-medium uppercase tracking-widest text-gray-500">Message</label>
                <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20 resize-none" placeholder="Décrivez votre demande..." />
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-rose-vif to-violet-doux py-3.5 text-sm font-semibold text-white shadow-bloom hover:shadow-lg transition">
                <Send className="h-4 w-4" /> Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
