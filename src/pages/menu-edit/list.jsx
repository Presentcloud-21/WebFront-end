import React from 'react';
import {Input,Form,Row,Tag,Menu,Select, Button, Table, Modal, Popconfirm } from 'antd';
import './index.scss'
import { Request } from '../../component/service/axios-service';
import { PlusOutlined } from '@ant-design/icons'
import MyLayout from '../../component/my-layout';
import BaseList from '../../component/base-list';
import { getIcon, getIconList, getMenu } from '../../component/service/menu-service';
const { Column } = Table;
const TYPE = ['',<Tag color="warning">菜单</Tag>,<Tag color="processing">功能</Tag>,<Tag color="success">页面</Tag>]
class MenuEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[]
    }
    Request('GET','/ajax/menu/getAllMenu').then((response)=>{
      const {data}=response.data;
      this.setState({
        'list':data || []
      });
    });
  }

  renderOption  = (text,record,index) => {
    return(
      <Row>
          <Button type="link" onClick={()=>{this.onAddMenus(record.menuId);}}>
              添加
            </Button>
          <Button type="link" onClick={()=>{this.onEditMenu(record);}}>
              编辑
            </Button>
        <Popconfirm  
          title="是否确认删除该数据？"
          okText="删除"
          cancelText="取消"
          onConfirm={()=>{
          this.onDeleteMenu(record.menuId);
        }}>
          <Button type="link">删除</Button>
          </Popconfirm>
      </Row>
      
      );
  }

  onGetMenu = (data) => {
    const {SubMenu}=Menu;
    const {Item}=Menu;
    return (
      (data.childmenus==null || data.childmenus.length==0)?
      <Item key={data.dictionaryId} title={data.dictionaryDescribe}>{data.dictionaryDescribe}</Item>
      :
      <SubMenu key={1}  title={data.dictionaryDescribe}>
        <Item key={data.dictionaryId}  title={data.dictionaryDescribe}>{data.dictionaryDescribe}</Item>
        {
          data.childmenus.map((i)=>{
            return this.onGetMenu(i)
          })
        }
      </SubMenu>
    );
  }

  onAdd = (e,callback) => {
    Request('POST','/ajax/menu/addMenu',JSON.stringify(e)).then((response)=>{
      console.log('add menu',response);
      if(response.data.success) {
        Request('GET','/ajax/menu/getAllMenu').then((response)=>{
          const {data}=response.data;
          this.setState({
            'list':data || []
          });
        });
      }
    });
    callback();
  }
  
  onDeleteMenu = (menuId)=> {
    Request('POST','/ajax/menu/deleteMenu/'+menuId).then((response)=>{
      console.log('delete menu',response);
      if(response.data.success) {
        Request('GET','/ajax/menu/getAllMenu').then((response)=>{
          const {data}=response.data;
          this.setState({
            'list':data || []
          });
        });
      }
    });
  }
  onAddMenus = (pId)=>{
    const modal = Modal.confirm();
    const destroy = ()=>{
      modal.destroy();
    }
    let TypeList = [];
    for(let i=2;i<TYPE.length;++i) {
      TypeList.push({'key':i,'value':TYPE[i]});
    }
    modal.update({
      title:'新增菜单',
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
        <p>名称</p>
        <Form.Item name="title"  rules={[{ required: true, message: '名称不能为空' }]}> 
          <Input/>
        </Form.Item>
        <p>图标</p>
        <Form.Item name="icon" > 
          {this.onGetIcon()}
        </Form.Item>
        {
            pId==0?<Form.Item name='menutype' initialValue={1} />:
            <div>
              <p>类型</p>
              <Form.Item name='menutype' >
                <Select>
                  {
                    TypeList.map((i)=>{
                      return <Select.Option value={i.key}>{i.value}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>
            </div>
          }
        <Button type="primary" onClick={()=>{}} htmlType="submit">提交</Button>
        <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
        <p>path</p>
        <Form.Item name="path"  rules={[{ required: true, message: 'path不能为空' }]}> 
          <Input/>
        </Form.Item>
        <p>name</p>
        <Form.Item name="name" rules={[{ required: true, message: 'name不能为空' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name='parentId' initialValue={pId} />
        <Form.Item name='menutype' initialValue={1} />

      </Form>
      )
    });
  }

  onEdit = (e,callback) => {
    Request('POST','/ajax/menu/updateMenu',JSON.stringify(e)).then((response)=>{
      console.log('update menu',response);
      if(response.data.success) {
        Request('GET','/ajax/menu/getAllMenu').then((response)=>{
          const {data}=response.data;
          this.setState({
            'list':data || []
          });
        });
      }
    });
    callback();
  }
  
  onEditMenu = (record)=>{
    const modal = Modal.confirm();
    const data = record;
    let TypeList = [];
    for(let i=2;i<TYPE.length;++i) {
      TypeList.push({'key':i,'value':TYPE[i]});
    }
    const destroy = ()=>{
      modal.destroy();
    }
    modal.update({
      title:'修改菜单',
      okText:'更新',
      cancelText:'取消',
      destroyOnClose:true,
      okButtonProps:{style:{'display':'none'}},
      cancelButtonProps:{style:{'display':'none'}},
      footer:null,
      content: (
        <Form
          onFinish={(e)=>this.onEdit(e,destroy)}
        >
          <p>名称</p>
          <Form.Item name="title" initialValue={data.title} rules={[{ required: true, message: '名称不能为空' }]}> 
            <Input/>
          </Form.Item>
          <p>图标</p>
          <Form.Item name="icon" initialValue={data.icon}> 
            {this.onGetIcon()}
          </Form.Item>
          {
            data.menutype==1?<Form.Item name='menutype' initialValue={1} />:
            <div>
              <p>类型</p>
              <Form.Item name='menutype' >
                <Select defaultValue={data.menutype}>
                  {
                    TypeList.map((i)=>{
                      return <Select.Option value={i.key}>{i.value}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>
            </div>
          }
          <Button type="primary" onClick={()=>{}} htmlType="submit">提交</Button>
          <Button type="danger" onClick={()=>{modal.destroy()}}>取消</Button>
          <Form.Item name='menuId' initialValue={data.menuId} />
          <p>path</p><Form.Item name='path' initialValue={data.path} >
            <Input />
          </Form.Item>
          <p>name</p>
          <Form.Item name='name' initialValue={data.name} >
            <Input />
          </Form.Item>
          <Form.Item name='parentId' initialValue={data.parentId} />
          <Form.Item name='menuType' initialValue={data.menuType} >
            {/* <Select>

            </Select> */}
          </Form.Item>


        </Form>
      )
    });
  }

  onGetIcon=(icon)=>{
    const iconList=getIconList();
    const list=[];
    for(let i in iconList) {
      list.push({'name':i,'icon':iconList[i]});
    }
    return <Select defaultValue={icon}>
      {
        list.map((i)=>{
          return <Select.Option value={i.name}>
            {i.icon}
          </Select.Option>
        }) 
      }
    </Select>
  }

  

  render(){
    const columns = [{
      title:'名称',key:'title',dataIndex:'title'
  },{
      title:'路径',key:'path',dataIndex:'path'
  },{
      title:'类型',key:'menutype',dataIndex:'menutype',
      render:val=>{return TYPE[val]}
  },{
      title:'标志',key:'icon',dataIndex:'icon',
      render:(val)=>{return getIcon(val);}
  },{
      title:'',key:'options',dataIndex:'',
      render:this.renderOption
  }];
    const onBuildTable=(list)=>{
      const columns = [{
        title:'名称',key:'title',dataIndex:'title'
    },{
        title:'路径',key:'path',dataIndex:'path'
    },{
        title:'类型',key:'menutype',dataIndex:'menutype',
        render:val=>{return TYPE[val]}
    },{
        title:'',key:'options',dataIndex:'',
        render:this.renderOption
    }];
      return <div>
          <Table columns={columns} dataSource={list} bordered={true}
          expandable={{
            expandedRowRender:record=>onBuildTable(record.childmenus),
            rowExpandable:record=>(record.childmenus!=null && record.childmenus.length!=0)
          }}
          pagination={false} />
          <br/></div>
    }
    return (
      <MyLayout>
        <Row className='system-param-contains'>
          <p className="system-param-title"><strong>菜单管理</strong></p>
          <Button type="primary" onClick={()=>{this.onAddMenus(0)}} style={{right:'24px'}}>新增菜单<PlusOutlined /></Button>
        </Row>
        <Row>
          {/* {onBuildTable()} */}
          {/* <Table dataSource={this.state.list} columns={columns} expandable={{expandedRowRender:record=><p>{record.name}</p>}}  />  */}

           <BaseList list={this.state.list} columns={columns} pagination={false} isSelection={false} bordered={true}
           expandable={{
             expandedRowRender:record=>onBuildTable(record.childmenus),
             rowExpandable:record=>(record.childmenus!=null && record.childmenus.length!=0)
             }}  />      
        </Row>
      </MyLayout>
      
  );
  }
  
}

export default MenuEdit;
