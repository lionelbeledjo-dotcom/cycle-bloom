export interface UserProfile {
  firstName: string;
  email: string;
  birthYear: string;
  goal: string;
  cycleLength: number;
  periodLength: number;
  lastPeriod: string;
  irregular: boolean;
  conditions: string[];
  contraception: string;
  registeredAt: string;
  city?: string;
  country?: string;
  language?: string;
  timezone?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  firstPeriodAge?: string;
  pregnancies?: string;
  deliveries?: string;
  ivgMiscarriage?: string;
  surgery?: string;
  lastPap?: string;
  allergies?: string;
  medications?: string;
  activity?: string;
  stress?: string;
  sleep?: string;
  diet?: string;
  goals?: string[];
}

const STORAGE_KEY = "cyclebloom_user";
const STATS_KEY = "cyclebloom_stats";

export interface UserStats {
  cyclesTracked: number;
  daysTracked: number;
  symptomsLogged: number;
  bloomQuestions: number;
  memberSince: string;
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function updateUserProfile(updates: Partial<UserProfile>): void {
  const current = getUserProfile();
  if (current) {
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
  }
}

export function getUserProfile(): UserProfile | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

export function getUserName(): string {
  const profile = getUserProfile();
  return profile?.firstName || "Utilisatrice";
}

export function getUserStats(): UserStats {
  const stored = localStorage.getItem(STATS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  const profile = getUserProfile();
  const registeredAt = profile?.registeredAt;
  const memberSince = registeredAt
    ? new Date(registeredAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })
    : "Aujourd'hui";
  const daysSinceRegistration = registeredAt
    ? Math.floor((Date.now() - new Date(registeredAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  return {
    cyclesTracked: Math.max(0, Math.floor(daysSinceRegistration / 28)),
    daysTracked: daysSinceRegistration,
    symptomsLogged: 0,
    bloomQuestions: 0,
    memberSince,
  };
}

export function getCycleData() {
  const profile = getUserProfile();
  const cycleLength = profile?.cycleLength || 28;
  const periodLength = profile?.periodLength || 5;
  const lastPeriod = profile?.lastPeriod ? new Date(profile.lastPeriod) : null;

  return { cycleLength, periodLength, lastPeriod };
}

export function getCycleDay(): number {
  const { lastPeriod, cycleLength } = getCycleData();
  if (!lastPeriod) return 14;
  const today = new Date();
  const diff = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  return ((diff % cycleLength) + cycleLength) % cycleLength + 1;
}

export function getOvulationDay(): number {
  const { cycleLength } = getCycleData();
  return cycleLength - 14;
}

export function getNextPeriodDate(): Date {
  const { lastPeriod, cycleLength } = getCycleData();
  if (!lastPeriod) {
    const d = new Date();
    d.setDate(d.getDate() + 9);
    return d;
  }
  const today = new Date();
  const diff = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  const currentCycleDay = diff % cycleLength;
  const daysUntilNext = cycleLength - currentCycleDay;
  const next = new Date();
  next.setDate(next.getDate() + daysUntilNext);
  return next;
}
