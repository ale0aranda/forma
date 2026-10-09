import { describe, expect, it } from 'vitest';

import { reorderItems } from './profile-reordering';

describe('reorderItems', () => {
  it('moves an item forward without modifying the original array', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

    const reordered = reorderItems(items, 'a', 'c');

    expect(reordered.map((item) => item.id)).toEqual(['b', 'c', 'a']);
    expect(items.map((item) => item.id)).toEqual(['a', 'b', 'c']);
    expect(reordered[2]).toBe(items[0]);
  });

  it('moves an item backward', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

    expect(reorderItems(items, 'c', 'a').map((item) => item.id)).toEqual([
      'c',
      'a',
      'b'
    ]);
  });

  it('preserves the array reference when no move is possible', () => {
    const items = [{ id: 'a' }, { id: 'b' }];

    expect(reorderItems(items, 'a', 'a')).toBe(items);
    expect(reorderItems(items, 'missing', 'b')).toBe(items);
    expect(reorderItems(items, 'a', 'missing')).toBe(items);

    const empty: { id: string }[] = [];

    expect(reorderItems(empty, 'a', 'b')).toBe(empty);
  });
});
