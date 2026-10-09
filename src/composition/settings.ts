import 'server-only';

import { createAccountUseCases } from '../features/settings/application/account-service';
import { supabaseAccountService } from '../features/settings/infrastructure/supabase-account-service';

export const accountUseCases = createAccountUseCases(supabaseAccountService);
