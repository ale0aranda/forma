'use client';

import { useEffect, useRef } from 'react';

interface UseProfileAutosaveOptions<Value> {
  value: Value;
  enabled: boolean;
  delay?: number;
  onSave: (value: Value) => Promise<void>;
}

export function useProfileAutosave<Value>({
  value,
  enabled,
  delay = 1000,
  onSave
}: UseProfileAutosaveOptions<Value>) {
  const onSaveRef = useRef(onSave);

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void onSaveRef.current(value);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [delay, enabled, value]);
}
