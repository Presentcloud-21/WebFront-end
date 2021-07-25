import React  from 'react' ;
import { Layout, Avatar, Row, Col,Button } from 'antd'
import { getLocalData } from '../service/axios-service';
import './index.scss'
import { getDefaultUserAvatar } from '../service/default';

const { Header } = Layout

class MyHeader extends React.Component {
  constructor(props){
    super(props);
    const avatar=getLocalData('user').avatar;
    
    this.state={
      'avatar':avatar||getDefaultUserAvatar(),
      'user':JSON.parse(window.sessionStorage.user)
    }
  }
  render() {
     return (
    <Header className="site-layout-header" >
      <Row style={{marginTop:'24px'}}>
          <Avatar style={{marginLeft:'auto'}} size="middle" 
          src={this.state.avatar}  
          />
          <Button type="link" 
          onClick={()=>{window.location.href="/me"}}
          > 
            {this.state.user.nickname!=null&&this.state.user.nickname!=undefined&&this.state.user.nickname!=""?this.state.user.nickname:this.state.user.userName}
          </Button>
      </Row>
    </Header>
  );
  }
 
}

export default MyHeader;
