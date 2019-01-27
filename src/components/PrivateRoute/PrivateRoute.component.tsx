import React from "react";
import {
  Route,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import { observer } from "mobx-react";

// types
import { IRouteProps } from "@components/Router";
import { IPrivateRouteState } from ".";

// store
import { authenticationStore } from "@store/authentication.store";

@observer
class PrivateRouteClass extends React.Component<
  IRouteProps,
  IPrivateRouteState
> {
  public render(): React.ReactNode {
    const { authenticated } = authenticationStore;
    return (
      <Route
        {...this.props}
        component={authenticated ? this.props.component : null}
        render={!authenticated ? this._createRedirect.bind(this) : null}
      />
    );
  }

  private _createRedirect(): React.ReactNode {
    return <Redirect to={this.props.redirectTo || "/login"} />;
  }
}

export const PrivateRoute = withRouter<any>(PrivateRouteClass);
