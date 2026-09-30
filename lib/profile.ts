export type ProfileBlock = 'identity' | 'about' | 'links' | 'projects' | 'now';

export interface ProfileLink {
  id: string;
  label: string;
  url: string;
}

export interface ProfileProject {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface ProfileBlockSettings {
  visible: boolean;
}

export interface Profile {
  username: string;
  identity: {
    name: string;
    role: string;
    bio: string;
  };
  about: string;
  now: string;
  links: ProfileLink[];
  projects: ProfileProject[];
  blocks: Record<ProfileBlock, ProfileBlockSettings>;
}
