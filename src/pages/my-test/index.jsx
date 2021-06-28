import React  from 'react' ;
import MyLayout from '../../component/my-layout'
import {Button,Form,Table,Checkbox, Cascader,Radio,Input} from 'antd';
import {errorMesseage, Request} from '../../component/service/axios-service';
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
    errorMesseage('标题','详情')
  }
 

  render() {
    return (
    <MyLayout>
      <Form
      onFinish={(e)=>{console.log(e);}}
      >
        <Form.Item name="i" onChange={(e)=>{console.log(e);}}>
          <Checkbox key="1" value="2"  >d</Checkbox>
        </Form.Item>
        <Button htmlType="submit" >测试</Button>
      </Form>
    </MyLayout>
  );
  }
  
}

export default MyTest;
