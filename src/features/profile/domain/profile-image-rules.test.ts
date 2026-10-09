import { describe, expect, it } from 'vitest';

import {
  isAllowedProfileImageSize,
  isAllowedProfileImageType
} from './profile-image-rules';

describe('profile image rules', () => {
  it.each(['image/jpeg', 'image/png', 'image/webp'])('accepts %s', (type) => {
    expect(isAllowedProfileImageType({ type, size: 100 })).toBe(true);
  });

  it.each(['image/gif', 'image/svg+xml', 'application/pdf', ''])(
    'rejects unsupported type %s',
    (type) => {
      expect(isAllowedProfileImageType({ type, size: 100 })).toBe(false);
    }
  );

  it('accepts exactly 5 MiB and rejects one byte above the limit', () => {
    const limit = 5 * 1024 * 1024;

    expect(isAllowedProfileImageSize({ type: 'image/png', size: limit })).toBe(
      true
    );

    expect(
      isAllowedProfileImageSize({ type: 'image/png', size: limit + 1 })
    ).toBe(false);
  });
});
