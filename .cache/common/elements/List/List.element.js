import React from "react";
export class List extends React.Component {
    render() {
        return this.createList();
    }
    createList() {
        const { items, template } = this.props;
        const _nodes = [];
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i];
            const node = template(item, i);
            _nodes.push(node);
        }
        return _nodes;
    }
}
