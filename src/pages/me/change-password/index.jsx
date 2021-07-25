import React  from 'react' ;
import MyLayout from '../../../component/my-layout'
import './index.scss';
import { Breadcrumb,Space, Row, Col, Input, Layout, Avatar,Button, Upload,Form,DatePicker,Select  } from 'antd';
import { errorModal, getLocalData, Request, successMessage } from '../../../component/service/axios-service';
import { getDictationbyCode } from '../../../component/service/direction-service';
import moment from 'moment';
import { getDefaultUserAvatar } from '../../../component/service/default';
const {Item} = Form;
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    const user=getLocalData('user');
    this.state={
        'user':user,
        'majorlist':[],
    };
    

  }
  onSave = (e) =>{
    Request('POST','/ajax/updatepassword',JSON.stringify(e)).then((response)=>{
      const {data}=response;
      console.log("Signup respond:",data);
      if(data.success) {
        successMessage('密码修改成功');
        window.location.href='/me';
      } else  {
       errorModal('密码修改失败',data.msg);
      }
    });
  }

  render() {
    return (
    <MyLayout>
      <Layout className="me-contains" >
      <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/me">我的</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>修改密码</Breadcrumb.Item>
        </Breadcrumb>
        <Form onFinish={this.onSave}>
          <Item name="userId" initialValue={this.state.user.userId} />
          <Item name="role" initialValue={this.state.user.role} />
          <Row>
            <Col className="me-data-contains">
              <Space  direction="vertical" className="me-info" size="small" align="start">
                <h2 style={{textAlign:"center"}}><strong>修改密码</strong></h2>
                  用户账号            
                  <Item name="tel" initialValue={this.state.user.tel}>
                    <Input disabled className="me-input" />  
                  </Item>
                  当前密码
                  <Item name="oldpassword" rules={[{ required: true, message: '请输入当前密码' }]}>
                    <Input size="large" className="me-input" placeholder="输入当前密码" />  
                  </Item>
                  新密码
                  <Item name="userPassward" hasFeedback rules={[{ required: true, message: '请输入新密码' }]}>
                    <Input.Password size="large"  allowClear placeholder="设置新密码"/>
                  </Item>
                  确认新密码
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
                      <Input.Password size="large"  allowClear placeholder="确认新密码"/>
                  </Item>
                  <Button type="danger" htmlType="submit">确认修改</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Layout>
    </MyLayout>
  );
  }
}

export default ChangePassword;
