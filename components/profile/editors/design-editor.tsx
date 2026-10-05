import type {
  ProfileAppearance,
  ProfileBorders,
  ProfileDensity,
  ProfilePalette,
  ProfilePreset,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface DesignEditorProps {
  preset: ProfilePreset;
  typography: ProfileTypography;
  appearance: ProfileAppearance;
  palette: ProfilePalette;
  density: ProfileDensity;
  radius: ProfileRadius;
  borders: ProfileBorders;
  onChangePreset: (preset: ProfilePreset) => void;
  onChangeTypography: (typography: ProfileTypography) => void;
  onChangeAppearance: (appearance: ProfileAppearance) => void;
  onChangePalette: (palette: ProfilePalette) => void;
  onChangeDensity: (density: ProfileDensity) => void;
  onChangeRadius: (radius: ProfileRadius) => void;
  onChangeBorders: (borders: ProfileBorders) => void;
}

const presets: {
  id: ProfilePreset;
  label: string;
  description: string;
}[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Simple and balanced.'
  },
  {
    id: 'editorial',
    label: 'Editorial',
    description: 'Sharper and more structured.'
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    description: 'Strong borders and structure.'
  }
];

const typographyOptions: {
  value: ProfileTypography;
  label: string;
}[] = [
  { value: 'sans', label: 'Helvetica' },
  { value: 'arial', label: 'Arial' },
  { value: 'system', label: 'System' },
  { value: 'serif', label: 'Georgia' },
  { value: 'times', label: 'Times' },
  { value: 'mono', label: 'Mono' }
];

const appearanceOptions: {
  value: ProfileAppearance;
  label: string;
}[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
];

const paletteOptions: {
  value: ProfilePalette;
  label: string;
}[] = [
  { value: 'mono', label: 'Mono' },
  { value: 'paper', label: 'Paper' },
  { value: 'forest', label: 'Forest' },
  { value: 'blue', label: 'Blue' }
];

const densityOptions: {
  value: ProfileDensity;
  label: string;
}[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'airy', label: 'Airy' }
];

const radiusOptions: {
  value: ProfileRadius;
  label: string;
}[] = [
  { value: 'square', label: 'Square' },
  { value: 'small', label: 'Small' },
  { value: 'rounded', label: 'Rounded' }
];

const borderOptions: {
  value: ProfileBorders;
  label: string;
}[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'strong', label: 'Strong' }
];

export function DesignEditor({
  preset,
  typography,
  appearance,
  palette,
  density,
  radius,
  borders,
  onChangePreset,
  onChangeTypography,
  onChangeAppearance,
  onChangePalette,
  onChangeDensity,
  onChangeRadius,
  onChangeBorders
}: DesignEditorProps) {
  return (
    <div className='space-y-8'>
      <div>
        <EditorLabel>Preset</EditorLabel>

        <div className='grid grid-cols-3 gap-2'>
          {presets.map((presetOption) => (
            <button
              aria-pressed={preset === presetOption.id}
              className={`overflow-hidden rounded-lg border text-left transition-colors ${
                preset === presetOption.id
                  ? 'border-neutral-950'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
              key={presetOption.id}
              onClick={() => onChangePreset(presetOption.id)}
              type='button'
            >
              <PresetPreview preset={presetOption.id} />

              <div className='border-neutral-100 border-t px-2 py-2'>
                <p className='font-medium text-xs'>{presetOption.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <EditorLabel>Typography</EditorLabel>

        <OptionGrid>
          {typographyOptions.map((option) => (
            <OptionButton
              active={typography === option.value}
              key={option.value}
              label={option.label}
              onClick={() => onChangeTypography(option.value)}
            />
          ))}
        </OptionGrid>
      </div>

      <div>
        <EditorLabel>Appearance</EditorLabel>

        <OptionGrid>
          {appearanceOptions.map((option) => (
            <OptionButton
              active={appearance === option.value}
              key={option.value}
              label={option.label}
              onClick={() => onChangeAppearance(option.value)}
            />
          ))}
        </OptionGrid>
      </div>

      <div>
        <EditorLabel>Palette</EditorLabel>

        <OptionGrid>
          {paletteOptions.map((option) => (
            <OptionButton
              active={palette === option.value}
              key={option.value}
              label={option.label}
              onClick={() => onChangePalette(option.value)}
            />
          ))}
        </OptionGrid>
      </div>

      <div>
        <EditorLabel>Density</EditorLabel>

        <div className='flex gap-2'>
          {densityOptions.map((option) => (
            <OptionButton
              active={density === option.value}
              grow
              key={option.value}
              label={option.label}
              onClick={() => onChangeDensity(option.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <EditorLabel>Corners</EditorLabel>

        <div className='flex gap-2'>
          {radiusOptions.map((option) => (
            <OptionButton
              active={radius === option.value}
              grow
              key={option.value}
              label={option.label}
              onClick={() => onChangeRadius(option.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <EditorLabel>Borders</EditorLabel>

        <div className='flex gap-2'>
          {borderOptions.map((option) => (
            <OptionButton
              active={borders === option.value}
              grow
              key={option.value}
              label={option.label}
              onClick={() => onChangeBorders(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface EditorLabelProps {
  children: string;
}

function EditorLabel({ children }: EditorLabelProps) {
  return (
    <p className='mb-3 text-neutral-500 text-xs uppercase tracking-wider'>
      {children}
    </p>
  );
}

interface OptionGridProps {
  children: React.ReactNode;
}

function OptionGrid({ children }: OptionGridProps) {
  return <div className='grid grid-cols-2 gap-2'>{children}</div>;
}

interface OptionButtonProps {
  active: boolean;
  label: string;
  grow?: boolean;
  onClick: () => void;
}

function OptionButton({
  active,
  label,
  grow = false,
  onClick
}: OptionButtonProps) {
  return (
    <button
      aria-pressed={active}
      className={`${grow ? 'flex-1' : ''} rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
        active
          ? 'border-neutral-950 bg-neutral-50'
          : 'border-neutral-200 hover:bg-neutral-50'
      }`}
      onClick={onClick}
      type='button'
    >
      {label}
    </button>
  );
}

interface PresetPreviewProps {
  preset: ProfilePreset;
}

function PresetPreview({ preset }: PresetPreviewProps) {
  if (preset === 'editorial') {
    return (
      <div className='h-20 bg-stone-100 p-3'>
        <div className='mb-3 h-2 w-8 bg-stone-800' />
        <div className='space-y-1'>
          <div className='h-1 w-full bg-stone-300' />
          <div className='h-1 w-3/4 bg-stone-300' />
        </div>

        <div className='mt-3 border-stone-300 border-t pt-2'>
          <div className='h-1 w-1/2 bg-stone-400' />
        </div>
      </div>
    );
  }

  if (preset === 'blueprint') {
    return (
      <div className='h-20 bg-sky-50 p-2'>
        <div className='h-full border border-slate-400 p-2'>
          <div className='mb-2 h-1.5 w-8 bg-slate-700' />

          <div className='grid grid-cols-2 gap-1'>
            <div className='h-7 border border-slate-300' />
            <div className='h-7 border border-slate-300' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-20 bg-white p-3'>
      <div className='mb-3 flex items-center gap-2'>
        <div className='size-4 rounded-full bg-neutral-200' />
        <div className='h-1.5 w-8 bg-neutral-700' />
      </div>

      <div className='space-y-1'>
        <div className='h-1 w-full bg-neutral-200' />
        <div className='h-1 w-2/3 bg-neutral-200' />
      </div>
    </div>
  );
}
