import Layout from 'antd/lib/layout/layout';
import React from 'react';
import MyLayout from '../../../component/my-layout';
import { Request } from '../../../component/service/axios-service';
import { Button, Row, Col,Modal,Form,Input } from 'antd';
import {PlusOutlined,MinusOutlined,CloseOutlined} from '@ant-design/icons';
import BaseList from '../../../component/base-list';
const initList = require("../../../../static/teacher.json");
const ROLE=['管理员','教师','学生'];

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            'list':initList,
            'selectedRowKey':[]
        }
        // Request('GET','/ajax/getalluser').then((response)=>{
        //     const {data} = response.data;
        //     this.setState({
        //         'list':data
        //     });
        // })
    }
    
    renderButton = () => {
        return(
            <Button.Group>
                <Button onClick={this.onAddDirectionType} type="primary">新增用户</Button>
                <Button type="danger" style={{margin:'0px 24px'}}>批量删除</Button>
            </Button.Group>
        )
    }
    selectedCallback(data){
      this.setState({
        'selectedRowKey':data
      })
    }
    renderOption  = (e) => {
        return(
          <Row>
            <Col>
              <Button type="link">
                  修改
                </Button>
            </Col>
            <Col>
              <Button type="link" onClick={()=>{console.log(e);}}>删除</Button>
            </Col>
          </Row>
          );
      }
    onAddDirectionType = ()=>{
        const modal = Modal.confirm();
        const destroy =  ()=> {
          modal.destroy();
        }
        modal.update({
          title:'新增用户',
          okText:'新增',
          cancelText:'取消',
          destroyOnClose:true,
          okButtonProps:{style:{'display':'none'}},
          cancelButtonProps:{style:{'display':'none'}},
          footer:null,
          content: (
            <Form
              onFinish={(e)=>this.onAddUser(e,destroy)}
            >
              姓名
              <Form.Item name="userName" rules={[{ required: true, message: '用户名称不能为空' }]}  >
                <Row><Input/></Row>
              </Form.Item>
              联系方式
              <Form.Item name="tel"  rules={[{ required: true, message: '用户关键字不能为空' }]} >
                <Row><Input/></Row>
              </Form.Item>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button type="danger" className="modal_cancel" onClick={()=>{modal.destroy()}}>取消</Button>
            </Form>
          )
        });
      }
    
  render() {
    const columns = [{
        title:'学/工号',key:'perid',dataIndex:'perid'
    },{
        title:'姓名',key:'userName',dataIndex:'userName'
    },{
        title:'联系方式',key:'tel',dataIndex:'tel'
    },{
        title:'年龄',key:'age',dataIndex:'birthyear',
        render:(val)=>{return (new Date().getFullYear()-val)}
    },{
        title:'学校',key:'school',dataIndex:'userschool',
    },{
        title:'专业',key:'major',dataIndex:'depart',
    },{
        title:'角色',key:'role',dataIndex:'role',
        render:(val)=>{return ROLE[val]}
    },{
        title:'操作',key:'options',
        render:(e)=>{return this.renderOption(e)}
    }];

    return (
    <MyLayout>
        <div>
        <Row>
            <Col style={{marginLeft:'auto'}}>
                {this.renderButton()}
            </Col>
        </Row>
        <Row>
           <BaseList list={this.state.list} columns={columns} selectedCallback={this.selectedCallback} />
        </Row>
        </div>
    </MyLayout>
  );
  }
}

export default UserList;
