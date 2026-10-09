'use client';

import { useCallback, useEffect, useState } from 'react';

import { profileEditorUseCases } from '@/src/composition/profile-editor';

import { ProfileRepositoryError } from '../../application/profile-repository-error';

import type { Profile } from '../../domain/profile';

interface UseProfileEditorPersistenceOptions {
  initialProfile: Profile;
  profile: Profile;
  replaceProfile: (profile: Profile) => void;
}

export function useProfileEditorPersistence({
  initialProfile,
  profile,
  replaceProfile
}: UseProfileEditorPersistenceOptions) {
  const [savedProfile, setSavedProfile] = useState(initialProfile);

  const [publishedProfile, setPublishedProfile] = useState<
    Profile | undefined
  >();

  const [loaded, setLoaded] = useState(false);

  const [saving, setSaving] = useState(false);

  const [publishing, setPublishing] = useState(false);

  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const storedProfile = await profileEditorUseCases.load(initialProfile);

        if (!active) {
          return;
        }

        const draft = storedProfile.draft;

        replaceProfile(draft);
        setSavedProfile(draft);
        setPublishedProfile(storedProfile.published ?? undefined);
      } catch {
        if (active) {
          setError('Could not load your profile.');
        }
      } finally {
        if (active) {
          setLoaded(true);
        }
      }
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, [initialProfile, replaceProfile]);

  const hasUnsavedChanges =
    JSON.stringify(profile) !== JSON.stringify(savedProfile);

  const hasUnpublishedChanges =
    !publishedProfile
    || JSON.stringify(savedProfile) !== JSON.stringify(publishedProfile);

  const isPublished =
    Boolean(publishedProfile) && !hasUnsavedChanges && !hasUnpublishedChanges;

  async function save() {
    setSaving(true);
    setError(undefined);

    try {
      await profileEditorUseCases.save(profile);

      setSavedProfile(profile);
    } catch (caughtError) {
      if (caughtError instanceof ProfileRepositoryError) {
        setError(caughtError.message);
      } else {
        setError('Could not save your profile.');
      }
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setPublishing(true);
    setError(undefined);

    try {
      await profileEditorUseCases.publish(profile);

      setSavedProfile(profile);
      setPublishedProfile(profile);
    } catch (caughtError) {
      if (caughtError instanceof ProfileRepositoryError) {
        setError(caughtError.message);
      } else {
        setError('Could not publish your profile.');
      }
    } finally {
      setPublishing(false);
    }
  }

  const reset = useCallback(() => {
    replaceProfile(savedProfile);
    setError(undefined);
  }, [replaceProfile, savedProfile]);

  return {
    publishedProfile,
    loaded,
    saving,
    publishing,
    error,
    hasUnsavedChanges,
    hasUnpublishedChanges,
    isPublished,
    save,
    publish,
    reset
  };
}
