import { ArrowRight, BriefcaseBusiness, ImageIcon, Zap } from 'lucide-react';

import { radiusClasses } from '@/components/profile/renderer/styles';
import { getProfileLayouts } from '@/src/features/profile/domain/profile-defaults';

import type { Profile } from '@/src/features/profile/domain/profile';
import type { ProfileViewport } from './styles';

interface BlockProps {
  profile: Profile;
  viewport: ProfileViewport;
  editing?: boolean;
}

export function AboutBlock({ profile }: BlockProps) {
  return (
    <p className='wrap-break-word max-w-lg text-sm leading-6 opacity-65'>
      {profile.about || 'Nothing here yet.'}
    </p>
  );
}

export function NowBlock({ profile }: BlockProps) {
  if (!profile.now.trim()) {
    return (
      <div className='flex items-center gap-4 py-2'>
        <Zap
          aria-hidden='true'
          className='opacity-35'
          size={22}
        />

        <EmptyState>Nothing happening yet.</EmptyState>
      </div>
    );
  }

  return (
    <div className='flex items-start gap-4'>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-current/5'>
        <Zap
          aria-hidden='true'
          className='opacity-55'
          size={16}
        />
      </div>

      <p className='wrap-break-word min-w-0 pt-1 text-sm leading-6 opacity-65'>
        {profile.now}
      </p>
    </div>
  );
}

