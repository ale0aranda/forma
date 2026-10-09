'use client';

import { Camera, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

import {
  AvatarError,
  removeAvatar,
  uploadAvatar
} from '@/src/composition/profile-media';
import {
  EditorField,
  EditorInput,
  EditorTextarea
} from '@/src/features/profile/presentation/components/editor-field';
import { EditorSegmentedControl } from '@/src/features/profile/presentation/components/editor-segmented-control';

import type { ChangeEvent } from 'react';
import type {
  Profile,
  ProfileIdentityLayout
} from '@/src/features/profile/domain/profile';

interface IdentityEditorProps {
  identity: Profile['identity'];
  layout: ProfileIdentityLayout;
  onChangeLayout: (layout: ProfileIdentityLayout) => void;
  onUpdate: (field: keyof Profile['identity'], value: string) => void;
}

export function IdentityEditor({
  identity,
  layout,
  onChangeLayout,
  onUpdate
}: IdentityEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<string>();

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) {
      return;
    }

    setUploading(true);
    setError(undefined);

    try {
      const avatar = await uploadAvatar(file);

      onUpdate('avatar', avatar);
    } catch (caughtError) {
      if (caughtError instanceof AvatarError) {
        setError(caughtError.message);
      } else {
        setError('Could not upload your avatar.');
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (!identity.avatar) {
      return;
    }

    setUploading(true);
    setError(undefined);

    try {
      await removeAvatar(identity.avatar);

      onUpdate('avatar', '');
    } catch (caughtError) {
      if (caughtError instanceof AvatarError) {
        setError(caughtError.message);
      } else {
        setError('Could not remove your avatar.');
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className='space-y-5'>
      <EditorSegmentedControl
        label='Layout'
        onChange={onChangeLayout}
        options={[
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Centered',
            value: 'centered'
          }
        ]}
        value={layout}
      />

      <div>
        <p className='mb-2 font-medium text-neutral-600 text-xs'>Avatar</p>

        <div className='flex items-center gap-3'>
          <div className='flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-medium text-neutral-500 text-sm'>
            {identity.avatar ? (
              <picture>
                <source srcSet={identity.avatar} />

                <img
                  alt=''
                  className='size-14 object-cover'
                  height={56}
                  src={identity.avatar}
                  width={56}
                />
              </picture>
            ) : (
              getInitials(identity.name)
            )}
          </div>

          <div className='flex items-center gap-1'>
            <input
              accept='image/jpeg,image/png,image/webp'
              className='sr-only'
              onChange={(event) => {
                void handleFileChange(event);
              }}
              ref={inputRef}
              type='file'
            />

            <button
              className='flex items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 py-1.5 font-medium text-neutral-600 text-xs transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={uploading}
              onClick={() => {
                inputRef.current?.click();
              }}
              type='button'
            >
              <Camera
                aria-hidden='true'
                size={13}
              />

              {uploading
                ? 'Uploading...'
                : identity.avatar
                  ? 'Change'
                  : 'Upload'}
            </button>

            {identity.avatar && (
              <button
                aria-label='Remove avatar'
                className='flex size-7 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={uploading}
                onClick={() => {
                  void handleRemove();
                }}
                type='button'
              >
                <Trash2
                  aria-hidden='true'
                  size={13}
                />
              </button>
            )}
          </div>
        </div>

        <p className='mt-2 text-neutral-400 text-xs'>
          JPEG, PNG or WebP. Max 5 MB.
        </p>

        {error && <p className='mt-2 text-red-600 text-xs'>{error}</p>}
      </div>

      <EditorField label='Name'>
        <EditorInput
          onChange={(event) => onUpdate('name', event.target.value)}
          value={identity.name}
        />
      </EditorField>

      <EditorField label='Role'>
        <EditorInput
          onChange={(event) => onUpdate('role', event.target.value)}
          value={identity.role}
        />
      </EditorField>

      <EditorField label='Bio'>
        <EditorTextarea
          className='min-h-28'
          onChange={(event) => onUpdate('bio', event.target.value)}
          value={identity.bio}
        />
      </EditorField>
    </div>
  );
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return initials || '?';
}
