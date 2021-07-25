import React  from 'react' ;
import MyLayout from '../../component/my-layout';
import List from './list';
import { Cascader,Row, Col, Menu, Button, Modal, Form, Input} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import './index.scss'
import { Request } from '../../component/service/axios-service';
import { getDirection } from '../../component/service/direction-service';
import { checkRight, errorRight } from '../../component/service/menu-service';
const { SubMenu } = Menu;
const { Item } = Menu;

class DataDirection extends React.Component {
  constructor(props) {
    super(props);
    if(!checkRight('getDictation')) {
      errorRight();
    }
    this.state={
      'selected_key':0,
      'selected_code':'',
      'selected_pId':0,
      'list':[],
      'editable':checkRight('editDictation')
    };
    Request('GET','/ajax/dictionary').then((response)=>{
      const {data}=response.data;
      this.setState({
        'list':data
      });
    });
  }
  
  componentDidUpdate() {
    console.log('selected key',this.state.selected_key);

  }
  componentDidMount() {
  }

  onSelectType = (e,list)=>{
    for(let i = 0;i <list.length && this.state.selected_key!=e.key;++i) {
      if(list[i].dictionaryId == e.key) {
        this.setState({
          'selected_key':e.key,
          'selected_code':list[i].dictionaryCode,
          'selected_pId':list[i].pId,
        });
      }
      if(list[i].child!=null) {
        this.onSelectType(e,list[i].child);
      }
    }
  }
  
  onSave = (e,callback) => {
    const list = e.pId;
    for(let i=list.length-1;i>=0;--i) {
      if(list[i]==0) {
        if(i!=0) continue;
      }
      e.pId=list[i];
      break;
    }
    Request('POST','/ajax/dictionary/adddic/',JSON.stringify(e)).then((response)=>{
      callback();
      window.location.reload();
    })
  }

  onGetOption = (list) => {
    if(list == null) return null;
    let res=[{'value':0,'label':'无'}];
    for(let i=0;i<list.length;++i) {
      const data={'value':list[i].dictionaryId,'label':list[i].dictionaryDescribe,'children':this.onGetOption(list[i].child)}
      res.push(data);
    }
    return res;
  }

  onGetMenu = (data) => {
    return (
      data.child==null?
      <Item key={data.dictionaryId}  title={data.dictionaryDescribe}>{data.dictionaryDescribe}</Item>
      :
      <SubMenu key={1}  title={data.dictionaryDescribe}>
        <Item key={data.dictionaryId}  title={data.dictionaryDescribe}>{data.dictionaryDescribe}</Item>
        {
          data.child.map((i)=>{
            return this.onGetMenu(i)
          })
        }
      </SubMenu>
    );
  }



  validDescribe = (rule, value, callback) => {
    this.state.list.map((i)=>{
      if(i.dictionaryDescribe === value) {
        callback('字典名称重复')
      }
    });
    callback(); // 校验通过
  }

  validCode = (rule, value, callback) => {
    this.state.list.map((i)=>{
      if(i.dictionaryCode === value) {
        callback('关键字重复')
      }
    });
    callback(); // 校验通过
  }

  onAddDirectionType = ()=>{
    const option = this.onGetOption(this.state.list);
    const modal = Modal.confirm();
    const destroy =  ()=> {
      modal.destroy();
    }
    modal.update({
      title:'新增字典类型',
      okText:'新增',
      cancelText:'取消',
      destroyOnClose:true,
      okButtonProps:{style:{'display':'none'}},
      cancelButtonProps:{style:{'display':'none'}},
      footer:null,
      content: (
        <Form
          onFinish={(e)=>this.onSave(e,destroy)}
        >
          字典名称
          <Form.Item name="dictionaryDescribe" rules={[{ required: true, message: '字典名称不能为空' },{validator:this.validDescribe}]}  >
            <Row><Input name="describe" className="direction-input" /></Row>
          </Form.Item>
          字典关键字
          <Form.Item name="dictionaryCode"  rules={[{ required: true, message: '字典关键字不能为空' },{validator:this.validCode}]} >
            <Row><Input name="code" className="direction-input" /></Row>
          </Form.Item>
          请选择上级菜单
          <Form.Item name="pId" initialValue={[0]}>
          <Cascader options={option} placeholder="请选择上级菜单" />
          </Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="danger" className="modal_cancel" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }

  render() {
    return (
    <MyLayout>
      <Row>
      <Col className="select-direction-contains">
        <p className="direction-title"><strong>数据字典类型</strong></p>
        <Menu theme="light"
          mode="inline"
          onClick={(e)=>{this.onSelectType(e,this.state.list)}}
          >
          {
            this.state.list.map((i)=>{
              return this.onGetMenu(i)
            })
          }
        </Menu>
        {
          this.state.editable?
          <Button type='danger' onClick={this.onAddDirectionType} style={{width:'100%',color:'white'}} >添加字典类型 <PlusOutlined/></Button>:null
        }
      </Col>
      <Col className="direction-contains">
        {
          this.state.selected_key==0?null:<List code={this.state.selected_code} id={this.state.selected_key} pId={this.state.selected_pId} />
        }
      </Col>
      </Row>
    </MyLayout>
  );
  }
}

export default DataDirection;
