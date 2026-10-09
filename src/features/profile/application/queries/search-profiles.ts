import type {
  ProfileSearchRepository,
  ProfileSearchResult
} from '../ports/profile-search-repository';

export async function searchProfiles(
  repository: ProfileSearchRepository,
  query: string
): Promise<ProfileSearchResult[]> {
  return repository.searchProfiles(query);
}
