import type { FollowRepository } from '../ports/follow-repository';

export interface FollowActionResult {
  success: boolean;
  error?: string;
}

export async function followProfile(
  repository: FollowRepository,
  username: string
): Promise<FollowActionResult> {
  const success = await repository.followProfile(username);

  if (!success) {
    return {
      success: false,
      error: 'Could not follow this profile.'
    };
  }

  return { success: true };
}

export async function unfollowProfile(
  repository: FollowRepository,
  username: string
): Promise<FollowActionResult> {
  const success = await repository.unfollowProfile(username);

  if (!success) {
    return {
      success: false,
      error: 'Could not unfollow this profile.'
    };
  }

  return { success: true };
}
