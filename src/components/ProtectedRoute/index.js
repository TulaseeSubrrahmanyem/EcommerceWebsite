import React from "react";
import { Route, Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
 // const isAuthenticated = localStorage.getItem("token");
 const token = Cookie.get('jwt_token');
  return (
    <Route
      {...rest}
      render={(props) =>
       token? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default PrivateRoute;




