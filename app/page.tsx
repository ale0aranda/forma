import {
  ArrowRight,
  Blocks,
  LayoutPanelLeft,
  Palette,
  UsersRound
} from 'lucide-react';
import Link from 'next/link';

import { LandingEditorPreview } from '@/src/features/marketing/presentation/components/editor-preview';
import { LandingProfilePreview } from '@/src/features/marketing/presentation/components/profile-preview';

const features = [
  {
    icon: LayoutPanelLeft,

    title: 'Visual editor',

    description: 'Customize your profile and see every change in real time.'
  },

  {
    icon: Blocks,

    title: 'Multiple blocks',

    description: 'Projects, experience, links, gallery, now and more.'
  },

  {
    icon: UsersRound,

    title: 'Follow creators',

    description: 'Discover and follow other people building on Forma.'
  },

  {
    icon: Palette,

    title: 'Make it yours',

    description: 'Change typography, colors, density and appearance.'
  }
];

export default function HomePage() {
  return (
    <main className='min-h-screen bg-white text-neutral-950'>
      <header className='border-neutral-200 border-b'>
        <div className='mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6'>
          <Link
            className='font-semibold text-sm tracking-widest'
            href='/'
          >
            FORMA
          </Link>

          <nav className='hidden items-center gap-8 text-neutral-500 text-sm sm:flex'>
            <Link
              className='transition-colors hover:text-neutral-950'
              href='/explore'
            >
              Explore
            </Link>

            <Link
              className='transition-colors hover:text-neutral-950'
              href='/editor'
            >
              Editor
            </Link>
          </nav>

          <Link
            className='flex h-9 items-center gap-2 rounded-lg bg-neutral-950 px-4 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
            href='/signup'
          >
            Get started
            <ArrowRight
              aria-hidden='true'
              size={14}
            />
          </Link>
        </div>
      </header>

      <div className='mx-auto w-full max-w-5xl px-6'>
        <section className='flex flex-col items-center pt-20 text-center sm:pt-24'>
          <h1 className='mt-5 max-w-xl font-semibold text-5xl tracking-tight sm:text-6xl'>
            Your profile,
            <span className='block text-neutral-400'>your way.</span>
          </h1>

          <p className='mt-6 max-w-lg text-neutral-500 leading-7'>
            Build a profile that feels like you. Share your work, projects and
            ideas, then discover people building theirs.
          </p>

          <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
            <Link
              className='flex h-11 items-center gap-2 rounded-lg bg-neutral-950 px-5 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
              href='/signup'
            >
              Get started
              <ArrowRight
                aria-hidden='true'
                size={15}
              />
            </Link>
          </div>
        </section>

        <section className='mt-16 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm sm:mt-20'>
          <div className='grid lg:grid-cols-2'>
            <LandingEditorPreview />

            <LandingProfilePreview />
          </div>
        </section>

        <section className='grid gap-10 border-neutral-200 border-y py-14 text-center sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                className='flex flex-col items-center'
                key={feature.title}
              >
                <div className='flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-white'>
                  <Icon
                    aria-hidden='true'
                    size={17}
                  />
                </div>

                <h3 className='mt-4 font-medium text-sm'>{feature.title}</h3>

                <p className='mt-1.5 max-w-48 text-neutral-500 text-sm leading-5'>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </section>
      </div>

      <footer className='border-neutral-200 border-t'>
        <div className='mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='font-semibold text-xs tracking-widest'>FORMA</p>

            <p className='mt-1 text-neutral-400 text-xs'>
              Make your corner of the web.
            </p>
          </div>

          <div className='flex items-center gap-5 text-neutral-400 text-xs'>
            <Link
              className='transition-colors hover:text-neutral-950'
              href='/explore'
            >
              Explore
            </Link>

            <Link
              className='transition-colors hover:text-neutral-950'
              href='/login'
            >
              Sign in
            </Link>

            <Link
              className='transition-colors hover:text-neutral-950'
              href='/editor'
            >
              Editor
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
