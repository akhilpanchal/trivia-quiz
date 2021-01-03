import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import CurrentUserContext from '../CurrentUserContext';

export const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {
    const currentUser = React.useContext(CurrentUserContext);

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

  return <Route component={Component} path={path} />;
};


export const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
    const currentUser = React.useContext(CurrentUserContext);

    if (currentUser) {
        return <Redirect to="/dashboard" />;
    }

  return <Route component={Component} path={path} />;
};


