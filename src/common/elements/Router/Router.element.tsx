import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { IRouteProps, IRouterProps, IRouterState } from ".";
import { List } from "../List";
import { PrivateRoute } from "../PrivateRoute";

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
