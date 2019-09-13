import { IRouteProps, Router } from "common/elements/Router";
import React from "react";
import { IMainProps, IMainState } from ".";

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
      <div>
        <h1>Thanks for using ts-es-webpack</h1>
        <p>
          Made with ❤️ by{" "}
          <a target="_blank" href="https://github.com/stefvw93">
            Stef van Wijchen
          </a>
        </p>
        <p>
          <a target="_blank" href="https://github.com/stefvw93/ts-es6-webpack">
            Check the readme for more info
          </a>
        </p>
        <Router routes={routes} />
      </div>
    );
  }
}
