import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  // eslint-disable-next-line no-unused-expressions
  <Route
    render={props =>
      isAuth ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to={"/users/login"} />
      )
    }
  />;
};

export default PrivateRoute;
