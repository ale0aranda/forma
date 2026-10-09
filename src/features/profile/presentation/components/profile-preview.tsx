'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { ProfileRenderer } from '@/src/features/profile/presentation/components/profile-renderer';

import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfilePalette
} from '@/src/features/profile/domain/profile';
import type { ProfileViewport } from './renderer/styles';

interface ProfilePreviewProps {
  profile: Profile;
  compact?: boolean;
  selectedBlock?: ProfileBlock | undefined;
  onSelectBlock?: ((block: ProfileBlock) => void) | undefined;
}

type PreviewMode = Exclude<ProfileViewport, 'responsive'>;

const previewBackgroundClasses: Record<
  ProfileAppearance,
  Record<ProfilePalette, string>
> = {
  light: {
    mono: 'bg-white',
    paper: 'bg-stone-100',
    forest: 'bg-emerald-50',
    blue: 'bg-sky-50'
  },
  dark: {
    mono: 'bg-neutral-950',
    paper: 'bg-stone-900',
    forest: 'bg-emerald-950',
    blue: 'bg-slate-950'
  }
};

const previewWidthClasses: Record<PreviewMode, string> = {
  desktop: 'max-w-4xl',
  tablet: 'max-w-2xl',
  mobile: 'max-w-sm'
};

const previewPaddingClasses: Record<PreviewMode, string> = {
  desktop: 'px-10 py-12',
  tablet: 'px-8 py-10',
  mobile: 'px-5 py-8'
};

export function ProfilePreview({
  profile,
  compact = false,
  selectedBlock,
  onSelectBlock
}: ProfilePreviewProps) {
  const [mode, setMode] = useState<PreviewMode>('desktop');

  const { design } = profile;

  const activeMode = compact ? 'mobile' : mode;

  return (
    <section className='h-full min-w-0 flex-1 overflow-auto bg-neutral-100'>
      {!compact && (
        <div className='sticky top-0 z-30 flex h-10 items-center border-neutral-200 border-b bg-neutral-100 px-4'>
          <div className='flex items-center gap-2 text-neutral-500'>
            <Monitor
              aria-hidden='true'
              size={13}
            />

            <span className='text-xs'>Preview</span>
          </div>

          <div className='absolute left-1/2 flex -translate-x-1/2 items-center rounded-md border border-neutral-200 bg-white p-0.5'>
            <PreviewModeButton
              active={mode === 'desktop'}
              label='Desktop'
              onClick={() => setMode('desktop')}
            >
              <Monitor
                aria-hidden='true'
                size={14}
              />
            </PreviewModeButton>

            <PreviewModeButton
              active={mode === 'tablet'}
              label='Tablet'
              onClick={() => setMode('tablet')}
            >
              <Tablet
                aria-hidden='true'
                size={14}
              />
            </PreviewModeButton>

            <PreviewModeButton
              active={mode === 'mobile'}
              label='Mobile'
              onClick={() => setMode('mobile')}
            >
              <Smartphone
                aria-hidden='true'
                size={14}
              />
            </PreviewModeButton>
          </div>

          <span className='ml-auto text-neutral-400 text-xs'>
            /{profile.username}
          </span>
        </div>
      )}

      <div className={compact ? 'p-3' : 'p-8'}>
        <div
          className={`mx-auto w-full overflow-hidden border border-neutral-200 bg-white shadow-sm transition-all duration-300 ${
            compact
              ? 'max-w-sm rounded-lg'
              : `rounded-lg ${previewWidthClasses[activeMode]}`
          }`}
        >
          <div
            className={`min-h-screen transition-all duration-300 ${
              compact ? 'px-5 py-8' : previewPaddingClasses[activeMode]
            } ${previewBackgroundClasses[design.appearance][design.palette]}`}
          >
            <div className='mx-auto w-full max-w-3xl'>
              <ProfileRenderer
                onSelectBlock={onSelectBlock}
                profile={profile}
                selectedBlock={selectedBlock}
                viewport={activeMode}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PreviewModeButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}

function PreviewModeButton({
  active,
  label,
  onClick,
  children
}: PreviewModeButtonProps) {
  return (
    <button
      aria-label={`${label} preview`}
      aria-pressed={active}
      className={`flex size-7 items-center justify-center rounded text-xs transition-colors ${
        active
          ? 'bg-neutral-100 text-neutral-950'
          : 'text-neutral-400 hover:text-neutral-700'
      }`}
      onClick={onClick}
      title={label}
      type='button'
    >
      {children}
    </button>
  );
}
