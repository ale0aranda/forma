import { createClient } from '@/src/infrastructure/supabase/client';

import { ProfileRepositoryError } from '../../application/profile-repository-error';

import type { Profile } from '@/src/features/profile/domain/profile';
import type {
  ProfileRecord,
  ProfileRepository
} from '../../application/ports/profile-repository';

function handleProfileError(error: { code?: string }) {
  if (error.code === '23505') {
    throw new ProfileRepositoryError(
      'username_taken',
      'This username is already taken.'
    );
  }

  throw new ProfileRepositoryError('unknown', 'Something went wrong.');
}

async function getAuthenticatedUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new ProfileRepositoryError('unknown', 'You are not authenticated.');
  }

  return {
    supabase,
    user: data.user
  };
}

async function getCurrentProfile(): Promise<ProfileRecord> {
  const { supabase, user } = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('profiles')
    .select('username, draft, published')
    .eq('user_id', user.id)
    .single();

  if (error) {
    handleProfileError(error);
  }

  return data as ProfileRecord;
}

async function saveProfile(profile: Profile) {
  const { supabase, user } = await getAuthenticatedUser();

  const { error } = await supabase
    .from('profiles')
    .update({
      username: profile.username,
      draft: profile,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id);

  if (error) {
    handleProfileError(error);
  }
}

async function publishProfile(profile: Profile) {
  const { supabase, user } = await getAuthenticatedUser();

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
    .eq('user_id', user.id);

  if (error) {
    handleProfileError(error);
  }
}

export const supabaseProfileRepository: ProfileRepository = {
  getCurrentProfile,
  saveProfile,
  publishProfile
};
