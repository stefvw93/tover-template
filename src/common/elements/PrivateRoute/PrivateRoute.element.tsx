import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { observer } from "mobx-react";

// utils
import { boundMethod } from "Utilities";

// types
import { IRouteProps } from "@common/elements/Router";
import { IPrivateRouteState } from ".";

// store
// import { authenticationStore } from "@modules/store/authentication";

@observer
class PrivateRouteClass extends React.Component<
  IRouteProps,
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

export const PrivateRoute = withRouter<any>(PrivateRouteClass);
