import React from 'react';
import { Layout, Avatar, Row, Col } from 'antd'

const { Header } = Layout

class MyHeader extends React.Component {
  render() {
     return (
    <Header className="site-layout-header" >
      <Row >
        <Col style={{color:"white"}}>
        </Col>
        <Col style={{marginLeft:"auto"}}>
          <Avatar style={{top:0}} size={52} src="/assets/avata.png"  />
        </Col>
      </Row>
    </Header>
  );
  }
 
}

export default MyHeader;
