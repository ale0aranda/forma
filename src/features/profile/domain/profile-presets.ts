import type { Profile, ProfilePreset } from './profile';

type PresetDesign = Pick<
  Profile['design'],
  'typography' | 'palette' | 'density' | 'radius' | 'borders'
>;

export const presetDesigns: Record<ProfilePreset, PresetDesign> = {
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
