'use client';

import { ImagePlus, LoaderCircle } from 'lucide-react';
import { useRef, useState } from 'react';

import {
  GalleryImageError,
  isGalleryImageUrl,
  removeGalleryImage,
  uploadGalleryImage
} from '@/lib/gallery';
import {
  EditorField,
  EditorInput
} from '@/src/features/profile/presentation/components/editor-field';
import { EditorItem } from '@/src/features/profile/presentation/components/editor-item';
import { EditorSegmentedControl } from '@/src/features/profile/presentation/components/editor-segmented-control';
import { SortableEditorList } from '@/src/features/profile/presentation/components/sortable-editor-list';

import type { ChangeEvent } from 'react';
import type {
  ProfileGalleryItem,
  ProfileGalleryLayout
} from '@/src/features/profile/domain/profile';

interface GalleryEditorProps {
  gallery: ProfileGalleryItem[];
  layout: ProfileGalleryLayout;
  onChangeLayout: (layout: ProfileGalleryLayout) => void;
  onAdd: (src: string) => void;
  onUpdate: (
    id: string,
    field: 'src' | 'alt' | 'caption',
    value: string
  ) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export function GalleryEditor({
  gallery,
  layout,
  onChangeLayout,
  onAdd,
  onUpdate,
  onRemove,
  onReorder
}: GalleryEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();

  async function handleAdd(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) {
      return;
    }

    setUploading(true);
    setError(undefined);

    try {
      const imageUrl = await uploadGalleryImage(file);

      onAdd(imageUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof GalleryImageError
          ? uploadError.message
          : 'Could not upload your image.'
      );
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
            label: 'Grid',
            value: 'grid'
          },
          {
            label: 'Featured',
            value: 'featured'
          }
        ]}
        value={layout}
      />

      <div className='space-y-3'>
        <SortableEditorList
          ids={gallery.map((item) => item.id)}
          onReorder={onReorder}
        >
          <div className='space-y-3'>
            {gallery.map((item, index) => (
              <GalleryEditorItem
                index={index}
                item={item}
                key={item.id}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </SortableEditorList>

        {gallery.length === 0 && (
          <p className='py-3 text-center text-neutral-400 text-xs'>
            No images added yet.
          </p>
        )}

        <input
          accept='image/jpeg,image/png,image/webp'
          className='sr-only'
          onChange={(event) => {
            void handleAdd(event);
          }}
          ref={inputRef}
          type='file'
        />

        <button
          className='flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 border-dashed px-3 py-2 text-neutral-500 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50'
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          type='button'
        >
          {uploading ? (
            <LoaderCircle
              aria-hidden='true'
              className='animate-spin'
              size={15}
            />
          ) : (
            <ImagePlus
              aria-hidden='true'
              size={15}
            />
          )}

          {uploading ? 'Uploading...' : 'Add image'}
        </button>

        {error && <p className='text-red-600 text-xs'>{error}</p>}
      </div>
    </div>
  );
}

interface GalleryEditorItemProps {
  item: ProfileGalleryItem;
  index: number;
  onUpdate: (
    id: string,
    field: 'src' | 'alt' | 'caption',
    value: string
  ) => void;
  onRemove: (id: string) => void;
}

function GalleryEditorItem({
  item,
  index,
  onUpdate,
  onRemove
}: GalleryEditorItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string>();

  async function handleReplace(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) {
      return;
    }

    setUploading(true);
    setError(undefined);

    try {
      const previousImage = item.src;
      const imageUrl = await uploadGalleryImage(file);

      onUpdate(item.id, 'src', imageUrl);

      if (previousImage && isGalleryImageUrl(previousImage)) {
        try {
          await removeGalleryImage(previousImage);
        } catch {}
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof GalleryImageError
          ? uploadError.message
          : 'Could not upload your image.'
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    setRemoving(true);
    setError(undefined);

    try {
      if (item.src && isGalleryImageUrl(item.src)) {
        await removeGalleryImage(item.src);
      }

      onRemove(item.id);
    } catch (removeError) {
      setError(
        removeError instanceof GalleryImageError
          ? removeError.message
          : 'Could not remove your image.'
      );
    } finally {
      setRemoving(false);
    }
  }

  return (
    <EditorItem
      id={item.id}
      onRemove={() => {
        void handleRemove();
      }}
      title={item.caption || `Image ${index + 1}`}
    >
      {item.src && (
        <div className='overflow-hidden rounded-md border border-neutral-200 bg-neutral-50'>
          <picture>
            <source srcSet={item.src} />

            <img
              alt={item.alt}
              className='aspect-video w-full object-cover'
              src={item.src}
            />
          </picture>
        </div>
      )}

      <input
        accept='image/jpeg,image/png,image/webp'
        className='sr-only'
        onChange={(event) => {
          void handleReplace(event);
        }}
        ref={inputRef}
        type='file'
      />

      <button
        className='flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 px-3 py-2 font-medium text-neutral-600 text-xs transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50'
        disabled={uploading || removing}
        onClick={() => inputRef.current?.click()}
        type='button'
      >
        {uploading ? (
          <LoaderCircle
            aria-hidden='true'
            className='animate-spin'
            size={14}
          />
        ) : (
          <ImagePlus
            aria-hidden='true'
            size={14}
          />
        )}

        {uploading ? 'Uploading...' : 'Replace image'}
      </button>

      <EditorField
        hint='You can also paste an external image URL.'
        label='Image URL'
      >
        <EditorInput
          onChange={(event) => onUpdate(item.id, 'src', event.target.value)}
          placeholder='https://'
          type='url'
          value={item.src}
        />
      </EditorField>

      <EditorField label='Alt text'>
        <EditorInput
          onChange={(event) => onUpdate(item.id, 'alt', event.target.value)}
          placeholder='Describe the image'
          value={item.alt}
        />
      </EditorField>

      <EditorField label='Caption'>
        <EditorInput
          onChange={(event) => onUpdate(item.id, 'caption', event.target.value)}
          placeholder='Optional caption'
          value={item.caption}
        />
      </EditorField>

      {error && <p className='text-red-600 text-xs'>{error}</p>}
    </EditorItem>
  );
}
