import type { FollowState } from '../../domain/follow-state';

export interface FollowRepository {
  getFollowState(profileUserId: string): Promise<FollowState>;
  followProfile(username: string): Promise<boolean>;
  unfollowProfile(username: string): Promise<boolean>;
}
