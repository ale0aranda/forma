import { DesignEditor } from '@/components/profile/editors/design-editor';
import { ExperienceEditor } from '@/components/profile/editors/experience-editor';
import { GalleryEditor } from '@/components/profile/editors/gallery-editor';
import { IdentityEditor } from '@/components/profile/editors/identity-editor';
import { LinksEditor } from '@/components/profile/editors/links-editor';
import { ProfileSettingsEditor } from '@/components/profile/editors/profile-settings-editor';
import { ProjectsEditor } from '@/components/profile/editors/projects-editor';

import type { ReactNode } from 'react';
import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfileBorders,
  ProfileDensity,
  ProfileGalleryLayout,
  ProfileIdentityLayout,
  ProfilePalette,
  ProfilePreset,
  ProfileProjectsLayout,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface ProfileInspectorProps {
  profile: Profile;
  selectedBlock: ProfileBlock | 'profile' | 'design';

  onUpdateUsername: (username: string) => void;

  onToggleBlock: (block: ProfileBlock) => void;

  onUpdateIdentity: (field: keyof Profile['identity'], value: string) => void;

  onUpdateAbout: (value: string) => void;

  onUpdateNow: (value: string) => void;

  onAddLink: () => void;

  onUpdateLink: (id: string, field: 'label' | 'url', value: string) => void;

  onRemoveLink: (id: string) => void;

  onAddProject: () => void;

  onUpdateProject: (
    id: string,
    field: 'name' | 'description' | 'url',
    value: string
  ) => void;

  onRemoveProject: (id: string) => void;

  onAddExperience: () => void;

  onUpdateExperience: (
    id: string,
    field: 'company' | 'role' | 'period' | 'description',
    value: string
  ) => void;

  onRemoveExperience: (id: string) => void;

  onAddGalleryItem: () => void;

  onUpdateGalleryItem: (
    id: string,
    field: 'src' | 'alt' | 'caption',
    value: string
  ) => void;

  onRemoveGalleryItem: (id: string) => void;

  onChangePreset: (preset: ProfilePreset) => void;

  onChangeTypography: (typography: ProfileTypography) => void;

  onChangeAppearance: (appearance: ProfileAppearance) => void;

  onChangePalette: (palette: ProfilePalette) => void;

  onChangeDensity: (density: ProfileDensity) => void;

  onChangeRadius: (radius: ProfileRadius) => void;

  onChangeBorders: (borders: ProfileBorders) => void;

  onChangeIdentityLayout: (layout: ProfileIdentityLayout) => void;

  onChangeProjectsLayout: (layout: ProfileProjectsLayout) => void;

  onChangeGalleryLayout: (layout: ProfileGalleryLayout) => void;

  onReorderLink: (activeId: string, overId: string) => void;

  onReorderProject: (activeId: string, overId: string) => void;

  onReorderExperience: (activeId: string, overId: string) => void;

  onReorderGalleryItem: (activeId: string, overId: string) => void;
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

export function ProfileInspector({
  profile,
  selectedBlock,
  onToggleBlock,
  onUpdateIdentity,
  onUpdateAbout,
  onUpdateNow,
  onUpdateUsername,
  onAddLink,
  onUpdateLink,
  onRemoveLink,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onRemoveGalleryItem,
  onChangePreset,
  onChangeTypography,
  onChangeAppearance,
  onChangePalette,
  onChangeDensity,
  onChangeRadius,
  onChangeBorders,
  onChangeIdentityLayout,
  onChangeProjectsLayout,
  onChangeGalleryLayout,
  onReorderLink,
  onReorderProject,
  onReorderExperience,
  onReorderGalleryItem
}: ProfileInspectorProps) {
  if (selectedBlock === 'profile') {
    return (
      <InspectorShell
        description='Manage your public profile.'
        title='Profile'
      >
        <ProfileSettingsEditor
          onUpdateUsername={onUpdateUsername}
          username={profile.username}
        />
      </InspectorShell>
    );
  }

  if (selectedBlock === 'design') {
    return (
      <InspectorShell
        description='Customize how your profile looks.'
        title='Appearance'
      >
        <DesignEditor
          appearance={profile.design.appearance}
          borders={profile.design.borders}
          density={profile.design.density}
          onChangeAppearance={onChangeAppearance}
          onChangeBorders={onChangeBorders}
          onChangeDensity={onChangeDensity}
          onChangePalette={onChangePalette}
          onChangePreset={onChangePreset}
          onChangeRadius={onChangeRadius}
          onChangeTypography={onChangeTypography}
          palette={profile.design.palette}
          preset={profile.design.preset}
          radius={profile.design.radius}
          typography={profile.design.typography}
        />
      </InspectorShell>
    );
  }

  const identityLayout = profile.layouts?.identity ?? 'left';

  const projectsLayout = profile.layouts?.projects ?? 'list';

  const galleryLayout = profile.layouts?.gallery ?? 'grid';

  return (
    <InspectorShell
      description='Edit this block.'
      title={blockLabels[selectedBlock]}
    >
      <VisibilityControl
        onToggle={() => onToggleBlock(selectedBlock)}
        visible={profile.blocks[selectedBlock].visible}
      />

      {selectedBlock === 'identity' && (
        <IdentityEditor
          identity={profile.identity}
          layout={identityLayout}
          onChangeLayout={onChangeIdentityLayout}
          onUpdate={onUpdateIdentity}
        />
      )}

      {selectedBlock === 'about' && (
        <AboutEditor
          onUpdate={onUpdateAbout}
          value={profile.about}
        />
      )}

      {selectedBlock === 'links' && (
        <LinksEditor
          links={profile.links}
          onAdd={onAddLink}
          onRemove={onRemoveLink}
          onReorder={onReorderLink}
          onUpdate={onUpdateLink}
        />
      )}

      {selectedBlock === 'projects' && (
        <ProjectsEditor
          layout={projectsLayout}
          onAdd={onAddProject}
          onChangeLayout={onChangeProjectsLayout}
          onRemove={onRemoveProject}
          onReorder={onReorderProject}
          onUpdate={onUpdateProject}
          projects={profile.projects}
        />
      )}

      {selectedBlock === 'experience' && (
        <ExperienceEditor
          experience={profile.experience}
          onAdd={onAddExperience}
          onRemove={onRemoveExperience}
          onReorder={onReorderExperience}
          onUpdate={onUpdateExperience}
        />
      )}

      {selectedBlock === 'gallery' && (
        <GalleryEditor
          gallery={profile.gallery}
          layout={galleryLayout}
          onAdd={onAddGalleryItem}
          onChangeLayout={onChangeGalleryLayout}
          onRemove={onRemoveGalleryItem}
          onReorder={onReorderGalleryItem}
          onUpdate={onUpdateGalleryItem}
        />
      )}

      {selectedBlock === 'now' && (
        <NowEditor
          onUpdate={onUpdateNow}
          value={profile.now}
        />
      )}
    </InspectorShell>
  );
}

interface InspectorShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

function InspectorShell({ title, description, children }: InspectorShellProps) {
  return (
    <aside className='flex h-full w-full min-w-0 flex-col bg-white lg:w-80 lg:shrink-0 lg:border-neutral-200 lg:border-l'>
      <div className='shrink-0 border-neutral-100 border-b px-5 py-4'>
        <p className='font-medium text-sm'>{title}</p>

        <p className='mt-1 text-neutral-400 text-xs'>{description}</p>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto p-5'>{children}</div>
    </aside>
  );
}

interface VisibilityControlProps {
  visible: boolean;
  onToggle: () => void;
}

function VisibilityControl({ visible, onToggle }: VisibilityControlProps) {
  return (
    <div className='mb-5 flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2.5'>
      <div>
        <p className='font-medium text-neutral-700 text-xs'>
          Visible on profile
        </p>

        <p className='mt-0.5 text-neutral-400 text-xs'>
          Show this block publicly.
        </p>
      </div>

      <button
        aria-label={
          visible ? 'Hide block from profile' : 'Show block on profile'
        }
        aria-pressed={visible}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          visible ? 'bg-neutral-950' : 'bg-neutral-200'
        }`}
        onClick={onToggle}
        type='button'
      >
        <span
          className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${
            visible ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

interface AboutEditorProps {
  value: string;
  onUpdate: (value: string) => void;
}

function AboutEditor({ value, onUpdate }: AboutEditorProps) {
  return (
    <label className='block'>
      <span className='mb-2 block text-neutral-600 text-sm'>About</span>

      <textarea
        className='min-h-40 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm leading-6 outline-none focus:border-neutral-400'
        onChange={(event) => onUpdate(event.target.value)}
        value={value}
      />
    </label>
  );
}

interface NowEditorProps {
  value: string;
  onUpdate: (value: string) => void;
}

function NowEditor({ value, onUpdate }: NowEditorProps) {
  return (
    <label className='block'>
      <span className='mb-2 block text-neutral-600 text-sm'>Now</span>

      <textarea
        className='min-h-32 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm leading-6 outline-none focus:border-neutral-400'
        onChange={(event) => onUpdate(event.target.value)}
        value={value}
      />
    </label>
  );
}
