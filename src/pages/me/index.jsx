import React from 'react';
import MyLayout from '../../component/my-layout'
import './index.scss';
import { Space, Row, Col, Input, Layout, Avatar,Button, Upload } from 'antd';
class Me extends React.Component {

  render() {
    return (
    <MyLayout>
      <Layout className="me-contains" >
        
        <Row>
          <Col className="me-data-contains">
            <Space  direction="vertical" className="me-info" size="small" align="start">
              <h2 style={{textAlign:"center"}}><strong>基本设置</strong></h2>
              <Row>
                姓名            
              </Row>
              <Row>
                <Input className="me-input" disabled />  
              </Row>
              <Row>
                学号            
              </Row>
              <Row>
                <Input className="me-input" disabled />  
              </Row>
              <Row>
                邮箱            
              </Row>
              <Row>
                <Input className="me-input" />  
              </Row>
              <Row>
                个人简介            
              </Row>
              <Row>
                <Input.TextArea className="me-input" />  
              </Row>
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
      </Layout>
    </MyLayout>
  );
  }
}

export default Me;
