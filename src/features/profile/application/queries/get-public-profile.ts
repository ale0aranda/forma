import type {
  PublicProfile,
  PublicProfileRepository
} from '../ports/public-profile-repository';

export async function getPublicProfile(
  repository: PublicProfileRepository,
  username: string
): Promise<PublicProfile | undefined> {
  return repository.getPublicProfile(username);
}
