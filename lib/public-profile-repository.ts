import { createClient } from '@/lib/supabase/server';

import type { Profile } from '@/lib/profile';

export async function getPublishedProfile(
  username: string
): Promise<Profile | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_published_profile', {
    profile_username: username
  });

  if (error) {
    throw error;
  }

  if (!data) {
    return undefined;
  }

  return data as Profile;
}
