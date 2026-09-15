create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  platforms text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

alter table public.brands enable row level security;
create policy "Users can view their own brands" on public.brands for select using (auth.uid() = user_id);
create policy "Users can create their own brands" on public.brands for insert with check (auth.uid() = user_id);
create policy "Users can delete their own brands" on public.brands for delete using (auth.uid() = user_id);
