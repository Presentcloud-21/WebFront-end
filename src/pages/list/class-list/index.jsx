import React from 'react';
import MyLayout from '../../../component/my-layout';
import List from './list';
import { Menu, Layout } from 'antd'
import { Request } from '../../../component/service/axios-service';

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[]
    }
    Request('GET','/ajax/getallcourse').then((response)=> {
      const {data} = response.data;
      this.setState({
        'list':data,
        'current':'join'
      });
    })
  }
  onClick =(e) => {
    console.log(e);
    this.setState({
      'current':e.key
    });
  }
  render() {
    const {current}=this.state;
    return (
    <MyLayout>
      <Layout>
        {/* <Menu mode="horizontal" onClick={this.onClick} selectedKeys={[current]}>
          <Menu.Item key="join">
            我加入的班课
          </Menu.Item>
          <Menu.Item key="create">
            我创建的班课
          </Menu.Item>
          <Menu.Item key="all">
            班课列表
          </Menu.Item>
        </Menu> */}
        <List list={this.state.list} />
      </Layout>
    </MyLayout>
  );
  }
}

export default ClassList;
