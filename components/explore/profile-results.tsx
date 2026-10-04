import { ProfileResult } from '@/components/explore/profile-result';

import type { ProfileSearchResult } from '@/lib/profile-search-repository';

interface ProfileResultsProps {
  results: ProfileSearchResult[];
  searching: boolean;
}

export function ProfileResults({ results, searching }: ProfileResultsProps) {
  if (results.length === 0) {
    return (
      <div className='py-16 text-center'>
        <p className='text-neutral-500 text-sm'>
          {searching ? 'No profiles found.' : 'No published profiles yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-1'>
      {results.map((result) => (
        <ProfileResult
          key={result.username}
          result={result}
        />
      ))}
    </div>
  );
}
