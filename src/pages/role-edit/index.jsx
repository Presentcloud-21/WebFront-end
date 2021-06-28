import React  from 'react' ;
import BaseList from '../../component/base-list';
import MyLayout from '../../component/my-layout';
import {Layout,Row,Button,Form,Checkbox,Modal,Input} from 'antd';
import { Request } from '../../component/service/axios-service';



class RoleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[],
      'rightoptions':[],
      'options':[],
    }

    Request('GET','/ajax/roleright/rightList').then((response)=>{
      const {data} = response.data ;
      console.log('rightList',data);
      let options=[];
      for(let i=0;i<data.length;++i) {
        options.push({
          'label':data[i].rightDescribe,
          'value':data[i].rightId
        });
      }
      this.setState({
        'options':options
      })
    });
    Request('GET','/ajax/roleright/roleList').then((response)=>{
      let {data} = response.data;
      console.log('roleLIst',data);
      for(let i=0;i<data.length;++i) {
        data[i].key=i;
      }
      this.setState({
        'list':data
      })
    })
  }

  onAdd=(e,callback)=>{
    e.rolerights = [];
    e.right.map((i)=>{
      e.rolerights.push({'rightId':i,"updateflag":STATUS.ADD});
    })
    console.log('add',e);
    Request('POST','/ajax/roleright/addRole',JSON.stringify(e)).then((response)=>{
      console.log('add result',response);
      callback();
    })
  }

  onAddRole = ()=>{
    const modal = Modal.confirm();
    const destroy =  ()=> {
      modal.destroy();
    }
    modal.update({
      title:'新增角色',
      okText:'新增',
      cancelText:'取消',
      destroyOnClose:true,
      okButtonProps:{style:{'display':'none'}},
      cancelButtonProps:{style:{'display':'none'}},
      footer:null,
      content: (
        <Form
          onFinish={(e)=>this.onAdd(e,destroy)}
        >
          角色名称
          <Form.Item name="roleDes" rules={[{ required: true, message: '角色名称不能为空' }]}  >
            <Row><Input className="direction-input" /></Row>
          </Form.Item>
          角色关键字
          <Form.Item name="roleName"  rules={[{ required: true, message: '字典关键字不能为空' }]} >
            <Row><Input className="direction-input" /></Row>
          </Form.Item>
          角色权限
          <Form.Item name="right">
            <Checkbox.Group options={this.state.options}/>
          </Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="danger" className="modal_cancel" onClick={()=>{modal.destroy()}}>取消</Button>
        </Form>
      )
    });
  }
  onChangeRight = (index,before,after,callback)=>{
    let info=this.state.list[index];
    let val=0;
    before.map((i)=>{val^=i;});
    after.map((i)=>{val^=i;});
    let res = {'rightId':val,'roleId':info.roleId,'rolerightId':0};
    console.log('update',res);
    callback(after);
    if(before.length<after.length) {
      Request('POST','/ajax//roleright/addRoleRightById',JSON.stringify(res)).then((response)=>{
        console.log('add',response);
      });
    } else {
      Request('POST','/ajax/roleright/deleteRoleRightById',JSON.stringify(res)).then((response)=>{
        console.log('delete',response);
      });
    }
    
  }
  renderCheckbox = (index)=>{
    const {list}=this.state;
    let value=[];
    let disabled=false;
    const set=(e)=>{value=e};
    if(list[index].roleId==1) {
      this.state.options.map((i)=>{
        value.push(i.value);
      })
      disabled=true;
    } else {
      list[index].rolerights.map((j)=>{
        value.push(j.rightId);
      });
    }
    return <Checkbox.Group onChange={(e)=>{this.onChangeRight(index,value,e,set)}} options={this.state.options} defaultValue={value} disabled={disabled} /> 
  }
 
 
  
  render() {
    const columns = [{
      title:'角色名称',key:'roleDes',dataIndex:'roleDes',
  },{
      title:'权限分配',key:'right',dataIndex:'key',
      render:(index)=>{ return this.renderCheckbox(index)}
  }];

    return (
      <MyLayout>
        <Layout>
        <Row>
          <Button type="primary" onClick={this.onAddRole}>添加用户</Button>
        </Row>
        <Row>
          <BaseList list={this.state.list} columns={columns} isSelection={false}  />
        </Row>
      </Layout>
      </MyLayout>
      
  );
  }
}

export default RoleEdit;
