import { createClient } from '@/lib/supabase/client';

import type { Profile } from '@/lib/profile';

interface ProfileRow {
  username: string;
  draft: Profile;
  published: Profile | null;
}

export async function getCurrentProfile() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error('User is not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('username, draft, published')
    .eq('user_id', userData.user.id)
    .single();

  if (error) {
    throw error;
  }

  return data as ProfileRow;
}

export async function saveProfile(profile: Profile) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error('User is not authenticated');
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      username: profile.username,
      draft: profile,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userData.user.id);

  if (error) {
    throw error;
  }
}

export async function publishProfile(profile: Profile) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error('User is not authenticated');
  }

  const now = new Date().toISOString();

  const { error } = await supabase
    .from('profiles')
    .update({
      username: profile.username,
      draft: profile,
      published: profile,
      published_at: now,
      updated_at: now
    })
    .eq('user_id', userData.user.id);

  if (error) {
    throw error;
  }
}
