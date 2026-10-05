import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';

import type { ReactNode } from 'react';

interface EditorItemProps {
  title: string;
  first: boolean;
  last: boolean;
  children: ReactNode;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

export function EditorItem({
  title,
  first,
  last,
  children,
  onMoveUp,
  onMoveDown,
  onRemove
}: EditorItemProps) {
  return (
    <div className='rounded-lg border border-neutral-200'>
      <div className='flex h-10 items-center justify-between border-neutral-100 border-b px-3'>
        <p className='min-w-0 truncate font-medium text-neutral-700 text-xs'>
          {title}
        </p>

        <div className='flex items-center gap-0.5'>
          <ItemButton
            disabled={first}
            label={`Move ${title} up`}
            onClick={onMoveUp}
          >
            <ArrowUp
              aria-hidden='true'
              size={12}
            />
          </ItemButton>

          <ItemButton
            disabled={last}
            label={`Move ${title} down`}
            onClick={onMoveDown}
          >
            <ArrowDown
              aria-hidden='true'
              size={12}
            />
          </ItemButton>

          <ItemButton
            danger
            label={`Remove ${title}`}
            onClick={onRemove}
          >
            <Trash2
              aria-hidden='true'
              size={12}
            />
          </ItemButton>
        </div>
      </div>

      <div className='space-y-3 p-3'>{children}</div>
    </div>
  );
}

interface ItemButtonProps {
  label: string;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
  onClick: () => void;
}

function ItemButton({
  label,
  disabled = false,
  danger = false,
  children,
  onClick
}: ItemButtonProps) {
  return (
    <button
      aria-label={label}
      className={`flex size-6 items-center justify-center rounded transition-colors disabled:cursor-not-allowed disabled:opacity-20 ${
        danger
          ? 'text-neutral-400 hover:bg-red-50 hover:text-red-600'
          : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-950'
      }`}
      disabled={disabled}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  );
}
