import { AppHeader } from '@/components/app-header';
import { ProfileResults } from '@/components/explore/profile-results';
import { searchProfiles } from '@/lib/profile-search-repository';
import { createClient } from '@/lib/supabase/server';

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { q } = await searchParams;

  const query = q?.trim() ?? '';

  const [results, supabase] = await Promise.all([
    searchProfiles(query),
    createClient()
  ]);

  const { data } = await supabase.auth.getUser();

  return (
    <main className='min-h-screen bg-white'>
      <AppHeader authenticated={Boolean(data.user)} />

      <div className='mx-auto w-full max-w-xl px-6 py-12'>
        <div className='mb-8'>
          <h1 className='font-semibold text-2xl text-neutral-950'>Explore</h1>

          <p className='mt-1 text-neutral-500 text-sm'>
            Discover people on Forma.
          </p>
        </div>

        <form className='mb-8'>
          <label
            className='sr-only'
            htmlFor='profile-search'
          >
            Search profiles
          </label>

          <input
            className='w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400'
            defaultValue={query}
            id='profile-search'
            name='q'
            placeholder='Search people...'
            type='search'
          />
        </form>

        {query && (
          <p className='mb-3 text-neutral-400 text-xs'>Results for “{query}”</p>
        )}

        <ProfileResults
          results={results}
          searching={Boolean(query)}
        />
      </div>
    </main>
  );
}
