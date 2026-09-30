import type { ProfileBlock, ProfileBlockSettings } from '@/lib/profile';

interface EditorSidebarProps {
  blocks: Record<ProfileBlock, ProfileBlockSettings>;
  selectedBlock: ProfileBlock;
  onSelectBlock: (block: ProfileBlock) => void;
}

const blockOptions: {
  id: ProfileBlock;
  label: string;
}[] = [
  {
    id: 'identity',
    label: 'Identity'
  },
  {
    id: 'about',
    label: 'About'
  },
  {
    id: 'links',
    label: 'Links'
  },
  {
    id: 'projects',
    label: 'Projects'
  },
  {
    id: 'now',
    label: 'Now'
  }
];

export function EditorSidebar({
  blocks,
  selectedBlock,
  onSelectBlock
}: EditorSidebarProps) {
  return (
    <aside className='w-56 shrink-0 border-neutral-200 border-r bg-white p-4'>
      <nav>
        <p className='mb-2 px-2 text-neutral-400 text-xs uppercase tracking-wider'>
          Blocks
        </p>

        <div className='space-y-1'>
          {blockOptions.map((block) => {
            const visible = blocks[block.id].visible;

            return (
              <button
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedBlock === block.id
                    ? 'bg-neutral-100 font-medium text-neutral-950'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                }`}
                key={block.id}
                onClick={() => onSelectBlock(block.id)}
                type='button'
              >
                <span>{block.label}</span>

                {!visible && (
                  <span className='font-normal text-neutral-400 text-xs'>
                    Hidden
                  </span>
                )}
              </button>
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
          className='w-full rounded-lg px-3 py-2 text-left text-neutral-600 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
          type='button'
        >
          Preset
        </button>
      </nav>
    </aside>
  );
}
