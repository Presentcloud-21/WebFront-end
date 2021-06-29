import React  from 'react' ;
import { Layout, Menu ,Button } from 'antd'
import  { Link } from 'react-router-dom';
import { getMenu } from '../service/menu-service';

const{Sider} =  Layout;

class MySider extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menus:getMenu()
    };
    
    console.log('menus',this.state.menus);
  }
  
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onSignout = () => {
    window.sessionStorage.removeItem('user');
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
          {
            this.state.menus.map((i)=>{
              return <Menu.Item key={i.url} icon={i.icon}>
                <Link to={i.url}>{i.name}</Link>
              </Menu.Item>
            })
          }
        </Menu>
        <Button onClick={this.onSignout} style={{backgroundColor: 'crimson',width:'100%',color:'white'}}>退出登录</Button>
      </Sider>
  );
  }
  
}

export default MySider;
