import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import MySider from '../my-sider';
import MyHeader from '../my-header';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MyLayout extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ]),
  }
  
  constructor(props) {
    super(props);
    console.log('mylayout',props);
  }

  render() {
    return (
      <Layout className='layout'>
        <MySider/>
        <Layout className="site-layout" >
          <MyHeader/>
          <Content className="content-contains" >
          {this.props.children}<br /><br /><br />
          </Content>
          <Footer style={{ textAlign: 'center' }}>工程训练 @2021 21组</Footer>
        </Layout>
      </Layout>
    );
  }
 
}

export default MyLayout;
