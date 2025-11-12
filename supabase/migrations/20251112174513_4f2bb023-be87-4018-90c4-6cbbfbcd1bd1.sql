-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  donor_name TEXT,
  message TEXT,
  campaign TEXT NOT NULL DEFAULT 'palestine',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view donations
CREATE POLICY "Anyone can view donations"
ON public.donations
FOR SELECT
USING (true);

-- Only admins can create donations
CREATE POLICY "Admins can create donations"
ON public.donations
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

-- Only admins can update donations
CREATE POLICY "Admins can update donations"
ON public.donations
FOR UPDATE
USING (is_admin(auth.uid()));

-- Only admins can delete donations
CREATE POLICY "Admins can delete donations"
ON public.donations
FOR DELETE
USING (is_admin(auth.uid()));

-- Create index for faster queries
CREATE INDEX idx_donations_campaign ON public.donations(campaign);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);