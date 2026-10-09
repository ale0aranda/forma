import { createClient } from '@/lib/supabase/client';

const avatarBucket = 'avatars';

const allowedAvatarTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const maxAvatarSize = 5 * 1024 * 1024;

export class AvatarError extends Error {}

export async function uploadAvatar(file: File): Promise<string> {
  if (!allowedAvatarTypes.has(file.type)) {
    throw new AvatarError('Use a JPEG, PNG or WebP image.');
  }

  if (file.size > maxAvatarSize) {
    throw new AvatarError('Avatar must be smaller than 5 MB.');
  }

  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new AvatarError('You are not authenticated.');
  }

  const extension = getAvatarExtension(file.type);
  const path = `${authData.user.id}/avatar.${extension}`;

  const { error } = await supabase.storage
    .from(avatarBucket)
    .upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: true
    });

  if (error) {
    throw new AvatarError('Could not upload your avatar.');
  }

  const { data } = supabase.storage.from(avatarBucket).getPublicUrl(path);

  return `${data.publicUrl}?v=${Date.now()}`;
}

export async function removeAvatar(avatarUrl: string) {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new AvatarError('You are not authenticated.');
  }

  const extension = getExtensionFromAvatarUrl(avatarUrl);

  if (!extension) {
    return;
  }

  const path = `${authData.user.id}/avatar.${extension}`;

  const { error } = await supabase.storage.from(avatarBucket).remove([path]);

  if (error) {
    throw new AvatarError('Could not remove your avatar.');
  }
}

function getAvatarExtension(type: string) {
  if (type === 'image/png') {
    return 'png';
  }

  if (type === 'image/webp') {
    return 'webp';
  }

  return 'jpg';
}

function getExtensionFromAvatarUrl(value: string) {
  try {
    const url = new URL(value);
    const pathname = url.pathname;

    if (pathname.endsWith('.png')) {
      return 'png';
    }

    if (pathname.endsWith('.webp')) {
      return 'webp';
    }

    if (pathname.endsWith('.jpg')) {
      return 'jpg';
    }

    return undefined;
  } catch {
    return undefined;
  }
}
