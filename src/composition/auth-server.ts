import 'server-only';

import { createAuthUseCases } from '../features/auth/application/auth-use-cases';
import { supabaseAuthService } from '../features/auth/infrastructure/supabase-auth-service';

export const authUseCases = createAuthUseCases(supabaseAuthService);
