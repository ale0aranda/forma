import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfileBorders,
  ProfileDensity,
  ProfilePalette,
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
  rounded: 'rounded-xl'
};

const sectionGapClasses: Record<ProfileDensity, string> = {
  compact: 'space-y-10',
  balanced: 'space-y-14',
  airy: 'space-y-20'
};

const itemGapClasses: Record<ProfileDensity, string> = {
  compact: 'space-y-4',
  balanced: 'space-y-6',
  airy: 'space-y-8'
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

export function ProfileRenderer({ profile }: ProfileRendererProps) {
  const { design } = profile;

  return (
    <article
      className={`${typographyClasses[design.typography]} ${
        appearanceClasses[design.appearance][design.palette]
      }`}
    >
      <div className={sectionGapClasses[design.density]}>
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
      </div>
    </article>
  );
}

interface ProfileBlockRendererProps {
  block: ProfileBlock;
  profile: Profile;
}

function ProfileBlockRenderer({ block, profile }: ProfileBlockRendererProps) {
  if (block === 'identity') {
    return <IdentityBlock profile={profile} />;
  }

  if (block === 'about') {
    return <AboutBlock profile={profile} />;
  }

  if (block === 'links') {
    return <LinksBlock profile={profile} />;
  }

  if (block === 'projects') {
    return <ProjectsBlock profile={profile} />;
  }

  if (block === 'experience') {
    return <ExperienceBlock profile={profile} />;
  }

  if (block === 'gallery') {
    return <GalleryBlock profile={profile} />;
  }

  return <NowBlock profile={profile} />;
}

interface BlockProps {
  profile: Profile;
}

function IdentityBlock({ profile }: BlockProps) {
  return (
    <header>
      <p className='mb-3 opacity-50 text-sm'>{profile.identity.role}</p>

      <h1 className='font-semibold text-4xl tracking-tight'>
        {profile.identity.name}
      </h1>

      <p className='mt-5 max-w-xl opacity-70 leading-7'>
        {profile.identity.bio}
      </p>
    </header>
  );
}

function AboutBlock({ profile }: BlockProps) {
  return (
    <section>
      <SectionTitle>About</SectionTitle>

      <p className='max-w-xl opacity-70 leading-7'>{profile.about}</p>
    </section>
  );
}

function LinksBlock({ profile }: BlockProps) {
  return (
    <section>
      <SectionTitle>Links</SectionTitle>

      {profile.links.length > 0 ? (
        <div className='flex flex-wrap gap-x-5 gap-y-2'>
          {profile.links.map((link) =>
            link.url ? (
              <a
                className='border-current border-b opacity-70 transition-opacity hover:opacity-100'
                href={link.url}
                key={link.id}
                rel='noreferrer'
                target='_blank'
              >
                {link.label || 'Untitled'}
              </a>
            ) : (
              <span
                className='opacity-70'
                key={link.id}
              >
                {link.label || 'Untitled'}
              </span>
            )
          )}
        </div>
      ) : (
        <EmptyState>No links yet.</EmptyState>
      )}
    </section>
  );
}

function ProjectsBlock({ profile }: BlockProps) {
  const { design } = profile;
  const borderClass = borderClasses[design.borders];

  return (
    <section>
      <SectionTitle>Projects</SectionTitle>

      {profile.projects.length > 0 ? (
        <div>
          {profile.projects.map((project) => {
            const content = (
              <>
                <div className='flex items-baseline justify-between gap-6'>
                  <h3 className='font-medium'>
                    {project.name || 'Untitled project'}
                  </h3>

                  {project.url && (
                    <span className='shrink-0 opacity-40 text-xs'>↗</span>
                  )}
                </div>

                {project.description && (
                  <p className='mt-2 max-w-xl opacity-60 text-sm leading-6'>
                    {project.description}
                  </p>
                )}
              </>
            );

            if (project.url) {
              return (
                <a
                  className={`block border-b py-5 transition-opacity first:pt-0 last:border-b-0 last:pb-0 hover:opacity-60 ${borderClass}`}
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
                className={`border-b py-5 first:pt-0 last:border-b-0 last:pb-0 ${borderClass}`}
                key={project.id}
              >
                {content}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState>No projects yet.</EmptyState>
      )}
    </section>
  );
}

function ExperienceBlock({ profile }: BlockProps) {
  const { design } = profile;

  return (
    <section>
      <SectionTitle>Experience</SectionTitle>

      {profile.experience.length > 0 ? (
        <div className={itemGapClasses[design.density]}>
          {profile.experience.map((experience) => (
            <div key={experience.id}>
              <div className='flex items-start justify-between gap-6'>
                <div>
                  <h3 className='font-medium'>
                    {experience.role || 'Untitled role'}
                  </h3>

                  <p className='mt-1 opacity-60 text-sm'>
                    {experience.company || 'Company'}
                  </p>
                </div>

                {experience.period && (
                  <p className='shrink-0 opacity-40 text-xs'>
                    {experience.period}
                  </p>
                )}
              </div>

              {experience.description && (
                <p className='mt-3 max-w-xl opacity-60 text-sm leading-6'>
                  {experience.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState>No experience yet.</EmptyState>
      )}
    </section>
  );
}

function GalleryBlock({ profile }: BlockProps) {
  const { design } = profile;

  const radiusClass = radiusClasses[design.radius];
  const borderClass = borderClasses[design.borders];

  return (
    <section>
      <SectionTitle>Gallery</SectionTitle>

      {profile.gallery.length > 0 ? (
        <div className='grid grid-cols-2 gap-3'>
          {profile.gallery.map((item) => (
            <figure key={item.id}>
              {item.src ? (
                <img
                  alt={item.alt}
                  className={`aspect-square w-full border object-cover ${borderClass} ${radiusClass}`}
                  src={item.src}
                />
              ) : (
                <div
                  className={`flex aspect-square items-center justify-center border bg-current/5 opacity-50 text-xs ${borderClass} ${radiusClass}`}
                >
                  No image
                </div>
              )}

              {item.caption && (
                <figcaption className='mt-2 opacity-50 text-xs'>
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <EmptyState>No images yet.</EmptyState>
      )}
    </section>
  );
}

function NowBlock({ profile }: BlockProps) {
  return (
    <section>
      <SectionTitle>Now</SectionTitle>

      <p className='max-w-xl opacity-70 leading-7'>{profile.now}</p>
    </section>
  );
}

interface SectionTitleProps {
  children: string;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className='mb-5 opacity-40 text-xs uppercase tracking-widest'>
      {children}
    </h2>
  );
}

interface EmptyStateProps {
  children: string;
}

function EmptyState({ children }: EmptyStateProps) {
  return <p className='opacity-40 text-sm'>{children}</p>;
}
