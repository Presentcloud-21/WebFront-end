import React  from 'react' ;
import { HashRouter, Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';


class PrivaryRoute extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      'path':props.path,
      'component':props.component,
      'exact':props.exact
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      'path':props.path,
      'component':props.component,
      'exact':props.exact
    })
    this.onCheck();
  }
  onCheck = () => {
    let isAuthenticated = window.sessionStorage.getItem("user")?true:false;
    console.log('isAuthenticated '+this.state.path,window.sessionStorage.getItem("user"));
    this.setState({
      'isAuthenticated':isAuthenticated
    });
  }
  componentWillMount() {
    this.onCheck();
  }

  render() {
    return (
      this.state.isAuthenticated?
      <Route path={this.state.path}  component={this.state.component} />
      :
      <Redirect to={{pathname:"/"}} />
    );
  }
 
}

export default PrivaryRoute;
