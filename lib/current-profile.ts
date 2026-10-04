import { createClient } from '@/lib/supabase/server';

export async function getCurrentUsername() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return undefined;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('user_id', data.user.id)
    .maybeSingle();

  return profile?.username;
}
