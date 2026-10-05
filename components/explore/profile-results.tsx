import { ProfileResult } from '@/components/explore/profile-result';

import type { ProfileSearchResult } from '@/lib/profile-search-repository';

interface ProfileResultsProps {
  results: ProfileSearchResult[];
  searching: boolean;
}

export function ProfileResults({ results, searching }: ProfileResultsProps) {
  if (results.length === 0) {
    return (
      <div className='border-neutral-200 border-t py-12'>
        <p className='text-neutral-500 text-sm'>
          {searching ? 'No profiles found.' : 'No profiles to discover yet.'}
        </p>

        <p className='mt-1 text-neutral-400 text-xs'>
          {searching
            ? 'Try another name or username.'
            : 'Published profiles will appear here.'}
        </p>
      </div>
    );
  }

  return (
    <div className='border-neutral-200 border-t'>
      {results.map((result) => (
        <ProfileResult
          key={result.username}
          result={result}
        />
      ))}
    </div>
  );
}
