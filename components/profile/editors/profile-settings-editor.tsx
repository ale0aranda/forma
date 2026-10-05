import { EditorField, EditorInput } from '@/components/profile/editor-field';
import { isValidUsername } from '@/lib/profile-validation';

interface ProfileSettingsEditorProps {
  username: string;
  onUpdateUsername: (username: string) => void;
}

export function ProfileSettingsEditor({
  username,
  onUpdateUsername
}: ProfileSettingsEditorProps) {
  const valid = isValidUsername(username);

  return (
    <EditorField
      hint={
        valid
          ? '3–30 characters. Lowercase letters, numbers, - and _.'
          : 'Use 3–30 lowercase letters, numbers, - or _.'
      }
      label='Username'
    >
      <div
        className={`flex items-center rounded-md border bg-white transition-colors focus-within:border-neutral-400 ${
          valid ? 'border-neutral-200' : 'border-red-300'
        }`}
      >
        <span className='pl-2.5 text-neutral-400 text-sm'>forma.app/</span>

        <EditorInput
          aria-invalid={!valid}
          className='border-0 px-0 shadow-none focus:border-0'
          maxLength={30}
          onChange={(event) => onUpdateUsername(event.target.value)}
          spellCheck={false}
          type='text'
          value={username}
        />
      </div>
    </EditorField>
  );
}
