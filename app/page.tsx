'use client';

import { useState } from 'react';

import type { Profile } from '@/lib/profile';

const initialProfile: Profile = {
  username: 'alejandro',
  identity: {
    name: 'Alejandro Aranda',
    role: 'Software Engineer',
    bio: 'I build things for the web.'
  },
  about:
    'Interested in software engineering, open source and learning by building.',
  now: 'Building Forma.'
};

const blocks = ['Identity', 'About', 'Now'];

export default function Home() {
  const [profile, setProfile] = useState(initialProfile);

  function updateIdentity(field: keyof Profile['identity'], value: string) {
    setProfile((current) => ({
      ...current,
      identity: {
        ...current.identity,
        [field]: value
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
        <aside className='w-56 shrink-0 border-neutral-200 border-r bg-white p-4'>
          <nav>
            <p className='mb-2 px-2 text-neutral-400 text-xs uppercase tracking-wider'>
              Blocks
            </p>

            <div className='space-y-1'>
              {blocks.map((block) => (
                <button
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    block === 'Identity'
                      ? 'bg-neutral-100 font-medium text-neutral-950'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                  key={block}
                  type='button'
                >
                  {block}
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

            <article className='rounded-xl border border-neutral-200 bg-white'>
              <section className='p-10'>
                <p className='text-neutral-500 text-sm'>
                  {profile.identity.role}
                </p>

                <h1 className='mt-2 font-semibold text-3xl tracking-tight'>
                  {profile.identity.name}
                </h1>

                <p className='mt-4 max-w-lg text-neutral-600 leading-7'>
                  {profile.identity.bio}
                </p>
              </section>

              <section className='border-neutral-200 border-t p-10'>
                <h2 className='font-medium'>About</h2>

                <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
                  {profile.about}
                </p>
              </section>

              <section className='border-neutral-200 border-t p-10'>
                <h2 className='font-medium'>Now</h2>

                <p className='mt-3 max-w-lg text-neutral-600 leading-7'>
                  {profile.now}
                </p>
              </section>
            </article>
          </div>
        </section>

        <aside className='w-80 shrink-0 border-neutral-200 border-l bg-white p-6'>
          <div className='mb-8'>
            <p className='font-medium'>Identity</p>

            <p className='mt-1 text-neutral-500 text-sm'>
              Edit your basic profile information.
            </p>
          </div>

          <div className='space-y-5'>
            <label className='block'>
              <span className='mb-2 block text-neutral-600 text-sm'>Name</span>

              <input
                className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                onChange={(event) => updateIdentity('name', event.target.value)}
                type='text'
                value={profile.identity.name}
              />
            </label>

            <label className='block'>
              <span className='mb-2 block text-neutral-600 text-sm'>Role</span>

              <input
                className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                onChange={(event) => updateIdentity('role', event.target.value)}
                type='text'
                value={profile.identity.role}
              />
            </label>

            <label className='block'>
              <span className='mb-2 block text-neutral-600 text-sm'>Bio</span>

              <textarea
                className='min-h-28 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400'
                onChange={(event) => updateIdentity('bio', event.target.value)}
                value={profile.identity.bio}
              />
            </label>
          </div>
        </aside>
      </div>
    </main>
  );
}
