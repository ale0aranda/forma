import type {
  ProfileAppearance,
  ProfileBorders,
  ProfileDensity,
  ProfilePalette,
  ProfileRadius,
  ProfileTypography
} from '@/src/features/profile/domain/profile';

export type ProfileViewport = 'responsive' | 'desktop' | 'tablet' | 'mobile';

export const typographyClasses: Record<ProfileTypography, string> = {
  sans: 'font-profile-sans',
  arial: 'font-profile-arial',
  system: 'font-profile-system',
  serif: 'font-profile-serif',
  times: 'font-profile-times',
  mono: 'font-profile-mono'
};

export const radiusClasses: Record<ProfileRadius, string> = {
  square: 'rounded-none',
  small: 'rounded-lg',
  rounded: 'rounded-2xl'
};

export const cardPaddingClasses: Record<ProfileDensity, string> = {
  compact: 'p-5',
  balanced: 'p-6',
  airy: 'p-7'
};

export const cardGapClasses: Record<ProfileDensity, string> = {
  compact: 'gap-3',
  balanced: 'gap-4',
  airy: 'gap-5'
};

export const borderClasses: Record<ProfileBorders, string> = {
  none: 'border-transparent',
  subtle: 'border-current/10',
  strong: 'border-current/25'
};

export const appearanceClasses: Record<
  ProfileAppearance,
  Record<ProfilePalette, string>
> = {
  light: {
    mono: 'bg-white text-neutral-950',
    paper: 'bg-stone-100 text-stone-900',
    forest: 'bg-emerald-50 text-emerald-950',
    blue: 'bg-sky-50 text-slate-950'
  },
  dark: {
    mono: 'bg-neutral-950 text-neutral-100',
    paper: 'bg-stone-900 text-stone-100',
    forest: 'bg-emerald-950 text-emerald-50',
    blue: 'bg-slate-950 text-sky-50'
  }
};
