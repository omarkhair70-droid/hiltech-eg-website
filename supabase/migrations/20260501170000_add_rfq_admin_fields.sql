alter table if exists public.rfq_requests
  add column if not exists internal_notes text null,
  add column if not exists last_status_changed_at timestamptz null;

alter table public.rfq_requests
  drop constraint if exists rfq_requests_status_check;

alter table public.rfq_requests
  add constraint rfq_requests_status_check
  check (status in ('new', 'in_review', 'quoted', 'waiting_client', 'won', 'lost', 'closed'));
