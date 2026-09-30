import { DesignEditor } from '@/components/profile/editors/design-editor';
import { ExperienceEditor } from '@/components/profile/editors/experience-editor';
import { GalleryEditor } from '@/components/profile/editors/gallery-editor';
import { LinksEditor } from '@/components/profile/editors/links-editor';
import { ProjectsEditor } from '@/components/profile/editors/projects-editor';

import type {
  Profile,
  ProfileBlock,
  ProfileDensity,
  ProfilePreset,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface ProfileInspectorProps {
  profile: Profile;
  selectedBlock: ProfileBlock | 'design';
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
  onChangeDensity: (density: ProfileDensity) => void;
  onChangeRadius: (radius: ProfileRadius) => void;
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
  onChangeDensity,
  onChangeRadius
}: ProfileInspectorProps) {
  if (selectedBlock === 'design') {
    return (
      <InspectorShell
        description='Customize how your profile looks.'
        title='Appearance'
      >
        <DesignEditor
          density={profile.design.density}
          onChangeDensity={onChangeDensity}
          onChangePreset={onChangePreset}
          onChangeRadius={onChangeRadius}
          onChangeTypography={onChangeTypography}
          preset={profile.design.preset}
          radius={profile.design.radius}
          typography={profile.design.typography}
        />
      </InspectorShell>
    );
  }

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
          onUpdate={onUpdateLink}
        />
      )}

      {selectedBlock === 'projects' && (
        <ProjectsEditor
          onAdd={onAddProject}
          onRemove={onRemoveProject}
          onUpdate={onUpdateProject}
          projects={profile.projects}
        />
      )}

      {selectedBlock === 'experience' && (
        <ExperienceEditor
          experience={profile.experience}
          onAdd={onAddExperience}
          onRemove={onRemoveExperience}
          onUpdate={onUpdateExperience}
        />
      )}

      {selectedBlock === 'gallery' && (
        <GalleryEditor
          gallery={profile.gallery}
          onAdd={onAddGalleryItem}
          onRemove={onRemoveGalleryItem}
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
  children: React.ReactNode;
}

function InspectorShell({ title, description, children }: InspectorShellProps) {
  return (
    <aside className='w-80 shrink-0 border-neutral-200 border-l bg-white p-6'>
      <div className='mb-8'>
        <p className='font-medium'>{title}</p>

        <p className='mt-1 text-neutral-500 text-sm'>{description}</p>
      </div>

      {children}
    </aside>
  );
}

interface VisibilityControlProps {
  visible: boolean;
  onToggle: () => void;
}

function VisibilityControl({ visible, onToggle }: VisibilityControlProps) {
  return (
    <div className='mb-6 flex items-center justify-between rounded-lg border border-neutral-200 p-3'>
      <div>
        <p className='text-sm'>Visible</p>

        <p className='mt-1 text-neutral-500 text-xs'>
          Show this block on your profile.
        </p>
      </div>

      <button
        aria-pressed={visible}
        className={`rounded-full px-3 py-1 font-medium text-xs transition-colors ${
          visible
            ? 'bg-neutral-950 text-white'
            : 'bg-neutral-100 text-neutral-500'
        }`}
        onClick={onToggle}
        type='button'
      >
        {visible ? 'On' : 'Off'}
      </button>
    </div>
  );
}

interface IdentityEditorProps {
  identity: Profile['identity'];
  onUpdate: (field: keyof Profile['identity'], value: string) => void;
}

function IdentityEditor({ identity, onUpdate }: IdentityEditorProps) {
  return (
    <div className='space-y-5'>
      <label className='block'>
        <span className='mb-2 block text-neutral-600 text-sm'>Name</span>

        <input
          className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
          onChange={(event) => onUpdate('name', event.target.value)}
          type='text'
          value={identity.name}
        />
      </label>

      <label className='block'>
        <span className='mb-2 block text-neutral-600 text-sm'>Role</span>

        <input
          className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
          onChange={(event) => onUpdate('role', event.target.value)}
          type='text'
          value={identity.role}
        />
      </label>

      <label className='block'>
        <span className='mb-2 block text-neutral-600 text-sm'>Bio</span>

        <textarea
          className='min-h-28 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
          onChange={(event) => onUpdate('bio', event.target.value)}
          value={identity.bio}
        />
      </label>
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
