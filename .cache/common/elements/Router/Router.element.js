import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { List } from "../List";
import { PrivateRoute } from "../PrivateRoute";
export class Router extends React.Component {
    render() {
        const { routes, before, after } = this.props;
        return (React.createElement(BrowserRouter, null,
            React.createElement(React.Fragment, null,
                before,
                React.createElement(List, { items: routes, template: this.createRouteTemplate }),
                after)));
    }
    createRouteTemplate(item, index) {
        if (item.private)
            return React.createElement(PrivateRoute, Object.assign({ key: index }, item));
        return React.createElement(Route, Object.assign({ key: index }, item));
    }
}
