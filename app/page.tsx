'use client';

import { useState } from 'react';

import {
  type EditorSelection,
  EditorSidebar
} from '@/components/profile/editor-sidebar';
import { ProfileInspector } from '@/components/profile/profile-inspector';
import { ProfilePreview } from '@/components/profile/profile-preview';

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

const initialProfile: Profile = {
  username: 'alejandro',
  identity: {
    name: 'Alejandro Aranda',
    role: 'Software Engineer',
    bio: 'I build things for the web.'
  },
  about:
    'Interested in software engineering, open source and learning by building.',
  now: 'Building Forma.',
  links: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/ale0aranda'
    }
  ],
  projects: [
    {
      id: 'forma',
      name: 'Forma',
      description:
        'A customizable profile builder for creating personal pages.',
      url: ''
    }
  ],
  experience: [],
  gallery: [],
  blocks: {
    identity: { visible: true },
    about: { visible: true },
    links: { visible: true },
    projects: { visible: true },
    experience: { visible: true },
    gallery: { visible: true },
    now: { visible: true }
  },
  blockOrder: [
    'identity',
    'about',
    'links',
    'projects',
    'experience',
    'gallery',
    'now'
  ],
  design: {
    preset: 'minimal',
    typography: 'system',
    appearance: 'light',
    palette: 'mono',
    density: 'airy',
    radius: 'small',
    borders: 'subtle'
  }
};

export default function Home() {
  const [profile, setProfile] = useState(initialProfile);
  const [selected, setSelected] = useState<EditorSelection>('identity');

  function updateIdentity(field: keyof Profile['identity'], value: string) {
    setProfile((current) => ({
      ...current,
      identity: {
        ...current.identity,
        [field]: value
      }
    }));
  }

  function updateAbout(value: string) {
    setProfile((current) => ({
      ...current,
      about: value
    }));
  }

  function updateNow(value: string) {
    setProfile((current) => ({
      ...current,
      now: value
    }));
  }

  function addLink() {
    const link: ProfileLink = {
      id: crypto.randomUUID(),
      label: 'New link',
      url: ''
    };

    setProfile((current) => ({
      ...current,
      links: [...current.links, link]
    }));
  }

  function updateLink(id: string, field: 'label' | 'url', value: string) {
    setProfile((current) => ({
      ...current,
      links: current.links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
  }

  function removeLink(id: string) {
    setProfile((current) => ({
      ...current,
      links: current.links.filter((link) => link.id !== id)
    }));
  }

  function addProject() {
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
  }

  function updateProject(
    id: string,
    field: 'name' | 'description' | 'url',
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  }

  function removeProject(id: string) {
    setProfile((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id)
    }));
  }

  function addExperience() {
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
  }

  function updateExperience(
    id: string,
    field: 'company' | 'role' | 'period' | 'description',
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      experience: current.experience.map((experience) =>
        experience.id === id ? { ...experience, [field]: value } : experience
      )
    }));
  }

  function removeExperience(id: string) {
    setProfile((current) => ({
      ...current,
      experience: current.experience.filter(
        (experience) => experience.id !== id
      )
    }));
  }

  function addGalleryItem() {
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
  }

  function updateGalleryItem(
    id: string,
    field: 'src' | 'alt' | 'caption',
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      gallery: current.gallery.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }

  function removeGalleryItem(id: string) {
    setProfile((current) => ({
      ...current,
      gallery: current.gallery.filter((item) => item.id !== id)
    }));
  }

  function changePreset(preset: ProfilePreset) {
    updateDesign('preset', preset);
  }

  function changeTypography(typography: ProfileTypography) {
    updateDesign('typography', typography);
  }

  function changeAppearance(appearance: ProfileAppearance) {
    updateDesign('appearance', appearance);
  }

  function changePalette(palette: ProfilePalette) {
    updateDesign('palette', palette);
  }

  function changeDensity(density: ProfileDensity) {
    updateDesign('density', density);
  }

  function changeRadius(radius: ProfileRadius) {
    updateDesign('radius', radius);
  }

  function changeBorders(borders: ProfileBorders) {
    updateDesign('borders', borders);
  }

  function updateDesign<Key extends keyof Profile['design']>(
    field: Key,
    value: Profile['design'][Key]
  ) {
    setProfile((current) => ({
      ...current,
      design: {
        ...current.design,
        [field]: value
      }
    }));
  }

  function toggleBlock(block: ProfileBlock) {
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
  }

  function moveBlock(block: ProfileBlock, direction: 'up' | 'down') {
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
  }

  return (
    <main className='min-h-screen bg-white text-neutral-950'>
      <header className='flex h-16 items-center justify-between border-neutral-200 border-b px-5'>
        <div className='flex items-center gap-3'>
          <span className='font-semibold tracking-widest'>FORMA</span>

          <span className='rounded-md bg-neutral-100 px-2 py-1 text-neutral-500 text-xs'>
            Editor
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            className='rounded-lg border border-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-50'
            type='button'
          >
            Preview
          </button>

          <button
            className='rounded-lg bg-neutral-950 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-neutral-800'
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

        <ProfilePreview
          onSelectBlock={setSelected}
          profile={profile}
          selectedBlock={selected}
        />

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