export function ProjectsBlock({ profile, editing = false }: BlockProps) {
  const layouts = getProfileLayouts(profile);
  const grid = layouts.projects === 'grid';

  if (profile.projects.length === 0) {
    return <EmptyState>No projects yet.</EmptyState>;
  }

  return (
    <div className={grid ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
      {profile.projects.map((project) => {
        const content = grid ? (
          <div className='flex h-full min-w-0 flex-col'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-current/5'>
              <span className='text-sm opacity-60'>
                {project.name.trim().charAt(0).toUpperCase() || '?'}
              </span>
            </div>

            <div className='mt-4 min-w-0 flex-1'>
              <h3 className='wrap-break-word font-medium text-sm'>
                {project.name || 'Untitled project'}
              </h3>

              {project.description && (
                <p className='wrap-break-word mt-1 text-xs leading-5 opacity-50'>
                  {project.description}
                </p>
              )}
            </div>

            {project.url && (
              <ArrowRight
                aria-hidden='true'
                className='mt-4 shrink-0 opacity-35'
                size={15}
              />
            )}
          </div>
        ) : (
          <div className='flex min-w-0 items-center gap-4'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-current/5'>
              <span className='text-sm opacity-60'>
                {project.name.trim().charAt(0).toUpperCase() || '?'}
              </span>
            </div>

            <div className='min-w-0 flex-1'>
              <h3 className='wrap-break-word font-medium text-sm'>
                {project.name || 'Untitled project'}
              </h3>

              {project.description && (
                <p className='wrap-break-word mt-1 text-xs leading-5 opacity-50'>
                  {project.description}
                </p>
              )}
            </div>

            {project.url && (
              <ArrowRight
                aria-hidden='true'
                className='shrink-0 opacity-35'
                size={15}
              />
            )}
          </div>
        );

        const itemClassName = grid
          ? 'block h-full rounded-lg border border-current/10 p-4 transition-colors hover:bg-current/5'
          : 'block rounded-lg px-2 py-3 transition-colors hover:bg-current/5';

        const editingClassName = grid
          ? 'h-full rounded-lg border border-current/10 p-4'
          : 'px-2 py-3';

        if (project.url && !editing) {
          return (
            <a
              className={itemClassName}
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
            className={editingClassName}
            key={project.id}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

export function ExperienceBlock({ profile, viewport }: BlockProps) {
  if (profile.experience.length === 0) {
    return (
      <div className='flex items-center gap-4 py-2'>
        <BriefcaseBusiness
          aria-hidden='true'
          className='opacity-35'
          size={22}
        />

        <EmptyState>No experience yet.</EmptyState>
      </div>
    );
  }

  const fixedViewport = viewport !== 'responsive';
  const mobile = viewport === 'mobile';

  const headingClassName = fixedViewport
    ? mobile
      ? 'flex flex-col gap-1'
      : 'flex items-start justify-between gap-4'
    : 'flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4';

  return (
    <div className='space-y-5'>
      {profile.experience.map((experience) => (
        <div
          className='relative border-current/10 border-l pl-4'
          key={experience.id}
        >
          <span className='absolute top-2 -left-1 size-2 rounded-full bg-current opacity-30' />

          <div className={headingClassName}>
            <div className='min-w-0'>
              <h3 className='wrap-break-word font-medium text-sm'>
                {experience.role || 'Untitled role'}
              </h3>

              <p className='wrap-break-word mt-1 text-xs opacity-50'>
                {experience.company || 'Company'}
              </p>
            </div>

            {experience.period && (
              <p className='shrink-0 text-xs opacity-40'>{experience.period}</p>
            )}
          </div>

          {experience.description && (
            <p className='wrap-break-word mt-2 text-xs leading-5 opacity-50'>
              {experience.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function GalleryBlock({ profile, viewport }: BlockProps) {
  const { design } = profile;
  const layouts = getProfileLayouts(profile);
  const featured = layouts.gallery === 'featured';

  if (profile.gallery.length === 0) {
    return (
      <div className='flex items-center gap-4 py-2'>
        <ImageIcon
          aria-hidden='true'
          className='opacity-35'
          size={22}
        />

        <EmptyState>No images yet.</EmptyState>
      </div>
    );
  }

  if (featured) {
    return (
      <div className='space-y-3'>
        {profile.gallery.map((item, index) => (
          <figure
            className='min-w-0'
            key={item.id}
          >
            {item.src ? (
              <picture>
                <source srcSet={item.src} />

                <img
                  alt={item.alt}
                  className={`w-full object-cover ${
                    index === 0 ? 'aspect-video' : 'aspect-square'
                  } ${radiusClasses[design.radius]}`}
                  loading='lazy'
                  src={item.src}
                />
              </picture>
            ) : (
              <div
                className={`flex w-full items-center justify-center bg-current/5 text-xs opacity-50 ${
                  index === 0 ? 'aspect-video' : 'aspect-square'
                } ${radiusClasses[design.radius]}`}
              >
                Image
              </div>
            )}

            {item.caption.trim() && (
              <figcaption className='wrap-break-word mt-2 text-xs opacity-45'>
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  const fixedViewport = viewport !== 'responsive';

  let gridClassName = 'grid grid-cols-2 gap-3 sm:grid-cols-3';

  if (fixedViewport) {
    gridClassName =
      viewport === 'mobile'
        ? 'grid grid-cols-2 gap-3'
        : 'grid grid-cols-3 gap-3';
  }

  return (
    <div className={gridClassName}>
      {profile.gallery.map((item) => (
        <figure
          className='min-w-0'
          key={item.id}
        >
          {item.src ? (
            <picture>
              <source srcSet={item.src} />

              <img
                alt={item.alt}
                className={`aspect-square w-full object-cover ${
                  radiusClasses[design.radius]
                }`}
                loading='lazy'
                src={item.src}
              />
            </picture>
          ) : (
            <div
              className={`flex aspect-square items-center justify-center bg-current/5 text-xs opacity-50 ${
                radiusClasses[design.radius]
              }`}
            >
              Image
            </div>
          )}

          {item.caption.trim() && (
            <figcaption className='wrap-break-word mt-2 text-xs opacity-45'>
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

interface EmptyStateProps {
  children: string;
}

function EmptyState({ children }: EmptyStateProps) {
  return <p className='text-sm opacity-35'>{children}</p>;
}
