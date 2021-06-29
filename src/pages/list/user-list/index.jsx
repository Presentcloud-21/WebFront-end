import React  from 'react' ;
import MyLayout from '../../../component/my-layout';
import { errorModal, getLocalData, Request } from '../../../component/service/axios-service';
import { Button, Row, Col,Modal,Form,Input } from 'antd';
import {PlusOutlined,MinusOutlined,CloseOutlined} from '@ant-design/icons';
import BaseList from '../../../component/base-list';
import { Link } from 'react-router-dom';
const initList = require("../../../../static/teacher.json");
const ROLE=['管理员','教师','学生'];

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            'list':[],
            'selectedRowKey':[]
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
            <Button.Group>
                <Button type="danger" style={{margin:'0px 24px'}}>批量删除</Button>
            </Button.Group>
        )
    }
    selectedCallback(data){
      this.setState({
        'selectedRowKey':data
      })
    }
    renderOption  = (tel) => {
      const url="user/edit-user";
        return(
          <Row>
            <Col>
              <Button onClick={()=>{ window.sessionStorage.setItem('editUser',tel)}}  type="link">
                <Link  to={url}>
                  修改
                </Link>
                </Button>
            </Col>
            <Col>
              <Button type="link" onClick={()=>{console.log(e);}}>删除</Button>
            </Col>
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
        render:(val)=>{ console.log('rolechange',val); return getLocalData('roleTrans')["_"+String(val)]}
    },{
        title:'操作',key:'options',dataIndex:'tel',
        render:(val)=>{return this.renderOption(val)}
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
           <BaseList list={this.state.list} columns={columns} isSelection={true} selectedCallback={this.selectedCallback} />
        </Row>
        </div>
    </MyLayout>
  );
  }
}

export default UserList;
