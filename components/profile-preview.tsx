import type { Profile, ProfileBlock, ProfilePreset } from '@/lib/profile';

interface ProfilePreviewProps {
  profile: Profile;
  selectedBlock: ProfileBlock | 'design';
  onSelectBlock: (block: ProfileBlock) => void;
}

const presetClasses: Record<ProfilePreset, string> = {
  minimal: 'rounded-xl border border-neutral-200 bg-white',
  editorial: 'border border-neutral-300 bg-white',
  blueprint: 'rounded-2xl border-2 border-neutral-900 bg-white'
};

interface ProfilePreviewBlockProps {
  block: ProfileBlock;
  profile: Profile;
  selected: boolean;
  onSelect: () => void;
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

        <article
          className={`overflow-hidden ${presetClasses[profile.design.preset]}`}
        >
          {profile.blockOrder.map((block) => {
            if (!profile.blocks[block].visible) {
              return null;
            }

            return (
              <ProfilePreviewBlock
                block={block}
                key={block}
                onSelect={() => onSelectBlock(block)}
                profile={profile}
                selected={selectedBlock === block}
              />
            );
          })}
        </article>
      </div>
    </section>
  );
}

function ProfilePreviewBlock({
  block,
  profile,
  selected,
  onSelect
}: ProfilePreviewBlockProps) {
  const className = `block w-full border-neutral-200 border-b p-10 text-left transition-colors last:border-b-0 ${
    selected ? 'bg-neutral-50' : 'hover:bg-neutral-50'
  }`;

  if (block === 'identity') {
    return (
      <button
        className={className}
        onClick={onSelect}
        type='button'
      >
        <p className='text-neutral-500 text-sm'>{profile.identity.role}</p>

        <h1 className='mt-2 font-semibold text-3xl tracking-tight'>
          {profile.identity.name}
        </h1>

        <p className='mt-4 max-w-lg text-neutral-600 leading-7'>
          {profile.identity.bio}
        </p>
      </button>
    );
  }

  if (block === 'about') {
    return (
      <button
        className={className}
        onClick={onSelect}
        type='button'
      >
        <h2 className='font-medium'>About</h2>

        <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
          {profile.about}
        </p>
      </button>
    );
  }

  if (block === 'links') {
    return (
      <button
        className={className}
        onClick={onSelect}
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
    );
  }

  if (block === 'projects') {
    return (
      <button
        className={className}
        onClick={onSelect}
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
          <p className='mt-3 text-neutral-400 text-sm'>No projects yet.</p>
        )}
      </button>
    );
  }

  if (block === 'experience') {
    return (
      <button
        className={className}
        onClick={onSelect}
        type='button'
      >
        <h2 className='font-medium'>Experience</h2>

        {profile.experience.length > 0 ? (
          <div className='mt-4 space-y-5'>
            {profile.experience.map((experience) => (
              <div key={experience.id}>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='font-medium'>
                      {experience.role || 'Untitled role'}
                    </p>

                    <p className='mt-1 text-neutral-500 text-sm'>
                      {experience.company || 'Company'}
                    </p>
                  </div>

                  {experience.period && (
                    <p className='shrink-0 text-neutral-400 text-xs'>
                      {experience.period}
                    </p>
                  )}
                </div>

                {experience.description && (
                  <p className='mt-2 text-neutral-500 text-sm leading-6'>
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-3 text-neutral-400 text-sm'>No experience yet.</p>
        )}
      </button>
    );
  }

  if (block === 'gallery') {
    return (
      <button
        className={className}
        onClick={onSelect}
        type='button'
      >
        <h2 className='font-medium'>Gallery</h2>

        {profile.gallery.length > 0 ? (
          <div className='mt-4 grid grid-cols-2 gap-3'>
            {profile.gallery.map((item) => (
              <div
                className='overflow-hidden rounded-lg border border-neutral-200'
                key={item.id}
              >
                {item.src ? (
                  <img
                    alt={item.alt}
                    className='aspect-square w-full object-cover'
                    src={item.src}
                  />
                ) : (
                  <div className='flex aspect-square items-center justify-center bg-neutral-100 text-neutral-400 text-xs'>
                    No image
                  </div>
                )}

                {item.caption && (
                  <p className='p-3 text-neutral-500 text-xs'>{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-3 text-neutral-400 text-sm'>No images yet.</p>
        )}
      </button>
    );
  }

  return (
    <button
      className={className}
      onClick={onSelect}
      type='button'
    >
      <h2 className='font-medium'>Now</h2>

      <p className='mt-3 max-w-lg text-neutral-600 leading-7'>{profile.now}</p>
    </button>
  );
}
