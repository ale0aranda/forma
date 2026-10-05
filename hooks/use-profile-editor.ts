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

  const reorderBlock = useCallback(
    (activeBlock: ProfileBlock, overBlock: ProfileBlock) => {
      setProfile((current) => {
        const oldIndex = current.blockOrder.indexOf(activeBlock);
        const newIndex = current.blockOrder.indexOf(overBlock);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
          return current;
        }

        const blockOrder = [...current.blockOrder];
        const [movedBlock] = blockOrder.splice(oldIndex, 1);

        if (!movedBlock) {
          return current;
        }

        blockOrder.splice(newIndex, 0, movedBlock);

        return {
          ...current,
          blockOrder
        };
      });
    },
    []
  );

  const reorderLink = useCallback((activeId: string, overId: string) => {
    setProfile((current) => ({
      ...current,
      links: reorderItems(current.links, activeId, overId)
    }));
  }, []);

  const reorderProject = useCallback((activeId: string, overId: string) => {
    setProfile((current) => ({
      ...current,
      projects: reorderItems(current.projects, activeId, overId)
    }));
  }, []);

  const reorderExperience = useCallback((activeId: string, overId: string) => {
    setProfile((current) => ({
      ...current,
      experience: reorderItems(current.experience, activeId, overId)
    }));
  }, []);

  const reorderGalleryItem = useCallback((activeId: string, overId: string) => {
    setProfile((current) => ({
      ...current,
      gallery: reorderItems(current.gallery, activeId, overId)
    }));
  }, []);

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
    reorderBlock,
    reorderLink,
    reorderProject,
    reorderExperience,
    reorderGalleryItem,
    save,
    publish,
    reset
  };
}

interface ReorderableItem {
  id: string;
}

function reorderItems<Item extends ReorderableItem>(
  items: Item[],
  activeId: string,
  overId: string
): Item[] {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    return items;
  }

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(oldIndex, 1);

  if (!movedItem) {
    return items;
  }

  nextItems.splice(newIndex, 0, movedItem);

  return nextItems;
}
