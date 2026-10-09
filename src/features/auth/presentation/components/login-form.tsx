'use client';

import { ArrowRight, Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';

import { login } from '@/app/login/actions';

interface LoginFormProps {
  error?: string | undefined;
}

export function LoginForm({ error }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {error && (
        <div
          className='mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 text-sm'
          role='alert'
        >
          {error === 'invalid'
            ? 'Enter a valid email and password.'
            : 'Invalid email or password.'}
        </div>
      )}

      <form
        action={login}
        className='mt-8 space-y-5'
      >
        <div>
          <label
            className='mb-2 block font-medium text-neutral-800 text-sm'
            htmlFor='email'
          >
            Email
          </label>

          <div className='relative'>
            <input
              autoComplete='email'
              className='h-12 w-full rounded-lg border border-neutral-200 bg-white pr-11 pl-3.5 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-500'
              id='email'
              name='email'
              placeholder='you@example.com'
              required
              type='email'
            />

            <Mail
              aria-hidden='true'
              className='pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-neutral-400'
              size={17}
            />
          </div>
        </div>

        <div>
          <label
            className='mb-2 block font-medium text-neutral-800 text-sm'
            htmlFor='password'
          >
            Password
          </label>

          <div className='relative'>
            <input
              autoComplete='current-password'
              className='h-12 w-full rounded-lg border border-neutral-200 bg-white pr-11 pl-3.5 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-500'
              id='password'
              minLength={6}
              name='password'
              placeholder='Your password'
              required
              type={showPassword ? 'text' : 'password'}
            />

            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className='absolute top-1/2 right-2.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700'
              onClick={() => setShowPassword((current) => !current)}
              type='button'
            >
              {showPassword ? (
                <EyeOff
                  aria-hidden='true'
                  size={17}
                />
              ) : (
                <Eye
                  aria-hidden='true'
                  size={17}
                />
              )}
            </button>
          </div>
        </div>

        <button
          className='group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
          type='submit'
        >
          Log in
          <ArrowRight
            aria-hidden='true'
            className='transition-transform group-hover:translate-x-0.5'
            size={16}
          />
        </button>
      </form>
    </>
  );
}
