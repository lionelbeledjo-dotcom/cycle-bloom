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
}

const STORAGE_KEY = "cyclebloom_user";

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

export function getUserName(): string {
  const profile = getUserProfile();
  return profile?.firstName || "Camille";
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
