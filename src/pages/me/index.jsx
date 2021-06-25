import React from 'react';
import MyLayout from '../../component/my-layout'
import './index.scss';
import { Space, Row, Col, Input, Layout, Avatar,Button, Upload,Form,DatePicker  } from 'antd';
const {Item} = Form;
class Me extends React.Component {
  constructor(props) {
    super(props);
    const user=window.sessionStorage.user;
    this.state={
      'user':JSON.parse(user),
      'date':new Date()
    };
  }
  onSave = (e) =>{
    console.log(e);
  }
  render() {
    return (
    <MyLayout>
      <Layout className="me-contains" >
        <Form onFinish={this.onSave}>
          <Row>
            <Col className="me-data-contains">
              <Space  direction="vertical" className="me-info" size="small" align="start">
                <h2 style={{textAlign:"center"}}><strong>基本设置</strong></h2>
                  姓名            
                  <Item name="username" initialValue={this.state.user.userName}>
                    <Input className="me-input" />  
                  </Item>
                  学号            
                  <Item name="perId" initialValue={this.state.user.perId}>
                    <Input className="me-input" />  
                  </Item>
                  联系方式            
                  <Item name="tel" initialValue={this.state.user.tel}>
                    <Input className="me-input" />  
                  </Item>
                  出生年份            
                  <Item name="birthyear" initialValue={moment(this.state.user.birthyear)} >
                    <DatePicker picker="year" className="me-input" />  
                  </Item>
                  <Button type="danger" htmlType="submit">修改信息</Button>
              </Space>
            </Col>
            <Col className="me-avatar-contains">
              <Upload>
                <Space  direction="vertical" className="me-info" size="small" align="center">
                  <Row>
                    <Avatar style={{top:0}} size={108} src="/assets/avata.png"  />
                  </Row>
                  <Row>
                    <Button>更换头像</Button>
                  </Row>
                </Space>
              </Upload>
            </Col>
          </Row>
        </Form>
      </Layout>
    </MyLayout>
  );
  }
}

export default Me;
