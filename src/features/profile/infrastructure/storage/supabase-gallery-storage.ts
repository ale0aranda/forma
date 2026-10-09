import { createClient } from '@/src/infrastructure/supabase/client';

import { GalleryImageError } from '../../application/profile-media-errors';

const galleryBucket = 'gallery';

const allowedGalleryTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const maxGalleryImageSize = 5 * 1024 * 1024;

export async function uploadGalleryImage(file: File): Promise<string> {
  if (!allowedGalleryTypes.has(file.type)) {
    throw new GalleryImageError('Use a JPEG, PNG or WebP image.');
  }

  if (file.size > maxGalleryImageSize) {
    throw new GalleryImageError('Image must be smaller than 5 MB.');
  }

  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new GalleryImageError('You are not authenticated.');
  }

  const extension = getGalleryExtension(file.type);
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const path = `${authData.user.id}/${fileName}`;

  const { error } = await supabase.storage
    .from(galleryBucket)
    .upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false
    });

  if (error) {
    throw new GalleryImageError('Could not upload your image.');
  }

  const { data } = supabase.storage.from(galleryBucket).getPublicUrl(path);

  return data.publicUrl;
}

export async function removeGalleryImage(imageUrl: string) {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new GalleryImageError('You are not authenticated.');
  }

  const path = getGalleryPath(imageUrl);

  if (!path) {
    return;
  }

  if (!path.startsWith(`${authData.user.id}/`)) {
    return;
  }

  const { error } = await supabase.storage.from(galleryBucket).remove([path]);

  if (error) {
    throw new GalleryImageError('Could not remove your image.');
  }
}

export function isGalleryImageUrl(value: string) {
  return getGalleryPath(value) !== undefined;
}

function getGalleryExtension(type: string) {
  if (type === 'image/png') {
    return 'png';
  }

  if (type === 'image/webp') {
    return 'webp';
  }

  return 'jpg';
}

function getGalleryPath(value: string) {
  try {
    const url = new URL(value);
    const marker = `/storage/v1/object/public/${galleryBucket}/`;
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) {
      return undefined;
    }

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  } catch {
    return undefined;
  }
}
