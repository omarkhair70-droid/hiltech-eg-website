alter table public.rfq_requests
  add column if not exists notification_attempted_at timestamptz null,
  add column if not exists notification_sent_at timestamptz null,
  add column if not exists notification_provider text null,
  add column if not exists notification_message_id text null,
  add column if not exists notification_error text null;
