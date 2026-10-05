import { EditorField, EditorInput } from '@/components/profile/editor-field';
import { EditorItem } from '@/components/profile/editor-item';
import { SortableEditorList } from '@/components/profile/sortable-editor-list';

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
  onReorder: (activeId: string, overId: string) => void;
}

export function GalleryEditor({
  gallery,
  onAdd,
  onUpdate,
  onRemove,
  onReorder
}: GalleryEditorProps) {
  return (
    <div className='space-y-3'>
      <SortableEditorList
        ids={gallery.map((item) => item.id)}
        onReorder={onReorder}
      >
        <div className='space-y-3'>
          {gallery.map((item, index) => (
            <EditorItem
              id={item.id}
              key={item.id}
              onRemove={() => onRemove(item.id)}
              title={item.caption || `Image ${index + 1}`}
            >
              <EditorField label='Image URL'>
                <EditorInput
                  onChange={(event) =>
                    onUpdate(item.id, 'src', event.target.value)
                  }
                  placeholder='https://'
                  type='url'
                  value={item.src}
                />
              </EditorField>

              <EditorField label='Alt text'>
                <EditorInput
                  onChange={(event) =>
                    onUpdate(item.id, 'alt', event.target.value)
                  }
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
        </div>
      </SortableEditorList>

      {gallery.length === 0 && (
        <p className='py-3 text-center text-neutral-400 text-xs'>
          No images added yet.
        </p>
      )}

      <button
        className='w-full rounded-md border border-neutral-300 border-dashed px-3 py-2 text-neutral-500 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950'
        onClick={onAdd}
        type='button'
      >
        + Add image
      </button>
    </div>
  );
}
