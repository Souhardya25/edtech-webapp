-- Contacts table for storing contact form submissions
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text default 'website',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.contacts enable row level security;

-- Policy: allow service role (Edge Function) to insert
create policy if not exists "Allow service role insert"
  on public.contacts
  for insert
  to service_role
  with check (true);

-- Optional: read access for authenticated users only
create policy if not exists "Authenticated can select"
  on public.contacts
  for select
  to authenticated
  using (true);
