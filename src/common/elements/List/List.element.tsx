import React from "react";

// types
import { IListProps, IListState } from ".";

export class List<ItemType = {}> extends React.Component<
  IListProps<ItemType>,
  IListState
> {
  render(): React.ReactNode {
    return this.createList();
  }

  private createList(): React.ReactNode {
    const { items, template } = this.props;
    const _nodes: React.ReactNode[] = [];

    for (let i = 0, l = items.length; i < l; i++) {
      const item = items[i];
      const node = template(item, i);
      _nodes.push(node);
    }

    return _nodes;
  }
}
