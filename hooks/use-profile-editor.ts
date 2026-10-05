'use client';

import { useCallback, useEffect, useState } from 'react';

import { useProfileHistory } from '@/hooks/use-profile-history';
import {
  getCurrentProfile,
  ProfileRepositoryError,
  publishProfile,
  saveProfile
} from '@/lib/profile-repository';
import { defaultProfileLayouts } from '@/lib/profiles';

import type {
  Profile,
  ProfileAppearance,
  ProfileBlock,
  ProfileBorders,
  ProfileDensity,
  ProfileExperience,
  ProfileGalleryItem,
  ProfileGalleryLayout,
  ProfileIdentityLayout,
  ProfileLink,
  ProfilePalette,
  ProfilePreset,
  ProfileProject,
  ProfileProjectsLayout,
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

  const updateUsername = useCallback(
    (username: string) => {
      updateProfile((current) => ({
        ...current,
        username
      }));
    },
    [updateProfile]
  );

  const updateIdentity = useCallback(
    (field: keyof Profile['identity'], value: string) => {
      updateProfile((current) => ({
        ...current,
        identity: {
          ...current.identity,
          [field]: value
        }
      }));
    },
    [updateProfile]
  );

  const updateAbout = useCallback(
    (value: string) => {
      updateProfile((current) => ({
        ...current,
        about: value
      }));
    },
    [updateProfile]
  );

  const updateNow = useCallback(
    (value: string) => {
      updateProfile((current) => ({
        ...current,
        now: value
      }));
    },
    [updateProfile]
  );

  const addLink = useCallback(() => {
    const link: ProfileLink = {
      id: crypto.randomUUID(),
      label: 'New link',
      url: ''
    };

    updateProfile((current) => ({
      ...current,
      links: [...current.links, link]
    }));
  }, [updateProfile]);

  const updateLink = useCallback(
    (id: string, field: 'label' | 'url', value: string) => {
      updateProfile((current) => ({
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
    [updateProfile]
  );

  const removeLink = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        links: current.links.filter((link) => link.id !== id)
      }));
    },
    [updateProfile]
  );

  const addProject = useCallback(() => {
    const project: ProfileProject = {
      id: crypto.randomUUID(),
      name: 'New project',
      description: '',
      url: ''
    };

    updateProfile((current) => ({
      ...current,
      projects: [...current.projects, project]
    }));
  }, [updateProfile]);

  const updateProject = useCallback(
    (id: string, field: 'name' | 'description' | 'url', value: string) => {
      updateProfile((current) => ({
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
    [updateProfile]
  );

  const removeProject = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        projects: current.projects.filter((project) => project.id !== id)
      }));
    },
    [updateProfile]
  );

  const addExperience = useCallback(() => {
    const experience: ProfileExperience = {
      id: crypto.randomUUID(),
      company: '',
      role: 'New role',
      period: '',
      description: ''
    };

    updateProfile((current) => ({
      ...current,
      experience: [...current.experience, experience]
    }));
  }, [updateProfile]);

  const updateExperience = useCallback(
    (
      id: string,
      field: 'company' | 'role' | 'period' | 'description',
      value: string
    ) => {
      updateProfile((current) => ({
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
    [updateProfile]
  );

  const removeExperience = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        experience: current.experience.filter(
          (experience) => experience.id !== id
        )
      }));
    },
    [updateProfile]
  );

  const addGalleryItem = useCallback(() => {
    const item: ProfileGalleryItem = {
      id: crypto.randomUUID(),
      src: '',
      alt: '',
      caption: ''
    };

    updateProfile((current) => ({
      ...current,
      gallery: [...current.gallery, item]
    }));
  }, [updateProfile]);

  const updateGalleryItem = useCallback(
    (id: string, field: 'src' | 'alt' | 'caption', value: string) => {
      updateProfile((current) => ({
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
    [updateProfile]
  );

  const removeGalleryItem = useCallback(
    (id: string) => {
      updateProfile((current) => ({
        ...current,
        gallery: current.gallery.filter((item) => item.id !== id)
      }));
    },
    [updateProfile]
  );

  const updateDesign = useCallback(
    <Key extends keyof Profile['design']>(
      field: Key,
      value: Profile['design'][Key]
    ) => {
      updateProfile((current) => ({
        ...current,
        design: {
          ...current.design,
          [field]: value
        }
      }));
    },
    [updateProfile]
  );

  const changePreset = useCallback(
    (preset: ProfilePreset) => {
      updateProfile((current) => ({
        ...current,
        design: {
          ...current.design,
          ...presetDesigns[preset],
          preset
        }
      }));
    },
    [updateProfile]
  );

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

  const changeIdentityLayout = useCallback(
    (layout: ProfileIdentityLayout) => {
      updateProfile((current) => ({
        ...current,
        layouts: {
          ...defaultProfileLayouts,
          ...current.layouts,
          identity: layout
        }
      }));
    },
    [updateProfile]
  );

  const changeProjectsLayout = useCallback(
    (layout: ProfileProjectsLayout) => {
      updateProfile((current) => ({
        ...current,
        layouts: {
          ...defaultProfileLayouts,
          ...current.layouts,
          projects: layout
        }
      }));
    },
    [updateProfile]
  );

  const changeGalleryLayout = useCallback(
    (layout: ProfileGalleryLayout) => {
      updateProfile((current) => ({
        ...current,
        layouts: {
          ...defaultProfileLayouts,
          ...current.layouts,
          gallery: layout
        }
      }));
    },
    [updateProfile]
  );

  const toggleBlock = useCallback(
    (block: ProfileBlock) => {
      updateProfile((current) => ({
        ...current,
        blocks: {
          ...current.blocks,
          [block]: {
            ...current.blocks[block],
            visible: !current.blocks[block].visible
          }
        }
      }));
    },
    [updateProfile]
  );

  const reorderBlock = useCallback(
    (activeBlock: ProfileBlock, overBlock: ProfileBlock) => {
      updateProfile((current) => {
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
    [updateProfile]
  );

  const reorderLink = useCallback(
    (activeId: string, overId: string) => {
      updateProfile((current) => {
        const links = reorderItems(current.links, activeId, overId);

        if (links === current.links) {
          return current;
        }

        return {
          ...current,
          links
        };
      });
    },
    [updateProfile]
  );

  const reorderProject = useCallback(
    (activeId: string, overId: string) => {
      updateProfile((current) => {
        const projects = reorderItems(current.projects, activeId, overId);

        if (projects === current.projects) {
          return current;
        }

        return {
          ...current,
          projects
        };
      });
    },
    [updateProfile]
  );

  const reorderExperience = useCallback(
    (activeId: string, overId: string) => {
      updateProfile((current) => {
        const experience = reorderItems(current.experience, activeId, overId);

        if (experience === current.experience) {
          return current;
        }

        return {
          ...current,
          experience
        };
      });
    },
    [updateProfile]
  );

  const reorderGalleryItem = useCallback(
    (activeId: string, overId: string) => {
      updateProfile((current) => {
        const gallery = reorderItems(current.gallery, activeId, overId);

        if (gallery === current.gallery) {
          return current;
        }

        return {
          ...current,
          gallery
        };
      });
    },
    [updateProfile]
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
    replaceProfile(savedProfile);
    setError(undefined);
  }, [replaceProfile, savedProfile]);

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
