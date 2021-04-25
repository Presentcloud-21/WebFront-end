import React from 'react';
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

class LoginLayout extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      'alert':props.alert,
      'type':props.type,
      'message':props.message,
      'description':props.description
    }
    console.log('layout',props);
  }
  componentWillReceiveProps(nextProps) {
    console.log('Props change',nextProps);
    this.setState({
      'alert':nextProps.alert,
      'type':nextProps.type,
      'message':nextProps.message,
      'description':nextProps.description
    });
  }
  onClose=()=>{
    this.setState({
      'alert':false
    });
  }
  render() {
    return (
        <div className="left">
          
            <div className="right">
              <div className="big-text"> 到云学生平台</div>
              {
                this.state.alert?<Alert
                showIcon
                action={
                  <Button danger onClick={this.onClose}>关闭</Button>
                }
                type={this.state.type}
                message={this.state.message}
                description={this.state.description}
              />:null
              }
              { this.props.children}
            </div>
            <div className="copyright">到云 @2021 21组</div>
        </div>
  );
  }
  
}


export default LoginLayout;
