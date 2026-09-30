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
}

export function ProjectsEditor({
  projects,
  onAdd,
  onUpdate,
  onRemove
}: ProjectsEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {projects.map((project) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={project.id}
          >
            <label className='block'>
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

            <button
              className='mt-3 text-neutral-500 text-xs hover:text-red-600'
              onClick={() => onRemove(project.id)}
              type='button'
            >
              Remove
            </button>
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
