export type ProfileBlock =
  | 'identity'
  | 'about'
  | 'links'
  | 'projects'
  | 'experience'
  | 'gallery'
  | 'now';

export type ProfilePreset = 'minimal' | 'editorial' | 'blueprint';

export type ProfileTypography =
  | 'sans'
  | 'arial'
  | 'system'
  | 'serif'
  | 'times'
  | 'mono';

export type ProfileDensity = 'compact' | 'balanced' | 'airy';

export type ProfileRadius = 'square' | 'small' | 'rounded';

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

export interface ProfileGalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface ProfileBlockSettings {
  visible: boolean;
}

export interface ProfileDesign {
  preset: ProfilePreset;
  typography: ProfileTypography;
  density: ProfileDensity;
  radius: ProfileRadius;
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
  gallery: ProfileGalleryItem[];
  blocks: Record<ProfileBlock, ProfileBlockSettings>;
  blockOrder: ProfileBlock[];
  design: ProfileDesign;
}
