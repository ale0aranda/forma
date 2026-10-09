'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

import type { ReactNode } from 'react';

interface EditorItemProps {
  id: string;
  title: string;
  children: ReactNode;
  onRemove: () => void;
}

export function EditorItem({ id, title, children, onRemove }: EditorItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white ${
        isDragging ? 'z-10 opacity-50 shadow-sm' : ''
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div className='flex h-10 items-center justify-between border-neutral-100 border-b px-2'>
        <div className='flex min-w-0 items-center'>
          <button
            aria-label={`Reorder ${title}`}
            className='flex size-7 shrink-0 cursor-grab touch-none items-center justify-center text-neutral-300 transition-colors hover:text-neutral-600 active:cursor-grabbing'
            type='button'
            {...attributes}
            {...listeners}
          >
            <GripVertical
              aria-hidden='true'
              size={14}
            />
          </button>

          <p className='min-w-0 truncate font-medium text-neutral-700 text-xs'>
            {title}
          </p>
        </div>

        <button
          aria-label={`Remove ${title}`}
          className='flex size-7 shrink-0 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600'
          onClick={onRemove}
          type='button'
        >
          <Trash2
            aria-hidden='true'
            size={12}
          />
        </button>
      </div>

      <div className='space-y-3 p-3'>{children}</div>
    </div>
  );
}
