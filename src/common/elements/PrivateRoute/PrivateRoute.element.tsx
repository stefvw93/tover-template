import { observer } from "mobx-react";
import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { boundMethod } from "utilities";
import { IPrivateRouteProps, IPrivateRouteState } from ".";
import { IRouteProps } from "../Router";

@observer
class PrivateRouteClass extends React.Component<
  IRouteProps & IPrivateRouteProps,
  IPrivateRouteState
> {
  public render(): React.ReactNode {
    const _authenticated = true;

    return (
      <Route
        {...this.props}
        component={_authenticated ? this.props.component : null}
        render={!_authenticated ? this.createRedirect : null}
      />
    );
  }

  @boundMethod
  private createRedirect(): React.ReactNode {
    return <Redirect to={this.props.redirectTo || "/login"} />;
  }
}

export const PrivateRoute = withRouter(PrivateRouteClass);
