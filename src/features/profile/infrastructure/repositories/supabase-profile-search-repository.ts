import { createClient } from '@/src/infrastructure/supabase/server';

import type { Profile } from '@/src/features/profile/domain/profile';
import type {
  ProfileSearchRepository,
  ProfileSearchResult
} from '../../application/ports/profile-search-repository';

interface ProfileSearchRow {
  username: string;
  profile: Profile;
  followers: number;
}

async function searchProfiles(query: string): Promise<ProfileSearchResult[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('search_profiles', {
    search_query: query.trim(),
    result_limit: 20
  });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return (data as ProfileSearchRow[]).map((row) => ({
    username: row.username,
    profile: row.profile,
    followers: Number(row.followers)
  }));
}

export const supabaseProfileSearchRepository: ProfileSearchRepository = {
  searchProfiles
};
