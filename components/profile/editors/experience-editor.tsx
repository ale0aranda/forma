import type { ProfileExperience } from '@/lib/profile';

interface ExperienceEditorProps {
  experience: ProfileExperience[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: 'company' | 'role' | 'period' | 'description',
    value: string
  ) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

export function ExperienceEditor({
  experience,
  onAdd,
  onUpdate,
  onRemove,
  onMove
}: ExperienceEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {experience.map((item, index) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={item.id}
          >
            <div className='flex items-center justify-between gap-3'>
              <p className='truncate font-medium text-sm'>
                {item.role || 'Experience'}
              </p>

              <div className='flex items-center gap-1'>
                <button
                  aria-label={`Move ${item.role || 'experience'} up`}
                  className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={index === 0}
                  onClick={() => onMove(item.id, 'up')}
                  type='button'
                >
                  ↑
                </button>

                <button
                  aria-label={`Move ${item.role || 'experience'} down`}
                  className='rounded-md px-2 py-1 text-neutral-400 text-xs hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={index === experience.length - 1}
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
                Company
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'company', event.target.value)
                }
                type='text'
                value={item.company}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>Role</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'role', event.target.value)
                }
                type='text'
                value={item.role}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Period
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'period', event.target.value)
                }
                placeholder='2025 — Present'
                type='text'
                value={item.period}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Description
              </span>

              <textarea
                className='min-h-24 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'description', event.target.value)
                }
                value={item.description}
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

      {experience.length === 0 && (
        <p className='mb-4 text-neutral-500 text-sm'>
          You haven't added any experience yet.
        </p>
      )}

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add experience
      </button>
    </div>
  );
}
