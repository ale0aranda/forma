import type { Profile } from '../../domain/profile';
import type {
  ProfileRecord,
  ProfileRepository
} from '../ports/profile-repository';

export async function loadProfile(
  repository: ProfileRepository,
  initialProfile: Profile
): Promise<ProfileRecord> {
  const storedProfile = await repository.getCurrentProfile();

  const draft =
    Object.keys(storedProfile.draft).length > 0
      ? storedProfile.draft
      : {
          ...initialProfile,
          username: storedProfile.username
        };

  return {
    ...storedProfile,
    draft
  };
}
