import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  db: {
    schema: 'public',
  },
});

// Test the connection with retry logic
const testConnection = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.warn(`Supabase connection attempt ${i + 1} failed:`, error);
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }

      console.log('Supabase connection successful');
      return;
    } catch (err) {
      if (i === retries - 1) {
        console.error('Failed to establish Supabase connection after retries:', err);
      }
    }
  }
};

// Initialize connection test in the background
testConnection().catch(err => {
  console.error('Supabase connection error:', err);
});