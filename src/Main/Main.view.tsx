import { IRouteProps, Router } from "common/elements/Router";
import React from "react";
import { IMainProps, IMainState } from ".";
import { classNames } from "./main.style";

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
    return (
      <div className={classNames.container}>
        <h1>Hello, world!</h1>
        <p>
          {"You are using "}
          <a
            target="_blank"
            href="https://github.com/stefvw93/typescript-react-boilerplate"
          >
            {"typescript-react-boilerplate"}
          </a>
          {"."}
        </p>
        <p>
          {"Made with ❤️ by "}
          <a target="_blank" href="https://github.com/stefvw93">
            {"Stef van Wijchen"}
          </a>
        </p>
        <Router routes={routes} />
      </div>
    );
  }
}
