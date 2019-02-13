import React from "react";
import { Link } from "react-router-dom";

// components
import { Router } from "@common/elements/Router";

// types
import { IMainProps, IMainState } from ".";
import { IRouteProps } from "@common/elements/Router";

const routes: IRouteProps[] = [
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
