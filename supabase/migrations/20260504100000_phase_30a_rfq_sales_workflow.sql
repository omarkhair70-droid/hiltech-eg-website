alter table if exists public.rfq_requests
  add column if not exists sales_priority text not null default 'normal',
  add column if not exists next_follow_up_at timestamptz null,
  add column if not exists last_admin_action_at timestamptz null;

alter table public.rfq_requests
  drop constraint if exists rfq_requests_sales_priority_check;

alter table public.rfq_requests
  add constraint rfq_requests_sales_priority_check
  check (sales_priority in ('normal', 'urgent', 'high_value', 'waiting_customer', 'waiting_supplier'));

create index if not exists idx_rfq_requests_sales_priority on public.rfq_requests (sales_priority);
create index if not exists idx_rfq_requests_next_follow_up_at on public.rfq_requests (next_follow_up_at);
