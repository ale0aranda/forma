'use client';

import { useState } from 'react';

import type { Profile, ProfileLink } from '@/lib/profile';

type Block = 'identity' | 'about' | 'links' | 'now';

interface BlockOption {
  id: Block;
  label: string;
}

const blocks: BlockOption[] = [
  {
    id: 'identity',
    label: 'Identity'
  },
  {
    id: 'about',
    label: 'About'
  },
  {
    id: 'links',
    label: 'Links'
  },
  {
    id: 'now',
    label: 'Now'
  }
];

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
  const [selectedBlock, setSelectedBlock] = useState<Block>('identity');

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

  const selectedBlockLabel =
    blocks.find((block) => block.id === selectedBlock)?.label ?? 'Identity';

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
        <aside className='w-56 shrink-0 border-neutral-200 border-r bg-white p-4'>
          <nav>
            <p className='mb-2 px-2 text-neutral-400 text-xs uppercase tracking-wider'>
              Blocks
            </p>

            <div className='space-y-1'>
              {blocks.map((block) => (
                <button
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedBlock === block.id
                      ? 'bg-neutral-100 font-medium text-neutral-950'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                  key={block.id}
                  onClick={() => setSelectedBlock(block.id)}
                  type='button'
                >
                  {block.label}
                </button>
              ))}
            </div>
          </nav>

          <div className='my-5 border-neutral-200 border-t' />

          <nav>
            <p className='mb-2 px-2 text-neutral-400 text-xs uppercase tracking-wider'>
              Design
            </p>

            <button
              className='w-full rounded-lg px-3 py-2 text-left text-neutral-600 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
              type='button'
            >
              Preset
            </button>
          </nav>
        </aside>

        <section className='flex min-w-0 flex-1 justify-center bg-neutral-50 p-10'>
          <div className='w-full max-w-2xl'>
            <div className='mb-3 flex items-center justify-between'>
              <p className='text-neutral-500 text-xs'>Preview</p>

              <p className='text-neutral-400 text-xs'>/{profile.username}</p>
            </div>

            <article className='overflow-hidden rounded-xl border border-neutral-200 bg-white'>
              <button
                className={`block w-full p-10 text-left transition-colors ${
                  selectedBlock === 'identity'
                    ? 'bg-neutral-50'
                    : 'hover:bg-neutral-50'
                }`}
                onClick={() => setSelectedBlock('identity')}
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

              <button
                className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                  selectedBlock === 'about'
                    ? 'bg-neutral-50'
                    : 'hover:bg-neutral-50'
                }`}
                onClick={() => setSelectedBlock('about')}
                type='button'
              >
                <h2 className='font-medium'>About</h2>

                <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
                  {profile.about}
                </p>
              </button>

              <button
                className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                  selectedBlock === 'links'
                    ? 'bg-neutral-50'
                    : 'hover:bg-neutral-50'
                }`}
                onClick={() => setSelectedBlock('links')}
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

              <button
                className={`block w-full border-neutral-200 border-t p-10 text-left transition-colors ${
                  selectedBlock === 'now'
                    ? 'bg-neutral-50'
                    : 'hover:bg-neutral-50'
                }`}
                onClick={() => setSelectedBlock('now')}
                type='button'
              >
                <h2 className='font-medium'>Now</h2>

                <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
                  {profile.now}
                </p>
              </button>
            </article>
          </div>
        </section>

        <aside className='w-80 shrink-0 border-neutral-200 border-l bg-white p-6'>
          <div className='mb-8'>
            <p className='font-medium'>{selectedBlockLabel}</p>

            <p className='mt-1 text-neutral-500 text-sm'>Edit this block.</p>
          </div>

          {selectedBlock === 'identity' && (
            <div className='space-y-5'>
              <label className='block'>
                <span className='mb-2 block text-neutral-600 text-sm'>
                  Name
                </span>

                <input
                  className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                  onChange={(event) =>
                    updateIdentity('name', event.target.value)
                  }
                  type='text'
                  value={profile.identity.name}
                />
              </label>

              <label className='block'>
                <span className='mb-2 block text-neutral-600 text-sm'>
                  Role
                </span>

                <input
                  className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                  onChange={(event) =>
                    updateIdentity('role', event.target.value)
                  }
                  type='text'
                  value={profile.identity.role}
                />
              </label>

              <label className='block'>
                <span className='mb-2 block text-neutral-600 text-sm'>Bio</span>

                <textarea
                  className='min-h-28 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                  onChange={(event) =>
                    updateIdentity('bio', event.target.value)
                  }
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
                onChange={(event) => updateAbout(event.target.value)}
                value={profile.about}
              />
            </label>
          )}

          {selectedBlock === 'links' && (
            <div>
              <div className='space-y-3'>
                {profile.links.map((link) => (
                  <div
                    className='rounded-lg border border-neutral-200 p-3'
                    key={link.id}
                  >
                    <label className='block'>
                      <span className='mb-2 block text-neutral-500 text-xs'>
                        Label
                      </span>

                      <input
                        className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                        onChange={(event) =>
                          updateLink(link.id, 'label', event.target.value)
                        }
                        type='text'
                        value={link.label}
                      />
                    </label>

                    <label className='mt-3 block'>
                      <span className='mb-2 block text-neutral-500 text-xs'>
                        URL
                      </span>

                      <input
                        className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                        onChange={(event) =>
                          updateLink(link.id, 'url', event.target.value)
                        }
                        placeholder='https://'
                        type='url'
                        value={link.url}
                      />
                    </label>

                    <button
                      className='mt-3 text-neutral-500 text-xs transition-colors hover:text-red-600'
                      onClick={() => removeLink(link.id)}
                      type='button'
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {profile.links.length === 0 && (
                <p className='mb-4 text-neutral-500 text-sm'>
                  You haven't added any links yet.
                </p>
              )}

              <button
                className='mt-3 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50'
                onClick={addLink}
                type='button'
              >
                + Add link
              </button>
            </div>
          )}

          {selectedBlock === 'now' && (
            <label className='block'>
              <span className='mb-2 block text-neutral-600 text-sm'>Now</span>

              <textarea
                className='min-h-32 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-6 outline-none transition-colors focus:border-neutral-400'
                onChange={(event) => updateNow(event.target.value)}
                value={profile.now}
              />
            </label>
          )}
        </aside>
      </div>
    </main>
  );
}
