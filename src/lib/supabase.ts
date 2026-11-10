import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ntppvrrnubtgnwnmwdbc.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cHB2cnJudWJ0Z253bm13ZGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NDczNDQsImV4cCI6MjA5OTIyMzM0NH0.9tJt4CulgqbwqJdm68QB-2PcmL5hgEKk68q1jhu9ifM";

let client: SupabaseClient | undefined;

/** Browser Supabase client (session persisted in localStorage, like the original site). */
export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return client;
}
