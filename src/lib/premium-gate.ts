import { useState } from "react";

export interface UserSubscription {
  plan: "free" | "premium_monthly" | "premium_yearly";
  trialEnd?: string;
  status: "active" | "trial" | "expired";
}

const DEMO_SUBSCRIPTION: UserSubscription = {
  plan: "free",
  status: "active",
};

export function getUserSubscription(): UserSubscription {
  const stored = localStorage.getItem("cyclebloom_subscription");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  return DEMO_SUBSCRIPTION;
}

export function setUserSubscription(sub: UserSubscription): void {
  localStorage.setItem("cyclebloom_subscription", JSON.stringify(sub));
}

export function isPremium(): boolean {
  const sub = getUserSubscription();
  return sub.plan !== "free" && (sub.status === "active" || sub.status === "trial");
}

export const PREMIUM_FEATURES = {
  bloomAiUnlimited: { name: "Bloom AI illimité", freeLimit: 3 },
  ovulationPrediction: { name: "Prédictions d'ovulation" },
  fertilityMode: { name: "Mode fertilité avancé" },
  pregnancyMode: { name: "Mode grossesse" },
  reports: { name: "Rapports & graphiques détaillés" },
  basalTemp: { name: "Suivi température basale" },
  teleconsultation: { name: "Téléconsultation" },
  exportPdf: { name: "Export PDF" },
  partnerSync: { name: "Synchronisation partenaire" },
  unlimitedSymptoms: { name: "Symptômes illimités", freeLimit: 3 },
  unlimitedReminders: { name: "Rappels illimités", freeLimit: 1 },
  allArticles: { name: "Tous les articles", freeLimit: 3 },
  communityPost: { name: "Poster dans la communauté" },
  noAds: { name: "Sans publicité" },
} as const;

export type PremiumFeature = keyof typeof PREMIUM_FEATURES;

export function canUseFeature(feature: PremiumFeature): boolean {
  return isPremium();
}

export function getMonthlyUsage(feature: "bloomAi" | "articles"): number {
  const key = `cyclebloom_usage_${feature}_${new Date().getMonth()}`;
  return parseInt(localStorage.getItem(key) || "0", 10);
}

export function incrementUsage(feature: "bloomAi" | "articles"): void {
  const key = `cyclebloom_usage_${feature}_${new Date().getMonth()}`;
  const current = getMonthlyUsage(feature);
  localStorage.setItem(key, String(current + 1));
}
