import { NextResponse } from 'next/server';

import { authUseCases } from '@/src/composition/auth-server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code && !searchParams.has('error')) {
    const success = await authUseCases.exchangeCode(code);

    if (success) {
      return NextResponse.redirect(new URL('/editor', origin));
    }
  }

  return NextResponse.redirect(new URL('/login?error=oauth', origin));
}
