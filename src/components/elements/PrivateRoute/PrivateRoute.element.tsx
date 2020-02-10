import { observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { boundMethod } from 'utilities';
import { IPrivateRouteProps, IPrivateRouteState } from '.';
import { IRouteProps } from '../Router';

/**
 * Private route UI component
 */
@observer
class PrivateRouteClass extends React.Component<
  IRouteProps & IPrivateRouteProps,
  IPrivateRouteState
> {
  public render(): React.ReactNode {
    const authenticated = true;

    return (
      <Route
        {...this.props}
        component={authenticated ? this.props.component : undefined}
        render={!authenticated ? this.createRedirect : undefined}
      />
    );
  }

  /**
   * Creates a redirect node that pushes '/login' to history when not authenticated
   */
  @boundMethod
  private createRedirect(): React.ReactNode {
    return <Redirect to={this.props.redirectTo || '/login'} />;
  }
}

export const PrivateRoute = withRouter(PrivateRouteClass);
