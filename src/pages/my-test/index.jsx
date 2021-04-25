import React from 'react';
import MyLayout from '../../component/my-layout'
import {Button,Form,Radio,Input} from 'antd';
import {Request} from '../../component/service/service'

const {Item}=Form;



class MyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state={ count:1,users:[]};
  }

  getUser = (e)=> {
    Request('POST','/ajax/users',e).then((response)=>{
      const {data}=response;
      this.setState({users:data});
    });
  }

  sendMSG = (e)=> {
    Request('POST','/ajax/sendMSG',e).then((response)=>{
      const {data}=response;
      this.setState({code:data});
    });
  }

  onfinish = (e)=> {
    this.getUser(e);
    this.sendMSG(e);
  }
  render() {
    return (
    <MyLayout>
      <div>
        <Form 
          name="users" 
          className="form"
          onFinish={this.onfinish}
        >
          <Item name="mystatu">
            <Radio.Group>
              <Radio value={200}>200</Radio>
              <Radio value={404}>404</Radio>
              <Radio value={502}>502</Radio>
              <Radio value={504}>504</Radio>
            </Radio.Group>
          </Item>
          <Item name="telephone">
            <Input placeholder="电话号码"/>
          </Item>
          <Item name="vertication">
            <Input placeholder="验证码"/>
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
