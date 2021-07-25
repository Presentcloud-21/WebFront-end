import React  from 'react' ;
import LoginLayout from '../../../component/login-layout';
import './index.scss'
import { Row , Input , Radio, Button , Form, Col,Spin} from 'antd'
import { UserOutlined , LockOutlined , MailOutlined , MobileOutlined ,LoadingOutlined, LockFilled } from '@ant-design/icons'
import { errorModal, Request, successMessage } from '../../../component/service/axios-service';

const { Item } = Form;

class ForgetPassword extends  React.Component {
  constructor(props) {
    super(props);
    this.state=({
      'LoginType':'password',
      'tel':'',
      'second':0
    });
  }
  onFinish = (values) =>  {
    console.log('Success:',values);

    Request('POST','/ajax/sendSms/forgetPassword',JSON.stringify(values)).then((response)=>{
      const {data}=response;
      console.log("Signup respond:",data);
      if(data.success) {
        successMessage('密码修改成功');
        window.location.href='/login';
      } else  {
       errorModal('找回密码失败',data.msg);
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

  sendSms = () => {
    if(this.state.tel==='') {
      errorModal('验证码发送失败','请先输入手机号码');
      return;
    } 
    Request('POST','/ajax/sendSms/forgetPasswordsendSms/'+this.state.tel).then((response)=>{
      const {data}=response;
      if(data.success) {
        this.onCount(60);
        successMessage('验证码发送成功');
      } else {
        errorModal('验证码发送失败',data.msg);
      }
      console.log(data);
    })
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
          <p style={{color:'white',textAlign:'center',fontSize:'20px'}}>找回密码</p>
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
                  {
                        this.state.second == 0?
                        <Button className="captcha-button" onClick={this.sendSms}   size="large">发送验证码</Button>
                        :
                        <Button disabled   size="large"><Spin indicator={<LoadingOutlined /> }>{this.state.second}</Spin></Button>
                  }
                  </Col>
                </Row>
              </Item>
          
          <Item name="userPassward" hasFeedback rules={[{ required: true, message: '请输入新密码' }]}>
            <Input.Password className="half-opacity" size="large"  allowClear placeholder="设置新密码" prefix={<LockOutlined/>}/>
          </Item>
          <Item name="confirm-password"
           dependencies={['userPassward']}
           hasFeedback
            rules={[
              { 
                required: true, message: '请确认新密码' 
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
            <Input.Password className="half-opacity" size="large"  allowClear placeholder="确认新密码" prefix={<LockFilled/>}/>
          </Item>
          <Item>
            <Button className="sign-up" htmlType="submit" size="middle">确认修改</Button>
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

export default ForgetPassword;
