import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
  <Route
    render={props =>
      isAuth ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to={"/users/login"} />
      )
    }
  />
)};

export default PrivateRoute;
