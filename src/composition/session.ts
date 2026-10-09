import 'server-only';

import {
  getSessionUser,
  hasVerifiedClaims,
  isAuthenticated
} from '../features/auth/application/session-service';
import { supabaseSessionService } from '../features/auth/infrastructure/supabase-session-service';

export function loadSessionUser() {
  return getSessionUser(supabaseSessionService);
}

export function loadAuthenticationState() {
  return isAuthenticated(supabaseSessionService);
}

export function loadVerifiedClaimsState() {
  return hasVerifiedClaims(supabaseSessionService);
}
