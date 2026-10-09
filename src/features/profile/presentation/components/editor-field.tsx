import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes
} from 'react';

interface EditorFieldProps {
  label: string;
  children: ReactNode;
  hint?: string | undefined;
}

export function EditorField({ label, children, hint }: EditorFieldProps) {
  return (
    <div>
      <p className='mb-1.5 font-medium text-neutral-600 text-xs'>{label}</p>

      {children}

      {hint && <p className='mt-1.5 text-neutral-400 text-xs'>{hint}</p>}
    </div>
  );
}

export function EditorInput({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-400 ${className}`}
      {...props}
    />
  );
}

export function EditorTextarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`min-h-24 w-full resize-y rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-950 text-sm outline-none transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-400 ${className}`}
      {...props}
    />
  );
}
