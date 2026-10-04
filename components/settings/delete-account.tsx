'use client';

import { useState } from 'react';

import { deleteAccount } from '@/app/settings/actions';

export function DeleteAccount() {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        className='rounded-lg border border-red-200 px-4 py-2 text-red-600 text-sm transition-colors hover:bg-red-50'
        onClick={() => {
          setConfirming(true);
        }}
        type='button'
      >
        Delete account
      </button>
    );
  }

  return (
    <div className='space-y-3'>
      <p className='text-neutral-600 text-sm'>
        This permanently deletes your profile, followers and account.
      </p>

      <div className='flex items-center gap-2'>
        <form action={deleteAccount}>
          <button
            className='rounded-lg bg-red-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-red-700'
            type='submit'
          >
            Yes, delete my account
          </button>
        </form>

        <button
          className='rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 text-sm transition-colors hover:bg-neutral-50'
          onClick={() => {
            setConfirming(false);
          }}
          type='button'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
