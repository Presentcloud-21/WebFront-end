import React from 'react';
import MyLayout from '../../component/my-layout'
import {Button} from 'antd';
class MyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state={ count:1,users:[]};
  }

  getUser = ()=> {
    console.log('in');
    fetch('/api/users').then( (res) => {
       console.log("result is ",res);
      return res.json();
    }).then( (data) => {
      this.setState({users:data});
      console.log(this.state);
      // this.state.users.map((i)=>{
      //   console.log(i.name);
      // });
    });
  }

  render() {
    return (
    <MyLayout>
      <div>
        <Button onClick={this.getUser}>Test</Button>
        {
          this.state.users.map((i)=>(
              <li>{i.name}</li>
          ))
        }
      </div>   
    </MyLayout>
  );
  }
  
}

export default MyTest;
