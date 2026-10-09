import 'server-only';

import {
  followProfile,
  unfollowProfile
} from '../features/follows/application/commands/follow-profile';
import { getFollowState } from '../features/follows/application/queries/get-follow-state';
import { supabaseFollowRepository } from '../features/follows/infrastructure/repositories/supabase-follow-repository';

export function loadFollowState(profileUserId: string) {
  return getFollowState(supabaseFollowRepository, profileUserId);
}

export function executeFollowProfile(username: string) {
  return followProfile(supabaseFollowRepository, username);
}

export function executeUnfollowProfile(username: string) {
  return unfollowProfile(supabaseFollowRepository, username);
}
