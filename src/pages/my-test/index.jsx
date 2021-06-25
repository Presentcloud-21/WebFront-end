import React from 'react';
import MyLayout from '../../component/my-layout'
import {Button,Form,Table,Cascader,Radio,Input} from 'antd';
import {Request} from '../../component/service/axios-service';
import {transformDirectionData} from '../../component/service/direction-service';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';

const {Item}=Form;
const {Column} = Table;

class MyTest extends React.Component {
  constructor(props) {
    super(props);
  }

 
  onfinish = (e)=> {
    Request('GET','ajax/getalluser/').then((response)=>{
      console.log(response);
    })

  }
 

  render() {
    return (
    <MyLayout>
      <Form
      onFinish={this.onfinish}
      >
        <Item name='tel'>
          <Input placeholder="请输入电话号码" />
        </Item>
        <Button htmlType="submit" >测试</Button>
      </Form>
    </MyLayout>
  );
  }
  
}

export default MyTest;
