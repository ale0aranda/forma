function getEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');

export const supabasePublishableKey = getEnv(
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
);
