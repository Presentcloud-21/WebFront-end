// 'use strict';

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
import Statu404 from './src/pages/deal-statu/statu-404';
import Statu502 from './src/pages/deal-statu/statu-502';
import Statu504 from './src/pages/deal-statu/statu-504';
import TeacherList from './src/pages/list/teacher-list';
import ClassList from './src/pages/list/class-list';
import DataDirection from './src/pages/data-direction';
import SystemParam from './src/pages/system-param';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/home' component={Home} />
            <Route path='/me' component={Me} />
            <Route path='/student' component={StudentList} />
            <Route path='/teacher' component={TeacherList} />
            <Route path='/class' component={ClassList} />
            <Route path='/direction' component={DataDirection} />
            <Route path='/system-param' component={SystemParam} />
            <Route path='/edit-list' component={EditList} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/test' component={MyTest} />
            <Route path='/status404' component={Statu404} />
            <Route path='/status502' component={Statu502} />
            <Route path='/status504' component={Statu504} />
            <Redirect from="/" exact to="/login" />
        </Switch>
    </BrowserRouter>,
    document.getElementById('container'),
);