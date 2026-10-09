import type { Profile, ProfileLayouts } from './profile';

export const defaultProfileLayouts: ProfileLayouts = {
  identity: 'left',
  projects: 'list',
  gallery: 'grid'
};

const profiles: Profile[] = [
  {
    username: 'john-doe',
    identity: {
      name: 'John Doe',
      role: 'Bot',
      bio: 'A simple profile to get started.'
    },
    about: 'Share a little about yourself and what you are working on.',
    now: 'Exploring new ideas.',
    links: [],
    projects: [
      {
        id: 'project',
        name: 'Your project',
        description: 'Add a project you want to share.',
        url: ''
      }
    ],
    experience: [],
    gallery: [],
    blocks: {
      identity: {
        visible: true
      },
      about: {
        visible: true
      },
      links: {
        visible: true
      },
      projects: {
        visible: true
      },
      experience: {
        visible: true
      },
      gallery: {
        visible: true
      },
      now: {
        visible: true
      }
    },
    blockOrder: [
      'identity',
      'about',
      'links',
      'projects',
      'experience',
      'gallery',
      'now'
    ],
    design: {
      preset: 'minimal',
      typography: 'system',
      appearance: 'light',
      palette: 'mono',
      density: 'airy',
      radius: 'small',
      borders: 'subtle'
    },
    layouts: {
      ...defaultProfileLayouts
    }
  }
];

export function getDefaultProfile(): Profile {
  const profile = profiles[0];

  if (!profile) {
    throw new Error('Default profile not found');
  }

  return structuredClone(profile);
}

export function getProfileLayouts(profile: Profile): ProfileLayouts {
  return {
    ...defaultProfileLayouts,
    ...profile.layouts
  };
}
