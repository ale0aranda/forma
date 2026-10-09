import type { Profile } from '../../domain/profile';

export interface PublicProfile {
  userId: string;
  profile: Profile;
  followers: number;
  following: number;
}

export interface PublicProfileRepository {
  getPublicProfile(username: string): Promise<PublicProfile | undefined>;
}
