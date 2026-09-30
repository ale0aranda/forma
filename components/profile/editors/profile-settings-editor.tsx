interface ProfileSettingsEditorProps {
  username: string;
  onUpdateUsername: (username: string) => void;
}

const usernamePattern = /^[a-z0-9_-]{3,30}$/;

export function ProfileSettingsEditor({
  username,
  onUpdateUsername
}: ProfileSettingsEditorProps) {
  const valid = usernamePattern.test(username);

  return (
    <div>
      <label className='block'>
        <span className='mb-2 block text-neutral-600 text-sm'>Username</span>

        <div className='flex items-center rounded-lg border border-neutral-200 focus-within:border-neutral-400'>
          <span className='pl-3 text-neutral-400 text-sm'>forma.app/</span>

          <input
            aria-describedby='username-help'
            aria-invalid={!valid}
            className='min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none'
            maxLength={30}
            onChange={(event) => onUpdateUsername(event.target.value)}
            spellCheck={false}
            type='text'
            value={username}
          />
        </div>

        <p
          className={`mt-2 text-xs ${
            valid ? 'text-neutral-400' : 'text-red-600'
          }`}
          id='username-help'
        >
          {valid
            ? '3–30 characters. Lowercase letters, numbers, - and _.'
            : 'Use 3–30 lowercase letters, numbers, - or _.'}
        </p>
      </label>
    </div>
  );
}

export function isValidUsername(username: string) {
  return usernamePattern.test(username);
}
