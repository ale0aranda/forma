import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfileBorders,
  ProfileDensity,
  ProfilePalette,
  ProfilePreset,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface ProfileRendererProps {
  profile: Profile;
}

const typographyClasses: Record<ProfileTypography, string> = {
  sans: 'font-profile-sans',
  arial: 'font-profile-arial',
  system: 'font-profile-system',
  serif: 'font-profile-serif',
  times: 'font-profile-times',
  mono: 'font-profile-mono'
};

const radiusClasses: Record<ProfileRadius, string> = {
  square: 'rounded-none',
  small: 'rounded-md',
  rounded: 'rounded-2xl'
};

const blockPaddingClasses: Record<ProfileDensity, string> = {
  compact: 'p-6',
  balanced: 'p-10',
  airy: 'p-14'
};

const itemGapClasses: Record<ProfileDensity, string> = {
  compact: 'space-y-2',
  balanced: 'space-y-3',
  airy: 'space-y-5'
};

const borderClasses: Record<ProfileBorders, string> = {
  none: 'border-transparent',
  subtle: 'border-current/10',
  strong: 'border-current/30'
};

const appearanceClasses: Record<
  ProfileAppearance,
  Record<ProfilePalette, string>
> = {
  light: {
    mono: 'bg-white text-neutral-950',
    paper: 'bg-stone-100 text-stone-900',
    forest: 'bg-emerald-50 text-emerald-950',
    blue: 'bg-sky-50 text-slate-950'
  },
  dark: {
    mono: 'bg-neutral-950 text-neutral-100',
    paper: 'bg-stone-900 text-stone-100',
    forest: 'bg-emerald-950 text-emerald-50',
    blue: 'bg-slate-950 text-sky-50'
  }
};

const presetClasses: Record<ProfilePreset, string> = {
  minimal: '',
  editorial: 'tracking-tight',
  blueprint: 'border-2'
};

export function ProfileRenderer({ profile }: ProfileRendererProps) {
  const { design } = profile;

  return (
    <article
      className={`overflow-hidden border ${
        typographyClasses[design.typography]
      } ${
        appearanceClasses[design.appearance][design.palette]
      } ${radiusClasses[design.radius]} ${
        borderClasses[design.borders]
      } ${presetClasses[design.preset]}`}
    >
      {profile.blockOrder.map((block) => {
        if (!profile.blocks[block].visible) {
          return null;
        }

        return (
          <ProfileBlockRenderer
            block={block}
            key={block}
            profile={profile}
          />
        );
      })}
    </article>
  );
}

interface ProfileBlockRendererProps {
  block: ProfileBlock;
  profile: Profile;
}

function ProfileBlockRenderer({ block, profile }: ProfileBlockRendererProps) {
  const { design } = profile;

  const borderClass = borderClasses[design.borders];
  const itemRadius = radiusClasses[design.radius];

  const className = `border-b last:border-b-0 ${
    blockPaddingClasses[design.density]
  } ${borderClass}`;

  if (block === 'identity') {
    return (
      <section className={className}>
        <p className='opacity-60 text-sm'>{profile.identity.role}</p>

        <h1 className='mt-2 font-semibold text-3xl tracking-tight'>
          {profile.identity.name}
        </h1>

        <p className='mt-4 max-w-lg opacity-70 leading-7'>
          {profile.identity.bio}
        </p>
      </section>
    );
  }

  if (block === 'about') {
    return (
      <section className={className}>
        <h2 className='font-medium'>About</h2>

        <p className='mt-3 max-w-lg opacity-70 leading-7'>{profile.about}</p>
      </section>
    );
  }

  if (block === 'links') {
    return (
      <section className={className}>
        <h2 className='font-medium'>Links</h2>

        {profile.links.length > 0 ? (
          <div className='mt-4 flex flex-wrap gap-2'>
            {profile.links.map((link) =>
              link.url ? (
                <a
                  className={`border px-3 py-2 text-sm transition-opacity hover:opacity-60 ${borderClass} ${itemRadius}`}
                  href={link.url}
                  key={link.id}
                  rel='noreferrer'
                  target='_blank'
                >
                  {link.label || 'Untitled'}
                </a>
              ) : (
                <span
                  className={`border px-3 py-2 text-sm ${borderClass} ${itemRadius}`}
                  key={link.id}
                >
                  {link.label || 'Untitled'}
                </span>
              )
            )}
          </div>
        ) : (
          <p className='mt-3 opacity-50 text-sm'>No links yet.</p>
        )}
      </section>
    );
  }

  if (block === 'projects') {
    return (
      <section className={className}>
        <h2 className='font-medium'>Projects</h2>

        {profile.projects.length > 0 ? (
          <div className={`mt-4 ${itemGapClasses[design.density]}`}>
            {profile.projects.map((project) => {
              const content = (
                <>
                  <p className='font-medium'>
                    {project.name || 'Untitled project'}
                  </p>

                  {project.description && (
                    <p className='mt-1 opacity-60 text-sm leading-6'>
                      {project.description}
                    </p>
                  )}
                </>
              );

              if (project.url) {
                return (
                  <a
                    className={`block border p-4 transition-opacity hover:opacity-60 ${borderClass} ${itemRadius}`}
                    href={project.url}
                    key={project.id}
                    rel='noreferrer'
                    target='_blank'
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  className={`border p-4 ${borderClass} ${itemRadius}`}
                  key={project.id}
                >
                  {content}
                </div>
              );
            })}
          </div>
        ) : (
          <p className='mt-3 opacity-50 text-sm'>No projects yet.</p>
        )}
      </section>
    );
  }

  if (block === 'experience') {
    return (
      <section className={className}>
        <h2 className='font-medium'>Experience</h2>

        {profile.experience.length > 0 ? (
          <div className={`mt-4 ${itemGapClasses[design.density]}`}>
            {profile.experience.map((experience) => (
              <div key={experience.id}>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='font-medium'>
                      {experience.role || 'Untitled role'}
                    </p>

                    <p className='mt-1 opacity-60 text-sm'>
                      {experience.company || 'Company'}
                    </p>
                  </div>

                  {experience.period && (
                    <p className='shrink-0 opacity-50 text-xs'>
                      {experience.period}
                    </p>
                  )}
                </div>

                {experience.description && (
                  <p className='mt-2 opacity-60 text-sm leading-6'>
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-3 opacity-50 text-sm'>No experience yet.</p>
        )}
      </section>
    );
  }

  if (block === 'gallery') {
    return (
      <section className={className}>
        <h2 className='font-medium'>Gallery</h2>

        {profile.gallery.length > 0 ? (
          <div className='mt-4 grid grid-cols-2 gap-3'>
            {profile.gallery.map((item) => (
              <figure
                className={`overflow-hidden border ${borderClass} ${itemRadius}`}
                key={item.id}
              >
                {item.src ? (
                  <img
                    alt={item.alt}
                    className='aspect-square w-full object-cover'
                    src={item.src}
                  />
                ) : (
                  <div className='flex aspect-square items-center justify-center bg-current/5 opacity-60 text-xs'>
                    No image
                  </div>
                )}

                {item.caption && (
                  <figcaption className='p-3 opacity-60 text-xs'>
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <p className='mt-3 opacity-50 text-sm'>No images yet.</p>
        )}
      </section>
    );
  }

  return (
    <section className={className}>
      <h2 className='font-medium'>Now</h2>

      <p className='mt-3 max-w-lg opacity-70 leading-7'>{profile.now}</p>
    </section>
  );
}
