import 'server-only';

import { createClient } from '@/lib/supabase/server';

import type { AccountService } from '../application/account-service';

export const supabaseAccountService: AccountService = {
  async deleteAccount() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return 'unauthenticated';
    }

    const { error } = await supabase.rpc('delete_account');

    if (error) {
      return 'failed';
    }

    await supabase.auth.signOut();

    return 'deleted';
  }
};
