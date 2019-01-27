import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// components
import { PrivateRoute } from "@components/PrivateRoute";
import { List } from "@components/List";

// types
import { IRouterProps, IRouterState, IRouteProps } from ".";

export class Router extends React.Component<IRouterProps, IRouterState> {
  render(): React.ReactNode {
    const { routes, before, after } = this.props;
    console.log("render Router");
    return (
      <BrowserRouter>
        <>
          {before}
          <List<IRouteProps>
            items={routes}
            template={this._createRouteTemplate}
          />
          {after}
        </>
      </BrowserRouter>
    );
  }

  private _createRouteTemplate(
    item: IRouteProps,
    index: number
  ): React.ReactNode {
    if (item.private) return <PrivateRoute key={index} {...item} />;
    return <Route key={index} {...item} />;
  }
}
