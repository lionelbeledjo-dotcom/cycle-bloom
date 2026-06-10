export const STRIPE_CONFIG = {
  publishableKey: "pk_live_VOTRE_CLE_STRIPE_ICI",
  products: {
    premium_monthly: {
      priceId: "price_premium_monthly",
      name: "CycleBloom Premium Mensuel",
      amount: 999,
      currency: "eur",
      interval: "month" as const,
      trialDays: 7,
    },
    premium_yearly: {
      priceId: "price_premium_yearly",
      name: "CycleBloom Premium Annuel",
      amount: 7999,
      currency: "eur",
      interval: "year" as const,
      trialDays: 14,
    },
  },
  successUrl: "/subscription?status=success",
  cancelUrl: "/subscription?status=cancelled",
};

export function formatPrice(amountCents: number): string {
  return `${(amountCents / 100).toFixed(2).replace(".", ",")} €`;
}

export async function createCheckoutSession(planId: "premium_monthly" | "premium_yearly"): Promise<string> {
  const plan = STRIPE_CONFIG.products[planId];
  // En production, cet appel va au backend qui crée une Stripe Checkout Session
  // Pour la démo, on simule le processus
  console.log(`[Stripe] Creating checkout for: ${plan.name} — ${formatPrice(plan.amount)}/${plan.interval}`);
  return `/subscription?checkout=${planId}`;
}

export async function createPortalSession(): Promise<string> {
  // En production: appel au backend → Stripe Customer Portal
  console.log("[Stripe] Opening customer portal");
  return "/subscription?portal=true";
}
