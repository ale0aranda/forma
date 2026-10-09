interface ReorderableItem {
  id: string;
}

export function reorderItems<Item extends ReorderableItem>(
  items: Item[],
  activeId: string,
  overId: string
): Item[] {
  const oldIndex = items.findIndex((item) => item.id === activeId);

  const newIndex = items.findIndex((item) => item.id === overId);

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    return items;
  }

  const nextItems = [...items];

  const [movedItem] = nextItems.splice(oldIndex, 1);

  if (!movedItem) {
    return items;
  }

  nextItems.splice(newIndex, 0, movedItem);

  return nextItems;
}
