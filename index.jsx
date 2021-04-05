'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import Home from './src/pages/home';
import { HashRouter, Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Me from './src/pages/me';
import StudentList from './src/pages/list/student-list';
import Login from './src/pages/passport/login';
import SignUp from  './src/pages/passport/sign-up'
import EditList from './src/pages/list/edit-list';
import MyTest from './src/pages/my-test';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/home' component={Home} />
            <Route path='/me' component={Me} />
            <Route path='/list' component={StudentList} />
            <Route path='/edit-list' component={EditList} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/test' component={MyTest} />
            <Redirect from="/" exact to="/login" />
        </Switch>
    </BrowserRouter>,
    document.getElementById('container'),
);