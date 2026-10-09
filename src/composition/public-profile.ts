import 'server-only';

import { getPublicProfile } from '../features/profile/application/queries/get-public-profile';
import { supabasePublicProfileRepository } from '../features/profile/infrastructure/repositories/supabase-public-profile-repository';

export function loadPublicProfile(username: string) {
  return getPublicProfile(supabasePublicProfileRepository, username);
}
