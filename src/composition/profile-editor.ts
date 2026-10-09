import { publishProfile } from '../features/profile/application/commands/publish-profile';
import { saveProfile } from '../features/profile/application/commands/save-profile';
import { loadProfile } from '../features/profile/application/queries/load-profile';
import { supabaseProfileRepository } from '../features/profile/infrastructure/repositories/supabase-profile-repository';

import type { Profile } from '../features/profile/domain/profile';

export const profileEditorUseCases = {
  load(initialProfile: Profile) {
    return loadProfile(supabaseProfileRepository, initialProfile);
  },
  save(profile: Profile) {
    return saveProfile(supabaseProfileRepository, profile);
  },
  publish(profile: Profile) {
    return publishProfile(supabaseProfileRepository, profile);
  }
};
