import 'server-only';

import { getProfileConnections } from '../features/follows/application/queries/get-profile-connections';
import { supabaseProfileConnectionsRepository } from '../features/follows/infrastructure/repositories/supabase-profile-connections-repository';

import type { ProfileConnectionType } from '../features/follows/application/ports/profile-connections-repository';

export function loadProfileConnections(
  username: string,
  type: ProfileConnectionType
) {
  return getProfileConnections(
    supabaseProfileConnectionsRepository,
    username,
    type
  );
}
