import React  from 'react' ;
import LoginLayout from '../../../component/login-layout';
import './index.scss'
import { Checkbox, Row ,Spin,Col, Input , Radio , Button , Form} from 'antd'
import { UserOutlined , LockOutlined, MobileOutlined,LoadingOutlined  } from '@ant-design/icons'
import { AddToken, errorModal, Request, successMessage } from '../../../component/service/axios-service';

const { Item } = Form;

class Login extends  React.Component {
  constructor(props) {
    super(props);
    this.state=({
      'LoginType':'password',
      'tel':'',
      'autoLogin':false,
      'second':0
    });
    const Login_Time=window.localStorage.getItem('Login_Time');
    if(Login_Time!=undefined &&Login_Time!=null&& new Date().getTime()<Login_Time) {
      successMessage('自动登录成功');
      this.onLogin(window.localStorage.getItem('user_tel'));
    }
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
    const url=this.state.LoginType=='password'?'/ajax/login':'ajax/sendSms/loginbytel';
    Request('POST',url,JSON.stringify(values)).then((response)=>{
      const {data}=response;
      console.log("Signup respond:",data);
      if(data.success) {
        successMessage('登录成功');
        if(this.state.autoLogin) {
          window.localStorage.setItem('Login_Time',new Date().getTime()+1000*60*10);//10分钟内自动登录
          window.localStorage.setItem('user_tel',values.tel);
        }
        AddToken(data.token);
        this.onLogin(this.state.tel);
      } else  {
        errorModal('登录失败',data.msg);
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
    if(this.state.tel==='') {
      errorModal('验证码发送失败','请先输入手机号码');
      return;
    } 
    Request('POST','/ajax/sendSms/loginsendSms/'+this.state.tel).then((response)=>{
      const {data}=response;
      if(data.success){
        this.onCount(60);
        successMessage('验证码发送成功');
      } else {
        errorModal('验证码发送失败',data.msg);
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
    <LoginLayout>
      <Row>
        <Radio.Group className="radio" name="login-type" onChange={this.onLoginType}  defaultValue="password">
          <Radio className="radio-item"value="password">密码登录</Radio>
          <Radio className="radio-item" value="captcha">验证码登录</Radio>
        </Radio.Group>
      </Row>
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
            <Row>
              <Col>
                <Item name="userPassward" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input.Password className="half-opacity" size="large"  allowClear placeholder="密码" prefix={<LockOutlined/>}/>
                </Item>
              </Col>
              <Col>
                < Item name="code" initialValue={''} />
              </Col>
            </Row>
              :
              <Row>
                <Col span={12}>
                  <Row>
                    <Col>
                      <Item name="code"  rules={[{ required: true, message: '请输入验证码' }]} >
                        <Input className="half-opacity" size="large" allowClear placeholder="验证码" prefix={<MobileOutlined />}/>
                      </Item>
                    </Col>
                    <Col>
                      < Item name="userPassward" initialValue={''} /> 
                    </Col>
                  </Row>  
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
          }
          <Row>
            <Checkbox initialValue={this.state.autoLogin} onChange={(e)=>{this.setState({'autoLogin':e.target.checked});}} style={{marginBottom:'20px',color:'white'}}>
              自动登录
            </Checkbox>
          </Row>
          <Row>
            {
              this.state.LoginType=='password'?
              <Item name="forget-password">
              <Button className="forget-password" href="/forget-password" size="middle">忘记密码</Button>
            </Item>:null
            }
              <Button className="login" htmlType="submit" size="middle">登录账号</Button>
          </Row>
        </Form>
      <Button className="to-sign-up" href="/sign-up" size="middle">没有账号？现在注册</Button>
      {/* <Button className="to-sign-up" onClick={this.onLoginAdmin} size="middle">游客模式(测试用)</Button> */}
      {/* <Button className="to-sign-up" 
      onClick={this.onGitHub}
      href="https://github.com/login/oauth/authorize?client_id=b585d1b6311c67f53731&redirect_uri=http://localhost:3001/login&scope=user&state=1"
       size="middle">GitHub登录</Button> */}
    </LoginLayout>
  );
  }
  
}

export default Login;
