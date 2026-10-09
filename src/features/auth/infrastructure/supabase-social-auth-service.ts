import { createClient } from '@/src/infrastructure/supabase/client';

import type { SocialAuthService } from '../application/auth-service';

export const supabaseSocialAuthService: SocialAuthService = {
  async getSignInUrl(provider, redirectTo) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true
      }
    });

    return error || !data.url ? undefined : data.url;
  }
};
