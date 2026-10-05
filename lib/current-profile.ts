import { createClient } from '@/lib/supabase/server';

import type { Profile } from '@/lib/profile';

export interface CurrentProfile {
  username: string;
  name: string;
  avatar?: string | undefined;
}

export async function getCurrentProfile(): Promise<CurrentProfile | undefined> {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return undefined;
  }

  const { data: record } = await supabase
    .from('profiles')
    .select('username, draft')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (!record) {
    return undefined;
  }

  const profile = record.draft as Profile | null;

  return {
    username: record.username,
    name: profile?.identity.name?.trim() || record.username,
    avatar: profile?.identity.avatar
  };
}

export async function getCurrentUsername() {
  const profile = await getCurrentProfile();

  return profile?.username;
}
