import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  console.log(isAuth)
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
