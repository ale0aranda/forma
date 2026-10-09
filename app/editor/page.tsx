'use client';

import { LayoutGrid, Monitor, Palette, Settings2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { EditorHeader } from '@/components/profile/editor-header';
import {
  type EditorSelection,
  EditorSidebar
} from '@/components/profile/editor-sidebar';
import { ProfileInspector } from '@/components/profile/profile-inspector';
import { ProfilePreview } from '@/components/profile/profile-preview';
import { useProfileEditor } from '@/hooks/use-profile-editor';
import { getDefaultProfile } from '@/src/features/profile/domain/profile-defaults';
import { isValidProfile } from '@/src/features/profile/domain/profile-validation';

const initialProfile = getDefaultProfile();

type MobilePanel = 'preview' | 'blocks' | 'inspector';

export default function EditorPage() {
  const [selected, setSelected] = useState<EditorSelection>('profile');

  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('preview');

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
    changeRadius,
    changeBorders,
    changeIdentityLayout,
    changeProjectsLayout,
    changeGalleryLayout,
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

  function selectFromSidebar(selection: EditorSelection) {
    setSelected(selection);
    setMobilePanel('inspector');
  }

  function selectFromPreview(
    block: Exclude<EditorSelection, 'profile' | 'design'>
  ) {
    setSelected(block);
    setMobilePanel('inspector');
  }

  const inspector = (
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
  );

  if (!loaded) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-white text-neutral-950'>
        <p className='text-neutral-400 text-sm'>Loading editor...</p>
      </main>
    );
  }

  return (
    <main className='flex h-dvh flex-col overflow-hidden bg-white text-neutral-950'>
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

      <div className='hidden min-h-0 flex-1 lg:flex'>
        <EditorSidebar
          blocks={profile.blocks}
          blockOrder={profile.blockOrder}
          onReorderBlock={reorderBlock}
          onSelect={setSelected}
          onToggleBlock={toggleBlock}
          selected={selected}
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

        {inspector}
      </div>

      <div className='flex min-h-0 flex-1 flex-col lg:hidden'>
        <div className='relative min-h-0 flex-1 overflow-hidden'>
          {mobilePanel === 'preview' && (
            <ProfilePreview
              compact
              onSelectBlock={selectFromPreview}
              profile={profile}
              selectedBlock={
                selected === 'profile' || selected === 'design'
                  ? undefined
                  : selected
              }
            />
          )}

          {mobilePanel === 'blocks' && (
            <div className='h-full overflow-y-auto bg-white'>
              <MobilePanelHeader
                onClose={() => setMobilePanel('preview')}
                title='Content'
              />

              <EditorSidebar
                blocks={profile.blocks}
                blockOrder={profile.blockOrder}
                mobile
                onReorderBlock={reorderBlock}
                onSelect={selectFromSidebar}
                onToggleBlock={toggleBlock}
                selected={selected}
              />
            </div>
          )}

          {mobilePanel === 'inspector' && (
            <div className='flex h-full flex-col bg-white'>
              <MobilePanelHeader
                onClose={() => setMobilePanel('preview')}
                title='Edit profile'
              />

              <div className='min-h-0 flex-1'>{inspector}</div>
            </div>
          )}
        </div>

        <MobileEditorNavigation
          active={mobilePanel}
          onBlocks={() => setMobilePanel('blocks')}
          onDesign={() => {
            setSelected('design');
            setMobilePanel('inspector');
          }}
          onPreview={() => setMobilePanel('preview')}
          onProfile={() => {
            setSelected('profile');
            setMobilePanel('inspector');
          }}
        />
      </div>
    </main>
  );
}

interface MobilePanelHeaderProps {
  title: string;
  onClose: () => void;
}

function MobilePanelHeader({ title, onClose }: MobilePanelHeaderProps) {
  return (
    <div className='flex h-12 shrink-0 items-center justify-between border-neutral-200 border-b px-4'>
      <p className='font-medium text-sm'>{title}</p>

      <button
        aria-label='Close panel'
        className='flex size-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950'
        onClick={onClose}
        type='button'
      >
        <X
          aria-hidden='true'
          size={17}
        />
      </button>
    </div>
  );
}

interface MobileEditorNavigationProps {
  active: MobilePanel;
  onPreview: () => void;
  onProfile: () => void;
  onBlocks: () => void;
  onDesign: () => void;
}

function MobileEditorNavigation({
  active,
  onPreview,
  onProfile,
  onBlocks,
  onDesign
}: MobileEditorNavigationProps) {
  return (
    <nav
      aria-label='Editor navigation'
      className='grid shrink-0 grid-cols-4 border-neutral-200 border-t bg-white'
    >
      <MobileNavigationButton
        active={active === 'preview'}
        icon={Monitor}
        label='Preview'
        onClick={onPreview}
      />

      <MobileNavigationButton
        active={false}
        icon={Settings2}
        label='Profile'
        onClick={onProfile}
      />

      <MobileNavigationButton
        active={active === 'blocks'}
        icon={LayoutGrid}
        label='Content'
        onClick={onBlocks}
      />

      <MobileNavigationButton
        active={false}
        icon={Palette}
        label='Design'
        onClick={onDesign}
      />
    </nav>
  );
}

interface MobileNavigationButtonProps {
  active: boolean;
  icon: typeof Settings2;
  label: string;
  onClick: () => void;
}

function MobileNavigationButton({
  active,
  icon: Icon,
  label,
  onClick
}: MobileNavigationButtonProps) {
  return (
    <button
      className={`flex min-w-0 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors ${
        active ? 'text-neutral-950' : 'text-neutral-400'
      }`}
      onClick={onClick}
      type='button'
    >
      <Icon
        aria-hidden='true'
        size={17}
      />

      <span>{label}</span>
    </button>
  );
}
