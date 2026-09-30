'use client';

import { useState } from 'react';

import { EditorSidebar } from '@/components/editor-sidebar';
import { ProfileInspector } from '@/components/profile-inspector';
import { ProfilePreview } from '@/components/profile-preview';

import type {
  Profile,
  ProfileBlock,
  ProfileLink,
  ProfileProject
} from '@/lib/profile';

const initialProfile: Profile = {
  username: 'alejandro',
  identity: {
    name: 'Alejandro Aranda',
    role: 'Software Engineer',
    bio: 'I build things for the web.'
  },
  about:
    'Interested in software engineering, open source and learning by building.',
  now: 'Building Forma.',
  links: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/ale0aranda'
    }
  ],
  projects: [
    {
      id: 'forma',
      name: 'Forma',
      description:
        'A customizable profile builder for creating personal pages.',
      url: ''
    }
  ],
  blocks: {
    identity: {
      visible: true
    },
    about: {
      visible: true
    },
    links: {
      visible: true
    },
    projects: {
      visible: true
    },
    now: {
      visible: true
    }
  }
};

export default function Home() {
  const [profile, setProfile] = useState(initialProfile);
  const [selectedBlock, setSelectedBlock] = useState<ProfileBlock>('identity');

  function updateIdentity(field: keyof Profile['identity'], value: string) {
    setProfile((current) => ({
      ...current,
      identity: {
        ...current.identity,
        [field]: value
      }
    }));
  }

  function updateAbout(value: string) {
    setProfile((current) => ({
      ...current,
      about: value
    }));
  }

  function updateNow(value: string) {
    setProfile((current) => ({
      ...current,
      now: value
    }));
  }

  function addLink() {
    const link: ProfileLink = {
      id: crypto.randomUUID(),
      label: 'New link',
      url: ''
    };

    setProfile((current) => ({
      ...current,
      links: [...current.links, link]
    }));
  }

  function updateLink(id: string, field: 'label' | 'url', value: string) {
    setProfile((current) => ({
      ...current,
      links: current.links.map((link) =>
        link.id === id
          ? {
              ...link,
              [field]: value
            }
          : link
      )
    }));
  }

  function removeLink(id: string) {
    setProfile((current) => ({
      ...current,
      links: current.links.filter((link) => link.id !== id)
    }));
  }

  function addProject() {
    const project: ProfileProject = {
      id: crypto.randomUUID(),
      name: 'New project',
      description: '',
      url: ''
    };

    setProfile((current) => ({
      ...current,
      projects: [...current.projects, project]
    }));
  }

  function updateProject(
    id: string,
    field: 'name' | 'description' | 'url',
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: value
            }
          : project
      )
    }));
  }

  function removeProject(id: string) {
    setProfile((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id)
    }));
  }

  function toggleBlock(block: ProfileBlock) {
    setProfile((current) => ({
      ...current,
      blocks: {
        ...current.blocks,
        [block]: {
          ...current.blocks[block],
          visible: !current.blocks[block].visible
        }
      }
    }));
  }

  return (
    <main className='min-h-screen bg-white text-neutral-950'>
      <header className='flex h-16 items-center justify-between border-neutral-200 border-b px-5'>
        <div className='flex items-center gap-3'>
          <span className='font-semibold tracking-widest'>FORMA</span>

          <span className='rounded-md bg-neutral-100 px-2 py-1 text-neutral-500 text-xs'>
            Editor
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            className='rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50'
            type='button'
          >
            Preview
          </button>

          <button
            className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
            type='button'
          >
            Save
          </button>
        </div>
      </header>

      <div className='flex min-h-screen'>
        <EditorSidebar
          blocks={profile.blocks}
          onSelectBlock={setSelectedBlock}
          selectedBlock={selectedBlock}
        />

        <ProfilePreview
          onSelectBlock={setSelectedBlock}
          profile={profile}
          selectedBlock={selectedBlock}
        />

        <ProfileInspector
          onAddLink={addLink}
          onAddProject={addProject}
          onRemoveLink={removeLink}
          onRemoveProject={removeProject}
          onToggleBlock={toggleBlock}
          onUpdateAbout={updateAbout}
          onUpdateIdentity={updateIdentity}
          onUpdateLink={updateLink}
          onUpdateNow={updateNow}
          onUpdateProject={updateProject}
          profile={profile}
          selectedBlock={selectedBlock}
        />
      </div>
    </main>
  );
}
