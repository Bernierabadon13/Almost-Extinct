create extension if not exists pgcrypto;

create table public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admins enable row level security;  -- no policies: only is_admin() can read it

create function public.is_admin() returns boolean language sql security definer stable set search_path = public
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

create table public.plants (
  id uuid primary key default gen_random_uuid(),
  common_name text not null check (char_length(common_name) between 2 and 120),
  scientific_name text check (char_length(scientific_name) <= 160),
  status text not null default 'Endangered' check (status in ('Extinct in the Wild','Critically Endangered','Endangered','Vulnerable','Near Threatened')),
  location text not null check (char_length(location) between 2 and 160),
  population text check (char_length(population) <= 120),
  description text check (char_length(description) <= 1500),
  image_path text check (image_path is null or image_path ~ '^submissions/[0-9a-f-]{36}\.(jpg|png|webp)$'),
  submitter_name text check (char_length(submitter_name) <= 120),
  submitter_email text check (char_length(submitter_email) <= 200),
  state text not null default 'pending' check (state in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);
create index plants_state_idx on public.plants (state);
alter table public.plants enable row level security;

create function public.collection_count() returns int language sql security definer stable set search_path = public
as $$ select count(*)::int from public.plants where state = 'approved' $$;

-- Submissions are open only while fewer than 50 are published and the pending queue is under 100 (spam guard).
create function public.can_submit() returns boolean language sql security definer stable set search_path = public
as $$ select (select count(*) from public.plants where state = 'approved') < 50
      and (select count(*) from public.plants where state = 'pending') < 100 $$;


create function public.enforce_cap() returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.state = 'approved' and (tg_op = 'INSERT' or old.state is distinct from 'approved') then
    perform pg_advisory_xact_lock(50505);
    if (select count(*) from public.plants where state = 'approved') >= 50 then
      raise exception 'collection_full';
    end if;
    new.approved_at := coalesce(new.approved_at, now());
  end if;
  if new.state <> 'approved' then new.approved_at := null; end if;
  return new;
end $$;
create trigger plants_cap before insert or update on public.plants for each row execute function public.enforce_cap();

revoke all on public.plants from anon;
grant insert on public.plants to anon;
create policy "public can submit pending" on public.plants for insert to anon, authenticated
  with check (state = 'pending' and approved_at is null and public.can_submit());
create policy "admin full access" on public.plants for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


create view public.public_plants as
  select id, common_name, scientific_name, status, location, population, description, image_path, approved_at, submitter_name
  from public.plants where state = 'approved';
grant select on public.public_plants to anon, authenticated;
grant execute on function public.can_submit(), public.collection_count(), public.is_admin() to anon, authenticated;


insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('plant-images','plant-images', true, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 3145728, allowed_mime_types = excluded.allowed_mime_types;
create policy "public can upload submissions" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'plant-images' and (storage.foldername(name))[1] = 'submissions' and public.can_submit());
create policy "admin manages images" on storage.objects for all to authenticated
  using (bucket_id = 'plant-images' and public.is_admin()) with check (bucket_id = 'plant-images' and public.is_admin());