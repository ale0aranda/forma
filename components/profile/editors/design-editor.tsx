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

        <div className='space-y-2'>
          {presets.map((presetOption) => (
            <button
              aria-pressed={preset === presetOption.id}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${
                preset === presetOption.id
                  ? 'border-neutral-950 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              key={presetOption.id}
              onClick={() => onChangePreset(presetOption.id)}
              type='button'
            >
              <p className='font-medium text-sm'>{presetOption.label}</p>

              <p className='mt-1 text-neutral-500 text-xs'>
                {presetOption.description}
              </p>
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
