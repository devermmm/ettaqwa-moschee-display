-- Create table for prayer times that can be manually edited
CREATE TABLE public.prayer_times (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  fajr TEXT NOT NULL,
  sunrise TEXT NOT NULL,
  dhuhr TEXT NOT NULL,
  asr TEXT NOT NULL,
  maghrib TEXT NOT NULL,
  isha TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prayer_times ENABLE ROW LEVEL SECURITY;

-- Anyone can view prayer times
CREATE POLICY "Anyone can view prayer times"
ON public.prayer_times
FOR SELECT
USING (true);

-- Only admins can insert prayer times
CREATE POLICY "Admins can insert prayer times"
ON public.prayer_times
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

-- Only admins can update prayer times
CREATE POLICY "Admins can update prayer times"
ON public.prayer_times
FOR UPDATE
USING (is_admin(auth.uid()));

-- Only admins can delete prayer times
CREATE POLICY "Admins can delete prayer times"
ON public.prayer_times
FOR DELETE
USING (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_prayer_times_updated_at
BEFORE UPDATE ON public.prayer_times
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();