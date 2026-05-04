alter table public.rfq_requests
  add column if not exists quotation_status text not null default 'not_started',
  add column if not exists quotation_currency text not null default 'EGP',
  add column if not exists quotation_valid_until date,
  add column if not exists quotation_payment_terms text,
  add column if not exists quotation_delivery_terms text,
  add column if not exists quotation_notes text,
  add column if not exists quotation_discount_amount numeric,
  add column if not exists quotation_tax_amount numeric,
  add column if not exists quotation_updated_at timestamptz;

alter table public.rfq_requests
  drop constraint if exists rfq_requests_quotation_status_check,
  add constraint rfq_requests_quotation_status_check
    check (quotation_status in ('not_started', 'draft', 'ready', 'sent', 'revised', 'cancelled')),
  drop constraint if exists rfq_requests_quotation_discount_amount_check,
  add constraint rfq_requests_quotation_discount_amount_check
    check (quotation_discount_amount is null or quotation_discount_amount >= 0),
  drop constraint if exists rfq_requests_quotation_tax_amount_check,
  add constraint rfq_requests_quotation_tax_amount_check
    check (quotation_tax_amount is null or quotation_tax_amount >= 0);

alter table public.rfq_request_items
  add column if not exists quoted_unit_price numeric,
  add column if not exists quoted_line_total numeric,
  add column if not exists quoted_item_notes text;

alter table public.rfq_request_items
  drop constraint if exists rfq_request_items_quoted_unit_price_check,
  add constraint rfq_request_items_quoted_unit_price_check
    check (quoted_unit_price is null or quoted_unit_price >= 0),
  drop constraint if exists rfq_request_items_quoted_line_total_check,
  add constraint rfq_request_items_quoted_line_total_check
    check (quoted_line_total is null or quoted_line_total >= 0);
