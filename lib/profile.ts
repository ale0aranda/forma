export interface ProfileLink {
  id: string;
  label: string;
  url: string;
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
}
