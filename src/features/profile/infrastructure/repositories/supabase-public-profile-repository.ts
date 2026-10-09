import { createClient } from '@/src/infrastructure/supabase/server';

import type { Profile } from '@/src/features/profile/domain/profile';
import type {
  PublicProfile,
  PublicProfileRepository
} from '../../application/ports/public-profile-repository';

interface PublicProfileRow {
  user_id: string;
  profile: Profile;
  followers: number;
  following: number;
}

export async function getPublicProfile(
  username: string
): Promise<PublicProfile | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_public_profile', {
    profile_username: username
  });

  if (error) {
    throw error;
  }

  const row = (data as PublicProfileRow[] | null)?.[0];

  if (!row) {
    return undefined;
  }

  return {
    userId: row.user_id,
    profile: row.profile,
    followers: Number(row.followers),
    following: Number(row.following)
  };
}

export const supabasePublicProfileRepository: PublicProfileRepository = {
  getPublicProfile
};
