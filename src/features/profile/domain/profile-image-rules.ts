interface ProfileImageMetadata {
  type: string;
  size: number;
}

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const maxImageSize = 5 * 1024 * 1024;

export function isAllowedProfileImageType(
  image: ProfileImageMetadata
): boolean {
  return allowedImageTypes.has(image.type);
}

export function isAllowedProfileImageSize(
  image: ProfileImageMetadata
): boolean {
  return image.size <= maxImageSize;
}
