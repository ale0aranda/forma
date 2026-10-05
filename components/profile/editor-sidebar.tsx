'use client';

import {
  ArrowDown,
  ArrowUp,
  BriefcaseBusiness,
  CircleUserRound,
  GalleryHorizontal,
  Link2,
  Palette,
  PanelsTopLeft,
  Settings2,
  Text,
  TextQuote,
  Zap
} from 'lucide-react';

import type { ProfileBlock, ProfileBlockSettings } from '@/lib/profile';

export type EditorSelection = ProfileBlock | 'profile' | 'design';

interface EditorSidebarProps {
  blocks: Record<ProfileBlock, ProfileBlockSettings>;
  blockOrder: ProfileBlock[];
  selected: EditorSelection;
  onMoveBlock: (block: ProfileBlock, direction: 'up' | 'down') => void;
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
  onMoveBlock,
  onSelect
}: EditorSidebarProps) {
  return (
    <aside className='flex w-56 shrink-0 flex-col border-neutral-200 border-r bg-white'>
      <div className='flex-1 overflow-y-auto p-3'>
        <SidebarSection label='Profile'>
          <SidebarButton
            active={selected === 'profile'}
            icon={Settings2}
            label='Settings'
            onClick={() => onSelect('profile')}
          />
        </SidebarSection>

        <SidebarSection label='Content'>
          <div className='space-y-0.5'>
            {blockOrder.map((block, index) => {
              const Icon = blockIcons[block];
              const visible = blocks[block].visible;

              return (
                <div
                  className={`group flex items-center rounded-md ${
                    selected === block
                      ? 'bg-neutral-100'
                      : 'hover:bg-neutral-50'
                  }`}
                  key={block}
                >
                  <button
                    className='flex min-w-0 flex-1 items-center gap-2.5 px-2 py-2 text-left'
                    onClick={() => onSelect(block)}
                    type='button'
                  >
                    <Icon
                      aria-hidden='true'
                      className={
                        selected === block
                          ? 'text-neutral-800'
                          : 'text-neutral-400'
                      }
                      size={15}
                    />

                    <span
                      className={`min-w-0 flex-1 truncate text-sm ${
                        selected === block
                          ? 'font-medium text-neutral-950'
                          : 'text-neutral-600'
                      }`}
                    >
                      {blockLabels[block]}
                    </span>

                    {!visible && (
                      <span className='size-1.5 shrink-0 rounded-full bg-neutral-300' />
                    )}
                  </button>

                  <div className='hidden items-center pr-1 group-hover:flex'>
                    <button
                      aria-label={`Move ${blockLabels[block]} up`}
                      className='flex size-6 items-center justify-center rounded text-neutral-400 hover:bg-white hover:text-neutral-950 disabled:opacity-20'
                      disabled={index === 0}
                      onClick={() => onMoveBlock(block, 'up')}
                      type='button'
                    >
                      <ArrowUp
                        aria-hidden='true'
                        size={12}
                      />
                    </button>

                    <button
                      aria-label={`Move ${blockLabels[block]} down`}
                      className='flex size-6 items-center justify-center rounded text-neutral-400 hover:bg-white hover:text-neutral-950 disabled:opacity-20'
                      disabled={index === blockOrder.length - 1}
                      onClick={() => onMoveBlock(block, 'down')}
                      type='button'
                    >
                      <ArrowDown
                        aria-hidden='true'
                        size={12}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </SidebarSection>

        <SidebarSection label='Design'>
          <SidebarButton
            active={selected === 'design'}
            icon={Palette}
            label='Appearance'
            onClick={() => onSelect('design')}
          />
        </SidebarSection>
      </div>

      <div className='border-neutral-200 border-t p-3'>
        <div className='flex items-center gap-2 px-2 py-1.5 text-neutral-400'>
          <Text
            aria-hidden='true'
            size={13}
          />
          <span className='text-xs'>Forma editor</span>
        </div>
      </div>
    </aside>
  );
}

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
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
