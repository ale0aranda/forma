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
    <div>
      <div className='space-y-3'>
        {gallery.map((item, index) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={item.id}
          >
            <div className='flex items-center justify-between gap-3'>
              <p className='font-medium text-sm'>Image {index + 1}</p>

              <div className='flex items-center gap-1'>
                <button
                  aria-label={`Move image ${index + 1} up`}
                  className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={index === 0}
                  onClick={() => onMove(item.id, 'up')}
                  type='button'
                >
                  ↑
                </button>

                <button
                  aria-label={`Move image ${index + 1} down`}
                  className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={index === gallery.length - 1}
                  onClick={() => onMove(item.id, 'down')}
                  type='button'
                >
                  ↓
                </button>

                <button
                  className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-red-50 hover:text-red-600'
                  onClick={() => onRemove(item.id)}
                  type='button'
                >
                  Remove
                </button>
              </div>
            </div>
            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Image URL
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'src', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={item.src}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Alt text
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'alt', event.target.value)
                }
                type='text'
                value={item.alt}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Caption
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'caption', event.target.value)
                }
                type='text'
                value={item.caption}
              />
            </label>

            <button
              className='mt-3 text-neutral-500 text-xs hover:text-red-600'
              onClick={() => onRemove(item.id)}
              type='button'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <p className='mb-4 text-neutral-500 text-sm'>
          You haven't added any images yet.
        </p>
      )}

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add image
      </button>
    </div>
  );
}
