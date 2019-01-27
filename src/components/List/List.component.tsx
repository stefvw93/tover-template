import React from "react";

// types
import { IListProps, IListState } from ".";

export class List<ItemType = {}> extends React.Component<
  IListProps<ItemType>,
  IListState
> {
  render(): React.ReactNode {
    return this._createList();
  }

  private _createList(): React.ReactNode {
    const { items, template, useAsKey } = this.props;
    const nodes: React.ReactNode[] = [];

    for (let i = 0, l = items.length; i < l; i++) {
      const item = items[i];
      const node = template(item, i);
      nodes.push(node);
    }

    return nodes;
  }
}
