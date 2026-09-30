import type { ProfileBlock, ProfileBlockSettings } from '@/lib/profile';

export type EditorSelection = ProfileBlock | 'design';

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

export function EditorSidebar({
  blocks,
  blockOrder,
  selected,
  onMoveBlock,
  onSelect
}: EditorSidebarProps) {
  return (
    <aside className='w-56 shrink-0 border-neutral-200 border-r bg-white p-4'>
      <nav>
        <p className='mb-2 px-2 text-neutral-400 text-xs uppercase tracking-wider'>
          Blocks
        </p>

        <div className='space-y-1'>
          {blockOrder.map((block, index) => {
            const visible = blocks[block].visible;
            const first = index === 0;
            const last = index === blockOrder.length - 1;

            return (
              <div
                className={`flex items-center rounded-lg transition-colors ${
                  selected === block ? 'bg-neutral-100' : 'hover:bg-neutral-50'
                }`}
                key={block}
              >
                <button
                  className={`min-w-0 flex-1 px-3 py-2 text-left text-sm ${
                    selected === block
                      ? 'font-medium text-neutral-950'
                      : 'text-neutral-600'
                  }`}
                  onClick={() => onSelect(block)}
                  type='button'
                >
                  <span className='flex items-center justify-between gap-2'>
                    <span>{blockLabels[block]}</span>

                    {!visible && (
                      <span className='font-normal text-neutral-400 text-xs'>
                        Hidden
                      </span>
                    )}
                  </span>
                </button>

                <div className='flex pr-1'>
                  <button
                    aria-label={`Move ${blockLabels[block]} up`}
                    className='px-1 text-neutral-400 text-xs hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
                    disabled={first}
                    onClick={() => onMoveBlock(block, 'up')}
                    type='button'
                  >
                    ↑
                  </button>

                  <button
                    aria-label={`Move ${blockLabels[block]} down`}
                    className='px-1 text-neutral-400 text-xs hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
                    disabled={last}
                    onClick={() => onMoveBlock(block, 'down')}
                    type='button'
                  >
                    ↓
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className='my-5 border-neutral-200 border-t' />

      <nav>
        <p className='mb-2 px-2 text-neutral-400 text-xs uppercase tracking-wider'>
          Design
        </p>

        <button
          className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
            selected === 'design'
              ? 'bg-neutral-100 font-medium text-neutral-950'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
          }`}
          onClick={() => onSelect('design')}
          type='button'
        >
          Preset
        </button>
      </nav>
    </aside>
  );
}
