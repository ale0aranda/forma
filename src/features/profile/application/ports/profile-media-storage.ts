export interface ProfileMediaStorage {
  uploadAvatar(file: File): Promise<string>;
  removeAvatar(avatarUrl: string): Promise<void>;
  uploadGalleryImage(file: File): Promise<string>;
  removeGalleryImage(imageUrl: string): Promise<void>;
  isGalleryImageUrl(value: string): boolean;
}
