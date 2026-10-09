import {
  BriefcaseBusiness,
  CircleUserRound,
  GalleryHorizontal,
  Link2,
  Palette,
  PanelsTopLeft
} from 'lucide-react';

const sections = [
  {
    icon: CircleUserRound,
    label: 'Identity',
    active: true
  },
  {
    icon: PanelsTopLeft,
    label: 'About'
  },
  {
    icon: BriefcaseBusiness,
    label: 'Projects'
  },
  {
    icon: Link2,
    label: 'Links'
  },
  {
    icon: GalleryHorizontal,
    label: 'Gallery'
  },
  {
    icon: Palette,
    label: 'Design'
  }
];

export function LandingEditorPreview() {
  return (
    <div className='border-neutral-200 border-b bg-white lg:border-r lg:border-b-0'>
      <div className='flex h-11 items-center justify-between border-neutral-200 border-b px-4'>
        <div className='flex items-center gap-1.5'>
          <span className='size-2 rounded-full bg-neutral-300' />
          <span className='size-2 rounded-full bg-neutral-300' />
          <span className='size-2 rounded-full bg-neutral-300' />
        </div>

        <div className='flex gap-2'>
          <span className='rounded-md border border-neutral-200 px-2 py-1 text-neutral-500 text-xs'>
            Preview
          </span>

          <span className='rounded-md bg-neutral-950 px-2 py-1 text-white text-xs'>
            Publish
          </span>
        </div>
      </div>

      <div className='grid grid-cols-3'>
        <aside className='border-neutral-200 border-r p-3'>
          <p className='mb-4 font-semibold text-xs tracking-widest'>FORMA</p>

          <div className='space-y-1'>
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <div
                  className={`flex items-center gap-2 rounded-md px-2 py-2 text-xs ${
                    section.active
                      ? 'bg-neutral-100 text-neutral-950'
                      : 'text-neutral-500'
                  }`}
                  key={section.label}
                >
                  <Icon
                    aria-hidden='true'
                    size={13}
                  />

                  {section.label}
                </div>
              );
            })}
          </div>
        </aside>

        <div className='col-span-2 p-5'>
          <h3 className='font-semibold text-sm'>Identity</h3>

          <div className='mt-5 space-y-4'>
            <PreviewField
              label='Name'
              value='John Doe'
            />

            <PreviewField
              label='Role'
              value='Bot'
            />

            <PreviewField
              label='Bio'
              multiline
              value='lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            />

            <div>
              <p className='mb-1.5 text-neutral-500 text-xs'>Avatar</p>

              <div className='flex items-center gap-3'>
                <div className='flex size-10 items-center justify-center rounded-full bg-neutral-950 font-medium text-white text-xs'>
                  AA
                </div>

                <span className='rounded-md border border-neutral-200 px-2.5 py-1.5 text-neutral-500 text-xs'>
                  Change
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreviewFieldProps {
  label: string;
  value: string;
  multiline?: boolean;
}

function PreviewField({ label, value, multiline = false }: PreviewFieldProps) {
  return (
    <div>
      <p className='mb-1.5 text-neutral-500 text-xs'>{label}</p>

      <div
        className={`rounded-md border border-neutral-200 px-2.5 text-neutral-600 text-xs ${
          multiline ? 'min-h-16 py-2' : 'py-2'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
