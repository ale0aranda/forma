import { createClient } from '@/lib/supabase/server';

import type { Profile } from '@/src/features/profile/domain/profile';

export type ProfileConnectionType = 'followers' | 'following';

export interface ProfileConnection {
  username: string;
  profile: Profile;
}

interface ProfileConnectionRow {
  username: string;
  profile: Profile;
}

export async function getProfileConnections(
  username: string,
  type: ProfileConnectionType
): Promise<ProfileConnection[]> {
  const supabase = await createClient();

  const functionName =
    type === 'followers' ? 'get_profile_followers' : 'get_profile_following';

  const { data, error } = await supabase.rpc(functionName, {
    profile_username: username
  });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return (data as ProfileConnectionRow[]).map((row) => ({
    username: row.username,
    profile: row.profile
  }));
}
