import type { Profile } from '../../domain/profile';

export interface ProfileSearchResult {
  username: string;
  profile: Profile;
  followers: number;
}

export interface ProfileSearchRepository {
  searchProfiles(query: string): Promise<ProfileSearchResult[]>;
}
