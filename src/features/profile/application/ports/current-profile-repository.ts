export interface CurrentProfile {
  username: string;
  name: string;
  avatar?: string | undefined;
}

export interface CurrentProfileRepository {
  getCurrentProfile(): Promise<CurrentProfile | undefined>;
}
