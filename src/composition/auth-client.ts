import { createSocialAuthUseCases } from '../features/auth/application/auth-use-cases';
import { supabaseSocialAuthService } from '../features/auth/infrastructure/supabase-social-auth-service';

export const socialAuthUseCases = createSocialAuthUseCases(
  supabaseSocialAuthService
);
