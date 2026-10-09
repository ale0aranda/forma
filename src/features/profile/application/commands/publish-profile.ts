import type { Profile } from '../../domain/profile';
import type { ProfileRepository } from '../ports/profile-repository';

export async function publishProfile(
  repository: ProfileRepository,
  profile: Profile
): Promise<void> {
  await repository.publishProfile(profile);
}
