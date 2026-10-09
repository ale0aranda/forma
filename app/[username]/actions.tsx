'use server';

import { revalidatePath } from 'next/cache';

import {
  executeFollowProfile,
  executeUnfollowProfile
} from '@/src/composition/follows';

import type { FollowActionResult } from '@/src/features/follows/application/commands/follow-profile';

export async function followProfile(
  username: string
): Promise<FollowActionResult> {
  const result = await executeFollowProfile(username);

  if (result.success) {
    revalidatePath(`/${username}`);
  }

  return result;
}

export async function unfollowProfile(
  username: string
): Promise<FollowActionResult> {
  const result = await executeUnfollowProfile(username);

  if (result.success) {
    revalidatePath(`/${username}`);
  }

  return result;
}
