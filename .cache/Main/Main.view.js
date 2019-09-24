import { Router } from "common/elements/Router";
import React from "react";
const routes = [
    {
        path: "/",
        exact: true,
        private: true,
        redirectTo: "/login"
    }
];
export class Main extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Thanks for using ts-es-webpack"),
            React.createElement("p", null,
                "Made with \u2764\uFE0F by",
                " ",
                React.createElement("a", { target: "_blank", href: "https://github.com/stefvw93" }, "Stef van Wijchen")),
            React.createElement("p", null,
                React.createElement("a", { target: "_blank", href: "https://github.com/stefvw93/ts-es6-webpack" }, "Check the readme for more info")),
            React.createElement(Router, { routes: routes })));
    }
}
