import type { Profile } from '@/src/features/profile';

export type ProfileConnectionType = 'followers' | 'following';

export interface ProfileConnection {
  username: string;
  profile: Profile;
}

export interface ProfileConnectionsRepository {
  getProfileConnections(
    username: string,
    type: ProfileConnectionType
  ): Promise<ProfileConnection[]>;
}
