import { LogOut, Shield, Trash2, UserRound } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { logout } from '@/app/editor/actions';
import { loadCurrentProfile } from '@/src/composition/current-profile';
import { loadSessionUser } from '@/src/composition/session';
import { AppHeader } from '@/src/features/navigation/presentation/components/app-header';
import { DeleteAccount } from '@/src/features/settings/presentation/components/delete-account';

interface SettingsPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function SettingsPage({
  searchParams
}: SettingsPageProps) {
  const user = await loadSessionUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await loadCurrentProfile();

  const { error } = await searchParams;

  return (
    <main className='min-h-screen bg-neutral-50'>
      <AppHeader
        authenticated
        profile={profile}
      />
      <div className='mx-auto flex w-full max-w-6xl'>
        <aside className='hidden min-h-screen w-64 shrink-0 border-neutral-200 border-r px-6 py-10 md:block'>
          <div>
            <Link
              className='font-semibold text-neutral-950 text-xl'
              href='/'
            >
              Forma
            </Link>

            <p className='mt-6 font-semibold text-neutral-950 text-sm'>
              Settings
            </p>

            <p className='mt-1 max-w-44 text-neutral-500 text-sm leading-5'>
              Manage your Forma account and preferences.
            </p>
          </div>

          <nav
            aria-label='Settings navigation'
            className='mt-8 space-y-1'
          >
            <a
              className='flex items-center gap-3 rounded-lg bg-neutral-200/60 px-3 py-2.5 font-medium text-neutral-950 text-sm'
              href='#account'
            >
              <UserRound
                aria-hidden='true'
                size={17}
              />
              Account
            </a>

            <a
              className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
              href='#session'
            >
              <Shield
                aria-hidden='true'
                size={17}
              />
              Session
            </a>

            <a
              className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
              href='#danger-zone'
            >
              <Trash2
                aria-hidden='true'
                size={17}
              />
              Danger zone
            </a>
          </nav>
        </aside>

        <div className='min-w-0 flex-1 px-6 py-10 md:px-10 lg:px-14'>
          <div className='mx-auto max-w-3xl'>
            <div className='mb-8'>
              <Link
                className='text-neutral-400 text-sm transition-colors hover:text-neutral-950 md:hidden'
                href='/editor'
              >
                ← Editor
              </Link>

              <div className='mt-5 md:mt-0'>
                <h1 className='font-semibold text-3xl text-neutral-950 tracking-tight'>
                  Settings
                </h1>

                <p className='mt-2 text-neutral-500 text-sm'>
                  Manage your Forma account and preferences.
                </p>
              </div>
            </div>

            {error === 'delete' && (
              <div className='mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm'>
                Could not delete your account. Please try again.
              </div>
            )}

            <div className='space-y-5'>
              <section
                className='rounded-xl border border-neutral-200 bg-white p-6'
                id='account'
              >
                <SectionHeader
                  description='Your account information.'
                  icon={
                    <UserRound
                      aria-hidden='true'
                      size={18}
                    />
                  }
                  title='Account'
                />

                <div className='mt-6 border-neutral-100 border-t pt-5'>
                  <p className='mb-2 font-medium text-neutral-700 text-xs'>
                    Email
                  </p>

                  <div className='rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5'>
                    <p className='truncate text-neutral-800 text-sm'>
                      {user.email}
                    </p>
                  </div>

                  <p className='mt-2 text-neutral-400 text-xs'>
                    Your email is used for authentication and important account
                    updates.
                  </p>
                </div>
              </section>

              <section
                className='rounded-xl border border-neutral-200 bg-white p-6'
                id='session'
              >
                <SectionHeader
                  description='Manage your active session.'
                  icon={
                    <Shield
                      aria-hidden='true'
                      size={18}
                    />
                  }
                  title='Session'
                />

                <div className='mt-6 border-neutral-100 border-t pt-5'>
                  <form action={logout}>
                    <button
                      className='flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 font-medium text-neutral-700 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
                      type='submit'
                    >
                      <LogOut
                        aria-hidden='true'
                        size={15}
                      />
                      Log out
                    </button>
                  </form>

                  <p className='mt-2 text-neutral-400 text-xs'>
                    You will be signed out from this device.
                  </p>
                </div>
              </section>

              <section
                className='rounded-xl border border-red-200 bg-white p-6'
                id='danger-zone'
              >
                <SectionHeader
                  danger
                  description='Permanently delete your account and everything associated with it.'
                  icon={
                    <Trash2
                      aria-hidden='true'
                      size={18}
                    />
                  }
                  title='Danger zone'
                />

                <div className='mt-6 rounded-lg border border-red-200 bg-red-50 p-4'>
                  <div className='flex gap-3'>
                    <div className='mt-0.5 text-red-600'>
                      <Trash2
                        aria-hidden='true'
                        size={16}
                      />
                    </div>

                    <div>
                      <p className='font-medium text-red-700 text-sm'>
                        This action cannot be undone.
                      </p>

                      <p className='mt-1 text-red-600/70 text-xs leading-5'>
                        Your profile, settings and associated content will be
                        permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-4'>
                  <DeleteAccount />
                </div>
              </section>
            </div>

            <div className='mt-8 flex items-center justify-between border-neutral-200 border-t pt-5'>
              <p className='text-neutral-400 text-xs'>Forma account settings</p>

              <Link
                className='text-neutral-500 text-xs transition-colors hover:text-neutral-950'
                href='/editor'
              >
                Back to editor →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  danger?: boolean;
}

function SectionHeader({
  title,
  description,
  icon,
  danger = false
}: SectionHeaderProps) {
  return (
    <div className='flex items-start gap-3'>
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
          danger ? 'bg-red-50 text-red-600' : 'bg-neutral-100 text-neutral-700'
        }`}
      >
        {icon}
      </div>

      <div className='min-w-0 pt-0.5'>
        <h2
          className={`font-semibold text-sm ${
            danger ? 'text-red-600' : 'text-neutral-950'
          }`}
        >
          {title}
        </h2>

        <p className='mt-1 text-neutral-500 text-sm'>{description}</p>
      </div>
    </div>
  );
}
