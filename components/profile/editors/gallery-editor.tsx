import { EditorField, EditorInput } from '@/components/profile/editor-field';
import { EditorItem } from '@/components/profile/editor-item';

import type { ProfileGalleryItem } from '@/lib/profile';

interface GalleryEditorProps {
  gallery: ProfileGalleryItem[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: 'src' | 'alt' | 'caption',
    value: string
  ) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

export function GalleryEditor({
  gallery,
  onAdd,
  onUpdate,
  onRemove,
  onMove
}: GalleryEditorProps) {
  return (
    <div className='space-y-3'>
      {gallery.map((item, index) => (
        <EditorItem
          first={index === 0}
          key={item.id}
          last={index === gallery.length - 1}
          onMoveDown={() => onMove(item.id, 'down')}
          onMoveUp={() => onMove(item.id, 'up')}
          onRemove={() => onRemove(item.id)}
          title={item.caption || `Image ${index + 1}`}
        >
          <EditorField label='Image URL'>
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
              value={item.alt}
            />
          </EditorField>

          <EditorField label='Caption'>
            <EditorInput
              onChange={(event) =>
                onUpdate(item.id, 'caption', event.target.value)
              }
              value={item.caption}
            />
          </EditorField>
        </EditorItem>
      ))}

      {gallery.length === 0 && (
        <p className='py-3 text-center text-neutral-400 text-xs'>
          No images added yet.
        </p>
      )}

      <button
        className='w-full rounded-md border border-dashed border-neutral-300 px-3 py-2 text-neutral-500 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950'
        onClick={onAdd}
        type='button'
      >
        + Add image
      </button>
    </div>
  );
}
