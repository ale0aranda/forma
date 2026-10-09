import type {
  CurrentProfile,
  CurrentProfileRepository
} from '../ports/current-profile-repository';

export async function getCurrentProfileSummary(
  repository: CurrentProfileRepository
): Promise<CurrentProfile | undefined> {
  return repository.getCurrentProfile();
}
