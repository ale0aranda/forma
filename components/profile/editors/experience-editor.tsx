import {
  EditorField,
  EditorInput,
  EditorTextarea
} from '@/components/profile/editor-field';
import { EditorItem } from '@/components/profile/editor-item';

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
    <div className='space-y-3'>
      {experience.map((item, index) => (
        <EditorItem
          first={index === 0}
          key={item.id}
          last={index === experience.length - 1}
          onMoveDown={() => onMove(item.id, 'down')}
          onMoveUp={() => onMove(item.id, 'up')}
          onRemove={() => onRemove(item.id)}
          title={item.role || 'Untitled experience'}
        >
          <EditorField label='Company'>
            <EditorInput
              onChange={(event) =>
                onUpdate(item.id, 'company', event.target.value)
              }
              value={item.company}
            />
          </EditorField>

          <EditorField label='Role'>
            <EditorInput
              onChange={(event) =>
                onUpdate(item.id, 'role', event.target.value)
              }
              value={item.role}
            />
          </EditorField>

          <EditorField label='Period'>
            <EditorInput
              onChange={(event) =>
                onUpdate(item.id, 'period', event.target.value)
              }
              placeholder='2025 — Present'
              value={item.period}
            />
          </EditorField>

          <EditorField label='Description'>
            <EditorTextarea
              onChange={(event) =>
                onUpdate(item.id, 'description', event.target.value)
              }
              value={item.description}
            />
          </EditorField>
        </EditorItem>
      ))}

      {experience.length === 0 && (
        <p className='py-3 text-center text-neutral-400 text-xs'>
          No experience added yet.
        </p>
      )}

      <button
        className='w-full rounded-md border border-neutral-300 border-dashed px-3 py-2 text-neutral-500 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950'
        onClick={onAdd}
        type='button'
      >
        + Add experience
      </button>
    </div>
  );
}
