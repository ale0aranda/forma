'use client';

import { useProfileHistory } from '@/src/shared/hooks/use-profile-history';

import { useProfileEditorActions } from './use-profile-editor-actions';
import { useProfileEditorPersistence } from './use-profile-editor-persistence';

import type { Profile } from '../../domain/profile';

interface UseProfileEditorOptions {
  initialProfile: Profile;
}

export function useProfileEditor({ initialProfile }: UseProfileEditorOptions) {
  const {
    value: profile,
    canUndo,
    canRedo,
    update: updateProfile,
    replace: replaceProfile,
    undo,
    redo
  } = useProfileHistory({
    initialValue: initialProfile
  });

  const persistence = useProfileEditorPersistence({
    initialProfile,
    profile,
    replaceProfile
  });

  const actions = useProfileEditorActions({
    updateProfile
  });

  return {
    profile,
    canUndo,
    canRedo,
    undo,
    redo,
    ...persistence,
    ...actions
  };
}
