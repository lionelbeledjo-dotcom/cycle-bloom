export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  trigger: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Bienvenue",
    subject: "Bienvenue sur CycleBloom AI ! 🌸",
    body: `Bonjour {{name}},

Bienvenue sur CycleBloom AI ! Nous sommes ravies de vous accompagner dans votre parcours santé.

Votre compte a été créé avec succès. Voici ce que vous pouvez faire dès maintenant :
• Enregistrer vos premières données de cycle
• Découvrir Bloom AI, votre assistante santé
• Explorer la communauté CycleBloom

Si vous avez la moindre question, notre équipe est là pour vous.

À bientôt,
L'équipe CycleBloom AI`,
    trigger: "Inscription confirmée",
  },
  {
    id: "email_verification",
    name: "Vérification email",
    subject: "Confirmez votre adresse email — CycleBloom AI",
    body: `Bonjour {{name}},

Merci de vous être inscrite sur CycleBloom AI.

Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :

{{verification_link}}

Ce lien expire dans 24 heures.

Si vous n'avez pas créé de compte, ignorez simplement cet email.

L'équipe CycleBloom AI`,
    trigger: "Création de compte",
  },
  {
    id: "trial_start",
    name: "Début essai gratuit",
    subject: "Votre essai Premium commence ! 👑",
    body: `Bonjour {{name}},

Votre essai gratuit Premium est maintenant actif !

Durée : {{trial_days}} jours (jusqu'au {{trial_end_date}})

Voici ce que vous pouvez explorer :
✨ Bloom AI illimité — posez toutes vos questions santé
📊 Rapports détaillés et graphiques de votre cycle
🔮 Prédictions d'ovulation et mode fertilité
🩺 Téléconsultation gynéco incluse
👥 Communauté : partagez et échangez

Profitez-en au maximum ! Aucun paiement ne sera prélevé pendant cette période.

L'équipe CycleBloom AI`,
    trigger: "Démarrage essai gratuit",
  },
  {
    id: "trial_reminder",
    name: "Rappel fin essai (J-2)",
    subject: "Votre essai Premium expire dans 2 jours ⏰",
    body: `Bonjour {{name}},

Votre essai gratuit Premium se termine dans 2 jours (le {{trial_end_date}}).

Pendant votre essai, vous avez :
• Posé {{ai_questions_count}} questions à Bloom AI
• Suivi votre cycle pendant {{days_tracked}} jours
• Consulté {{articles_read}} articles

Pour continuer à profiter de toutes les fonctionnalités Premium sans interruption, choisissez votre plan :

→ Premium Mensuel : 9,99 €/mois
→ Premium Annuel : 79,99 €/an (-33%)

{{upgrade_link}}

Si vous ne souhaitez pas continuer, votre compte passera automatiquement en version Essentiel (gratuite).

L'équipe CycleBloom AI`,
    trigger: "2 jours avant fin essai",
  },
  {
    id: "trial_extended",
    name: "Essai prolongé",
    subject: "Bonne nouvelle : votre essai Premium est prolongé ! 🎉",
    body: `Bonjour {{name}},

Nous avons le plaisir de vous informer que votre essai Premium a été prolongé de {{extension_days}} jours supplémentaires.

Nouvelle date de fin : {{new_trial_end_date}}

Continuez à profiter de toutes les fonctionnalités Premium :
• Bloom AI illimité
• Prédictions d'ovulation
• Rapports détaillés
• Téléconsultation

Bonne continuation !
L'équipe CycleBloom AI`,
    trigger: "Admin prolonge l'essai",
  },
  {
    id: "payment_confirmed",
    name: "Paiement confirmé",
    subject: "Paiement confirmé — Bienvenue dans le Premium ! ✅",
    body: `Bonjour {{name}},

Votre paiement a été confirmé avec succès.

Détails :
• Plan : {{plan_name}}
• Montant : {{amount}}
• Prochain prélèvement : {{next_billing_date}}
• Méthode : {{payment_method}}

Votre accès Premium est maintenant actif. Profitez de toutes les fonctionnalités sans limites.

L'équipe CycleBloom AI`,
    trigger: "Paiement Stripe réussi",
  },
  {
    id: "payment_failed",
    name: "Échec de paiement",
    subject: "Problème avec votre paiement — Action requise",
    body: `Bonjour {{name}},

Nous n'avons pas pu traiter votre paiement pour votre abonnement CycleBloom Premium.

Montant : {{amount}}
Raison : {{failure_reason}}

Pour ne pas perdre votre accès Premium, veuillez mettre à jour vos informations de paiement :
{{update_payment_link}}

Nous réessaierons automatiquement dans 3 jours. Après 3 tentatives échouées, votre compte passera en version Essentiel.

L'équipe CycleBloom AI`,
    trigger: "Échec Stripe",
  },
  {
    id: "cancellation",
    name: "Résiliation confirmée",
    subject: "Résiliation confirmée — Vous nous manquerez 💜",
    body: `Bonjour {{name}},

Votre résiliation a bien été prise en compte.

Votre accès Premium reste actif jusqu'au {{access_end_date}}. Après cette date, votre compte passera en version Essentiel (gratuite).

Vos données sont conservées et vous pourrez réactiver Premium à tout moment.

Si vous avez résilié par erreur ou souhaitez revenir, c'est toujours possible :
{{reactivate_link}}

Nous espérons vous revoir bientôt.
L'équipe CycleBloom AI`,
    trigger: "Résiliation abonnement",
  },
  {
    id: "winback",
    name: "Win-back (J+7)",
    subject: "Nous avons une offre spéciale pour vous 🌸",
    body: `Bonjour {{name}},

Vous nous manquez ! Depuis votre départ, nous avons ajouté :
• Bloom AI encore plus précise
• Nouvelles fonctionnalités de suivi
• Plus de médecins disponibles

Pour vous souhaiter un bon retour, nous vous offrons 30% de réduction sur votre premier mois Premium :

Code promo : RETOUR30
→ {{special_offer_link}}

Cette offre expire dans 7 jours.

L'équipe CycleBloom AI`,
    trigger: "7 jours après résiliation",
  },
  {
    id: "demo_receipt",
    name: "Accusé demande démo",
    subject: "Demande reçue — Évaluation CycleBloom Pro",
    body: `Bonjour {{name}},

Nous avons bien reçu votre demande d'accès professionnel à CycleBloom AI.

Récapitulatif :
• Profession : {{profession}}
• Organisation : {{organization}}
• Ville : {{city}}

Notre équipe examine votre demande et vous répondra sous 48h ouvrées. Une fois approuvée, vous recevrez vos identifiants d'accès Premium complet pour une durée de 2 mois.

En attendant, n'hésitez pas à consulter notre documentation professionnelle.

L'équipe CycleBloom AI`,
    trigger: "Soumission formulaire démo",
  },
  {
    id: "demo_approved",
    name: "Démo approuvée",
    subject: "Votre accès professionnel CycleBloom est prêt ! ✅",
    body: `Bonjour {{name}},

Votre demande d'accès professionnel a été approuvée !

Vos accès :
• Durée : {{trial_duration}} jours
• Début : {{trial_start_date}}
• Fin : {{trial_end_date}}
• Plan : Premium complet (toutes fonctionnalités)

Connectez-vous avec votre email ({{email}}) pour commencer à explorer l'application.

Guide de démarrage rapide :
1. Créez votre profil professionnel
2. Testez Bloom AI avec des questions de vos patientes
3. Explorez le mode grossesse et le suivi de cycle
4. Évaluez le système de rendez-vous

À la fin de votre période d'évaluation, nous vous proposerons un partenariat professionnel adapté à votre structure.

L'équipe CycleBloom AI`,
    trigger: "Admin approuve la demande",
  },
];

