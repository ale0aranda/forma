import type {
  Profile,
  ProfileBlock,
  ProfileExperience,
  ProfileLink,
  ProfileProject
} from '@/lib/profile';

interface ProfileInspectorProps {
  profile: Profile;
  selectedBlock: ProfileBlock;
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
}

const blockLabels: Record<ProfileBlock, string> = {
  identity: 'Identity',
  about: 'About',
  links: 'Links',
  projects: 'Projects',
  experience: 'Experience',
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
  onRemoveExperience
}: ProfileInspectorProps) {
  return (
    <aside className='w-80 shrink-0 border-neutral-200 border-l bg-white p-6'>
      <div className='mb-8'>
        <p className='font-medium'>{blockLabels[selectedBlock]}</p>

        <p className='mt-1 text-neutral-500 text-sm'>Edit this block.</p>
      </div>

      <div className='mb-6 flex items-center justify-between rounded-lg border border-neutral-200 p-3'>
        <div>
          <p className='text-sm'>Visible</p>

          <p className='mt-1 text-neutral-500 text-xs'>
            Show this block on your profile.
          </p>
        </div>

        <button
          aria-pressed={profile.blocks[selectedBlock].visible}
          className={`rounded-full px-3 py-1 font-medium text-xs transition-colors ${
            profile.blocks[selectedBlock].visible
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-500'
          }`}
          onClick={() => onToggleBlock(selectedBlock)}
          type='button'
        >
          {profile.blocks[selectedBlock].visible ? 'On' : 'Off'}
        </button>
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

      {selectedBlock === 'projects' && (
        <ProjectsEditor
          projects={profile.projects}
          onAdd={onAddProject}
          onRemove={onRemoveProject}
          onUpdate={onUpdateProject}
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
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
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
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(link.id, 'url', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={link.url}
              />
            </label>

            <button
              className='mt-3 text-neutral-500 text-xs hover:text-red-600'
              onClick={() => onRemove(link.id)}
              type='button'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add link
      </button>
    </div>
  );
}

interface ProjectsEditorProps {
  projects: ProfileProject[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: 'name' | 'description' | 'url',
    value: string
  ) => void;
  onRemove: (id: string) => void;
}

function ProjectsEditor({
  projects,
  onAdd,
  onUpdate,
  onRemove
}: ProjectsEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {projects.map((project) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={project.id}
          >
            <label className='block'>
              <span className='mb-2 block text-neutral-500 text-xs'>Name</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(project.id, 'name', event.target.value)
                }
                type='text'
                value={project.name}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Description
              </span>

              <textarea
                className='min-h-24 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(project.id, 'description', event.target.value)
                }
                value={project.description}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>URL</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(project.id, 'url', event.target.value)
                }
                placeholder='https://'
                type='url'
                value={project.url}
              />
            </label>

            <button
              className='mt-3 text-neutral-500 text-xs hover:text-red-600'
              onClick={() => onRemove(project.id)}
              type='button'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add project
      </button>
    </div>
  );
}

interface ExperienceEditorProps {
  experience: ProfileExperience[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: 'company' | 'role' | 'period' | 'description',
    value: string
  ) => void;
  onRemove: (id: string) => void;
}

function ExperienceEditor({
  experience,
  onAdd,
  onUpdate,
  onRemove
}: ExperienceEditorProps) {
  return (
    <div>
      <div className='space-y-3'>
        {experience.map((item) => (
          <div
            className='rounded-lg border border-neutral-200 p-3'
            key={item.id}
          >
            <label className='block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Company
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'company', event.target.value)
                }
                type='text'
                value={item.company}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>Role</span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'role', event.target.value)
                }
                type='text'
                value={item.role}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Period
              </span>

              <input
                className='w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'period', event.target.value)
                }
                placeholder='2025 — Present'
                type='text'
                value={item.period}
              />
            </label>

            <label className='mt-3 block'>
              <span className='mb-2 block text-neutral-500 text-xs'>
                Description
              </span>

              <textarea
                className='min-h-24 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400'
                onChange={(event) =>
                  onUpdate(item.id, 'description', event.target.value)
                }
                value={item.description}
              />
            </label>

            <button
              className='mt-3 text-neutral-500 text-xs hover:text-red-600'
              onClick={() => onRemove(item.id)}
              type='button'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50'
        onClick={onAdd}
        type='button'
      >
        + Add experience
      </button>
    </div>
  );
}
