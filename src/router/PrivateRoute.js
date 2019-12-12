import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, isAuth, route, ...rest }) => console.log(route) || (
  <Route
    exact
    path={route}
    render={props =>
      isAuth ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to={"/users/login"} />
      )
    }
  />
);

export default PrivateRoute;
