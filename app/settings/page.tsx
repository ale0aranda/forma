import Link from 'next/link';
import { redirect } from 'next/navigation';

import { logout } from '@/app/editor/actions';
import { DeleteAccount } from '@/components/settings/delete-account';
import { createClient } from '@/lib/supabase/server';

interface SettingsPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function SettingsPage({
  searchParams
}: SettingsPageProps) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  const { error } = await searchParams;

  return (
    <main className='min-h-screen bg-white'>
      <div className='mx-auto w-full max-w-xl px-6 py-12'>
        <div className='mb-10'>
          <Link
            className='text-neutral-500 text-sm transition-colors hover:text-neutral-950'
            href='/editor'
          >
            ← Editor
          </Link>

          <h1 className='mt-6 font-semibold text-2xl text-neutral-950'>
            Settings
          </h1>

          <p className='mt-1 text-neutral-500 text-sm'>
            Manage your Forma account.
          </p>
        </div>

        {error === 'delete' && (
          <p className='mb-6 text-red-600 text-sm'>
            Could not delete your account.
          </p>
        )}

        <section className='border-neutral-200 border-t py-6'>
          <h2 className='font-medium text-neutral-950'>Account</h2>

          <div className='mt-4'>
            <p className='text-neutral-500 text-sm'>Email</p>

            <p className='mt-1 text-neutral-950 text-sm'>{data.user.email}</p>
          </div>
        </section>

        <section className='border-neutral-200 border-t py-6'>
          <h2 className='font-medium text-neutral-950'>Session</h2>

          <form
            action={logout}
            className='mt-4'
          >
            <button
              className='rounded-lg border border-neutral-200 px-4 py-2 text-neutral-700 text-sm transition-colors hover:bg-neutral-50'
              type='submit'
            >
              Log out
            </button>
          </form>
        </section>

        <section className='border-neutral-200 border-t py-6'>
          <h2 className='font-medium text-red-600'>Danger zone</h2>

          <p className='mt-2 text-neutral-500 text-sm'>
            Permanently delete your account and everything associated with it.
          </p>

          <div className='mt-4'>
            <DeleteAccount />
          </div>
        </section>
      </div>
    </main>
  );
}
