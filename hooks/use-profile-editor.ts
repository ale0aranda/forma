'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  getCurrentProfile,
  ProfileRepositoryError,
  publishProfile,
  saveProfile
} from '@/lib/profile-repository';

import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfileBorders,
  ProfileDensity,
  ProfileExperience,
  ProfileGalleryItem,
  ProfileLink,
  ProfilePalette,
  ProfilePreset,
  ProfileProject,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface UseProfileEditorOptions {
  initialProfile: Profile;
}

type PresetDesign = Pick<
  Profile['design'],
  'typography' | 'palette' | 'density' | 'radius' | 'borders'
>;

const presetDesigns: Record<ProfilePreset, PresetDesign> = {
  minimal: {
    typography: 'system',
    palette: 'mono',
    density: 'airy',
    radius: 'small',
    borders: 'subtle'
  },
  editorial: {
    typography: 'times',
    palette: 'paper',
    density: 'balanced',
    radius: 'square',
    borders: 'none'
  },
  blueprint: {
    typography: 'mono',
    palette: 'blue',
    density: 'compact',
    radius: 'small',
    borders: 'strong'
  }
};

export function useProfileEditor({ initialProfile }: UseProfileEditorOptions) {
  const [profile, setProfile] = useState(initialProfile);
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
        const storedProfile = await getCurrentProfile();

        if (!active) {
          return;
        }

        const draft =
          Object.keys(storedProfile.draft).length > 0
            ? storedProfile.draft
            : {
                ...initialProfile,
                username: storedProfile.username
              };

        setProfile(draft);
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
  }, [initialProfile]);

  const hasUnsavedChanges =
    JSON.stringify(profile) !== JSON.stringify(savedProfile);

  const hasUnpublishedChanges =
    !publishedProfile
    || JSON.stringify(savedProfile) !== JSON.stringify(publishedProfile);

  const isPublished =
    Boolean(publishedProfile) && !hasUnsavedChanges && !hasUnpublishedChanges;

  const updateUsername = useCallback((username: string) => {
    setProfile((current) => ({
      ...current,
      username
    }));
  }, []);

  const updateIdentity = useCallback(
    (field: keyof Profile['identity'], value: string) => {
      setProfile((current) => ({
        ...current,
        identity: {
          ...current.identity,
          [field]: value
        }
      }));
    },
    []
  );

  const updateAbout = useCallback((value: string) => {
    setProfile((current) => ({
      ...current,
      about: value
    }));
  }, []);

  const updateNow = useCallback((value: string) => {
    setProfile((current) => ({
      ...current,
      now: value
    }));
  }, []);

  const addLink = useCallback(() => {
    const link: ProfileLink = {
      id: crypto.randomUUID(),
      label: 'New link',
      url: ''
    };

    setProfile((current) => ({
      ...current,
      links: [...current.links, link]
    }));
  }, []);

  const updateLink = useCallback(
    (id: string, field: 'label' | 'url', value: string) => {
      setProfile((current) => ({
        ...current,
        links: current.links.map((link) =>
          link.id === id
            ? {
                ...link,
                [field]: value
              }
            : link
        )
      }));
    },
    []
  );

  const removeLink = useCallback((id: string) => {
    setProfile((current) => ({
      ...current,
      links: current.links.filter((link) => link.id !== id)
    }));
  }, []);

  const addProject = useCallback(() => {
    const project: ProfileProject = {
      id: crypto.randomUUID(),
      name: 'New project',
      description: '',
      url: ''
    };

    setProfile((current) => ({
      ...current,
      projects: [...current.projects, project]
    }));
  }, []);

  const updateProject = useCallback(
    (id: string, field: 'name' | 'description' | 'url', value: string) => {
      setProfile((current) => ({
        ...current,
        projects: current.projects.map((project) =>
          project.id === id
            ? {
                ...project,
                [field]: value
              }
            : project
        )
      }));
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    setProfile((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id)
    }));
  }, []);

  const addExperience = useCallback(() => {
    const experience: ProfileExperience = {
      id: crypto.randomUUID(),
      company: '',
      role: 'New role',
      period: '',
      description: ''
    };

    setProfile((current) => ({
      ...current,
      experience: [...current.experience, experience]
    }));
  }, []);

  const updateExperience = useCallback(
    (
      id: string,
      field: 'company' | 'role' | 'period' | 'description',
      value: string
    ) => {
      setProfile((current) => ({
        ...current,
        experience: current.experience.map((experience) =>
          experience.id === id
            ? {
                ...experience,
                [field]: value
              }
            : experience
        )
      }));
    },
    []
  );

  const removeExperience = useCallback((id: string) => {
    setProfile((current) => ({
      ...current,
      experience: current.experience.filter(
        (experience) => experience.id !== id
      )
    }));
  }, []);

  const addGalleryItem = useCallback(() => {
    const item: ProfileGalleryItem = {
      id: crypto.randomUUID(),
      src: '',
      alt: '',
      caption: ''
    };

    setProfile((current) => ({
      ...current,
      gallery: [...current.gallery, item]
    }));
  }, []);

  const updateGalleryItem = useCallback(
    (id: string, field: 'src' | 'alt' | 'caption', value: string) => {
      setProfile((current) => ({
        ...current,
        gallery: current.gallery.map((item) =>
          item.id === id
            ? {
                ...item,
                [field]: value
              }
            : item
        )
      }));
    },
    []
  );

  const removeGalleryItem = useCallback((id: string) => {
    setProfile((current) => ({
      ...current,
      gallery: current.gallery.filter((item) => item.id !== id)
    }));
  }, []);

  const updateDesign = useCallback(
    <Key extends keyof Profile['design']>(
      field: Key,
      value: Profile['design'][Key]
    ) => {
      setProfile((current) => ({
        ...current,
        design: {
          ...current.design,
          [field]: value
        }
      }));
    },
    []
  );

  const changePreset = useCallback((preset: ProfilePreset) => {
    setProfile((current) => ({
      ...current,
      design: {
        ...current.design,
        ...presetDesigns[preset],
        preset
      }
    }));
  }, []);

  const changeTypography = useCallback(
    (typography: ProfileTypography) => updateDesign('typography', typography),
    [updateDesign]
  );

  const changeAppearance = useCallback(
    (appearance: ProfileAppearance) => updateDesign('appearance', appearance),
    [updateDesign]
  );

  const changePalette = useCallback(
    (palette: ProfilePalette) => updateDesign('palette', palette),
    [updateDesign]
  );

  const changeDensity = useCallback(
    (density: ProfileDensity) => updateDesign('density', density),
    [updateDesign]
  );

  const changeRadius = useCallback(
    (radius: ProfileRadius) => updateDesign('radius', radius),
    [updateDesign]
  );

  const changeBorders = useCallback(
    (borders: ProfileBorders) => updateDesign('borders', borders),
    [updateDesign]
  );

  const toggleBlock = useCallback((block: ProfileBlock) => {
    setProfile((current) => ({
      ...current,
      blocks: {
        ...current.blocks,
        [block]: {
          ...current.blocks[block],
          visible: !current.blocks[block].visible
        }
      }
    }));
  }, []);

  const moveBlock = useCallback(
    (block: ProfileBlock, direction: 'up' | 'down') => {
      setProfile((current) => {
        const currentIndex = current.blockOrder.indexOf(block);

        const nextIndex =
          direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (
          currentIndex === -1
          || nextIndex < 0
          || nextIndex >= current.blockOrder.length
        ) {
          return current;
        }

        const blockOrder = [...current.blockOrder];

        [blockOrder[currentIndex], blockOrder[nextIndex]] = [
          blockOrder[nextIndex],
          blockOrder[currentIndex]
        ];

        return {
          ...current,
          blockOrder
        };
      });
    },
    []
  );

  const moveLink = useCallback((id: string, direction: 'up' | 'down') => {
    setProfile((current) => ({
      ...current,
      links: moveItem(current.links, id, direction)
    }));
  }, []);

  const moveProject = useCallback((id: string, direction: 'up' | 'down') => {
    setProfile((current) => ({
      ...current,
      projects: moveItem(current.projects, id, direction)
    }));
  }, []);

  const moveExperience = useCallback((id: string, direction: 'up' | 'down') => {
    setProfile((current) => ({
      ...current,
      experience: moveItem(current.experience, id, direction)
    }));
  }, []);

  const moveGalleryItem = useCallback(
    (id: string, direction: 'up' | 'down') => {
      setProfile((current) => ({
        ...current,
        gallery: moveItem(current.gallery, id, direction)
      }));
    },
    []
  );

  async function save() {
    setSaving(true);
    setError(undefined);

    try {
      await saveProfile(profile);

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
      await publishProfile(profile);

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
    setProfile(savedProfile);
    setError(undefined);
  }, [savedProfile]);

  return {
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
    moveLink,
    moveProject,
    moveExperience,
    moveGalleryItem,
    save,
    publish,
    reset
  };
}

interface MovableItem {
  id: string;
}

function moveItem<Item extends MovableItem>(
  items: Item[],
  id: string,
  direction: 'up' | 'down'
): Item[] {
  const currentIndex = items.findIndex((item) => item.id === id);

  const nextIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex === -1 || nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];

  [nextItems[currentIndex], nextItems[nextIndex]] = [
    nextItems[nextIndex],
    nextItems[currentIndex]
  ];

  return nextItems;
}
