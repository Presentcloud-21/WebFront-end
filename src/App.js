import './App.scss';
import { Route, BrowserRouter, Redirect, Switch }from'react-router-dom';
import Home from './pages/home';
import DataDirection from './pages/data-direction';
import SystemParam from './pages/system-param';
import Login from './pages/passport/login';
import SignUp from './pages/passport/sign-up';
import Me from './pages/me';
import UserList from './pages/list/user-list';
import EditUser from './pages/list/edit-user';
import ClassList from './pages/list/class-list';
import AddClass from './pages/list/add-class';
import ClassDescribe from './pages/list/class-describe';
import MyTest from './pages/my-test';
import RightEdit from './pages/right-edit';
import AllClass from './pages/list/class-list/all-class';
import JoinedClass from './pages/list/class-list/joined-class';
import CreatedClass from './pages/list/class-list/created-class';
import MenuEdit from './pages/menu-edit/list';
import ForgetPassword from './pages/passport/forget-password';
import ChangePassword from './pages/me/change-password';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route path="/home" component={Home} />
          <Route path="/me" exact component={Me} />
          <Route path="/me/change-password" component={ChangePassword} />
          <Route path="/user" exact component={UserList} />
          <Route path="/user/edit-user" component={EditUser} />
          <Route path="/class/all-list" component={AllClass} />
          <Route path="/class/joined-list" component={JoinedClass} />
          <Route path="/class/created-list" component={CreatedClass} />
          <Route path="/class/add-class" component={AddClass} />
          <Route path="/class/class-describe" component={ClassDescribe} />
          <Route path="/dictation" component={DataDirection} />
          <Route path="/system-param" component={SystemParam} />
          <Route path="/menu-edit" component={MenuEdit} />
          <Route path="/right-edit" component={RightEdit} />
          <Route path="/test" component={MyTest} />
          <Redirect path="/class" exact to="/class/joined-list" />
          <Redirect from="/" exact to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
