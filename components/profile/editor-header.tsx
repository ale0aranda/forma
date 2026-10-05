'use client';

import {
  Check,
  ChevronDown,
  ExternalLink,
  Redo2,
  RotateCcw,
  Undo2
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ShareProfileButton } from '@/components/profile/share-profile-button';

interface EditorHeaderProps {
  username: string;
  publishedUsername?: string | undefined;
  status: string;
  validProfile: boolean;
  hasUnsavedChanges: boolean;
  hasUnpublishedChanges: boolean;
  saving: boolean;
  publishing: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
}

export function EditorHeader({
  username,
  publishedUsername,
  status,
  validProfile,
  hasUnsavedChanges,
  hasUnpublishedChanges,
  saving,
  publishing,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onSave,
  onPublish
}: EditorHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const busy = saving || publishing;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className='flex h-16 shrink-0 items-center border-neutral-200 border-b bg-white px-4'>
      <div className='flex min-w-0 items-center gap-6'>
        <Link
          className='shrink-0 font-semibold text-lg text-neutral-950 tracking-tight'
          href='/'
        >
          Forma
        </Link>

        <nav
          aria-label='Main navigation'
          className='hidden items-center gap-1 lg:flex'
        >
          <NavigationLink href='/explore'>Explore</NavigationLink>

          <NavigationLink href='/settings'>Settings</NavigationLink>

          <Link
            aria-current='page'
            className='rounded-lg bg-neutral-100 px-3 py-2 font-medium text-neutral-950 text-sm'
            href='/editor'
          >
            Editor
          </Link>
        </nav>

        <div className='hidden h-5 border-neutral-200 border-l md:block' />

        <div className='hidden min-w-0 items-center gap-2 md:flex'>
          <span className='max-w-40 truncate font-medium text-neutral-700 text-sm'>
            @{username}
          </span>

          <EditorStatus status={status} />
        </div>
      </div>

      <div className='ml-auto flex shrink-0 items-center gap-2'>
        <div className='hidden items-center sm:flex'>
          <HistoryButton
            disabled={!canUndo || busy}
            label='Undo'
            onClick={onUndo}
          >
            <Undo2
              aria-hidden='true'
              size={16}
            />
          </HistoryButton>

          <HistoryButton
            disabled={!canRedo || busy}
            label='Redo'
            onClick={onRedo}
          >
            <Redo2
              aria-hidden='true'
              size={16}
            />
          </HistoryButton>
        </div>

        {publishedUsername && (
          <Link
            aria-label='Open public profile'
            className='flex size-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950'
            href={`/${publishedUsername}`}
            target='_blank'
          >
            <ExternalLink
              aria-hidden='true'
              size={16}
            />
          </Link>
        )}

        <div
          className='relative'
          ref={menuRef}
        >
          <button
            aria-expanded={menuOpen}
            aria-haspopup='menu'
            className='flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-neutral-500 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950'
            onClick={() => setMenuOpen((current) => !current)}
            type='button'
          >
            <span className='hidden sm:inline'>More</span>

            <ChevronDown
              aria-hidden='true'
              className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              size={14}
            />
          </button>

          {menuOpen && (
            <div
              className='absolute top-11 right-0 z-50 w-48 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg'
              role='menu'
            >
              {publishedUsername && (
                <ShareProfileButton username={publishedUsername} />
              )}

              <button
                className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-neutral-600 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40'
                disabled={!hasUnsavedChanges || busy}
                onClick={() => {
                  onReset();
                  setMenuOpen(false);
                }}
                role='menuitem'
                type='button'
              >
                <RotateCcw
                  aria-hidden='true'
                  size={15}
                />
                Reset changes
              </button>
            </div>
          )}
        </div>

        <div className='mx-1 hidden h-5 border-neutral-200 border-l sm:block' />

        <button
          className='hidden h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 font-medium text-neutral-700 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40 sm:flex'
          disabled={!hasUnsavedChanges || busy}
          onClick={() => {
            void onSave();
          }}
          type='button'
        >
          {saving ? (
            'Saving...'
          ) : (
            <>
              {!hasUnsavedChanges && (
                <Check
                  aria-hidden='true'
                  size={14}
                />
              )}
              Save
            </>
          )}
        </button>

        <button
          className='h-9 rounded-lg bg-neutral-950 px-4 font-medium text-sm text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300'
          disabled={
            !validProfile
            || busy
            || (!hasUnsavedChanges && !hasUnpublishedChanges)
          }
          onClick={() => {
            void onPublish();
          }}
          type='button'
        >
          {publishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </header>
  );
}

interface HistoryButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function HistoryButton({
  label,
  disabled,
  onClick,
  children
}: HistoryButtonProps) {
  return (
    <button
      aria-label={label}
      className='flex size-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30'
      disabled={disabled}
      onClick={onClick}
      title={label}
      type='button'
    >
      {children}
    </button>
  );
}

interface NavigationLinkProps {
  href: string;
  children: string;
}

function NavigationLink({ href, children }: NavigationLinkProps) {
  return (
    <Link
      className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
      href={href}
    >
      {children}
    </Link>
  );
}

interface EditorStatusProps {
  status: string;
}

function EditorStatus({ status }: EditorStatusProps) {
  const active = status === 'Saving...' || status === 'Publishing...';

  const dirty = status === 'Unsaved' || status === 'Unpublished changes';

  return (
    <div className='flex shrink-0 items-center gap-1.5'>
      <span
        aria-hidden='true'
        className={`size-1.5 rounded-full ${
          active ? 'bg-blue-500' : dirty ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />

      <span className='text-neutral-400 text-xs'>{status}</span>
    </div>
  );
}
