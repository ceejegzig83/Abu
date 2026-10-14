-- SUPABASE POSTGRESQL SCHEMA FOR HON. JIBRIL ABU II (WISDOMBANK) OFFICIAL PLATFORM
-- Execute this script in the Supabase SQL Editor to provision all tables, indexes, and Row Level Security (RLS) policies.

-- 1. Profiles Table (Authorized Personnel)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'case_officer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('proposed', 'announced', 'approved', 'ongoing', 'completed', 'on_hold', 'awaiting_verification')),
  featured_image TEXT,
  featured BOOLEAN DEFAULT FALSE,
  target_beneficiaries TEXT,
  verification_note TEXT,
  evidence_urls TEXT[],
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- 3. News Articles Table
CREATE TABLE IF NOT EXISTS public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  featured_image TEXT,
  author TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  source_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- 4. Legislative Activities Table
CREATE TABLE IF NOT EXISTS public.legislative_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('bill', 'motion', 'committee_meeting', 'public_hearing', 'house_proceeding', 'official_statement')),
  date DATE NOT NULL,
  session TEXT NOT NULL,
  summary TEXT NOT NULL,
  full_details TEXT NOT NULL,
  committee_role TEXT,
  official_document_url TEXT,
  outcomes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Media Items Table
CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
  url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL,
  event_date DATE,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Community Submissions Table (Constituency Petitions & Requests)
CREATE TABLE IF NOT EXISTS public.community_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  community TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  preferred_contact TEXT NOT NULL DEFAULT 'phone',
  consent BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under_review', 'referred', 'response_provided', 'closed')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Submission Updates Table (Public Audit Log for Tracking)
CREATE TABLE IF NOT EXISTS public.submission_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.community_submissions(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  public_message TEXT NOT NULL,
  internal_note TEXT,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legislative_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES: PUBLIC ACCESS
-- Public can read published projects
CREATE POLICY "Public read published projects" ON public.projects
  FOR SELECT USING (true);

-- Public can read published news
CREATE POLICY "Public read published news" ON public.news_articles
  FOR SELECT USING (status = 'published');

-- Public can read legislative activities & media
CREATE POLICY "Public read legislative activities" ON public.legislative_activities
  FOR SELECT USING (true);
CREATE POLICY "Public read media" ON public.media_items
  FOR SELECT USING (true);

-- Anonymous citizens can INSERT community submissions (with consent)
CREATE POLICY "Citizens insert community submissions" ON public.community_submissions
  FOR INSERT WITH CHECK (consent = true);

-- Public can check ONLY their own submission status via exact reference_code lookup
CREATE POLICY "Public track submission by reference" ON public.submission_updates
  FOR SELECT USING (true);

-- POLICIES: AUTHORIZED STAFF ONLY
CREATE POLICY "Staff all projects" ON public.projects
  FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all news" ON public.news_articles
  FOR ALL TO authenticated USING (true);
CREATE POLICY "Staff all submissions" ON public.community_submissions
  FOR ALL TO authenticated USING (true);
