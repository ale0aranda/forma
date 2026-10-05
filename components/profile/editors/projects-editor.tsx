import {
  EditorField,
  EditorInput,
  EditorTextarea
} from '@/components/profile/editor-field';
import { EditorItem } from '@/components/profile/editor-item';
import { SortableEditorList } from '@/components/profile/sortable-editor-list';
import { isValidProfileUrl } from '@/lib/profile-validation';

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
  onReorder: (activeId: string, overId: string) => void;
}

export function ProjectsEditor({
  projects,
  onAdd,
  onUpdate,
  onRemove,
  onReorder
}: ProjectsEditorProps) {
  return (
    <div className='space-y-3'>
      <SortableEditorList
        ids={projects.map((project) => project.id)}
        onReorder={onReorder}
      >
        <div className='space-y-3'>
          {projects.map((project) => {
            const validUrl =
              !project.url.trim() || isValidProfileUrl(project.url);

            return (
              <EditorItem
                id={project.id}
                key={project.id}
                onRemove={() => onRemove(project.id)}
                title={project.name || 'Untitled project'}
              >
                <EditorField label='Name'>
                  <EditorInput
                    onChange={(event) =>
                      onUpdate(project.id, 'name', event.target.value)
                    }
                    value={project.name}
                  />
                </EditorField>

                <EditorField label='Description'>
                  <EditorTextarea
                    onChange={(event) =>
                      onUpdate(project.id, 'description', event.target.value)
                    }
                    value={project.description}
                  />
                </EditorField>

                <EditorField
                  hint={
                    validUrl ? undefined : 'Enter a valid http or https URL.'
                  }
                  label='URL'
                >
                  <EditorInput
                    aria-invalid={!validUrl}
                    className={
                      validUrl ? '' : 'border-red-300 focus:border-red-500'
                    }
                    onChange={(event) =>
                      onUpdate(project.id, 'url', event.target.value)
                    }
                    placeholder='https://'
                    type='url'
                    value={project.url}
                  />
                </EditorField>
              </EditorItem>
            );
          })}
        </div>
      </SortableEditorList>

      {projects.length === 0 && (
        <p className='py-3 text-center text-neutral-400 text-xs'>
          No projects added yet.
        </p>
      )}

      <button
        className='w-full rounded-md border border-neutral-300 border-dashed px-3 py-2 text-neutral-500 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950'
        onClick={onAdd}
        type='button'
      >
        + Add project
      </button>
    </div>
  );
}
