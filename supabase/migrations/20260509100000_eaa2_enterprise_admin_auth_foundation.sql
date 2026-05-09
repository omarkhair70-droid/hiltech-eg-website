create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null check (role in ('owner', 'manager', 'sales', 'inventory', 'viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_admin_profiles_role on public.admin_profiles (role);
create index if not exists idx_admin_profiles_is_active on public.admin_profiles (is_active);
create index if not exists idx_admin_profiles_email on public.admin_profiles (email);

drop trigger if exists trg_admin_profiles_set_updated_at on public.admin_profiles;
create trigger trg_admin_profiles_set_updated_at
before update on public.admin_profiles
for each row
execute function public.set_updated_at_timestamp();

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id),
  admin_email text,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_audit_log_created_at_desc on public.admin_audit_log (created_at desc);
create index if not exists idx_admin_audit_log_action on public.admin_audit_log (action);
create index if not exists idx_admin_audit_log_entity_type_entity_id on public.admin_audit_log (entity_type, entity_id);
create index if not exists idx_admin_audit_log_admin_email on public.admin_audit_log (admin_email);

alter table public.admin_profiles enable row level security;
alter table public.admin_audit_log enable row level security;
