export type ProfileBlock =
  | 'identity'
  | 'about'
  | 'links'
  | 'projects'
  | 'experience'
  | 'now';

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

export interface ProfileExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
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
  experience: ProfileExperience[];
  blocks: Record<ProfileBlock, ProfileBlockSettings>;
  blockOrder: ProfileBlock[];
}
