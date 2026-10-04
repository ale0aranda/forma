import type { Profile } from '@/lib/profile';

const DRAFT_STORAGE_KEY = 'forma:profile-draft';
const PUBLISHED_STORAGE_KEY = 'forma:published-profiles';

export function getProfileDraft(): Profile | undefined {
  const value = window.localStorage.getItem(DRAFT_STORAGE_KEY);

  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as Profile;
  } catch {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);

    return undefined;
  }
}

export function saveProfileDraft(profile: Profile) {
  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(profile));
}

export function removeProfileDraft() {
  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
}

export function getPublishedProfile(username: string): Profile | undefined {
  const profiles = getPublishedProfiles();

  return profiles[username];
}

export function publishProfile(profile: Profile) {
  const profiles = getPublishedProfiles();

  profiles[profile.username] = profile;

  window.localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(profiles));
}

function getPublishedProfiles(): Record<string, Profile> {
  const value = window.localStorage.getItem(PUBLISHED_STORAGE_KEY);

  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value) as Record<string, Profile>;
  } catch {
    window.localStorage.removeItem(PUBLISHED_STORAGE_KEY);

    return {};
  }
}
