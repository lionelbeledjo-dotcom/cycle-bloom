import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  first_name: string | null;
  birth_year: number | null;
  goal: string | null;
  cycle_length: number;
  period_length: number;
  last_period_date: string | null;
}

export interface PeriodLog {
  id: string;
  date: string;
  flow: "spotting" | "light" | "medium" | "heavy";
}

export interface SymptomLog {
  id: string;
  date: string;
  moods: string[];
  physical: string[];
  discharge: string | null;
  temperature: number | null;
  sleep_quality: number | null;
  notes: string | null;
}

async function requireUser() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not authenticated");
  return data.user;
}

// ---------- Profile ----------
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile> => {
      const user = await requireUser();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        // fallback : trigger n'a pas tourné (rare)
        const { data: created, error: e2 } = await supabase
          .from("profiles")
          .insert({ id: user.id })
          .select()
          .single();
        if (e2) throw e2;
        return created as Profile;
      }
      return data as Profile;
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<Profile>) => {
      const user = await requireUser();
      const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

// ---------- Period logs ----------
export function usePeriodLogs() {
  return useQuery({
    queryKey: ["period_logs"],
    queryFn: async (): Promise<PeriodLog[]> => {
      await requireUser();
      const { data, error } = await supabase
        .from("period_logs")
        .select("id, date, flow")
        .order("date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as PeriodLog[];
    },
  });
}

export function useTogglePeriodDay() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ date, on }: { date: string; on: boolean }) => {
      const user = await requireUser();
      if (on) {
        const { error } = await supabase
          .from("period_logs")
          .upsert({ user_id: user.id, date, flow: "medium" }, { onConflict: "user_id,date" });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("period_logs")
          .delete()
          .eq("user_id", user.id)
          .eq("date", date);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["period_logs"] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

// ---------- Symptom logs ----------
export function useSymptomLogs() {
  return useQuery({
    queryKey: ["symptom_logs"],
    queryFn: async (): Promise<SymptomLog[]> => {
      await requireUser();
      const { data, error } = await supabase
        .from("symptom_logs")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as SymptomLog[];
    },
  });
}

export function useSaveSymptomLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<SymptomLog, "id">) => {
      const user = await requireUser();
      const { error } = await supabase
        .from("symptom_logs")
        .upsert(
          { ...entry, user_id: user.id },
          { onConflict: "user_id,date" },
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["symptom_logs"] }),
  });
}

// ---------- Cycle math ----------
export function computeCycleInfo(profile: Profile | undefined, periods: PeriodLog[] = []) {
  const cycleLength = profile?.cycle_length ?? 28;
  const periodLength = profile?.period_length ?? 5;
  // Latest period start = profile.last_period_date OR earliest of the most recent contiguous period run
  let anchor: Date | null = null;
  if (periods.length > 0) {
    const sorted = [...periods].sort((a, b) => b.date.localeCompare(a.date));
    // find start of most recent contiguous run
    let start = sorted[0].date;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].date);
      const cur = new Date(sorted[i].date);
      const diff = Math.round((prev.getTime() - cur.getTime()) / 86400000);
      if (diff === 1) start = sorted[i].date;
      else break;
    }
    anchor = new Date(start + "T00:00:00");
  } else if (profile?.last_period_date) {
    anchor = new Date(profile.last_period_date + "T00:00:00");
  }

  const ovulationOffset = cycleLength - 14; // day of cycle (1-indexed)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let cycleDay: number | null = null;
  let nextPeriod: Date | null = null;
  if (anchor) {
    const diffDays = Math.floor((today.getTime() - anchor.getTime()) / 86400000);
    if (diffDays >= 0) {
      cycleDay = (diffDays % cycleLength) + 1;
      const daysToNext = cycleLength - (diffDays % cycleLength);
      nextPeriod = new Date(today);
      nextPeriod.setDate(today.getDate() + daysToNext);
    }
  }

  let phase: "period" | "follicular" | "fertile" | "ovulation" | "luteal" | null = null;
  if (cycleDay) {
    if (cycleDay <= periodLength) phase = "period";
    else if (cycleDay === ovulationOffset + 1) phase = "ovulation";
    else if (cycleDay >= ovulationOffset - 2 && cycleDay <= ovulationOffset + 2) phase = "fertile";
    else if (cycleDay < ovulationOffset - 2) phase = "follicular";
    else phase = "luteal";
  }

  return { cycleLength, periodLength, ovulationOffset, anchor, cycleDay, nextPeriod, phase };
}
