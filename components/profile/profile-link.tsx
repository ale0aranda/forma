'use client';

import { Globe } from 'lucide-react';
import { useState } from 'react';

import type { ProfileLink as ProfileLinkType } from '@/lib/profile';

interface ProfileLinkProps {
  link: ProfileLinkType;
}

type KnownService =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'instagram'
  | 'youtube'
  | 'discord'
  | 'twitch'
  | 'spotify';

interface LinkPresentation {
  label: string;
  service?: KnownService;
  favicon?: string;
}

export function ProfileLink({ link }: ProfileLinkProps) {
  const [faviconFailed, setFaviconFailed] = useState(false);

  if (!link.url) {
    return null;
  }

  const presentation = getLinkPresentation(link.url, link.label);

  return (
    <a
      aria-label={presentation.label}
      className='group flex size-8 items-center justify-center rounded-md opacity-50 transition-all hover:bg-current/5 hover:opacity-100'
      href={link.url}
      rel='noreferrer'
      target='_blank'
      title={presentation.label}
    >
      {presentation.service ? (
        <BrandIcon service={presentation.service} />
      ) : presentation.favicon && !faviconFailed ? (
        <picture>
          <source srcSet={presentation.favicon} />

          <img
            alt=''
            className='size-4 object-contain'
            height={16}
            loading='lazy'
            onError={() => {
              setFaviconFailed(true);
            }}
            src={presentation.favicon}
            width={16}
          />
        </picture>
      ) : (
        <Globe
          aria-hidden='true'
          className='opacity-70'
          size={16}
        />
      )}
    </a>
  );
}

function getLinkPresentation(
  value: string,
  fallbackLabel: string
): LinkPresentation {
  try {
    const url = new URL(value);

    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');

    const service = getKnownService(hostname);

    if (service) {
      return {
        service,
        label: getServiceLabel(service)
      };
    }

    return {
      label: fallbackLabel || hostname,
      favicon: `${url.protocol}//${url.host}/favicon.ico`
    };
  } catch {
    return {
      label: fallbackLabel || 'Website'
    };
  }
}

function getKnownService(hostname: string): KnownService | undefined {
  if (hostname === 'github.com' || hostname.endsWith('.github.com')) {
    return 'github';
  }

  if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) {
    return 'linkedin';
  }

  if (
    hostname === 'x.com'
    || hostname.endsWith('.x.com')
    || hostname === 'twitter.com'
    || hostname.endsWith('.twitter.com')
  ) {
    return 'x';
  }

  if (hostname === 'instagram.com' || hostname.endsWith('.instagram.com')) {
    return 'instagram';
  }

  if (
    hostname === 'youtube.com'
    || hostname.endsWith('.youtube.com')
    || hostname === 'youtu.be'
  ) {
    return 'youtube';
  }

  if (
    hostname === 'discord.com'
    || hostname.endsWith('.discord.com')
    || hostname === 'discord.gg'
  ) {
    return 'discord';
  }

  if (hostname === 'twitch.tv' || hostname.endsWith('.twitch.tv')) {
    return 'twitch';
  }

  if (hostname === 'spotify.com' || hostname.endsWith('.spotify.com')) {
    return 'spotify';
  }

  return undefined;
}

function getServiceLabel(service: KnownService) {
  const labels: Record<KnownService, string> = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    x: 'X',
    instagram: 'Instagram',
    youtube: 'YouTube',
    discord: 'Discord',
    twitch: 'Twitch',
    spotify: 'Spotify'
  };

  return labels[service];
}

interface BrandIconProps {
  service: KnownService;
}

