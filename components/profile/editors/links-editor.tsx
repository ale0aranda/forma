import type { ProfileLink } from '@/lib/profile';

interface LinksEditorProps {
  links: ProfileLink[];
  onAdd: () => void;
  onUpdate: (id: string, field: 'label' | 'url', value: string) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

export function LinksEditor({
  links,
  onAdd,
  onUpdate,
  onRemove,
  onMove
}: LinksEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {links.map((link, index) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={link.id}
          >
            <ItemActions
              first={index === 0}
              last={index === links.length - 1}
              label={link.label || 'Link'}
              onMoveDown={() => onMove(link.id, 'down')}
              onMoveUp={() => onMove(link.id, 'up')}
              onRemove={() => onRemove(link.id)}
            />

            <label className='mt-3 block'>
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

interface ItemActionsProps {
  label: string;
  first: boolean;
  last: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

function ItemActions({
  label,
  first,
  last,
  onMoveUp,
  onMoveDown,
  onRemove
}: ItemActionsProps) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <p className='truncate font-medium text-sm'>{label}</p>

      <div className='flex items-center gap-1'>
        <button
          aria-label={`Move ${label} up`}
          className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
          disabled={first}
          onClick={onMoveUp}
          type='button'
        >
          ↑
        </button>

        <button
          aria-label={`Move ${label} down`}
          className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
          disabled={last}
          onClick={onMoveDown}
          type='button'
        >
          ↓
        </button>

        <button
          className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-red-50 hover:text-red-600'
          onClick={onRemove}
          type='button'
        >
          Remove
        </button>
      </div>
    </div>
  );
}
