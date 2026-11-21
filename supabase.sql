-- Trainingsbuch: Konto & Sync mit Benutzername + Passwort
-- Einmalig im Supabase-Dashboard unter "SQL Editor" ausführen (New query → einfügen → Run).
-- Die Tabellen sind von außen gesperrt; Zugriff gibt es nur über die Funktionen unten.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.tb_users (
  username   text primary key check (username ~ '^[a-z0-9_.-]{3,32}$'),
  pw_hash    text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create table if not exists public.tb_tokens (
  token      uuid primary key default gen_random_uuid(),
  username   text not null references public.tb_users(username) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.tb_users  enable row level security;
alter table public.tb_tokens enable row level security;
revoke all on public.tb_users, public.tb_tokens from anon, authenticated;

create or replace function public.tb_register(p_user text, p_pw text) returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare t uuid;
begin
  p_user := lower(trim(p_user));
  if p_user !~ '^[a-z0-9_.-]{3,32}$' then raise exception 'Benutzername: 3–32 Zeichen (a–z, 0–9, _ . -)'; end if;
  if length(p_pw) < 8 then raise exception 'Passwort: mindestens 8 Zeichen'; end if;
  if exists (select 1 from tb_users where username = p_user) then raise exception 'Benutzername ist schon vergeben'; end if;
  insert into tb_users(username, pw_hash) values (p_user, crypt(p_pw, gen_salt('bf', 10)));
  insert into tb_tokens(username) values (p_user) returning token into t;
  return t;
end $$;

create or replace function public.tb_login(p_user text, p_pw text) returns uuid
language plpgsql security definer set search_path = public, extensions as $$
declare h text; t uuid;
begin
  p_user := lower(trim(p_user));
  select pw_hash into h from tb_users where username = p_user;
  if h is null or h <> crypt(p_pw, h) then
    perform pg_sleep(1);
    raise exception 'Benutzername oder Passwort falsch';
  end if;
  insert into tb_tokens(username) values (p_user) returning token into t;
  return t;
end $$;

create or replace function public.tb_pull(p_token uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb;
begin
  select jsonb_build_object('data', u.data, 'updated_at', u.updated_at) into r
  from tb_users u join tb_tokens k on k.username = u.username where k.token = p_token;
  if r is null then raise exception 'Nicht angemeldet'; end if;
  return r;
end $$;

create or replace function public.tb_push(p_token uuid, p_data jsonb, p_base timestamptz) returns jsonb
language plpgsql security definer set search_path = public as $$
declare usr text; cur timestamptz; now_ts timestamptz := clock_timestamp();
begin
  select u.username, u.updated_at into usr, cur
  from tb_users u join tb_tokens k on k.username = u.username where k.token = p_token for update of u;
  if usr is null then raise exception 'Nicht angemeldet'; end if;
  if p_base is distinct from cur then
    return jsonb_build_object('conflict', true);
  end if;
  if pg_column_size(p_data) > 5000000 then raise exception 'Daten zu groß'; end if;
  update tb_users set data = p_data, updated_at = now_ts where username = usr;
  return jsonb_build_object('ok', true, 'updated_at', now_ts);
end $$;

create or replace function public.tb_logout(p_token uuid) returns void
language sql security definer set search_path = public as $$
  delete from tb_tokens where token = p_token;
$$;

revoke all on function public.tb_register(text,text), public.tb_login(text,text), public.tb_pull(uuid),
  public.tb_push(uuid,jsonb,timestamptz), public.tb_logout(uuid) from public;
grant execute on function public.tb_register(text,text), public.tb_login(text,text), public.tb_pull(uuid),
  public.tb_push(uuid,jsonb,timestamptz), public.tb_logout(uuid) to anon, authenticated;
