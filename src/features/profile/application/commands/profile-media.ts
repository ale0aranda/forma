import type { ProfileMediaStorage } from '../ports/profile-media-storage';

export function createProfileMediaUseCases(storage: ProfileMediaStorage) {
  return {
    uploadAvatar(file: File): Promise<string> {
      return storage.uploadAvatar(file);
    },
    removeAvatar(avatarUrl: string): Promise<void> {
      return storage.removeAvatar(avatarUrl);
    },
    uploadGalleryImage(file: File): Promise<string> {
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
