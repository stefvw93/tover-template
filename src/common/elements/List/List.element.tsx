import React from 'react';
import { IListProps, IListState } from '.';

/**
 * Performant list UI component
 */
export class List<ItemType = {}> extends React.Component<
  IListProps<ItemType>,
  IListState
> {
  public render(): React.ReactNode {
    return this.createList();
  }

  /**
   * Creates a React Node of list items, using the 'props.template' function
   */
  private createList(): React.ReactNode {
    const { items, template } = this.props;
    const nodes: React.ReactNode[] = [];

    for (let i = 0, l = items.length; i < l; i++) {
      const item = items[i];
      const node = template(item, i);
      nodes.push(node);
    }

    return nodes;
  }
}
