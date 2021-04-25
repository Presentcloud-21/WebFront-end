import React from 'react';
import LoginLayout from '../../../component/login-component/login-layout';
import './index.scss'
import { Row ,Col, Input , Radio , Checkbox , Button , Form} from 'antd'
import { UserOutlined , LockOutlined, MobileOutlined } from '@ant-design/icons'
import { Request } from '../../../component/service/service';

const { Item } = Form;

class Login extends  React.Component {
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
    const path=this.state.LoginType === 'password'?'/ajax/login':'/ajax/loginbytel';
    Request('POST',path,JSON.stringify(values)).then((response)=>{
      const {data}=response;
      console.log("Signup respond:",data);
      if(data.success) {
        this.setState({
          'alert':true,
          'type':'success',
          'message':'登录成功',
          'description':data.message
        })
        window.location.href='/home';
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

  sendSms = (e) => {
    console.log(e);
    Request('GET','/ajax/loginsendSms?tel='+this.state.tel).then((response)=>{
      const {data}=response;
      if(data.success){
        this.setState({
          'alert':true,
          'type':'success',
          'message':'验证码发送成功'
        })
      } else {
        this.setState({
          'alert':true,
          'type':'error',
          'message':'验证码发送失败',
          'description':data.message
        })
      }
      console.log(data);
    })
  }

  handleChange = (e)=> {
    this.setState({
      'tel':e.target.value
    });
  }

  onLoginType = (e)=> {
    console.log('login Type:',e.target.value);
    this.setState({
      'LoginType':e.target.value
    });
  }

  render() {
    return (
    <LoginLayout alert={this.state.alert} type={this.state.type} message={this.state.message} description={this.state.description}>
      <Row>
        <Radio.Group className="radio" name="login-type" onChange={this.onLoginType}  defaultValue="password">
          <Radio className="radio-item"value="password">密码登录</Radio>
          <Radio className="radio-item" value="captcha">验证码登录</Radio>
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
          <Item name="tel" rules={[{ required: true, message: '请输入电话号码' }]}>
            <Input value={this.state.tel} onChange={this.handleChange.bind(this)} className="half-opacity" size="large"  allowClear placeholder="用户名或电话号码" prefix={<UserOutlined />}/>
          </Item>
          {
            this.state.LoginType=='password'?
            <div>
              <Item name="userPassward" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password className="half-opacity" size="large"  allowClear placeholder="密码" prefix={<LockOutlined/>}/>
              </Item>
              <Item name="auto-login">
                <Checkbox className="auto-login">自动登录</Checkbox>
              </Item>
            </div>
              :
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
                
              
              
          }
          <Row>
            {
              this.state.LoginType=='password'?
              <Item name="forget-password">
              <Button className="forget-password" size="middle">忘记密码</Button>
            </Item>:null
            }
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
