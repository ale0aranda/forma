'use client';

import { useRef, useState } from 'react';

import { socialAuthUseCases } from '@/src/composition/auth-client';

import type { SocialProvider } from '@/src/features/auth/application/auth-service';

export function SocialLogin() {
  const [pending, setPending] = useState<SocialProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);

  async function signIn(provider: SocialProvider) {
    if (busy.current) {
      return;
    }

    busy.current = true;
    setPending(provider);
    setError(null);

    try {
      const signInUrl = await socialAuthUseCases.getSignInUrl(
        provider,
        `${window.location.origin}/auth/callback`
      );

      if (!signInUrl) {
        setError('Could not start sign in. Please try again.');
        busy.current = false;
        setPending(null);
        return;
      }

      window.location.assign(signInUrl);
    } catch {
      setError('Could not connect. Please try again.');
      busy.current = false;
      setPending(null);
    }
  }

  const buttonClassName =
    'flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 font-medium text-neutral-950 text-sm transition-colors hover:bg-neutral-50 disabled:cursor-wait disabled:opacity-60';

  return (
    <div className='mt-8'>
      <div className='space-y-3'>
        <div className='my-6 flex items-center gap-4'>
          <div className='h-px flex-1 bg-neutral-200' />
          <span className='text-neutral-400 text-xs'>
            or continue with email
          </span>
          <div className='h-px flex-1 bg-neutral-200' />
        </div>
        <button
          className={buttonClassName}
          disabled={pending !== null}
          onClick={() => signIn('google')}
          type='button'
        >
          <svg
            aria-hidden='true'
            height='18'
            viewBox='0 0 24 24'
            width='18'
          >
            <path
              d='M22.56 12.25c0-.73-.06-1.42-.19-2.09H12v3.96h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.75 3.28-7.95Z'
              fill='#4285F4'
            />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.8l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.87 0-5.3-1.94-6.17-4.54H2.15v2.84A11 11 0 0 0 12 23Z'
              fill='#34A853'
            />
            <path
              d='M5.83 13.96a6.6 6.6 0 0 1 0-3.92V7.2H2.15a11 11 0 0 0 0 9.6l3.68-2.84Z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.5c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.57 10.57 0 0 0 12 1a11 11 0 0 0-9.85 6.2l3.68 2.84C6.7 7.44 9.13 5.5 12 5.5Z'
              fill='#EA4335'
            />
          </svg>

          {pending === 'google' ? 'Connecting...' : 'Continue with Google'}
        </button>

        <button
          className={buttonClassName}
          disabled={pending !== null}
          onClick={() => signIn('github')}
          type='button'
        >
          <svg
            aria-hidden='true'
            fill='currentColor'
            height='18'
            viewBox='0 0 24 24'
            width='18'
          >
            <path d='M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.01-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.09 1.15a10.77 10.77 0 0 1 5.62 0c2.15-1.45 3.09-1.15 3.09-1.15.61 1.55.23 2.7.11 2.98.72.78 1.16 1.78 1.16 3.01 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.11c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z' />
          </svg>

          {pending === 'github' ? 'Connecting...' : 'Continue with GitHub'}
        </button>
      </div>

      {error && (
        <p
          className='mt-3 text-red-600 text-sm'
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  );
}
