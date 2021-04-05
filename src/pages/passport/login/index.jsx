import React from 'react';
import LoginLayout from '../../../component/login-component/login-layout';
import './index.scss'
import { Row , Input , Radio , Checkbox , Button , Form} from 'antd'
import { UserOutlined , LockOutlined } from '@ant-design/icons'

const { Item } = Form;

class Login extends  React.Component {
  constructor() {
    super();
  }

  onFinish = (values) =>  {
    console.log('Success:',values);
  }

  onFinishFail = (values) => {
    console.log('Fail',values);
  }

  render() {
    return (
    <LoginLayout>
      <Row>
        <Radio.Group className="radio" name="login-type"  defaultValue="username">
          <Radio className="radio-item" value="username">用户名</Radio>
          <Radio className="radio-item"value="telephone">电话号码</Radio>
          <Radio className="radio-item" value="email">邮箱</Radio>
        </Radio.Group>
      </Row>
      <Row>
        <Form 
          name="login" 
          className="form"
          initialValues={{ remember:true}}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFail}
        >
          <Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input className="half-opacity" size="large"  allowClear placeholder="账号" prefix={<UserOutlined />}/>
          </Item>
          <Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password className="half-opacity" size="large"  allowClear placeholder="密码" prefix={<LockOutlined/>}/>
          </Item>
          <Item name="auto-login">
            <Checkbox className="auto-login">自动登录</Checkbox>
          </Item>
          <Row>
            <Item name="forget-password">
              <Button className="forget-password" size="middle">忘记密码</Button>
            </Item>
            <Item name="login" style={{marginLeft:"auto"}}>
              <Button className="login" htmlType="submit" size="middle">登录账号</Button>
            </Item>
          </Row>
        </Form>
      </Row>
      <Button className="to-sign-up" href="sign-up" size="middle">没有账号？现在注册</Button>
      <Button className="to-sign-up" href="home" size="middle">游客模式(测试用)</Button>
    </LoginLayout>
  );
  }
  
}

export default Login;
