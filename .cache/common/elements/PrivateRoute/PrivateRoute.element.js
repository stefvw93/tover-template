var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from "mobx-react";
import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { boundMethod } from "utilities";
let PrivateRouteClass = class PrivateRouteClass extends React.Component {
    render() {
        const _authenticated = true;
        return (React.createElement(Route, Object.assign({}, this.props, { component: _authenticated ? this.props.component : null, render: !_authenticated ? this.createRedirect : null })));
    }
    createRedirect() {
        return React.createElement(Redirect, { to: this.props.redirectTo || "/login" });
    }
};
__decorate([
    boundMethod
], PrivateRouteClass.prototype, "createRedirect", null);
PrivateRouteClass = __decorate([
    observer
], PrivateRouteClass);
export const PrivateRoute = withRouter(PrivateRouteClass);
