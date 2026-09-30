import { ProfileRenderer } from '@/components/profile/profile-renderer';

import type { Profile } from '@/lib/profile';

interface ProfilePreviewProps {
  profile: Profile;
}

export function ProfilePreview({ profile }: ProfilePreviewProps) {
  return (
    <section className='flex min-w-0 flex-1 justify-center bg-neutral-50 p-10'>
      <div className='w-full max-w-2xl'>
        <div className='mb-3 flex items-center justify-between'>
          <p className='text-neutral-500 text-xs'>Preview</p>

          <p className='text-neutral-400 text-xs'>/{profile.username}</p>
        </div>

        <ProfileRenderer profile={profile} />
      </div>
    </section>
  );
}
