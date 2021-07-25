import React  from 'react' ;
import MyLayout from '../../../component/my-layout';
import {  getLocalData, Request } from '../../../component/service/axios-service';
import {Popconfirm, Button, Row, Col } from 'antd';
import BaseList from '../../../component/base-list';
import { Link } from 'react-router-dom';
import { checkRight, errorRight } from '../../../component/service/menu-service';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        if(!checkRight('getUserList')) {
            errorRight();
        }
        this.state={
            'list':[],
            'selectedRowKey':[],
            'editable':checkRight('editUser'),
            'deleteable':checkRight('deleteUser')
        } 
        Request('GET','/ajax/getalluser').then((response)=>{
            const {data} = response.data;
            this.setState({
                'list':data
            });
        })
    }
    
    renderButton = () => {
        return(
            this.state.deleteable?
            <Button.Group style={{marginLeft:'auto'}}>
                <Button type="danger" style={{margin:'0px 24px'}}>批量删除</Button>
            </Button.Group>:null
        )
    }
    selectedCallback(data){
      this.setState({
        'selectedRowKey':data
      })
    }
    deleteUser =(tel)=>{
        Request('POST','/ajax/logoutuserById/'+tel).then((response)=>{
            console.log('delete User',response);
            window.location.reload();
        })
    }
    renderOption  = (e) => {
        if(e.userId===JSON.parse(window.sessionStorage.getItem('user')).userId) return null;
      const url="/user/edit-user";
        return(
          <Row>
              {
                  this.state.editable?
                  <Col>
                    <Button onClick={()=>{ window.sessionStorage.setItem('editUser',e.tel)}}  type="link">
                        <Link  to={url}>
                        修改
                        </Link>
                    </Button>
                  </Col>:null
              }
              {
                  this.state.deleteable?
                  <Col>
                  <Popconfirm  
                title="是否确认删除该数据？"
                okText="删除"
                cancelText="取消"
                onConfirm={()=>{
                this.deleteUser(e.tel);
              }}><Button type="link">删除</Button></Popconfirm>
                    
                  </Col>:null
              }
          </Row>
          );
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
        render:(val)=>{if(val!=null) return (new Date().getFullYear()-parseInt(val.substring(0,4)));else return '未知'}
    },{
        title:'学校',key:'school',dataIndex:'userschool',
    },{
        title:'专业',key:'major',dataIndex:'depart',
    },{
        title:'角色',key:'roleTrans',dataIndex:'role',
        render:(val)=>{ if(val==0) return "未认证"; return getLocalData('roleTrans')["_"+String(val)];}
    },{
        title:'操作',key:'options',
        render:(val)=>{return this.renderOption(val)}
    }];

    return (
    <MyLayout>
        <div style={{marginTop:'24px'}} />
        <Row style={{backgroundColor:"white",'margin':'0px 24px'}}>
            {this.renderButton()}
        </Row>
        <Row>
        <BaseList list={this.state.list} columns={columns} isSelection={true} selectedCallback={this.selectedCallback} />
        </Row>
    </MyLayout>
  );
  }
}

export default UserList;
