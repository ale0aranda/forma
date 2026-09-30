'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  type EditorSelection,
  EditorSidebar
} from '@/components/profile/editor-sidebar';
import { ProfileInspector } from '@/components/profile/profile-inspector';
import { ProfilePreview } from '@/components/profile/profile-preview';
import { useProfileEditor } from '@/hooks/use-profile-editor';
import { getDefaultProfile } from '@/lib/profiles';

const initialProfile = getDefaultProfile();

export default function EditorPage() {
  const [selected, setSelected] = useState<EditorSelection>('identity');

  const {
    profile,
    loaded,
    hasUnsavedChanges,
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
    reset
  } = useProfileEditor({
    initialProfile
  });

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

          <span className='text-neutral-400 text-xs'>
            {hasUnsavedChanges ? 'Unsaved changes' : 'Saved'}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            className='rounded-lg px-3 py-2 text-neutral-500 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-950'
            onClick={reset}
            type='button'
          >
            Reset
          </button>

          <Link
            className='rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50'
            href={`/${profile.username}`}
            target='_blank'
          >
            Preview
          </Link>

          <button
            className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40'
            disabled={!hasUnsavedChanges}
            onClick={save}
            type='button'
          >
            Save
          </button>
        </div>
      </header>

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
          profile={profile}
          selectedBlock={selected}
        />
      </div>
    </main>
  );
}
