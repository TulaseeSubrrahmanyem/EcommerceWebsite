import React from "react";
import { Outlet, Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const PrivateRoute = () => {
 // const isAuthenticated = localStorage.getItem("token");
 const token = Cookie.get('jwt_token');
  return (
    token? <Outlet/>:<Navigate to='/login'/>
  );
};

export default PrivateRoute;




