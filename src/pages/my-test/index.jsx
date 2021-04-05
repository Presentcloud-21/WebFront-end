import React from 'react';
import MyLayout from '../../component/my-layout'
import {Button,Form,Radio} from 'antd';
import axios from 'axios';

const {Item}=Form;

axios.interceptors.request.use(
  (config) => {
    console.log('request',config);
    return config;
  },(error)=> {
    console.log('request error',error);
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  (response)=>{
    console.log('response suceess:',response);
    return response;
  },(error)=>{
    const code=error.response.status;
    console.log('response error:',code);
    switch(code) {
      case 404:window.location.href='/status404';break;
      case 502:window.location.href='/status502';break;
      case 504:window.location.href='/status504';break;
    }
    return Promise.reject(error);
  }
)

class MyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state={ count:1,users:[]};
  }

  getUser = (e)=> {
    console.log('in',e);
    // fetch('/api/users').then( (res) => {
    //    console.log("result is ",res);
    //   return res.json();
    // }).then( (data) => {
    //   this.setState({users:data});
    //   console.log(this.state);
    // });
    axios.post('/api/users',e).then((response) => {
      console.log(response);
      this.setState({users:response.data});
      console.log('axios respond',this.state);
      this.state.users.map((i)=>{ console.log(i); });
    }).catch((err) => {
      console.log('axios error:',err);
    });
    // axios.get('/api/users').then((response) => {
    //   this.setState({users:response.data})
    //   console.log(response);
    // });
  }

  render() {
    return (
    <MyLayout>
      <div>
        <Form 
          name="users" 
          className="form"
          onFinish={this.getUser}
        >
          <Item name="mystatu">
            <Radio.Group>
              <Radio value={200}>200</Radio>
              <Radio value={404}>404</Radio>
              <Radio value={502}>502</Radio>
              <Radio value={504}>504</Radio>
            </Radio.Group>
          </Item>
            <Item style={{marginLeft:"auto"}}>
              <Button className="login" htmlType="submit" size="middle">发送</Button>
            </Item>
        </Form>
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
