import type { FollowState } from '../../domain/follow-state';

export interface FollowRepository {
  getFollowState(profileUserId: string): Promise<FollowState>;
}
