import React  from 'react' ;
import { Layout, Menu ,Button, Popconfirm } from 'antd'
import  { Link } from 'react-router-dom';
import { getIcon, getMenu } from '../service/menu-service';
import { successMessage } from '../service/axios-service';

const{Sider} =  Layout;

class MySider extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      'menus':JSON.parse(window.sessionStorage.getItem('menus')) || [],
    };
    getMenu(JSON.parse(window.sessionStorage.getItem('user')).role).then((res)=>{
      this.setState({
        'menus':res
      });
    })
    // getMenu().then((res)=>{
    //   this.setState({
    //     "menus":res
    //   })
    // })
  }
  
  onSignout = () => {
    window.sessionStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('Login_Time');
    window.localStorage.removeItem('user_tel');

    successMessage('成功登出');
    window.location.href='/login'
  }
  render() {
    const pathname =window.location.pathname.split('/');
    return (
      <Sider 
      style={{
        height: '100vh',
        zIndex:10,
        position: 'fixed'
      }}
      >
        <p className="logo">到 云</p>
        <Menu theme="dark"
        mode="inline"
        selectedKeys={['/'+pathname[1]]}
        >
          {
            this.state.menus.map((i)=>{
              return <Menu.Item key={i.url} icon={ getIcon(i.icon) }>
                <Link to={i.url}>{i.title}</Link> 
              </Menu.Item>
            })
          }
        </Menu>
        <Popconfirm  
          title="是否确认退出登录？"
          okText="确定"
          cancelText="取消"
          onConfirm={this.onSignout}>
            <Button  style={{backgroundColor: 'crimson',width:'100%',color:'white'}}>
              退出登录
            </Button>
          </Popconfirm>
        
      </Sider>
  );
  }
  
}

export default MySider;
