import { createProfileMediaUseCases } from '../features/profile/application/commands/profile-media';
import {
  removeAvatar as removeStoredAvatar,
  uploadAvatar as uploadStoredAvatar
} from '../features/profile/infrastructure/storage/supabase-avatar-storage';
import {
  isGalleryImageUrl as isStoredGalleryImageUrl,
  removeGalleryImage as removeStoredGalleryImage,
  uploadGalleryImage as uploadStoredGalleryImage
} from '../features/profile/infrastructure/storage/supabase-gallery-storage';

import type { ProfileMediaStorage } from '../features/profile/application/ports/profile-media-storage';

export {
  AvatarError,
  GalleryImageError
} from '../features/profile/application/profile-media-errors';

const storage: ProfileMediaStorage = {
  uploadAvatar: uploadStoredAvatar,
  removeAvatar: removeStoredAvatar,
  uploadGalleryImage: uploadStoredGalleryImage,
  removeGalleryImage: removeStoredGalleryImage,
  isGalleryImageUrl: isStoredGalleryImageUrl
};

export const {
  uploadAvatar,
  removeAvatar,
  uploadGalleryImage,
  removeGalleryImage,
  isGalleryImageUrl
} = createProfileMediaUseCases(storage);
