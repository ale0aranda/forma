import type { Profile } from '../../domain/profile';

export interface ProfileRecord {
  username: string;
  draft: Profile;
  published: Profile | null;
}

export interface ProfileRepository {
  getCurrentProfile(): Promise<ProfileRecord>;
  saveProfile(profile: Profile): Promise<void>;
  publishProfile(profile: Profile): Promise<void>;
}
