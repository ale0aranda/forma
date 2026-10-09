import 'server-only';

import { getCurrentProfileSummary } from '../features/profile/application/queries/get-current-profile-summary';
import { supabaseCurrentProfileRepository } from '../features/profile/infrastructure/repositories/supabase-current-profile-repository';

export function loadCurrentProfile() {
  return getCurrentProfileSummary(supabaseCurrentProfileRepository);
}

export async function loadCurrentUsername() {
  const profile = await loadCurrentProfile();

  return profile?.username;
}
