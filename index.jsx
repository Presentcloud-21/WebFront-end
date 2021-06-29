// 'use strict';

import React  from 'react' ;
import ReactDOM from 'react-dom'   ;
import Home from './src/pages/home';
import { HashRouter, Route, BrowserRouter, Redirect, Switch }from'react-router-dom';
import Me from './src/pages/me';
import Login from './src/pages/passport/login';
import SignUp from  './src/pages/passport/sign-up'
import MyTest from './src/pages/my-test';
import Statu404 from './src/pages/deal-statu/statu-404';
import Statu502 from './src/pages/deal-statu/statu-502';
import Statu504 from './src/pages/deal-statu/statu-504';
import ClassList from './src/pages/list/class-list';
import DataDirection from './src/pages/data-direction';
import SystemParam from './src/pages/system-param';
import PrivaryRoute from './src/component/privary-route';
import UserList from './src/pages/list/user-list';
import RoleEdit from './src/pages/role-edit';
import AddClass from './src/pages/list/add-class';
import EditUser from './src/pages/list/edit-user';
import ClassDescribe from './src/pages/list/class-describe';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <PrivaryRoute path='/home' component={Home} />
            <PrivaryRoute path='/me' component={Me} />
            <PrivaryRoute exact path='/user' component={UserList} />
            <PrivaryRoute exact path='/class' component={ClassList} />
            <PrivaryRoute path='/direction' component={DataDirection} />
            <PrivaryRoute path='/system-param' component={SystemParam} />
            <PrivaryRoute path='/role-edit' component={RoleEdit} />
            <PrivaryRoute path='/class/add-class' component={AddClass}/>
            <PrivaryRoute path='/class/class-describe' component={ClassDescribe}/>
            <PrivaryRoute path='/user/edit-user' component={EditUser}/>
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