function BrandIcon({ service }: BrandIconProps) {
  if (service === 'github') {
    return (
      <svg
        aria-hidden='true'
        fill='currentColor'
        height='16'
        viewBox='0 0 24 24'
        width='16'
      >
        <path d='M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z' />
      </svg>
    );
  }

  if (service === 'linkedin') {
    return (
      <svg
        aria-hidden='true'
        fill='currentColor'
        height='16'
        viewBox='0 0 24 24'
        width='16'
      >
        <path d='M5.3 7.8H1.7V22h3.6V7.8ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22 13.9c0-4.3-2.3-6.3-5.3-6.3-2.4 0-3.5 1.3-4.1 2.2v-2H9V22h3.6v-7c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8V22H22v-8.1Z' />
      </svg>
    );
  }

  if (service === 'x') {
    return (
      <svg
        aria-hidden='true'
        fill='currentColor'
        height='15'
        viewBox='0 0 24 24'
        width='15'
      >
        <path d='M18.2 2H21l-6.1 7 7.1 13h-5.6L12 16.2 6.9 22H4.1l6.6-7.5L3.8 2h5.7l4 5.3L18.2 2Zm-1 17.7h1.5L8.6 4.2H7l10.2 15.5Z' />
      </svg>
    );
  }

  if (service === 'instagram') {
    return (
      <svg
        aria-hidden='true'
        fill='none'
        height='17'
        viewBox='0 0 24 24'
        width='17'
      >
        <rect
          height='18'
          rx='5'
          stroke='currentColor'
          strokeWidth='2'
          width='18'
          x='3'
          y='3'
        />
        <circle
          cx='12'
          cy='12'
          r='4'
          stroke='currentColor'
          strokeWidth='2'
        />
        <circle
          cx='17.5'
          cy='6.5'
          fill='currentColor'
          r='1'
        />
      </svg>
    );
  }

  if (service === 'youtube') {
    return (
      <svg
        aria-hidden='true'
        fill='currentColor'
        height='17'
        viewBox='0 0 24 24'
        width='17'
      >
        <path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z' />
      </svg>
    );
  }

  if (service === 'spotify') {
    return (
      <svg
        aria-hidden='true'
        fill='currentColor'
        height='17'
        viewBox='0 0 24 24'
        width='17'
      >
        <path d='M12 1.5A10.5 10.5 0 1 0 12 22.5 10.5 10.5 0 0 0 12 1.5Zm4.8 15.1a.7.7 0 0 1-1 .2c-2.8-1.7-6.4-2.1-10.6-1.1a.7.7 0 1 1-.3-1.4c4.6-1 8.6-.6 11.7 1.3.3.2.4.6.2 1Zm1.4-3a.9.9 0 0 1-1.2.3c-3.2-2-8.1-2.6-11.9-1.4a.9.9 0 0 1-.5-1.7c4.3-1.3 9.7-.7 13.3 1.5.4.3.5.8.3 1.3Zm.1-3.1C14.5 8.2 8.1 8 4.5 9.1a1 1 0 1 1-.6-2c4.2-1.3 11.2-1 15.5 1.5a1 1 0 0 1-1.1 1.9Z' />
      </svg>
    );
  }

  if (service === 'twitch') {
    return (
      <svg
        aria-hidden='true'
        fill='currentColor'
        height='16'
        viewBox='0 0 24 24'
        width='16'
      >
        <path d='M2 2h20v14l-5 5h-4l-3 3v-3H6V18H2V2Zm2 2v12h4v3l3-3h6l3-3V4H4Zm5 3h2v6H9V7Zm5 0h2v6h-2V7Z' />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden='true'
      fill='currentColor'
      height='17'
      viewBox='0 0 24 24'
      width='17'
    >
      <path d='M19.5 5.3A17.4 17.4 0 0 0 15.3 4l-.5 1a15.8 15.8 0 0 0-5.6 0l-.5-1a17.4 17.4 0 0 0-4.2 1.3C1.8 9.3 1.1 13.2 1.5 17a17 17 0 0 0 5.2 2.6L8 17.9a10.7 10.7 0 0 1-2-1l.5-.4a12 12 0 0 0 11 0l.5.4a10.7 10.7 0 0 1-2 1l1.3 1.7a17 17 0 0 0 5.2-2.6c.5-4.4-.8-8.2-3-11.7ZM8.3 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z' />
    </svg>
  );
}
