import type { ProfileProject } from '@/lib/profile';

interface ProjectsEditorProps {
  projects: ProfileProject[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: 'name' | 'description' | 'url',
    value: string
  ) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

export function ProjectsEditor({
  projects,
  onAdd,
  onUpdate,
  onRemove,
  onMove
}: ProjectsEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {projects.map((project, index) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={project.id}
          >
            <ItemActions
              first={index === 0}
              last={index === projects.length - 1}
              label={project.name || 'Project'}
              onMoveDown={() => onMove(project.id, 'down')}
              onMoveUp={() => onMove(project.id, 'up')}
              onRemove={() => onRemove(project.id)}
            />

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>Name</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(project.id, 'name', event.target.value)
                }
                type='text'
                value={project.name}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Description
              </span>

              <textarea
                className='min-h-24 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(project.id, 'description', event.target.value)
                }
                value={project.description}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>URL</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(project.id, 'url', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={project.url}
              />
            </label>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className='mb-4 text-neutral-500 text-sm'>
          You haven't added any projects yet.
        </p>
      )}

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add project
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
