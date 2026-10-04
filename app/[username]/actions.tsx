'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

interface FollowActionResult {
  success: boolean;
  error?: string;
}

export async function followProfile(
  username: string
): Promise<FollowActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.rpc('follow_profile', {
    profile_username: username
  });

  if (error) {
    return {
      success: false,
      error: 'Could not follow this profile.'
    };
  }

  revalidatePath(`/${username}`);

  return {
    success: true
  };
}

export async function unfollowProfile(
  username: string
): Promise<FollowActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.rpc('unfollow_profile', {
    profile_username: username
  });

  if (error) {
    return {
      success: false,
      error: 'Could not unfollow this profile.'
    };
  }

  revalidatePath(`/${username}`);

  return {
    success: true
  };
}
