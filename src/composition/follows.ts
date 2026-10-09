import 'server-only';

import { getFollowState } from '../features/follows/application/queries/get-follow-state';
import { supabaseFollowRepository } from '../features/follows/infrastructure/repositories/supabase-follow-repository';

export function loadFollowState(profileUserId: string) {
  return getFollowState(supabaseFollowRepository, profileUserId);
}
