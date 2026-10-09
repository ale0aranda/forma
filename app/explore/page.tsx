import { Search } from 'lucide-react';

import { loadCurrentProfile } from '@/src/composition/current-profile';
import { searchPublicProfiles } from '@/src/composition/profile-search';
import { loadAuthenticationState } from '@/src/composition/session';
import { ProfileResults } from '@/src/features/explore/presentation/components/profile-results';
import { AppHeader } from '@/src/features/navigation/presentation/components/app-header';

import type { Metadata } from 'next';

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Discover people and profiles on Forma.'
};

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { q } = await searchParams;

  const query = q?.trim() ?? '';

  const [results, authenticated] = await Promise.all([
    searchPublicProfiles(query),
    loadAuthenticationState()
  ]);

  const profile = authenticated ? await loadCurrentProfile() : undefined;

  return (
    <main className='min-h-screen bg-white'>
      <AppHeader
        authenticated={authenticated}
        profile={profile}
      />

      <div className='mx-auto w-full max-w-4xl px-6 py-14 sm:py-16'>
        <header>
          <h1 className='font-semibold text-4xl text-neutral-950 tracking-tight'>
            Explore
          </h1>

          <p className='mt-2 text-neutral-500'>Discover people on Forma.</p>
        </header>

        <form className='mt-9'>
          <label
            className='sr-only'
            htmlFor='profile-search'
          >
            Search profiles
          </label>

          <div className='relative max-w-lg'>
            <Search
              aria-hidden='true'
              className='pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-400'
              size={17}
            />

            <input
              className='h-11 w-full rounded-lg border border-neutral-200 bg-white pr-4 pl-10 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-400'
              defaultValue={query}
              id='profile-search'
              name='q'
              placeholder='Search people...'
              type='search'
            />
          </div>
        </form>

        <div className='mt-10'>
          <div className='mb-2 flex items-center justify-between'>
            <p className='font-medium text-neutral-950 text-sm'>
              {query ? `Results for “${query}”` : 'People on Forma'}
            </p>

            {results.length > 0 && (
              <p className='text-neutral-400 text-xs'>
                {results.length} {results.length === 1 ? 'profile' : 'profiles'}
              </p>
            )}
          </div>

          <ProfileResults
            results={results}
            searching={Boolean(query)}
          />
        </div>
      </div>
    </main>
  );
}
