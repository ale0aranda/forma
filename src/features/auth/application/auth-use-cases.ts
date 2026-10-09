import { getCredentials, getSignupCredentials } from '../domain/credentials';

import type {
  AuthService,
  SocialAuthService,
  SocialProvider
} from './auth-service';

export function createAuthUseCases(service: AuthService) {
  return {
    async login(
      formData: FormData
    ): Promise<'invalid' | 'credentials' | 'success'> {
      const credentials = getCredentials(formData);

      if (!credentials) {
        return 'invalid';
      }

      return (await service.login(credentials)) ? 'success' : 'credentials';
    },

    async signup(
      formData: FormData
    ): Promise<'invalid' | 'signup' | 'success'> {
      const credentials = getSignupCredentials(formData);

      if (!credentials) {
        return 'invalid';
      }

      return (await service.signup(credentials)) ? 'success' : 'signup';
    },

    logout(): Promise<void> {
      return service.logout();
    },

    exchangeCode(code: string): Promise<boolean> {
      return service.exchangeCode(code);
    }
  };
}

export function createSocialAuthUseCases(service: SocialAuthService) {
  return {
    getSignInUrl(
      provider: SocialProvider,
      redirectTo: string
    ): Promise<string | undefined> {
      return service.getSignInUrl(provider, redirectTo);
    }
  };
}
