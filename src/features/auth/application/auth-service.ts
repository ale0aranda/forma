export interface Credentials {
  email: string;
  password: string;
}

export type SocialProvider = 'google' | 'github';

export interface AuthService {
  login(credentials: Credentials): Promise<boolean>;
  signup(credentials: Credentials): Promise<boolean>;
  logout(): Promise<void>;
  exchangeCode(code: string): Promise<boolean>;
}

export interface SocialAuthService {
  getSignInUrl(
    provider: SocialProvider,
    redirectTo: string
  ): Promise<string | undefined>;
}
