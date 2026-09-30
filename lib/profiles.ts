import type { Profile } from '@/lib/profile';

const profiles: Profile[] = [
  {
    username: 'alejandro',
    identity: {
      name: 'Alejandro Aranda',
      role: 'Software Engineer',
      bio: 'I build things for the web.'
    },
    about:
      'Interested in software engineering, open source and learning by building.',
    now: 'Building Forma.',
    links: [
      {
        id: 'github',
        label: 'GitHub',
        url: 'https://github.com/ale0aranda'
      }
    ],
    projects: [
      {
        id: 'forma',
        name: 'Forma',
        description:
          'A customizable profile builder for creating personal pages.',
        url: ''
      }
    ],
    experience: [],
    gallery: [],
    blocks: {
      identity: { visible: true },
      about: { visible: true },
      links: { visible: true },
      projects: { visible: true },
      experience: { visible: true },
      gallery: { visible: true },
      now: { visible: true }
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
    }
  }
];

export function getProfile(username: string): Profile | undefined {
  return profiles.find((profile) => profile.username === username);
}

export function getDefaultProfile(): Profile {
  const profile = profiles[0];

  if (!profile) {
    throw new Error('Default profile not found');
  }

  return profile;
}
