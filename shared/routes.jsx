'use strict';

import React     from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from './containers/App.jsx';

import MainLayout from './containers/layouts/MainLayout.jsx';

import ActivationsPageContainer from './containers/pages/ActivationsPage.jsx';
import ActivationPageContainer  from './containers/pages/ActivationPage.jsx';
import ShareResultPageContainer from './containers/pages/ShareResultPage.jsx';

import UsersPageContainer from './containers/pages/UsersPage.jsx';
import UserPageContainer  from './containers/pages/UserPage.jsx';

export default (
    <Route component={App}>
        <Route component={MainLayout} path='/'>
            <Redirect from='/' to='/en/tutorials' />
            <Route component={ActivationsPageContainer} path='/tutorials'/>
            <Route component={ActivationPageContainer} path='/tutorials/:id'/>

            <Route component={ShareResultPageContainer} path='/result/:id/:userId'/>

            <Route component={UsersPageContainer} path='/users'/>
            <Route component={UserPageContainer} path='/users/:id'/>
        </Route>
    </Route>
);
