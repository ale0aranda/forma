'use client';

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

import type { ProfileAppearance } from '@/lib/profile';

interface ShareProfileButtonProps {
  username: string;
  appearance?: ProfileAppearance;
}

export function ShareProfileButton({
  username,
  appearance = 'light'
}: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = new URL(`/${username}`, window.location.origin).toString();

    if (navigator.share) {
      try {
        await navigator.share({
          title: `@${username}`,
          url
        });

        return;
      } catch {
        return;
      }
    }

    await navigator.clipboard.writeText(url);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const className =
    appearance === 'dark'
      ? 'flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-neutral-300 text-sm transition-colors hover:bg-white/5 hover:text-white'
      : 'flex h-9 items-center gap-2 rounded-lg border border-neutral-200 px-3 text-neutral-600 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950';

  return (
    <button
      className={className}
      onClick={() => {
        void handleShare();
      }}
      type='button'
    >
      {copied ? (
        <>
          <Check
            aria-hidden='true'
            size={14}
          />
          Copied
        </>
      ) : (
        <>
          <Share2
            aria-hidden='true'
            size={14}
          />
          Share
        </>
      )}
    </button>
  );
}
