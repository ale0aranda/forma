'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  BriefcaseBusiness,
  CircleUserRound,
  GalleryHorizontal,
  GripVertical,
  Link2,
  Palette,
  PanelsTopLeft,
  Settings2,
  Text,
  TextQuote,
  Zap
} from 'lucide-react';

import type { ReactNode } from 'react';
import type { ProfileBlock, ProfileBlockSettings } from '@/lib/profile';

export type EditorSelection = ProfileBlock | 'profile' | 'design';

interface EditorSidebarProps {
  blocks: Record<ProfileBlock, ProfileBlockSettings>;
  blockOrder: ProfileBlock[];
  selected: EditorSelection;
  mobile?: boolean;
  onReorderBlock: (active: ProfileBlock, over: ProfileBlock) => void;
  onSelect: (selection: EditorSelection) => void;
}

const blockLabels: Record<ProfileBlock, string> = {
  identity: 'Identity',
  about: 'About',
  links: 'Links',
  projects: 'Projects',
  experience: 'Experience',
  gallery: 'Gallery',
  now: 'Now'
};

const blockIcons = {
  identity: CircleUserRound,
  about: TextQuote,
  links: Link2,
  projects: PanelsTopLeft,
  experience: BriefcaseBusiness,
  gallery: GalleryHorizontal,
  now: Zap
} satisfies Record<ProfileBlock, typeof CircleUserRound>;

export function EditorSidebar({
  blocks,
  blockOrder,
  selected,
  mobile = false,
  onReorderBlock,
  onSelect
}: EditorSidebarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    onReorderBlock(active.id as ProfileBlock, over.id as ProfileBlock);
  }

  return (
    <aside
      className={
        mobile
          ? 'w-full bg-white'
          : 'flex w-56 shrink-0 flex-col border-neutral-200 border-r bg-white'
      }
    >
      <div className={mobile ? 'p-4' : 'flex-1 overflow-y-auto p-3'}>
        {!mobile && (
          <SidebarSection label='Profile'>
            <SidebarButton
              active={selected === 'profile'}
              icon={Settings2}
              label='Settings'
              onClick={() => onSelect('profile')}
            />
          </SidebarSection>
        )}

        <SidebarSection label='Content'>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={blockOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className='space-y-0.5'>
                {blockOrder.map((block) => (
                  <SortableBlock
                    block={block}
                    key={block}
                    onSelect={onSelect}
                    selected={selected === block}
                    visible={blocks[block].visible}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </SidebarSection>

        {!mobile && (
          <SidebarSection label='Design'>
            <SidebarButton
              active={selected === 'design'}
              icon={Palette}
              label='Appearance'
              onClick={() => onSelect('design')}
            />
          </SidebarSection>
        )}
      </div>

      {!mobile && (
        <div className='border-neutral-200 border-t p-3'>
          <div className='flex items-center gap-2 px-2 py-1.5 text-neutral-400'>
            <Text
              aria-hidden='true'
              size={13}
            />

            <span className='text-xs'>Forma editor</span>
          </div>
        </div>
      )}
    </aside>
  );
}

interface SortableBlockProps {
  block: ProfileBlock;
  selected: boolean;
  visible: boolean;
  onSelect: (selection: EditorSelection) => void;
}

function SortableBlock({
  block,
  selected,
  visible,
  onSelect
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: block
  });

  const Icon = blockIcons[block];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      className={`group flex items-center rounded-md ${
        selected ? 'bg-neutral-100' : 'hover:bg-neutral-50'
      } ${isDragging ? 'z-10 opacity-50' : ''}`}
      ref={setNodeRef}
      style={style}
    >
      <button
        aria-label={`Reorder ${blockLabels[block]}`}
        className='flex size-8 shrink-0 cursor-grab touch-none items-center justify-center text-neutral-300 transition-colors hover:text-neutral-600 active:cursor-grabbing'
        type='button'
        {...attributes}
        {...listeners}
      >
        <GripVertical
          aria-hidden='true'
          size={14}
        />
      </button>

      <button
        className='flex min-w-0 flex-1 items-center gap-2.5 py-2 pr-2 text-left'
        onClick={() => onSelect(block)}
        type='button'
      >
        <Icon
          aria-hidden='true'
          className={selected ? 'text-neutral-800' : 'text-neutral-400'}
          size={15}
        />

        <span
          className={`min-w-0 flex-1 truncate text-sm ${
            selected ? 'font-medium text-neutral-950' : 'text-neutral-600'
          }`}
        >
          {blockLabels[block]}
        </span>

        {!visible && (
          <span className='size-1.5 shrink-0 rounded-full bg-neutral-300' />
        )}
      </button>
    </div>
  );
}

interface SidebarSectionProps {
  label: string;
  children: ReactNode;
}

function SidebarSection({ label, children }: SidebarSectionProps) {
  return (
    <section className='mb-6'>
      <p className='mb-1.5 px-2 font-medium text-neutral-400 text-xs'>
        {label}
      </p>

      {children}
    </section>
  );
}

interface SidebarButtonProps {
  active: boolean;
  icon: typeof Settings2;
  label: string;
  onClick: () => void;
}

function SidebarButton({
  active,
  icon: Icon,
  label,
  onClick
}: SidebarButtonProps) {
  return (
    <button
      className={`flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm transition-colors ${
        active
          ? 'bg-neutral-100 font-medium text-neutral-950'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
      }`}
      onClick={onClick}
      type='button'
    >
      <Icon
        aria-hidden='true'
        className={active ? 'text-neutral-800' : 'text-neutral-400'}
        size={15}
      />

      {label}
    </button>
  );
}
