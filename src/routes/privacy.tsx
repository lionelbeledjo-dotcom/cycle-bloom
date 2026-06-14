import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Shield, Lock, Eye, Database, UserCheck, Globe, Mail } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Politique de confidentialité — CycleBloom AI" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
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

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-vif/10 to-violet-doux/10">
            <Shield className="h-8 w-8 text-rose-vif" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900">Politique de confidentialité</h1>
          <p className="mt-3 text-gray-500">Dernière mise à jour : Juin 2026</p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Protection de vos données</h2>
            </div>
            <p>CycleBloom AI accorde la plus haute importance à la protection de vos données personnelles et de santé. Nous utilisons un chiffrement de bout en bout et des protocoles de sécurité conformes aux normes les plus strictes du secteur médical.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Données collectées</h2>
            </div>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Informations de profil (nom, email, date de naissance)</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Données de cycle menstruel et symptômes</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Données de fertilité et grossesse (si applicable)</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Données de géolocalisation (uniquement pour la recherche de médecins, avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Utilisation des données</h2>
            </div>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="mt-3 space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Personnaliser vos prédictions de cycle et recommandations</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Améliorer la précision de notre IA</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Vous fournir un suivi médical personnalisé</li>
            </ul>
            <p className="mt-4 font-semibold text-gray-900">Nous ne vendons jamais vos données à des tiers.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Vos droits</h2>
            </div>
            <p>Conformément au RGPD et aux lois applicables, vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Droit d'accès à vos données personnelles</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Droit de rectification et de suppression</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Droit à la portabilité de vos données</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Droit d'opposition au traitement</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-vif shrink-0"></span>Droit de retirer votre consentement à tout moment</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Stockage et sécurité</h2>
            </div>
            <p>Vos données sont hébergées sur des serveurs sécurisés (Supabase) avec chiffrement AES-256. Nous effectuons des audits de sécurité réguliers et suivons les meilleures pratiques de l'industrie.</p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-violet-doux" />
              <h2 className="font-display text-xl font-bold text-gray-900">Contact</h2>
            </div>
            <p>Pour toute question relative à vos données personnelles, contactez notre délégué à la protection des données :</p>
            <p className="mt-2">Email : <a href="mailto:lbcloudadmin@gmail.com" className="text-rose-vif hover:underline">lbcloudadmin@gmail.com</a></p>
          </section>
        </div>
      </main>
    </div>
  );
}
