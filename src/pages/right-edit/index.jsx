import React  from 'react' ;
import BaseList from '../../component/base-list';
import MyLayout from '../../component/my-layout';
import {Popconfirm,Layout,Space,Row,Col,Button,Form,Checkbox,Modal,Input, Menu} from 'antd';
import { getLocalData, Request, successMessage } from '../../component/service/axios-service';
import { getMenu, getRoleMenuId, getRoleMenuMap } from '../../component/service/menu-service';



class RightEdit extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
      'list':[],
      'rightoptions':[],
      'options':[],
      'menus':[],
      'modal':null,
      'visible':false,
      'title':'新增权限',
      'map':new Map(),
      'RoleMenus':[],
      'type':'add',
      'added':new Map(),
      'deleted':new Map(),
      'id_to_name':new Map()
    }
    Request('GET','/ajax/menu/getAllMenu').then((response)=>{
      const {data}=response.data;
      this.setState({
        'menus':data
      })
      console.log(this.state);

    })

    this.onGetRoleList();
    
  }
  onGetRoleList(){
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

  onShowMenuRight =(menus)=>{
    if(menus==null || menus==undefined || menus.length==0) return null;
    return <div>
      {
        menus.map((i)=>{
          // console.log(i.menuId,i.parentId,);
          return <div>
            <Row><Checkbox  onChange={(e)=>{
              console.log('change',e.target.value,e.target.checked);
              let map=this.state.map;
              let added=this.state.added;
              let deleted=this.state.deleted;
              if(e.target.checked) {
                if(deleted.get(e.target.value)) {
                  deleted.delete(e.target.value);
                } else {
                  added.set(e.target.value,true);
                }
              } else {
                if(added.get(e.target.value)) {
                  added.delete(e.target.value);
                } else {
                  deleted.set(e.target.value,true);
                }
              }
              map.set(e.target.value,e.target.checked);
              this.setState({'map':map,'added':added,'deleted':deleted});
          }} disabled={(i.title==="菜单管理"||i.title==="权限管理"||(i.parentId!=0&&this.state.map.get(i.parentId)!=true))?true:false} value={i.menuId}>{i.title}</Checkbox></Row>
            <div style={{marginLeft:'30px'}}>
              {
                // this.state.map.get(i.menuId)==true?
                this.onShowMenuRight(i.childmenus)
                // :null
              }
            </div>
            
            </div>
        })
      }
    </div>
  }

  onEdit =(roleId)=>{
    Request('GET','/ajax/menu/getMenuByRoleId/'+roleId).then((response)=>{
      const {data}=response.data;
      const res=getRoleMenuId(data);
      console.log(res);
      const RoleMenus=res['idList'];
      this.setState({
        'id_to_name':getRoleMenuMap(this.state.menus)['mapList']
      });
      let map=this.state.map;
      RoleMenus.map((i)=>{
        map.set(i,true);
      });
      this.setState({
        'RoleMenus':RoleMenus,
        'visible':true,
        'map':map
      });
      
    })
  }

  onAddRole(e) {

    const id_to_name=getRoleMenuMap(this.state.menus)['mapList'];
    console.log(id_to_name);
    e.perms="";
    e.right.map((i)=>{
      e.perms=e.perms+id_to_name.get(i)+",";
    })
    console.log(id_to_name);
    console.log('add',e);
    let added=[...this.state.added.keys()];

    Request('POST','/ajax/roleright/addRole',JSON.stringify(e)).then((response)=>{
      const {data}=response.data;
      const added_request={'roleId':data.roleId,'menuIdList':added};
      Request('POST','/ajax/menu/addRoleMenu',JSON.stringify(added_request)).then((response)=>{
        successMessage('添加角色成功');
        this.setState({'visible':false});
        window.location.reload();
      })
    });
  }
  async onEditRoleMenus(e) {
    const {id_to_name}=this.state;
    e.perms="";
    e.right.map((i)=>{
      e.perms=e.perms+id_to_name.get(i)+",";
    })
    console.log('change Right',e);

    let added=[...this.state.added.keys()];
    let deleted=[...this.state.deleted.keys()];
    const added_request={'roleId':e.roleId,'menuIdList':added};
    const deleted_request={'roleId':e.roleId,'menuIdList':deleted};
    const add_res=Request('POST','/ajax/menu/addRoleMenu',JSON.stringify(added_request));
    const deleted_res=Request('POST','/ajax/menu/deleteRoleMenu',JSON.stringify(deleted_request));
    const role_res=Request('POST','/ajax/roleright/updateRoleById',JSON.stringify(e));
    Promise.all([add_res,deleted_res,role_res]).then((res)=>{
      successMessage('权限修改成功');
      this.setState({
        'visible':false
      });
      window.location.reload();
      console.log('all finish',res);
    })
  }
  onFinish=(e)=> {
    console.log('finish',this.state.type);
    if(this.state.type==='add') {
      this.onAddRole(e);
    } else {
      this.onEditRoleMenus(e);
    }
  }

  onModal(title){
    const {modal}=this.state;
    const {RoleMenus}=this.state;
    return <Modal footer={null} onCancel={()=>{this.setState({'visible':false,'modal':null})}} destroyOnClose title={title} visible={this.state.visible}>
      <Form
          onFinish={this.onFinish}
        >
          角色名称
          <Row>
          <Form.Item name="roleDes" initialValue={modal==null?null:modal.roleDes} rules={[{ required: true, message: '角色名称不能为空' }]}  >
            <Input className="direction-input" />
          </Form.Item>
          </Row>
          角色关键字
          <Row>
          <Form.Item name="roleName" initialValue={modal==null?null:modal.roleName}  rules={[{ required: true, message: '字典关键字不能为空' }]} >
            <Input className="direction-input" />
          </Form.Item>
          </Row>
          角色权限
          <Form.Item initialValue={RoleMenus==null?[]:RoleMenus} name="right">
            <Checkbox.Group >
              {
               this.onShowMenuRight(this.state.menus)
              }
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="roleId" initialValue={modal==null?null:modal.roleId} />
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="danger" className="modal_cancel" onClick={()=>{this.setState({'visible':false,'modal':null})}}>取消</Button>
        </Form>
    </Modal>
  }

  
  deleteRole =(id)=>{
    Request('POST','/ajax/roleright/deleteRoleById/'+id).then((res)=>{
      successMessage('删除角色成功');
      window.location.reload();
    })
  }
 
  renderOption  = (e) => {
      return(
        <Row>
          <Col>
            <Button type="link" onClick={()=>{this.setState({'type':'edit','added':new Map(),'deleted':new Map(),'modal':e,'title':'编辑角色'});this.onEdit(e.roleId)}} >编辑</Button>
          </Col>
          {
            e.roleDes==='管理员' || e.roleDes==='学生' || e.roleDes==='教师'?null:
          <Col>
          <Popconfirm  
          title="是否确认删除该数据？"
          okText="删除"
          cancelText="取消"
          onConfirm={()=>{
          this.deleteRole(e.roleId);
        }}><Button type="link">删除</Button></Popconfirm>
            
          </Col>
          }
          
        </Row>
        );
    }
  
  render() {
    const columns = [{
      title:'角色名称',key:'roleDes',dataIndex:'roleDes',
  },{
      title:'',key:'options',
      render:(val)=>{return this.renderOption(val)}
  }];

    return (
      <MyLayout>
        <Layout>
          {this.onModal(this.state.title)}
        <Row>
          <Button type="primary" onClick={()=>{this.setState({'type':'add','modal':null,'RoleMenus':[],'map':new Map(),'visible':true})}}>添加用户</Button>
        </Row>
        <Row>
          <BaseList list={this.state.list} columns={columns} isSelection={false}  />
        </Row>
      </Layout>
      </MyLayout>
      
  );
  }
}

export default RightEdit;
