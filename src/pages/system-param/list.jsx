import React from 'react';
import {Input,Form,Row,Col, Button, Table, Modal, Popconfirm } from 'antd';
import './index.scss'
import { Request } from '../../component/service/axios-service';
import { PlusOutlined } from '@ant-design/icons'
import { checkRight } from '../../component/service/menu-service';
const { Column } = Table;
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[],
      'editable':checkRight('editSysparam')
    }
    Request('GET','/ajax/syspara').then((response)=>{
      const {data}=response.data;
      console.log('mydata1',data);
      this.setState({
        'list':data
      });
    });
  }

  renderOption  = (text,record,index) => {
    return(
      <Row>
        <Col>
          <Button type="link" onClick={()=>{this.onEditParam(index)}}>
              编辑
            </Button>
        </Col>
        <Col>
        <Popconfirm  
          title="是否确认删除该数据？"
          okText="删除"
          cancelText="取消"
          onConfirm={()=>{
          console.log("text: ",text);console.log("record: ",record);console.log("index: ",index);
          this.onDeleteParam(index);
        }}>
          <Button type="link">删除</Button>
          </Popconfirm>
        </Col>
      </Row>
      
      );
  }


  validHintname = (rule, value, callback,index) => {
    const list = this.state.list;
    for(let i = 0;i<list.length;++i) {
      if(i!==index && list[i].hintname === value) {
        callback('参数名称重复')
      }
    }
    callback(); // 校验通过
  }

  validKeyword = (rule, value, callback,index) => {
    const list = this.state.list;
    for(let i = 0;i<list.length;++i) {
      if(i!==index && list[i].keyword === value) {
        callback('参数名称重复')
      }
    }
    callback(); // 校验通过
  }

  onAdd = (e,callback) => {
    let list=[...this.state.list];
    list.push(e);
    
    Request('POST','/ajax/syspara/addpara',JSON.stringify(e)).then((response)=>{
      this.setState({
        'list':list,
      });
      console.log('addpara',response);
    });
    callback();
  }
  
  onDeleteParam = (index)=> {
    console.log('delete');
    Request('POST','/ajax/syspara/deletepara/'+this.state.list[index].sysparaid).then((response)=>{
      console.log('addpara',response);
      window.location.reload();
    });
  }
  onAddParam = ()=>{
    const modal = Modal.confirm();
    const destroy = ()=>{
      modal.destroy();
    }
    modal.update({
      title:'新增系统参数',
      okText:'添加',
      cancelText:'取消',
      destroyOnClose:true,
      okButtonProps:{style:{'display':'none'}},
      cancelButtonProps:{style:{'display':'none'}},
      footer:null,
      content: (
        <Form
          onFinish={(e)=>this.onAdd(e,destroy)}
        >
          <p>参数名称</p>
          <Form.Item name="hintname" rules={[{ required: true, message: '参数名称不能为空' },{validator:(rule, value, callback)=>this.validHintname(rule, value, callback,-1)}]}> 
            <Input/>
          </Form.Item>
          <p>参数关键字</p>
          <Form.Item name="keyword" rules={[{ required: true, message: '参数关键字不能为空' },{validator:(rule, value, callback)=>this.validKeyword(rule, value, callback,-1)}]}> 
            <Input />
          </Form.Item>
          <p>参数值</p>
          <Form.Item name="value" rules={[{ required: true, message: '参数值不能为空' }]}> 
            <Input />
          </Form.Item>
          <Button type="primary" onClick={()=>{}} htmlType="submit">提交</Button>
          <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }

  onEdit = (e,index,callback) => {
    let list=[...this.state.list];
    list[index]=e;    
    Request('POST','/ajax/syspara/updatepara',JSON.stringify(e)).then((response)=>{
      this.setState({
        'list':list,
      });
      console.log('edit',response);
    });
    callback();
  }
  
  onEditParam = (index)=>{
    const modal = Modal.confirm();
    const data = this.state.list[index];
    const destroy = ()=>{
      modal.destroy();
    }
    modal.update({
      title:'修改系统参数',
      okText:'更新',
      cancelText:'取消',
      destroyOnClose:true,
      okButtonProps:{style:{'display':'none'}},
      cancelButtonProps:{style:{'display':'none'}},
      footer:null,
      content: (
        <Form
          onFinish={(e)=>this.onEdit(e,index,destroy)}
        >
          <p>参数名称</p>
          <Form.Item name="hintname" initialValue={data.hintname} rules={[{ required: true, message: '参数名称不能为空' },{validator:(rule, value, callback)=>this.validHintname(rule, value, callback,index)}]}> 
            <Input/>
          </Form.Item>
          <p>参数关键字</p>
          <Form.Item name="keyword" initialValue={data.keyword} rules={[{ required: true, message: '参数关键字不能为空' },{validator:(rule, value, callback)=>this.validHintname(rule, value, callback,index)}]}> 
            <Input />
          </Form.Item>
          <p>参数值</p>
          <Form.Item name="value" initialValue={data.value} rules={[{ required: true, message: '参数值不能为空' }]}> 
            <Input />
          </Form.Item>
          <Button type="primary" onClick={()=>{}} htmlType="submit">提交</Button>
          <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }


  render(){
    return (
      <Row className='system-param-contains'>
          <p className="system-param-title"><strong>系统参数</strong></p>
          {
            this.state.editable?<Button type="primary" onClick={this.onAddParam} style={{right:'24px'}}>新增系统参数<PlusOutlined /></Button>:null
          }
          <Table  bordered pagination={false} className="system-param-table" dataSource={this.state.list} >
            <Column title="参数名称" key="name" dataIndex="hintname" />
            <Column title="参数关键字" key="keyword" dataIndex="keyword" />
            <Column title="参数值" key="value" dataIndex="value"/>
            {
              this.state.editable?<Column dataIndex="option" width={200} key="option" render={this.renderOption} />:null

            }
          </Table>       
      </Row>
  );
  }
  
}

export default List;
