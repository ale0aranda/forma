export function getCredentials(formData: FormData) {
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

export function getSignupCredentials(formData: FormData) {
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
