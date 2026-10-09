import type { FollowState } from '../../domain/follow-state';
import type { FollowRepository } from '../ports/follow-repository';

export async function getFollowState(
  repository: FollowRepository,
  profileUserId: string
): Promise<FollowState> {
  return repository.getFollowState(profileUserId);
}
