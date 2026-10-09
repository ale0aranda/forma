'use client';

import { type SetStateAction, useCallback, useRef, useState } from 'react';

interface UseProfileHistoryOptions<Value> {
  initialValue: Value;
  limit?: number;
}

export function useProfileHistory<Value>({
  initialValue,
  limit = 50
}: UseProfileHistoryOptions<Value>) {
  const [value, setValue] = useState(initialValue);
  const undoStack = useRef<Value[]>([]);
  const redoStack = useRef<Value[]>([]);
  const [, setVersion] = useState(0);

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  const update = useCallback(
    (action: SetStateAction<Value>) => {
      setValue((current) => {
        const next =
          typeof action === 'function'
            ? (action as (current: Value) => Value)(current)
            : action;

        if (Object.is(next, current)) {
          return current;
        }

        undoStack.current = [...undoStack.current.slice(-(limit - 1)), current];

        redoStack.current = [];

        return next;
      });

      setVersion((version) => version + 1);
    },
    [limit]
  );

  const replace = useCallback((next: Value) => {
    undoStack.current = [];
    redoStack.current = [];

    setValue(next);
    setVersion((version) => version + 1);
  }, []);

  const undo = useCallback(() => {
    const previous = undoStack.current.at(-1);

    if (previous === undefined) {
      return;
    }

    undoStack.current = undoStack.current.slice(0, -1);

    setValue((current) => {
      redoStack.current = [...redoStack.current.slice(-(limit - 1)), current];

      return previous;
    });

    setVersion((version) => version + 1);
  }, [limit]);

  const redo = useCallback(() => {
    const next = redoStack.current.at(-1);

    if (next === undefined) {
      return;
    }

    redoStack.current = redoStack.current.slice(0, -1);

    setValue((current) => {
      undoStack.current = [...undoStack.current.slice(-(limit - 1)), current];

      return next;
    });

    setVersion((version) => version + 1);
  }, [limit]);

  return {
    value,
    canUndo,
    canRedo,
    update,
    replace,
    undo,
    redo
  };
}
