import 'server-only';

import { createClient } from '@/lib/supabase/server';

import type { SessionService } from '../application/session-service';

export const supabaseSessionService: SessionService = {
  async getUser() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return undefined;
    }

    return {
      id: data.user.id,
      email: data.user.email
    };
  },

  async isAuthenticated() {
    const user = await supabaseSessionService.getUser();

    return Boolean(user);
  },

  async hasVerifiedClaims() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    return Boolean(data?.claims);
  }
};
