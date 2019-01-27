import { RouteProps, RouteComponentProps } from "react-router";

export interface IRouteProps extends RouteProps {
  private?: boolean;
  redirectTo?: string;
}

export interface IRouterProps {
  routes: IRouteProps[];
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export interface IRouterState {}

export { Router } from "./Router.component";
