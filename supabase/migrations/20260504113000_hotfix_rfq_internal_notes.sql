alter table if exists public.rfq_requests
  add column if not exists internal_notes text null;
