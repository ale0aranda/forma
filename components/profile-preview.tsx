import type { Profile, ProfileBlock } from '@/lib/profile';

interface ProfilePreviewProps {
  profile: Profile;
  selectedBlock: ProfileBlock;
  onSelectBlock: (block: ProfileBlock) => void;
}

export function ProfilePreview({
  profile,
  selectedBlock,
  onSelectBlock
}: ProfilePreviewProps) {
  return (
    <section className='flex min-w-0 flex-1 justify-center bg-neutral-50 p-10'>
      <div className='w-full max-w-2xl'>
        <div className='mb-3 flex items-center justify-between'>
          <p className='text-neutral-500 text-xs'>Preview</p>

          <p className='text-neutral-400 text-xs'>/{profile.username}</p>
        </div>

        <article className='overflow-hidden rounded-xl border border-neutral-200 bg-white'>
          {profile.blocks.identity.visible && (
            <button
              className={`block w-full p-10 text-left transition-colors ${
                selectedBlock === 'identity'
                  ? 'bg-neutral-50'
                  : 'hover:bg-neutral-50'
              }`}
              onClick={() => onSelectBlock('identity')}
              type='button'
            >
              <p className='text-neutral-500 text-sm'>
                {profile.identity.role}
              </p>

              <h1 className='mt-2 font-semibold text-3xl tracking-tight'>
                {profile.identity.name}
              </h1>

              <p className='mt-4 max-w-lg text-neutral-600 leading-7'>
                {profile.identity.bio}
              </p>
            </button>
          )}

          {profile.blocks.about.visible && (
            <button
              className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                selectedBlock === 'about'
                  ? 'bg-neutral-50'
                  : 'hover:bg-neutral-50'
              }`}
              onClick={() => onSelectBlock('about')}
              type='button'
            >
              <h2 className='font-medium'>About</h2>

              <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
                {profile.about}
              </p>
            </button>
          )}

          {profile.blocks.links.visible && (
            <button
              className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                selectedBlock === 'links'
                  ? 'bg-neutral-50'
                  : 'hover:bg-neutral-50'
              }`}
              onClick={() => onSelectBlock('links')}
              type='button'
            >
              <h2 className='font-medium'>Links</h2>

              {profile.links.length > 0 ? (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {profile.links.map((link) => (
                    <span
                      className='rounded-lg border border-neutral-200 px-3 py-2 text-neutral-700 text-sm'
                      key={link.id}
                    >
                      {link.label || 'Untitled'}
                    </span>
                  ))}
                </div>
              ) : (
                <p className='mt-3 text-neutral-400 text-sm'>No links yet.</p>
              )}
            </button>
          )}

          {profile.blocks.projects.visible && (
            <button
              className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                selectedBlock === 'projects'
                  ? 'bg-neutral-50'
                  : 'hover:bg-neutral-50'
              }`}
              onClick={() => onSelectBlock('projects')}
              type='button'
            >
              <h2 className='font-medium'>Projects</h2>

              {profile.projects.length > 0 ? (
                <div className='mt-4 space-y-3'>
                  {profile.projects.map((project) => (
                    <div
                      className='rounded-lg border border-neutral-200 p-4'
                      key={project.id}
                    >
                      <p className='font-medium'>
                        {project.name || 'Untitled project'}
                      </p>

                      {project.description && (
                        <p className='mt-1 text-neutral-500 text-sm leading-6'>
                          {project.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className='mt-3 text-neutral-400 text-sm'>
                  No projects yet.
                </p>
              )}
            </button>
          )}

          {profile.blocks.now.visible && (
            <button
              className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                selectedBlock === 'now'
                  ? 'bg-neutral-50'
                  : 'hover:bg-neutral-50'
              }`}
              onClick={() => onSelectBlock('now')}
              type='button'
            >
              <h2 className='font-medium'>Now</h2>

              <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
                {profile.now}
              </p>
            </button>
          )}
        </article>
      </div>
    </section>
  );
}
