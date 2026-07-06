-- De Gouden Driehoek - initieel schema
-- Units (bedrijfsunits + kantoren)
create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('bedrijfsunit','kantoor')),
  nummer text not null,
  verdieping integer not null default 0,
  oppervlakte_m2 numeric not null default 0,
  prijs_vanaf numeric,
  status text not null default 'beschikbaar' check (status in ('beschikbaar','optie','verkocht')),
  beschrijving text,
  plattegrond_url text,
  pos_x numeric,
  pos_y numeric,
  pos_w numeric,
  pos_h numeric,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null,
  telefoon text,
  bedrijfsnaam text,
  interesse_type text check (interesse_type in ('bedrijfsunit','kantoor','beide')),
  gewenste_m2 text,
  koop_huur text check (koop_huur in ('koop','huur','onbekend')),
  bericht text,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.units enable row level security;
alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.site_content enable row level security;

create policy units_select_public on public.units for select using (true);
create policy units_admin_write on public.units for all to authenticated using (true) with check (true);

create policy content_select_public on public.site_content for select using (true);
create policy content_admin_write on public.site_content for all to authenticated using (true) with check (true);

create policy leads_insert_public on public.leads for insert with check (true);
create policy leads_admin_read on public.leads for select to authenticated using (true);
create policy leads_admin_manage on public.leads for delete to authenticated using (true);

create policy news_insert_public on public.newsletter_subscribers for insert with check (true);
create policy news_admin_read on public.newsletter_subscribers for select to authenticated using (true);
create policy news_admin_manage on public.newsletter_subscribers for delete to authenticated using (true);

create index if not exists units_type_idx on public.units (type, sort_order);
create index if not exists leads_created_idx on public.leads (created_at desc);