export function sendEmail(templateId: string, recipient: { name: string; email: string }, variables: Record<string, string>): boolean {
  const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
  if (!template) return false;

  let subject = template.subject;
  let body = template.body;

  Object.entries({ ...variables, name: recipient.name, email: recipient.email }).forEach(([key, value]) => {
    subject = subject.replace(new RegExp(`{{${key}}}`, "g"), value);
    body = body.replace(new RegExp(`{{${key}}}`, "g"), value);
  });

  console.log(`[CycleBloom Email] To: ${recipient.email}`);
  console.log(`[CycleBloom Email] Subject: ${subject}`);
  console.log(`[CycleBloom Email] Body preview: ${body.slice(0, 100)}...`);

  return true;
}

export function onUserRegistered(user: { name: string; email: string }): void {
  sendEmail("email_verification", user, {
    verification_link: `https://cycle-bloom-ia.lovable.app/verify?email=${encodeURIComponent(user.email)}`,
  });
}

export function onEmailVerified(user: { name: string; email: string }): void {
  sendEmail("welcome", user, {});
}

export function onTrialStarted(user: { name: string; email: string }, trialDays: number, trialEndDate: string): void {
  sendEmail("trial_start", user, {
    trial_days: String(trialDays),
    trial_end_date: trialEndDate,
  });
}

export function onTrialExtended(user: { name: string; email: string }, extensionDays: number, newEndDate: string): void {
  sendEmail("trial_extended", user, {
    extension_days: String(extensionDays),
    new_trial_end_date: newEndDate,
  });
}

export function onPaymentSuccess(user: { name: string; email: string }, planName: string, amount: string, nextBilling: string, method: string): void {
  sendEmail("payment_confirmed", user, {
    plan_name: planName,
    amount,
    next_billing_date: nextBilling,
    payment_method: method,
  });
}

export function onDemoRequested(user: { name: string; email: string }, profession: string, organization: string, city: string): void {
  sendEmail("demo_receipt", user, { profession, organization, city });
}

export function onDemoApproved(user: { name: string; email: string }, durationDays: number, startDate: string, endDate: string): void {
  sendEmail("demo_approved", user, {
    trial_duration: String(durationDays),
    trial_start_date: startDate,
    trial_end_date: endDate,
  });
}
