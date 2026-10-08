import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code && !searchParams.has('error')) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL('/editor', origin));
    }
  }

  return NextResponse.redirect(new URL('/login?error=oauth', origin));
}
