'use client';

import { useState } from 'react';

import { EditorSidebar } from '@/components/editor-sidebar';
import { ProfileInspector } from '@/components/profile-inspector';
import { ProfilePreview } from '@/components/profile-preview';

import type { Profile, ProfileBlock, ProfileLink } from '@/lib/profile';

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
  ]
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
          onRemoveLink={removeLink}
          onUpdateAbout={updateAbout}
          onUpdateIdentity={updateIdentity}
          onUpdateLink={updateLink}
          onUpdateNow={updateNow}
          profile={profile}
          selectedBlock={selectedBlock}
        />
      </div>
    </main>
  );
}
