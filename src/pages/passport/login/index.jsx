import React from 'react';
import LoginLayout from '../../../component/login-component/login-layout';
import './index.scss'
import { Row ,Spin,Col, Input , Radio , Checkbox , Button , Form} from 'antd'
import { UserOutlined , LockOutlined, MobileOutlined,LoadingOutlined  } from '@ant-design/icons'
import { AddToken, Request } from '../../../component/service/axios-service';

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
      'tel':'',
      'second':0
    });
    const GithubCode=window.location.search.substring(6).split('&')[0];
    console.log(GithubCode);
    if(GithubCode != '') {
      this.onGitHub(GithubCode);
    }
  }
  timer='';

  componentWillUnmount(){ 
    clearInterval(this.timer);
  }

  onCount = (time) => {
    let end_time = new Date().getTime() + time*1000;
    var sys_second = (end_time - new Date().getTime());
    this.timer = setInterval(()=> {
      if(sys_second>=1000) {
        sys_second -= 1000;
        this.setState({
          'second':Math.floor(sys_second/1000 % 60)
        })
      } else {
        clearInterval(this.timer);
      }
    },1000);
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
          'description':data.msg
        })
        AddToken(data.token);
        this.onLogin(this.state.tel);
      } else  {
        this.setState({
          'alert':true,
          'type':'error',
          'message':'登录失败',
          'description':data.msg
        })
      }
    });
  }

  onFinishFail = (values) => {
    console.log('Fail',values);
  }

  onGitHub = (code) => {
   const login_request={
      'client_id':'b585d1b6311c67f53731',
      'client_secret':'0d6472eba7ae3ef595b785efa582f985528ca41a',
      'code':code,
    }
    console.log('github');
    const url1='https://github.com/login/oauth/access_token';
    const url2='/ajax/callback'
    // Request('GET',url2+"?code="+code).then((e)=>{
    //   console.log('token:',e);
    // });
    Request('POST',url1,JSON.stringify(login_request)).then((e)=>{
      console.log(e);
    })
  }
  sendSms = (e) => {
    this.onCount(10);
    Request('GET','/ajax/loginsendSms/'+this.state.tel).then((response)=>{
      const {data}=response;
      if(data.success){
        this.setState({
          'alert':true,
          'type':'success',
          'message':'验证码发送成功',
          'description':''
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
  onLogin = (tel) => {
    Request('GET','/ajax/getusermessage/'+tel).then((response)=>{
      console.log('user data',response);
      const {data}=response.data;
      window.sessionStorage['user'] = JSON.stringify(data);
      window.location.href="/home";
    });
  }
  onLoginAdmin = (e) => {
    window.localStorage.setItem('user',JSON.stringify({'name':'管理员','role':'0'}));
    window.sessionStorage.setItem('user',JSON.stringify({'name':'管理员','role':'0'}));
    window.location.href='/home';
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
                      {
                        this.state.second == 0?
                        <Button className="captcha-button" onClick={this.sendSms}   size="large">发送验证码</Button>
                        :
                        <Button disabled   size="large"><Spin indicator={<LoadingOutlined /> }>{this.state.second}</Spin></Button>


                      }
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
      <Button className="to-sign-up" onClick={this.onLoginAdmin} size="middle">游客模式(测试用)</Button>
      <Button className="to-sign-up" 
      onClick={this.onGitHub}
      href="https://github.com/login/oauth/authorize?client_id=b585d1b6311c67f53731&redirect_uri=http://localhost:3001/login&scope=user&state=1"
       size="middle">GitHub登录</Button>
    </LoginLayout>
  );
  }
  
}

export default Login;
