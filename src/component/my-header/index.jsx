import React  from 'react' ;
import { Layout, Avatar, Row, Col,Button } from 'antd'
import { getLocalData } from '../service/axios-service';

const { Header } = Layout

class MyHeader extends React.Component {
  constructor(props){
    super(props);
    const avatar=getLocalData('user').avatar;
    this.state={
      'avatar':avatar
    }
  }
  render() {
     return (
    <Header className="site-layout-header" >
      <Row >
        <Col style={{color:"white"}}>
        </Col>
        <Col style={{marginLeft:"auto"}}>
          <Avatar style={{top:0}} size="middle" src={this.state.avatar}  />
        </Col>
        <Col>
          <Button type="link"> 
            {JSON.parse(window.sessionStorage.user).userName}
          </Button>
        </Col>
      </Row>
    </Header>
  );
  }
 
}

export default MyHeader;
