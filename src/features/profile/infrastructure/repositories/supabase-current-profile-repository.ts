import 'server-only';

import { createClient } from '@/src/infrastructure/supabase/server';

import type { Profile } from '@/src/features/profile/domain/profile';
import type {
  CurrentProfile,
  CurrentProfileRepository
} from '../../application/ports/current-profile-repository';

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

export const supabaseCurrentProfileRepository: CurrentProfileRepository = {
  getCurrentProfile
};
