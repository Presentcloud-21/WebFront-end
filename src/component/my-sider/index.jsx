import React from 'react';
import { Layout, Menu ,Button } from 'antd'
import  { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  SettingOutlined ,
  ReadOutlined,
  AuditOutlined,
  SmileOutlined,

} from '@ant-design/icons';
const{Sider} =  Layout;

class MySider extends React.Component {
  
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onSignout = () => {
    window.location.href='/login'
  }
  render() {
    const { collapsed } = this.state;
    // const pathname = window.location.hash.replace('#','');
    const  {pathname} =window.location;
    console.log(pathname); 
    return (
      <Sider 
      style={{
        height: '100vh',
        zIndex:10,
        position: 'fixed'
      }}
      >
        <div className="logo" >
        </div>
        <Menu theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          <Menu.Item key="/me" icon={<UserOutlined />}>
            <Link to='/me'>我的</Link>
          </Menu.Item>
          <Menu.Item key="/student" icon={<SmileOutlined />}>
            <Link to='/student'>学生列表</Link>
          </Menu.Item>
          <Menu.Item key="/teacher" icon={<AuditOutlined />}>
            <Link to='/teacher'>教师列表</Link>
          </Menu.Item>
          <Menu.Item key="/class" icon={<UnorderedListOutlined />}>
            <Link to='/class'>班课列表</Link>
          </Menu.Item>
          <Menu.Item key="/direction" icon={<ReadOutlined />}>
            <Link to='/direction'>数据字典</Link>
          </Menu.Item>
          <Menu.Item key="/system-param" icon={<SettingOutlined />}>
            <Link to='/system-param'>系统参数</Link>
          </Menu.Item>
        </Menu>
        <Button onClick={this.onSignout} style={{backgroundColor: 'crimson',width:'100%',color:'white'}}>退出登录</Button>
      </Sider>
  );
  }
  
}

export default MySider;
