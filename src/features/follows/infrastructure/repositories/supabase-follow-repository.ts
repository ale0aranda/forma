import { createClient } from '@/lib/supabase/server';

import type { FollowRepository } from '../../application/ports/follow-repository';
import type { FollowState } from '../../domain/follow-state';

export async function getFollowState(
  profileUserId: string
): Promise<FollowState> {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return {
      authenticated: false,
      ownProfile: false,
      following: false
    };
  }

  if (data.user.id === profileUserId) {
    return {
      authenticated: true,
      ownProfile: true,
      following: false
    };
  }

  const { data: follow } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', data.user.id)
    .eq('following_id', profileUserId)
    .maybeSingle();

  return {
    authenticated: true,
    ownProfile: false,
    following: Boolean(follow)
  };
}

export const supabaseFollowRepository: FollowRepository = {
  getFollowState
};
