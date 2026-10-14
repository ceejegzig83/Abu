/**
 * Supabase Client Configuration & Mode Detection
 * 
 * In standard preview / client-side operation, the application runs with an
 * in-browser reactive persistence layer (localStorage) to allow full demonstration
 * without requiring live API keys. When VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * are provided in .env, this client seamlessly bridges to production PostgreSQL.
 */

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  mode: isSupabaseConfigured ? 'production' : 'demo_local',
};
