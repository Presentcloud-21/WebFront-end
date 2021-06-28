import React  from 'react' ;
import { Layout, Menu,  Alert ,  Button} from 'antd'
import './index.scss'
import  { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const{Sider} =  Layout;

class  LoginLayout extends React.Component {
  
  constructor(props) {
    super(props);
    console.log('layout',props);
  }

  render() {
    return (
        <div className="left">  
            <div className="right">
              <div className="big-text"> 到云学生平台</div>
              { this.props.children}
            </div>
            <div className="copyright">到云 @2021 21组</div>
        </div>
  );
  }
  
}


export default LoginLayout;
