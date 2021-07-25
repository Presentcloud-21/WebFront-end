import React  from 'react' ;
import MyLayout from '../../component/my-layout'
import {Button,Form,Table,Input} from 'antd';
import { errorModal, Request } from '../../component/service/axios-service';


const {Item}=Form;
const {Column} = Table;

class MyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'data':[]
    }
  }

 
  onfinish = (e)=> {
    Request('GET',e.url).then((response)=>{
      const {data}=response.data;
      console.log(data);
      this.setState({
        'data':data
      })
    })
  }
 

  render() {
    return (
    // <MyLayout>
      <Form
      onFinish={this.onfinish}
      >
        <Form.Item name="url">
          <Input />
        </Form.Item>
        <Button htmlType="submit" >测试</Button>
      </Form>
    // </MyLayout>
  );
  }
  
}

export default MyTest;
