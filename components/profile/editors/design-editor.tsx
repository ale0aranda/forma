import type {
  ProfileDensity,
  ProfilePreset,
  ProfileRadius,
  ProfileTypography
} from '@/lib/profile';

interface DesignEditorProps {
  preset: ProfilePreset;
  typography: ProfileTypography;
  density: ProfileDensity;
  radius: ProfileRadius;
  onChangePreset: (preset: ProfilePreset) => void;
  onChangeTypography: (typography: ProfileTypography) => void;
  onChangeDensity: (density: ProfileDensity) => void;
  onChangeRadius: (radius: ProfileRadius) => void;
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

export function DesignEditor({
  preset,
  typography,
  density,
  radius,
  onChangePreset,
  onChangeTypography,
  onChangeDensity,
  onChangeRadius
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

        <div className='grid grid-cols-2 gap-2'>
          {typographyOptions.map((option) => (
            <button
              aria-pressed={typography === option.value}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                typography === option.value
                  ? 'border-neutral-950 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              key={option.value}
              onClick={() => onChangeTypography(option.value)}
              type='button'
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <EditorLabel>Density</EditorLabel>

        <div className='flex gap-2'>
          {densityOptions.map((option) => (
            <button
              aria-pressed={density === option.value}
              className={`flex-1 rounded-lg border px-2 py-2 text-xs transition-colors ${
                density === option.value
                  ? 'border-neutral-950 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              key={option.value}
              onClick={() => onChangeDensity(option.value)}
              type='button'
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <EditorLabel>Corners</EditorLabel>

        <div className='flex gap-2'>
          {radiusOptions.map((option) => (
            <button
              aria-pressed={radius === option.value}
              className={`flex-1 rounded-lg border px-2 py-2 text-xs transition-colors ${
                radius === option.value
                  ? 'border-neutral-950 bg-neutral-50'
                  : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              key={option.value}
              onClick={() => onChangeRadius(option.value)}
              type='button'
            >
              {option.label}
            </button>
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
