'use client';

import Link from 'next/link';
import { useState } from 'react';

import { logout } from '@/app/editor/actions';
import {
  type EditorSelection,
  EditorSidebar
} from '@/components/profile/editor-sidebar';
import { ProfileInspector } from '@/components/profile/profile-inspector';
import { ProfilePreview } from '@/components/profile/profile-preview';
import { ShareProfileButton } from '@/components/profile/share-profile-button';
import { useProfileEditor } from '@/hooks/use-profile-editor';
import { isValidProfile } from '@/lib/profile-validation';
import { getDefaultProfile } from '@/lib/profiles';

const initialProfile = getDefaultProfile();

export default function EditorPage() {
  const [selected, setSelected] = useState<EditorSelection>('profile');

  const {
    profile,
    publishedProfile,
    loaded,
    saving,
    publishing,
    error,
    hasUnsavedChanges,
    hasUnpublishedChanges,
    isPublished,
    updateUsername,
    updateIdentity,
    updateAbout,
    updateNow,
    addLink,
    updateLink,
    removeLink,
    addProject,
    updateProject,
    removeProject,
    addExperience,
    updateExperience,
    removeExperience,
    addGalleryItem,
    updateGalleryItem,
    removeGalleryItem,
    changePreset,
    changeTypography,
    changeAppearance,
    changePalette,
    changeDensity,
    changeRadius,
    changeBorders,
    toggleBlock,
    moveBlock,
    save,
    publish,
    reset,
    moveLink,
    moveProject,
    moveExperience,
    moveGalleryItem
  } = useProfileEditor({
    initialProfile
  });

  const validProfile = isValidProfile(profile);
  const busy = saving || publishing;

  let status = 'Saved';

  if (saving) {
    status = 'Saving...';
  } else if (publishing) {
    status = 'Publishing...';
  } else if (hasUnsavedChanges) {
    status = 'Unsaved changes';
  } else if (isPublished) {
    status = 'Published';
  } else if (hasUnpublishedChanges) {
    status = 'Saved · Unpublished changes';
  }

  if (!loaded) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-white text-neutral-950'>
        <p className='text-neutral-400 text-sm'>Loading editor...</p>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white text-neutral-950'>
      <header className='flex h-16 items-center justify-between border-neutral-200 border-b px-5'>
        <div className='flex items-center gap-3'>
          <Link
            className='font-semibold tracking-widest'
            href='/'
          >
            FORMA
          </Link>

          <span className='rounded-md bg-neutral-100 px-2 py-1 text-neutral-500 text-xs'>
            Editor
          </span>

          <span className='text-neutral-400 text-xs'>{status}</span>
        </div>

        <div className='flex items-center gap-2'>
          <form action={logout}>
            <button
              className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
              type='submit'
            >
              Sign out
            </button>
          </form>

          <button
            className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40'
            disabled={!hasUnsavedChanges || busy}
            onClick={reset}
            type='button'
          >
            Reset
          </button>

          {isPublished && <ShareProfileButton username={profile.username} />}

          {publishedProfile && (
            <ShareProfileButton username={publishedProfile.username} />
          )}

          {validProfile ? (
            <Link
              className='rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50'
              href={`/${profile.username}`}
              target='_blank'
            >
              View
            </Link>
          ) : (
            <span className='cursor-not-allowed rounded-lg border border-neutral-200 px-3 py-2 text-neutral-300 text-sm'>
              View
            </span>
          )}

          <button
            className='rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40'
            disabled={!hasUnsavedChanges || busy}
            onClick={() => {
              void save();
            }}
            type='button'
          >
            {saving ? 'Saving...' : 'Save'}
          </button>

          <button
            className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40'
            disabled={
              !validProfile
              || busy
              || (!hasUnsavedChanges && !hasUnpublishedChanges)
            }
            onClick={() => {
              void publish();
            }}
            type='button'
          >
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      {error && (
        <div className='border-red-100 border-b bg-red-50 px-5 py-2 text-red-600 text-sm'>
          {error}
        </div>
      )}

      <div className='flex min-h-screen'>
        <EditorSidebar
          blocks={profile.blocks}
          blockOrder={profile.blockOrder}
          onMoveBlock={moveBlock}
          onSelect={setSelected}
          selected={selected}
        />

        <ProfilePreview profile={profile} />

        <ProfileInspector
          onAddExperience={addExperience}
          onAddGalleryItem={addGalleryItem}
          onAddLink={addLink}
          onAddProject={addProject}
          onChangeAppearance={changeAppearance}
          onChangeBorders={changeBorders}
          onChangeDensity={changeDensity}
          onChangePalette={changePalette}
          onChangePreset={changePreset}
          onChangeRadius={changeRadius}
          onChangeTypography={changeTypography}
          onMoveExperience={moveExperience}
          onMoveGalleryItem={moveGalleryItem}
          onMoveLink={moveLink}
          onMoveProject={moveProject}
          onRemoveExperience={removeExperience}
          onRemoveGalleryItem={removeGalleryItem}
          onRemoveLink={removeLink}
          onRemoveProject={removeProject}
          onToggleBlock={toggleBlock}
          onUpdateAbout={updateAbout}
          onUpdateExperience={updateExperience}
          onUpdateGalleryItem={updateGalleryItem}
          onUpdateIdentity={updateIdentity}
          onUpdateLink={updateLink}
          onUpdateNow={updateNow}
          onUpdateProject={updateProject}
          onUpdateUsername={updateUsername}
          profile={profile}
          selectedBlock={selected}
        />
      </div>
    </main>
  );
}
