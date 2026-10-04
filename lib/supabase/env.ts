const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabasePublishableKey) {
  throw new Error(
    'Missing environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
  );
}

export { supabasePublishableKey, supabaseUrl };
