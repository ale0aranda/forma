import { createBrowserClient } from '@supabase/ssr';

import {
  supabasePublishableKey,
  supabaseUrl
} from '@/src/infrastructure/supabase/env';

export function createClient() {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
