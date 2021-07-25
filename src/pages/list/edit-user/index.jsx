import React  from 'react' ;
import './index.scss';
import { Breadcrumb ,Space, Row, Col, Input, Layout,Button,Form,DatePicker,Select  } from 'antd';
import {  getLocalData, Request, successMessage } from '../../../component/service/axios-service';
import { getDictationbyCode } from '../../../component/service/direction-service';
import MyLayout from '../../../component/my-layout';
import moment from 'moment';
import { checkRight, errorRight } from '../../../component/service/menu-service';
const {Item} = Form;
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    if(!checkRight('editUser')){
      errorRight();
    }
    this.state={
        'user':{},
        'majorlist':[],
        'success':false
    };
    const tel=window.sessionStorage.editUser;
    Request('GET','/ajax/getusermessage/'+tel).then((response)=>{
      const{data} = response.data;
      this.setState({
        'user':data,
        'success':true
      });
      this.getMajor(data.userschool);
    })
    
  }
  
  getMajor = (schoolKey)=>{
    getDictationbyCode('school').map((i)=>{
      if(i.itemKey==schoolKey) {
        Request('GET','/ajax/dictionary/dictionarydetailbypid/'+i.dictionaryDetailId).then((response)=>{
          const {data}=response.data;
          
          this.setState({
            'majorlist':data,
          });
        });
      }
    })
  }
  onSave = (e) =>{
    e.birthyear=e.birthyear.add(+5,'day');
    Request('POST','/ajax/updateusermessage',JSON.stringify(e)).then((response)=>{
      if(e.tel===getLocalData('user').tel) {
        window.sessionStorage.setItem('user',JSON.stringify(e));
        window.sessionStorage.removeItem('rightnow');
      }
      successMessage('用户信息修改成功');
      window.location.href="/user"
    })
  }


  render() {
    return (
    <MyLayout>
  
      {
        this.state.success?<Layout className="me-contains" >
          
        <Form onFinish={this.onSave}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a onClick={()=>{window.history.back();}}>用户列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>编辑用户</Breadcrumb.Item>
            </Breadcrumb>
            <Item name="userId" initialValue={this.state.user.userId} />
            <Item name="role" initialValue={this.state.user.role} />
            <Row>
              <Col className="me-data-contains">
                <Space  direction="vertical" className="me-info" size="small" align="start">
                  <h2 style={{textAlign:"center"}}><strong>基本设置</strong></h2>
                    用户账号            
                    <Item name="tel" initialValue={this.state.user.tel}>
                      <Input disabled className="me-input" />  
                    </Item>
                    姓名            
                    <Item name="userName" initialValue={this.state.user.userName}>
                      <Input className="me-input" />  
                    </Item>
                    昵称            
                    <Item name="nickname" initialValue={this.state.user.nickname}>
                      <Input className="me-input" />  
                    </Item>
                    学校
                    <Item name="userschool" initialValue={this.state.user.userschool} style={{width:'100%'}}> 
                      <Select  onChange={this.getMajor} >
                        {
                          getDictationbyCode('school').map((i)=>{
                            return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                          })
                        }
                      </Select>
                    </Item>
                    学院
                    <Item name="depart" initialValue={this.state.user.depart}> 
                      <Select>
                        {
                          this.state.majorlist.length==0?<Select.Option key={0} value={0}>未知</Select.Option>:this.state.majorlist.map((i)=>{
                            return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                          })
                        }
                      </Select>
                    </Item>
                    学号            
                    <Item name="perid" initialValue={this.state.user.perid}>
                      <Input className="me-input" />  
                    </Item>
                    性别
                    <Item name="sex" initialValue={this.state.user.sex}> 
                      <Select>
                        {
                          getDictationbyCode('sex').map((i)=>{
                            return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                          })
                        }
                      </Select>
                    </Item>
                    出生年份            
                    <Item name="birthyear" initialValue={moment(this.state.user.birthyear?this.state.user.birthyear.substring(0,4):new Date().getFullYear())} >
                      <DatePicker picker="year" className="me-input" />  
                    </Item>
                    角色
                    <Item name="role" initialValue={this.state.user.role}>
                      <Select style={{width:200}} onChange={(e)=>{ console.log(e); }}>
                        {
                          getLocalData('role').map((i)=>{
                            return <Select.Option key={i.roleId} value={i.roleId}>{i.roleDes}</Select.Option>
                          })
                        }
                      </Select>
                    </Item>
                    <Item name="avatar" initialValue={this.state.user.avatar} />
                    <Button type="danger" htmlType="submit">修改信息</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Layout>:null
      }
      
    </MyLayout>
  );
  }
}

export default EditUser;
