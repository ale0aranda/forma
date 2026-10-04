'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';

export async function followProfile(username: string, followingId: string) {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getUser();

  if (authError || !data.user) {
    return {
      error: 'You need to sign in to follow people.'
    };
  }

  if (data.user.id === followingId) {
    return {
      error: 'You cannot follow yourself.'
    };
  }

  const { error } = await supabase.from('follows').insert({
    follower_id: data.user.id,
    following_id: followingId
  });

  if (error) {
    if (error.code === '23505') {
      revalidatePath(`/${username}`);

      return {
        success: true
      };
    }

    return {
      error: 'Could not follow this profile.'
    };
  }

  revalidatePath(`/${username}`);

  return {
    success: true
  };
}

export async function unfollowProfile(username: string, followingId: string) {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getUser();

  if (authError || !data.user) {
    return {
      error: 'You need to sign in.'
    };
  }

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', data.user.id)
    .eq('following_id', followingId);

  if (error) {
    return {
      error: 'Could not unfollow this profile.'
    };
  }

  revalidatePath(`/${username}`);

  return {
    success: true
  };
}
