import React from 'react';
import { Input,Form,Tag, Cascader ,Radio,Row,Col, Button, Table, Modal ,Popconfirm, InputNumber } from 'antd';
import './index.scss'
import { Request } from '../../component/service/axios-service';
import { checkRight } from '../../component/service/menu-service';
const { Column } = Table;

const STATE={"default":'0',"add":'1','edit':'2','delete':'3'};
const ISDEFAULT = {"0":"否","1":"是"};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      "code":props.code,
      "id":props.id,
      'pId':props.pId,
      'hasChange':false,
      'list':[],
      'transform':new Map(),
      'editable':checkRight('editDictation'),
    };
    this.onInit(props);
  }

  onInit = (props)=>{
    let max=0;
    if(props.pId!=0) {
      Request('GET','/ajax/dictionary/dictionarydetailbyid/'+props.pId).then((response)=>{
      const {data}=response.data;
      let json=new Map();
      data.map((i)=>{
        json.set(i.dictionaryDetailId,i.itemValue);
      });
      this.setState({
        'plist':data,
        'transform':json
      });
    });
    }
    Request('GET','/ajax/dictionary/dictionarydetailbycode/'+props.code).then((response)=>{
      const {data}=response.data;
      data.map((i)=>{
        if(i.itemKey > max) {
          max = i.itemKey;
        }
      })
      this.setState({
        'code':props.code,
        'id':props.id,
        'pId':props.pId,
        'hasChange':false,
        'list':data,
        'keynum':max
      });
    });
  }

  componentWillReceiveProps(props) {
    this.onInit(props);
  }

  onGetOption = (list) => {
    if(list == null) return null;
    let res=[];
    for(let i=0;i<list.length;++i) {
      const data={'value':list[i].dictionaryDetailId,'label':list[i].itemValue}
      res.push(data);
    }
    return res;
  }

  renderOption  = (text,record,index) => {
    return(
      this.state.list[index].updateflag == STATE.delete?
      <Tag color="error">已删除</Tag>
      :
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
          this.onDelete(index);
        }}>
          <Button type="link">删除</Button>
          </Popconfirm>
        </Col>
      </Row>
      );
  }

  validKey = (rule, value, callback) => {
    this.state.list.map((i)=>{
      if(i.itemKey === value) {
        callback('数据编号重复')
      }
    });
    callback(); // 校验通过
  }

  validValue = (rule, value, callback,index) => {
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
    let list=[...this.state.list];
    list[index].updateflag=STATE.delete;
    this.setState({
      'list':list,
      'hasChange':true
    });
  }

  onAdd = (e,callback) => {
    const l=e.detailpId;
    if(l!=null) {
      e.detailpId=l[l.length-1];
    }
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
    callback();
  }
  
  onAddDirectionData = ()=>{
    const option = this.onGetOption(this.state.plist);
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
          数据编号
          <Form.Item name="itemKey" rules={[{validator:this.validKey}]} >
            <InputNumber  placeholder={this.state.keynum+1}/>
          </Form.Item>
          数据名称
          <Form.Item name="itemValue" rules={[{ required: true, message: '字典名称不能为空' },{validator:this.validValue}]}> 
            <Input />
          </Form.Item>
          {
            this.state.pId==0?null:
            <div>
          请选择上级明细
          <Form.Item name="detailpId" rules={[{ required: true, message: '上级明细不能为空' }]} >
          <Cascader options={option}  placeholder="请选择上级明细" />
          </Form.Item>
            </div>
          }
          
          <Form.Item name="isdefault">
            <Radio.Group initialValue={0}>
              <Radio value={1}>是否默认</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="updateflag" initialValue={STATE.add}></Form.Item>
          <Form.Item name="dictionaryId" initialValue={this.state.id}></Form.Item>
          <Form.Item name="dictionaryCode" initialValue={this.state.code}></Form.Item>
          <Form.Item name="dictionaryCode" initialValue={0}></Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }
  onEdit = (e,index,callback)=> {

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
          数据编号
          <Form.Item name="itemKey" initialValue={data.itemKey}>
            <InputNumber  value={data.itemKey} disabled/>
          </Form.Item>
          数据名称
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
      window.location.reload();
    })
  }

  
  render(){
    return (
    
      <Row>
          <p className="direction-title"><strong>字典数据</strong></p>
          {
            this.state.hasChange?<Button onClick={this.onSave} type="danger" style={{color:'white'}} >保存</Button>:null
          }
          {
            this.state.editable?<Button type="primary" onClick={this.onAddDirectionData} className="add-direcetion">新增字典明细</Button>:null
          }
        <Col>
          <Table  bordered pagination={false} className="direction-table" dataSource={this.state.list}  scroll={{ y: 300 }}>
            <Column title="数据编号" key="key" dataIndex="itemKey" />
            <Column title="数据名称" key="name" dataIndex="itemValue"/>
            {/* <Column title="关键字" key="keyname" dataIndex="dictionaryCode"/> */}
            <Column title="默认值" key="default" dataIndex="isdefault" render={ (value)=>{ return ISDEFAULT[value]} }/>
            {
              this.state.pId == 0?null:
              <Column title="所属" key="detailpId" dataIndex="detailpId"
              render={(value)=>{return this.state.transform.get(value)}} 
              />
            }
            {
              this.state.editable?<Column dataIndex="option" width={200} key="option" render={this.renderOption} />:null
            }
          </Table>
        </Col>
       
      </Row>
  );
  }
  
}

export default List;
