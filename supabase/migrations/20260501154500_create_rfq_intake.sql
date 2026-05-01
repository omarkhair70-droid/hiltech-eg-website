create extension if not exists pgcrypto;

create table if not exists public.rfq_requests (
  id uuid primary key default gen_random_uuid(),
  request_code text unique not null,
  full_name text not null,
  company_name text,
  phone text not null,
  email text not null,
  project_location text,
  project_notes text,
  request_type text,
  source text not null default 'rfq_page',
  status text not null default 'new',
  urgency text,
  whatsapp_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rfq_request_items (
  id uuid primary key default gen_random_uuid(),
  rfq_request_id uuid not null references public.rfq_requests(id) on delete cascade,
  product_id text,
  name text not null,
  category text,
  brand text,
  quantity numeric,
  unit text,
  urgency text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_rfq_requests_created_at_desc on public.rfq_requests (created_at desc);
create index if not exists idx_rfq_requests_status_created_at_desc on public.rfq_requests (status, created_at desc);
create index if not exists idx_rfq_request_items_rfq_request_id on public.rfq_request_items (rfq_request_id);

create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_rfq_requests_set_updated_at on public.rfq_requests;
create trigger trg_rfq_requests_set_updated_at
before update on public.rfq_requests
for each row
execute function public.set_updated_at_timestamp();

alter table public.rfq_requests enable row level security;
alter table public.rfq_request_items enable row level security;
