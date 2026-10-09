import {
  isAllowedProfileImageSize,
  isAllowedProfileImageType
} from '../../domain/profile-image-rules';
import { AvatarError, GalleryImageError } from '../profile-media-errors';

import type { ProfileMediaStorage } from '../ports/profile-media-storage';

export function createProfileMediaUseCases(storage: ProfileMediaStorage) {
  return {
    async uploadAvatar(file: File): Promise<string> {
      if (!isAllowedProfileImageType(file)) {
        throw new AvatarError('Use a JPEG, PNG or WebP image.');
      }

      if (!isAllowedProfileImageSize(file)) {
        throw new AvatarError('Avatar must be smaller than 5 MB.');
      }

      return storage.uploadAvatar(file);
    },

    removeAvatar(avatarUrl: string): Promise<void> {
      return storage.removeAvatar(avatarUrl);
    },

    async uploadGalleryImage(file: File): Promise<string> {
      if (!isAllowedProfileImageType(file)) {
        throw new GalleryImageError('Use a JPEG, PNG or WebP image.');
      }

      if (!isAllowedProfileImageSize(file)) {
        throw new GalleryImageError('Image must be smaller than 5 MB.');
      }

      return storage.uploadGalleryImage(file);
    },

    removeGalleryImage(imageUrl: string): Promise<void> {
      return storage.removeGalleryImage(imageUrl);
    },

    isGalleryImageUrl(value: string): boolean {
      return storage.isGalleryImageUrl(value);
    }
  };
}
