import React, { useState } from 'react';
import { Input,Form, Radio, Select,Row,Col, Button, Table, Modal ,Popconfirm, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss'
import { Request } from '../../component/service/axios-service';
import {DndProvider} from 'react-dnd'
const { Option } = Select;
const { Column } = Table;

const STATE={"default":'0',"add":'1','edit':'2','delete':'3'};
const ISDEFAULT = {"0":"否","1":"是"};

class List extends React.Component {
  constructor(props) {
    super(props);
    let max=0;
    this.state={
      "code":props.code,
      "id":props.id,
      'hasChange':false
    };
    Request('GET','/ajax/dictionary/dictionarydetail/'+props.code).then((response)=>{
      const {data}=response;
      this.setState({
        'list':data
      });
      this.state.list.map((i)=>{
        if(i.itemKey > max) {
          max = i.itemKey;
        }
      })
      this.setState({
        'keynum':max
      });
    });
  }

  renderOption  = (text,record,index) => {
    return(
      <Row>
        <Col>
          <Button type="link" onClick={()=>{this.onEditDirectionData(index)}}>
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
          let list=[...this.state.list];
          list.splice(index,index+1);
          this.setState({
          'hasChange':true,
          'list':list,
        });
        }}>
          <Button type="link">删除</Button>
          </Popconfirm>
        </Col>
      </Row>
      );
  }

  validKey = (rule, value, callback) => {
    console.log('keyCheck',value);
    this.state.list.map((i)=>{
      console.log(i.itemKey,'==',value,i.itemKey === value);
      if(i.itemKey === value) {
        callback('数据编号重复')
      }
    });
    callback(); // 校验通过
  }

  validValue = (rule, value, callback,index) => {
    console.log('r',rule);
    this.state.list.map((i)=>{
      if(i.itemKey!=index && i.itemValue === value) {
        callback('数据名称重复')
      }
    });
    callback(); // 校验通过
  }

  resetDefault = (index)=>{
    let list=[...this.state.list];
    for(let i=0;i<list.length;++i) {
      if(i!=index && list[i].isdefault==1) {
        list[i].isdefault = 0;
        list[i].updateflag = STATE.edit;
      }
    }
    this.setState({
      'list':list
    });
  }

  onDelete = (index)=> {
    console.log('delete');
    let list=[...list];
    list[index].updateflag=STATE['delete'];
    this.setState({
      'list':list
    });
  }

  onAdd = (e,callback) => {
    console.log('onAdd',e);
    if(e.isdefault==1) {
      this.resetDefault(-1);
    } else {
      e.isdefault=0;
    }
    const keynum = e.itemKey == undefined?this.state.keynum+1:e.itemKey;
    e.itemKey = keynum;
    this.setState({
      'keynum':keynum
    });
    let list=[...this.state.list];
    list.push(e);
    this.setState({
      'list':list,
      'hasChange':true
    });
    console.log(this.state.list);
    callback();
  }
  
  onAddDirectionData = ()=>{
    const modal = Modal.confirm();
    const destroy =  ()=> {
      modal.destroy();
    }
    modal.update({
      title:'新增字典数据',
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
          <p>数据编号</p>
          <Form.Item name="itemKey" rules={[{validator:this.validKey}]} >
            <InputNumber  placeholder={this.state.keynum+1}/>
          </Form.Item>
          <p>数据名称</p>
          <Form.Item name="itemValue" rules={[{ required: true, message: '字典名称不能为空' },{validator:this.validValue}]}> 
            <Input />
          </Form.Item>
          <Form.Item name="isdefault">
            <Radio.Group initialValue={0}>
              <Radio value={1}>是否默认</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="updateflag" initialValue={STATE.add}></Form.Item>
          <Form.Item name="dictionaryId" initialValue={this.state.id}></Form.Item>
          <Form.Item name="dictionaryCode" initialValue={this.state.code}></Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }

  onEdit = (e,index,callback)=> {
    console.log('edit',e);
    console.log('index',index);
    if(e.isdefault == 1) {
      this.resetDefault(index);
    } else {
      e.isdefault=0;
    }
    let list=[...this.state.list];
    list[index] = e;
    this.setState({
      'list':list,
      'hasChange':true
    });
    callback();
  }
  onEditDirectionData = (index)=>{
    const modal = Modal.confirm();
    const data = this.state.list[index];
    const destroy =  ()=> {
      modal.destroy();
    }
    modal.update({
      title:'编辑字典数据',
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
          <p>数据编号</p>
          <Form.Item name="itemKey" initialValue={data.itemKey}>
            <InputNumber  value={data.itemKey} disabled/>
          </Form.Item>
          <p>数据名称</p>
          <Form.Item name="itemValue" initialValue={data.itemValue} rules={[{validator:(rule,value,callback)=>this.validValue(rule,value,callback,data.itemKey)}]}> 
            <Input placeholder={data.itemValue} />
          </Form.Item>
          <Form.Item name="isdefault"> 
          <Radio.Group initialValue={0}>
              <Radio value={1}>是否默认</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="updateflag" initialValue={STATE.edit}></Form.Item>
          <Form.Item name="dictionaryId" initialValue={data.dictionaryId}></Form.Item>
          <Form.Item name="dictionaryCode" initialValue={data.dictionaryCode}></Form.Item>
          <Form.Item name="dictionaryDetailId" initialValue={data.dictionaryDetailId}></Form.Item>
          <Button type="primary"  htmlType="submit">提交</Button>
          <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }

  onSave=()=>{
    this.setState({
      'hasChange':false,
    })
    Request('POST','/ajax/dictionary/updatedictionary',JSON.stringify(this.state.list)).then((response)=>{
      console.log('add new type',response);
    })
  }

  
  render(){
    return (
    
      <Row>
          <p className="direction-title"><strong>字典数据</strong></p>
          {
            this.state.hasChange?<Button onClick={this.onSave} type="danger" style={{color:'white'}} >保存</Button>:null
          }
          <Button type="primary" onClick={this.onAddDirectionData} className="add-direcetion">新增字典明细</Button>
        <Col>
          <Table  bordered pagination={false} className="direction-table" dataSource={this.state.list}  scroll={{ y: 300 }}>
            <Column title="数据编号" key="key" dataIndex="itemKey" />
            <Column title="数据名称" key="name" dataIndex="itemValue"/>
            {/* <Column title="关键字" key="keyname" dataIndex="dictionaryCode"/> */}
            <Column title="默认值" key="default" dataIndex="isdefault" render={ (value)=>{ return ISDEFAULT[value]} }/>
            <Column dataIndex="option" width={200} key="option" render={this.renderOption} />
          </Table>
        </Col>
       
      </Row>
  );
  }
  
}

export default List;
