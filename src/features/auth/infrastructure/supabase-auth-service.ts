import 'server-only';

import { createClient } from '@/src/infrastructure/supabase/server';

import type { AuthService } from '../application/auth-service';

export const supabaseAuthService: AuthService = {
  async login(credentials) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(credentials);

    return !error;
  },

  async signup(credentials) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(credentials);

    return !error;
  },

  async logout() {
    const supabase = await createClient();

    await supabase.auth.signOut();
  },

  async exchangeCode(code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    return !error;
  }
};
