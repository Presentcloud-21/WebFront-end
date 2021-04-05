import React from 'react';
import LoginLayout from '../../../component/login-component/login-layout';
import './index.scss'
import { Row , Input , Button , Form} from 'antd'
import { UserOutlined , LockOutlined , MailOutlined , MobileOutlined , LockFilled } from '@ant-design/icons'

const { Item } = Form;

class SignUp extends  React.Component {
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
        <Form 
          name="login" 
          className="form"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFail}
        >
          <Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input className="half-opacity" size="large"  allowClear placeholder="用户名" prefix={<UserOutlined />}/>
          </Item>
          <Item name="telephone" rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,message: '手机号码格式错误'}
            ]} >
              <Input className="half-opacity" size="large" allowClear placeholder="电话号码" prefix={<MobileOutlined />}/>
          </Item>
          <Item name="email" rules={[
            { required: true, message: '请输入邮箱' },
            { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '邮箱格式错误'}
            ]} >
              <Input className="half-opacity" size="large" allowClear placeholder="邮箱" prefix={<MailOutlined />}/>
          </Item>
          <Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password className="half-opacity" size="large"  allowClear placeholder="设置密码" prefix={<LockOutlined/>}/>
          </Item>
          <Item name="confirm-password" rules={[{ required: true, message: '请确认密码' }]}>
            <Input.Password className="half-opacity" size="large"  allowClear placeholder="确认密码" prefix={<LockFilled/>}/>
          </Item>
          <Item>
            <Button className="sign-up" htmlType="submit" size="middle">现在注册</Button>
            <Button className="to-login" href="/login"  size="middle">已有账号？现在登录</Button>
          </Item>
          <Item>
          </Item>
        </Form>
      </Row>
    </LoginLayout>
  );
  }
  
}

export default SignUp;
