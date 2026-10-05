'use client';

import { useState } from 'react';

import { EditorHeader } from '@/components/profile/editor-header';
import {
  type EditorSelection,
  EditorSidebar
} from '@/components/profile/editor-sidebar';
import { ProfileInspector } from '@/components/profile/profile-inspector';
import { ProfilePreview } from '@/components/profile/profile-preview';
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

  let status = 'Saved';

  if (saving) {
    status = 'Saving...';
  } else if (publishing) {
    status = 'Publishing...';
  } else if (hasUnsavedChanges) {
    status = 'Unsaved';
  } else if (isPublished) {
    status = 'Published';
  } else if (hasUnpublishedChanges) {
    status = 'Ready to publish';
  }

  if (!loaded) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-white text-neutral-950'>
        <p className='text-neutral-400 text-sm'>Loading editor...</p>
      </main>
    );
  }

  return (
    <main className='flex h-screen flex-col overflow-hidden bg-white text-neutral-950'>
      <EditorHeader
        hasUnpublishedChanges={hasUnpublishedChanges}
        hasUnsavedChanges={hasUnsavedChanges}
        onPublish={publish}
        onReset={reset}
        onSave={save}
        publishedUsername={publishedProfile?.username}
        publishing={publishing}
        saving={saving}
        status={status}
        username={profile.username}
        validProfile={validProfile}
      />

      {error && (
        <div className='shrink-0 border-red-100 border-b bg-red-50 px-4 py-2 text-red-600 text-sm'>
          {error}
        </div>
      )}

      <div className='flex min-h-0 flex-1'>
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
