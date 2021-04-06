import React from 'react';
import MyLayout from '../../component/my-layout'
import {Button,Form,Radio} from 'antd';
import {Request} from '../../component/service/service'

const {Item}=Form;



class MyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state={ count:1,users:[]};
  }

  getUser = (e)=> {
    Request('POST','/api/users',e).then((response)=>{
      const {data}=response;
      this.setState({users:data});
    });
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
