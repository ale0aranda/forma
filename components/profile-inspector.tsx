import type { Profile, ProfileBlock, ProfileLink } from '@/lib/profile';

interface ProfileInspectorProps {
  profile: Profile;
  selectedBlock: ProfileBlock;
  onUpdateIdentity: (field: keyof Profile['identity'], value: string) => void;
  onUpdateAbout: (value: string) => void;
  onUpdateNow: (value: string) => void;
  onAddLink: () => void;
  onUpdateLink: (id: string, field: 'label' | 'url', value: string) => void;
  onRemoveLink: (id: string) => void;
}

const blockLabels: Record<ProfileBlock, string> = {
  identity: 'Identity',
  about: 'About',
  links: 'Links',
  now: 'Now'
};

export function ProfileInspector({
  profile,
  selectedBlock,
  onUpdateIdentity,
  onUpdateAbout,
  onUpdateNow,
  onAddLink,
  onUpdateLink,
  onRemoveLink
}: ProfileInspectorProps) {
  return (
    <aside className='w-80 shrink-0 border-neutral-200 border-l bg-white p-6'>
      <div className='mb-8'>
        <p className='font-medium'>{blockLabels[selectedBlock]}</p>

        <p className='mt-1 text-neutral-500 text-sm'>Edit this block.</p>
      </div>

      {selectedBlock === 'identity' && (
        <div className='space-y-5'>
          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>Name</span>

            <input
              className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
              onChange={(event) => onUpdateIdentity('name', event.target.value)}
              type='text'
              value={profile.identity.name}
            />
          </label>

          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>Role</span>

            <input
              className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
              onChange={(event) => onUpdateIdentity('role', event.target.value)}
              type='text'
              value={profile.identity.role}
            />
          </label>

          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>Bio</span>

            <textarea
              className='min-h-28 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
              onChange={(event) => onUpdateIdentity('bio', event.target.value)}
              value={profile.identity.bio}
            />
          </label>
        </div>
      )}

      {selectedBlock === 'about' && (
        <label className='block'>
          <span className='mb-2 block text-neutral-600 text-sm'>About</span>

          <textarea
            className='min-h-40 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-6 outline-none transition-colors focus:border-neutral-400'
            onChange={(event) => onUpdateAbout(event.target.value)}
            value={profile.about}
          />
        </label>
      )}

      {selectedBlock === 'links' && (
        <LinksEditor
          links={profile.links}
          onAdd={onAddLink}
          onRemove={onRemoveLink}
          onUpdate={onUpdateLink}
        />
      )}

      {selectedBlock === 'now' && (
        <label className='block'>
          <span className='mb-2 block text-neutral-600 text-sm'>Now</span>

          <textarea
            className='min-h-32 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-6 outline-none transition-colors focus:border-neutral-400'
            onChange={(event) => onUpdateNow(event.target.value)}
            value={profile.now}
          />
        </label>
      )}
    </aside>
  );
}

interface LinksEditorProps {
  links: ProfileLink[];
  onAdd: () => void;
  onUpdate: (id: string, field: 'label' | 'url', value: string) => void;
  onRemove: (id: string) => void;
}

function LinksEditor({ links, onAdd, onUpdate, onRemove }: LinksEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {links.map((link) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={link.id}
          >
            <label className='block'>
              <span className='mb-2 block text-neutral-500 text-xs'>Label</span>

              <input
                className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(link.id, 'label', event.target.value)
                }
                type='text'
                value={link.label}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>URL</span>

              <input
                className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(link.id, 'url', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={link.url}
              />
            </label>

            <button
              className='mt-3 text-neutral-500 text-xs transition-colors hover:text-red-600'
              onClick={() => onRemove(link.id)}
              type='button'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <p className='mb-4 text-neutral-500 text-sm'>
          You haven't added any links yet.
        </p>
      )}

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add link
      </button>
    </div>
  );
}
