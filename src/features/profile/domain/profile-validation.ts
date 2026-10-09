import type { Profile } from './profile';

const usernamePattern = /^[a-z0-9_-]{3,30}$/;

export function isValidUsername(username: string) {
  return usernamePattern.test(username);
}

export function isValidProfileUrl(value: string) {
  if (!value.trim()) {
    return false;
  }

  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidProfile(profile: Profile) {
  if (!isValidUsername(profile.username)) {
    return false;
  }

  if (!profile.identity.name.trim()) {
    return false;
  }

  const validLinks = profile.links.every(
    (link) => link.label.trim() && isValidProfileUrl(link.url)
  );

  if (!validLinks) {
    return false;
  }

  const validProjects = profile.projects.every(
    (project) =>
      project.name.trim()
      && (!project.url.trim() || isValidProfileUrl(project.url))
  );

  if (!validProjects) {
    return false;
  }

  return true;
}
