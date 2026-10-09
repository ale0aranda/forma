interface EditorSegmentedOption<Value extends string> {
  label: string;
  value: Value;
}

interface EditorSegmentedControlProps<Value extends string> {
  label: string;
  value: Value;
  options: EditorSegmentedOption<Value>[];
  onChange: (value: Value) => void;
}

export function EditorSegmentedControl<Value extends string>({
  label,
  value,
  options,
  onChange
}: EditorSegmentedControlProps<Value>) {
  return (
    <div>
      <p className='mb-2 font-medium text-neutral-600 text-xs'>{label}</p>

      <div className='grid grid-cols-2 gap-1 rounded-md bg-neutral-100 p-1'>
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              aria-pressed={active}
              className={`rounded px-2 py-1.5 font-medium text-xs transition-colors ${
                active
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
              key={option.value}
              onClick={() => onChange(option.value)}
              type='button'
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
