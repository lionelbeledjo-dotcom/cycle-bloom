
-- Trigger générique updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ profiles ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  birth_year INTEGER,
  goal TEXT,
  cycle_length INTEGER NOT NULL DEFAULT 28 CHECK (cycle_length BETWEEN 15 AND 60),
  period_length INTEGER NOT NULL DEFAULT 5 CHECK (period_length BETWEEN 1 AND 15),
  last_period_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-création du profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ period_logs ============
CREATE TABLE public.period_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  flow TEXT NOT NULL DEFAULT 'medium' CHECK (flow IN ('spotting','light','medium','heavy')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);
CREATE INDEX period_logs_user_date_idx ON public.period_logs (user_id, date DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.period_logs TO authenticated;
GRANT ALL ON public.period_logs TO service_role;
ALTER TABLE public.period_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own period select" ON public.period_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own period insert" ON public.period_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own period update" ON public.period_logs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own period delete" ON public.period_logs FOR DELETE USING (auth.uid() = user_id);

-- ============ symptom_logs ============
CREATE TABLE public.symptom_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  moods TEXT[] NOT NULL DEFAULT '{}',
  physical TEXT[] NOT NULL DEFAULT '{}',
  discharge TEXT,
  temperature NUMERIC(3,1),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);
CREATE INDEX symptom_logs_user_date_idx ON public.symptom_logs (user_id, date DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.symptom_logs TO authenticated;
GRANT ALL ON public.symptom_logs TO service_role;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own symptom select" ON public.symptom_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own symptom insert" ON public.symptom_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own symptom update" ON public.symptom_logs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own symptom delete" ON public.symptom_logs FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER symptom_logs_updated_at BEFORE UPDATE ON public.symptom_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
