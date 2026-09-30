import type { ProfileLink } from '@/lib/profile';

interface LinksEditorProps {
  links: ProfileLink[];
  onAdd: () => void;
  onUpdate: (id: string, field: 'label' | 'url', value: string) => void;
  onRemove: (id: string) => void;
}

export function LinksEditor({
  links,
  onAdd,
  onUpdate,
  onRemove
}: LinksEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {links.map((link) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={link.id}
          >
            <label className='block'>
              <span className='mb-2 block text-neutral-500 text-xs'>Label</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(link.id, 'label', event.target.value)
                }
                type='text'
                value={link.label}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>URL</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(link.id, 'url', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={link.url}
              />
            </label>

            <button
              className='mt-3 text-neutral-500 text-xs hover:text-red-600'
              onClick={() => onRemove(link.id)}
              type='button'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <p className='mb-4 text-neutral-500 text-sm'>
          You haven't added any links yet.
        </p>
      )}

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add link
      </button>
    </div>
  );
}
