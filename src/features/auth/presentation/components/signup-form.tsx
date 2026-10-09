'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { signup } from '@/app/login/actions';

import type { FormEvent } from 'react';

function getPasswordStrength(password: string) {
  if (!password) {
    return 'empty';
  }

  if (password.length < 6) {
    return 'weak';
  }

  if (password.length < 10) {
    return 'medium';
  }

  return 'strong';
}

export function SignupForm() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const strength = getPasswordStrength(password);
  const passwordsMatch = confirmation.length > 0 && password === confirmation;
  const isValid = strength === 'strong' && passwordsMatch;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!isValid) {
      event.preventDefault();
      setSubmitError(
        passwordsMatch
          ? 'Use at least 10 characters for a stronger password.'
          : 'Make sure both passwords match.'
      );
    }
  }

  return (
    <form
      action={signup}
      className='mt-8 space-y-5'
      onSubmit={handleSubmit}
    >
      <div>
        <label
          className='mb-2 block font-medium text-neutral-800 text-sm'
          htmlFor='email'
        >
          Email
        </label>

        <input
          autoComplete='email'
          className='h-12 w-full rounded-lg border border-neutral-200 bg-white px-3.5 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-500'
          id='email'
          name='email'
          placeholder='you@example.com'
          required
          type='email'
        />
      </div>

      <PasswordField
        autoComplete='new-password'
        id='password'
        label='Password'
        name='password'
        onChange={(value) => {
          setPassword(value);
          setSubmitError(null);
        }}
        placeholder='At least 6 characters'
        showPassword={showPassword}
        toggleVisibility={() => setShowPassword((current) => !current)}
        value={password}
      />

      <div>
        <PasswordField
          autoComplete='new-password'
          id='password-confirmation'
          label='Confirm password'
          name='passwordConfirmation'
          onChange={(value) => {
            setConfirmation(value);
            setSubmitError(null);
          }}
          placeholder='Repeat your password'
          showPassword={showConfirmation}
          toggleVisibility={() => setShowConfirmation((current) => !current)}
          value={confirmation}
        />

        {confirmation && (
          <p
            className={`mt-2 text-xs ${
              passwordsMatch ? 'text-emerald-600' : 'text-red-600'
            }`}
            role='status'
          >
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </p>
        )}
      </div>

      <div aria-live='polite'>
        <div className='flex gap-1.5'>
          {['weak', 'medium', 'strong'].map((level) => (
            <span
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                strength === 'empty'
                  ? 'bg-neutral-200'
                  : strength === 'weak'
                    ? 'bg-red-400'
                    : strength === 'medium'
                      ? level === 'weak' || level === 'medium'
                        ? 'bg-amber-400'
                        : 'bg-neutral-200'
                      : 'bg-emerald-500'
              }`}
              key={level}
            />
          ))}
        </div>
        <p
          className='mt-2 text-neutral-500 text-xs'
          id='password-strength'
        >
          {strength === 'empty'
            ? 'Use 10 or more characters for a strong password.'
            : strength === 'weak'
              ? 'Too short — use at least 6 characters.'
              : strength === 'medium'
                ? 'Almost there — add a few more characters.'
                : 'Strong password'}
        </p>
      </div>

      {submitError && (
        <p
          className='text-red-600 text-sm'
          role='alert'
        >
          {submitError}
        </p>
      )}

      <button
        className='flex h-12 w-full items-center justify-center rounded-lg bg-neutral-950 px-4 font-medium text-sm text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50'
        disabled={!isValid}
        type='submit'
      >
        Create account
      </button>
    </form>
  );
}

interface PasswordFieldProps {
  autoComplete: 'new-password';
  id: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  showPassword: boolean;
  toggleVisibility: () => void;
  value: string;
}

function PasswordField({
  autoComplete,
  id,
  label,
  name,
  onChange,
  placeholder,
  showPassword,
  toggleVisibility,
  value
}: PasswordFieldProps) {
  return (
    <div>
      <label
        className='mb-2 block font-medium text-neutral-800 text-sm'
        htmlFor={id}
      >
        {label}
      </label>

      <div className='relative'>
        <input
          aria-describedby={id === 'password' ? 'password-strength' : undefined}
          autoComplete={autoComplete}
          className='h-12 w-full rounded-lg border border-neutral-200 bg-white pr-11 pl-3.5 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-500'
          id={id}
          minLength={6}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required
          type={showPassword ? 'text' : 'password'}
          value={value}
        />

        <button
          aria-label={
            showPassword
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          className='absolute top-1/2 right-2.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700'
          onClick={toggleVisibility}
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
  );
}
