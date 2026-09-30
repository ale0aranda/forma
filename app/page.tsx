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
    <main className='flex min-h-screen bg-white text-neutral-950'>
      <section className='flex flex-1 items-center justify-center bg-neutral-50 p-12'>
        <div className='w-full max-w-xl rounded-xl border border-neutral-200 bg-white p-8'>
          <p className='text-neutral-500 text-sm'>{profile.identity.role}</p>

          <h1 className='mt-2 font-semibold text-3xl tracking-tight'>
            {profile.identity.name}
          </h1>

          <p className='mt-4 text-neutral-600 leading-7'>
            {profile.identity.bio}
          </p>

          <section className='mt-10 border-neutral-200 border-t pt-6'>
            <h2 className='font-medium'>About</h2>

            <p className='mt-3 text-neutral-600 leading-7'>{profile.about}</p>
          </section>

          <section className='mt-6 border-neutral-200 border-t pt-6'>
            <h2 className='font-medium'>Now</h2>

            <p className='mt-3 text-neutral-600 leading-7'>{profile.now}</p>
          </section>
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
              className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400'
              onChange={(event) => updateIdentity('name', event.target.value)}
              type='text'
              value={profile.identity.name}
            />
          </label>

          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>Role</span>

            <input
              className='w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400'
              onChange={(event) => updateIdentity('role', event.target.value)}
              type='text'
              value={profile.identity.role}
            />
          </label>

          <label className='block'>
            <span className='mb-2 block text-neutral-600 text-sm'>Bio</span>

            <textarea
              className='min-h-28 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400'
              onChange={(event) => updateIdentity('bio', event.target.value)}
              value={profile.identity.bio}
            />
          </label>
        </div>
      </aside>
    </main>
  );
}
