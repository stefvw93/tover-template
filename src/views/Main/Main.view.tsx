import React from "react";
import { Link } from "react-router-dom";

// components
import { Router } from "@components/Router";
import { Login } from "@views/Login";
import { Profile } from "@views/Profile";

// types
import { IMainProps, IMainState } from ".";
import { IRouteProps } from "@components/Router";

const routes: IRouteProps[] = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    exact: true,
    private: true,
    redirectTo: "/login"
  }
];

export class Main extends React.Component<IMainProps, IMainState> {
  render(): React.ReactNode {
    return <Router routes={routes} />;
  }
}
