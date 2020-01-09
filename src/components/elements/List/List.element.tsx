import React from 'react';
import { IListProps, IListState } from '.';

/**
 * Performant list UI component
 */
export function List<ItemType = {}>(
  props: IListProps<ItemType>
): React.ReactElement {
  const { items, template } = props;
  const nodes: React.ReactNode[] = [];

  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];
    const node = template(item, i);
    nodes.push(node);
  }

  return <React.Fragment>{nodes}</React.Fragment>;
}
