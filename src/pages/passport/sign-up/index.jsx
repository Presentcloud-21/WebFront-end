import React from 'react';
import LoginLayout from '../../../component/login-component/login-layout';
import './index.scss'
import { Row , Input , Button , Form, Alert, Col} from 'antd'
import { UserOutlined , LockOutlined , MailOutlined , MobileOutlined , LockFilled } from '@ant-design/icons'
import { Request } from '../../../component/service/service';

const { Item } = Form;

class SignUp extends  React.Component {
  constructor(props) {
    super(props);
    this.state=({
      'LoginType':'password',
      'alert':false,
      'type':'',
      'message':'',
      'description':'',
      'tel':''
    });
  }
  onFinish = (values) =>  {
    console.log('Success:',values);

    Request('POST','/ajax/signup',JSON.stringify(values)).then((response)=>{
      const {data}=response;
      console.log("Signup respond:",data);
      if(data.success) {
        this.setState({
          'alert':true,
          'type':'success',
          'message':'登录成功',
          'description':data.message
        })
        window.location.href='/login';
      } else  {
        this.setState({
          'alert':true,
          'type':'error',
          'message':'登录失败',
          'description':data.message
        })
      }
    });
  }
  onFinishFail = (values) => {
    console.log('Fail',values);
  }

  handleChange = (e)=> {
    this.setState({
      'tel':e.target.value
    });
  }

  sendSms = (e) => {
    console.log(e);
    Request('GET','/ajax/signupsendSms?tel='+this.state.tel).then((response)=>{
      const {data}=response;
      console.log(data);
    })
  }
  render() {
    return (
      <LoginLayout alert={this.state.alert} type={this.state.type} message={this.state.message} description={this.state.description}>
      <Row>
        <Form 
          name="login" 
          className="form"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFail}
        >
          <Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input className="half-opacity" size="large"  allowClear placeholder="用户名" prefix={<UserOutlined />}/>
          </Item>
          <Item name="tel" rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,message: '手机号码格式错误'}
            ]} >
              <Input value={this.state.tel} onChange={this.handleChange} className="half-opacity" size="large" allowClear placeholder="电话号码" prefix={<MobileOutlined />}/>
          </Item>
          <Item>
                <Row>
                  <Col span={12}>
                    <Item name="code"  rules={[{ required: true, message: '请输入验证码' }]} >
                      <Input className="half-opacity" size="large" allowClear placeholder="验证码" prefix={<MobileOutlined />}/>
                    </Item> 
                  </Col>
                  <Col span={6}>
                    <Item>
                      <Button className="captcha-button" onClick={this.sendSms}   size="large">发送验证码</Button>
                    </Item>
                  </Col>
                </Row>
              </Item>
          <Item name="email" rules={[
            { required: true, message: '请输入邮箱' },
            { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '邮箱格式错误'}
            ]} >
              <Input className="half-opacity" size="large" allowClear placeholder="邮箱" prefix={<MailOutlined />}/>
          </Item>
          <Item name="userPassward" hasFeedback rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password className="half-opacity" size="large"  allowClear placeholder="设置密码" prefix={<LockOutlined/>}/>
          </Item>
          <Item name="confirm-password"
           dependencies={['userPassward']}
           hasFeedback
            rules={[
              { 
                required: true, message: '请确认密码' 
                },
                ({getFieldValue}) =>({
                  validator(_,value) {
                    if (!value || getFieldValue('userPassward') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码输入不一致'));
                  }
                })
                ]}>
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
