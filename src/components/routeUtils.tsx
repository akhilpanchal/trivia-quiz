import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import UserPrefContext from '../UserPrefContext';

export const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {
    const userPref = React.useContext(UserPrefContext);

    if (!userPref) {
        return <Redirect to="/signup" />;
    }

  return <Route component={Component} path={path} />;
};


export const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
    const userPref = React.useContext(UserPrefContext);

    if (userPref) {
        return <Redirect to="/dashboard" />;
    }

  return <Route component={Component} path={path} />;
};


