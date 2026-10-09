import 'server-only';

import { searchProfiles } from '../features/profile/application/queries/search-profiles';
import { supabaseProfileSearchRepository } from '../features/profile/infrastructure/repositories/supabase-profile-search-repository';

export function searchPublicProfiles(query: string) {
  return searchProfiles(supabaseProfileSearchRepository, query);
}
