import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  isAuth,
  // route,
  propsMovies,
  ...rest
}) =>
  console.log("rota") || (
    <Route
      // exact
      // path={route}
      render={props =>
        isAuth ? (
          <Component {...rest} {...props} movies={propsMovies} />
        ) : (
          <Redirect to={"/users/login"} />
        )
      }
    />
  );

export default PrivateRoute;
