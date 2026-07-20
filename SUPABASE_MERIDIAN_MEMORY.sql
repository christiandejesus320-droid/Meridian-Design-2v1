-- Public Meridian Design chat memory.
-- The tables are intentionally not writable through the Data API. The Edge
-- Function is the only writer and uses a Supabase secret key server-side.

create table if not exists public.meridian_public_conversations (
  id uuid primary key default gen_random_uuid(),
  session_token text not null unique,
  source_app text not null default 'meridian-design',
  owner_user_id text,
  email text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint meridian_public_conversations_email_length check (email is null or char_length(email) <= 320),
  constraint meridian_public_conversations_source_length check (char_length(source_app) <= 80)
);

create table if not exists public.meridian_public_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.meridian_public_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null check (char_length(content) <= 24000),
  attachment jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.meridian_public_context (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.meridian_public_conversations(id) on delete cascade,
  kind text not null check (kind in ('email', 'url', 'message', 'file')),
  source_url text,
  content text not null check (char_length(content) <= 30000),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists meridian_public_messages_conversation_created_idx
  on public.meridian_public_messages (conversation_id, created_at);
create index if not exists meridian_public_context_conversation_created_idx
  on public.meridian_public_context (conversation_id, created_at);
create index if not exists meridian_public_conversations_owner_idx
  on public.meridian_public_conversations (owner_user_id)
  where owner_user_id is not null;

alter table public.meridian_public_conversations enable row level security;
alter table public.meridian_public_messages enable row level security;
alter table public.meridian_public_context enable row level security;

-- No anon/authenticated policies are intentional: browsers call the Edge
-- Function, never these tables directly. The service/secret key bypasses RLS
-- inside that trusted function.
revoke all on table public.meridian_public_conversations from anon, authenticated;
revoke all on table public.meridian_public_messages from anon, authenticated;
revoke all on table public.meridian_public_context from anon, authenticated;

comment on table public.meridian_public_conversations is 'Conversation sessions from the public Meridian Design site; written only by the meridian-chat Edge Function.';
comment on table public.meridian_public_messages is 'Bounded public chat history used to keep Gemini context across page visits.';
comment on table public.meridian_public_context is 'URLs, email addresses, files, and notes submitted to public Meridian AI for later context.';

