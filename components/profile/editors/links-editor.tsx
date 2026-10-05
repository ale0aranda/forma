import { EditorField, EditorInput } from '@/components/profile/editor-field';
import { EditorItem } from '@/components/profile/editor-item';
import { isValidProfileUrl } from '@/lib/profile-validation';

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
    <div className='space-y-3'>
      {links.map((link, index) => {
        const validUrl = isValidProfileUrl(link.url);

        return (
          <EditorItem
            first={index === 0}
            key={link.id}
            last={index === links.length - 1}
            onMoveDown={() => onMove(link.id, 'down')}
            onMoveUp={() => onMove(link.id, 'up')}
            onRemove={() => onRemove(link.id)}
            title={link.label || 'Untitled link'}
          >
            <EditorField label='Label'>
              <EditorInput
                onChange={(event) =>
                  onUpdate(link.id, 'label', event.target.value)
                }
                value={link.label}
              />
            </EditorField>

            <EditorField
              hint={validUrl ? undefined : 'Enter a valid http or https URL.'}
              label='URL'
            >
              <EditorInput
                aria-invalid={!validUrl}
                className={
                  validUrl ? '' : 'border-red-300 focus:border-red-500'
                }
                onChange={(event) =>
                  onUpdate(link.id, 'url', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={link.url}
              />
            </EditorField>
          </EditorItem>
        );
      })}

      {links.length === 0 && <EmptyItems>No links added yet.</EmptyItems>}

      <AddButton onClick={onAdd}>Add link</AddButton>
    </div>
  );
}

interface ButtonProps {
  children: string;
  onClick: () => void;
}

function AddButton({ children, onClick }: ButtonProps) {
  return (
    <button
      className='w-full rounded-md border border-dashed border-neutral-300 px-3 py-2 text-neutral-500 text-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950'
      onClick={onClick}
      type='button'
    >
      + {children}
    </button>
  );
}

interface EmptyItemsProps {
  children: string;
}

function EmptyItems({ children }: EmptyItemsProps) {
  return (
    <p className='py-3 text-center text-neutral-400 text-xs'>{children}</p>
  );
}
