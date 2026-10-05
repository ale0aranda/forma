'use client';

import { useEffect, useState } from 'react';

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
    canUndo,
    canRedo,
    undo,
    redo,
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
    changeGalleryLayout,
    changeIdentityLayout,
    changeProjectsLayout,
    changeRadius,
    changeBorders,
    toggleBlock,
    reorderBlock,
    reorderLink,
    reorderProject,
    reorderExperience,
    reorderGalleryItem,
    save,
    publish,
    reset
  } = useProfileEditor({
    initialProfile
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target instanceof HTMLSelectElement
        || (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      const modifier = event.metaKey || event.ctrlKey;

      if (!modifier) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === 'z' && event.shiftKey) {
        if (!canRedo) {
          return;
        }

        event.preventDefault();
        redo();
        return;
      }

      if (key === 'y') {
        if (!canRedo) {
          return;
        }

        event.preventDefault();
        redo();
        return;
      }

      if (key === 'z') {
        if (!canUndo) {
          return;
        }

        event.preventDefault();
        undo();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canRedo, canUndo, redo, undo]);

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
        canRedo={canRedo}
        canUndo={canUndo}
        hasUnpublishedChanges={hasUnpublishedChanges}
        hasUnsavedChanges={hasUnsavedChanges}
        onPublish={publish}
        onRedo={redo}
        onReset={reset}
        onSave={save}
        onUndo={undo}
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
          onReorderBlock={reorderBlock}
          onSelect={setSelected}
          selected={selected}
          onToggleBlock={toggleBlock}
        />

        <ProfilePreview
          onSelectBlock={setSelected}
          profile={profile}
          selectedBlock={
            selected === 'profile' || selected === 'design'
              ? undefined
              : selected
          }
        />

        <ProfileInspector
          onAddExperience={addExperience}
          onAddGalleryItem={addGalleryItem}
          onAddLink={addLink}
          onAddProject={addProject}
          onChangeAppearance={changeAppearance}
          onChangeBorders={changeBorders}
          onChangeDensity={changeDensity}
          onChangeGalleryLayout={changeGalleryLayout}
          onChangeIdentityLayout={changeIdentityLayout}
          onChangePalette={changePalette}
          onChangePreset={changePreset}
          onChangeProjectsLayout={changeProjectsLayout}
          onChangeRadius={changeRadius}
          onChangeTypography={changeTypography}
          onReorderExperience={reorderExperience}
          onReorderGalleryItem={reorderGalleryItem}
          onReorderLink={reorderLink}
          onReorderProject={reorderProject}
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
