alter table public.rfq_requests
  add column if not exists quote_customer_visible boolean not null default false,
  add column if not exists quote_sent_at timestamptz null,
  add column if not exists quote_customer_response_status text not null default 'no_response',
  add column if not exists quote_customer_response_notes text null,
  add column if not exists quote_customer_responded_at timestamptz null,
  add column if not exists quote_customer_last_viewed_at timestamptz null,
  add column if not exists quote_public_message text null;

alter table public.rfq_requests
  drop constraint if exists rfq_requests_quote_customer_response_status_check;

alter table public.rfq_requests
  add constraint rfq_requests_quote_customer_response_status_check
  check (quote_customer_response_status in ('no_response','accepted','rejected','changes_requested'));
