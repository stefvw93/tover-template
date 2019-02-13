import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// components
import { PrivateRoute } from "@common/elements/PrivateRoute";
import { List } from "@common/elements/List";

// types
import { IRouterProps, IRouterState, IRouteProps } from ".";

export class Router extends React.Component<IRouterProps, IRouterState> {
  render(): React.ReactNode {
    const { routes, before, after } = this.props;

    return (
      <BrowserRouter>
        <>
          {before}
          <List<IRouteProps>
            items={routes}
            template={this.createRouteTemplate}
          />
          {after}
        </>
      </BrowserRouter>
    );
  }

  private createRouteTemplate(
    item: IRouteProps,
    index: number
  ): React.ReactNode {
    if (item.private) return <PrivateRoute key={index} {...item} />;
    return <Route key={index} {...item} />;
  }
}
