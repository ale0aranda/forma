'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

function getCredentials(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return undefined;
  }

  const normalizedEmail = email.trim();

  if (!normalizedEmail || password.length < 6) {
    return undefined;
  }

  return {
    email: normalizedEmail,
    password
  };
}

function getSignupCredentials(formData: FormData) {
  const credentials = getCredentials(formData);
  const confirmation = formData.get('passwordConfirmation');

  if (
    !credentials
    || typeof confirmation !== 'string'
    || credentials.password !== confirmation
  ) {
    return undefined;
  }

  return credentials;
}

export async function login(formData: FormData) {
  const credentials = getCredentials(formData);

  if (!credentials) {
    redirect('/login?error=invalid');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    redirect('/login?error=credentials');
  }

  redirect('/editor');
}

export async function signup(formData: FormData) {
  const credentials = getSignupCredentials(formData);

  if (!credentials) {
    redirect('/signup?error=invalid');
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(credentials);

  if (error) {
    redirect('/signup?error=signup');
  }

  redirect('/signup?success=confirmation');
}
