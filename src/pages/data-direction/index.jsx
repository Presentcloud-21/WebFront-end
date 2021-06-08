import React, { Children } from 'react';
import MyLayout from '../../component/my-layout';
import List from './list';
import { Row, Col, Menu, Button, Modal, Form, Input} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import './index.scss'
import { Request } from '../../component/service/axios-service';
const initList=[];
class DataDirection extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'selected_key':"sex",
      'list':[],
      'visible':false,
    };
    Request('GET','/ajax/dictionary').then((response)=>{
      console.log(response);
      const {data}=response;
      this.setState({
        'list':data
      });
    });
  }

  onAddDirectionType = ()=>{
    this.setState({
      'visible':true
    });
  }


  onSelectType = (e)=>{
    this.setState({
      'selected_key':e.item.props.name
    });
    console.log(this.state.selected_key);
  }
  
  onSave = (e) => {
    Request('POST','/ajax/dictionary/adddic/',JSON.stringify(e)).then((response)=>{
      console.log('add new type',response);
      window.location.reload();
    })
  }
  onCancel = ()=>{
    this.setState({
      'visible':false
    })
  }

  validDescribe = (rule, value, callback) => {
    console.log('v',value);
    this.state.list.map((i)=>{
      if(i.dictionaryDescribe === value) {
        callback('字典名称重复')
      }
    });
    callback(); // 校验通过
  }

  validCode = (rule, value, callback) => {
    console.log('v',value);
    this.state.list.map((i)=>{
      if(i.dictionaryCode === value) {
        callback('关键字重复')
      }
    });
    callback(); // 校验通过
  }

  render() {
    return (
    <MyLayout>
      <Row>
      <Col className="select-direction-contains">
        <p className="direction-title"><strong>数据字典类型</strong></p>
        <Menu theme="light"
          mode="inline"
          >
          {
            this.state.list.map((i)=>{
              return <Menu.Item name={i.dictionaryCode} onClick={this.onSelectType} className="direction-type">{i.dictionaryDescribe}</Menu.Item>
            })
          }
        </Menu>
        <Button type='danger' onClick={this.onAddDirectionType} style={{width:'100%',color:'white'}} >添加字典类型 <PlusOutlined/></Button>
        <Modal
         title="添加数据"
         visible={this.state.visible}
         footer={null}
        >
          <Form
            onFinish={this.onSave}
            validateTrigger="onBlur"
          >
            <Row>字典名称</Row>
            <Form.Item name="dictionaryDescribe" rules={[{ required: true, message: '字典名称不能为空' },{validator:this.validDescribe}]}  >
              <Row><Input name="describe" className="direction-input" /></Row>
            </Form.Item>
            <Row> 字典关键字</Row>
            <Form.Item name="dictionaryCode"  rules={[{ required: true, message: '字典关键字不能为空' },{validator:this.validCode}]} >
              <Row><Input name="code" className="direction-input" /></Row>
            </Form.Item>
            <Row>
              <Col><Button type="primary" htmlType="submit" >提交</Button></Col>
              <Col><Button type="danger" onClick={this.onCancel} style={{marginLeft:'24px'}}>取消</Button></Col>
            </Row>
          </Form>
        </Modal>
      </Col>
      <Col className="direction-contains">
        {
          this.state.list.map((i)=> {
            console.log(i.list)
            return i.dictionaryCode === this.state.selected_key ?   <List code={i.dictionaryCode} id={i.dictionaryId} /> : null
          })
        }
      </Col>
      </Row>
    </MyLayout>
  );
  }
}

export default DataDirection;
