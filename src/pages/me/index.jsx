import React  from 'react' ;
import MyLayout from '../../component/my-layout'
import './index.scss';
import { Space, Row, Col, Input, Layout, Avatar,Button, Upload,Form,DatePicker,Select  } from 'antd';
import { getLocalData, Request } from '../../component/service/axios-service';
import { getDictationbyCode } from '../../component/service/direction-service';
const {Item} = Form;
class Me extends React.Component {
  constructor(props) {
    super(props);
    const user=window.sessionStorage.user;
    this.state={
        'user':JSON.parse(user),
        'majorlist':[]
    };
    
    this.getMajor(this.state.user.userschool);

  }
  onSave = (e) =>{
    console.log('update',e);
    Request('POST','/ajax/updateusermessage',JSON.stringify(e)).then((response)=>{
      Request('GET','/ajax/getusermessage/'+this.state.user.tel).then((response)=>{
        console.log('user data',response);
        const {data}=response.data;
        window.sessionStorage['user'] = JSON.stringify(data);
        // window.location.reload();
      });
    })
  }
  getMajor = (schoolKey)=>{
    getDictationbyCode('school').map((i)=>{
      console.log(i);
      if(i.itemKey==schoolKey) {
        Request('GET','/ajax/dictionary/dictionarydetailbypid/'+i.dictionaryDetailId).then((response)=>{
          const {data}=response.data;
          
          console.log(data);
          this.setState({
            'majorlist':data,
          });
          console.log('majorlist',this.state.majorlist);
        });
      }
    })
  }
  
   customRequest=(option)=> {
    const formData = new FormData();
    formData.append("files[]", option.file);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    reader.onloadend = function(e) {
      console.log(e.target.result);// 打印图片的base64
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    };
  }

  render() {
    return (
    <MyLayout>
      <Layout className="me-contains" >
        <Form onFinish={this.onSave}>
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
                    <Select onChange={(e)=>{ console.log(e); }}>
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
                    <Select onChange={(e)=>{ console.log(e); }}>
                      {
                        getDictationbyCode('sex').map((i)=>{
                          return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                        })
                      }
                    </Select>
                  </Item>
                  出生年份            
                  <Item name="birthyear" initialValue={moment(this.state.user.birthyear?this.state.user.birthyear.substring(0,4):'1970')} >
                    <DatePicker picker="year" className="me-input" />  
                  </Item>
                  <Button type="danger" htmlType="submit">修改信息</Button>
              </Space>
            </Col>
            <Col className="me-avatar-contains">
              <Item name="avatar"  initialValue={this.state.user.avatar}>
                <Upload customRequest={this.customRequest}>
                  <Space  direction="vertical" className="me-info" size="small" align="center">
                    <Row>
                      <Avatar style={{top:0}} size={108} src="/assets/avata.png"  />
                    </Row>
                    <Row>
                      <Button>更换头像</Button>
                    </Row>
                  </Space>
                </Upload>
              </Item>
              
            </Col>
          </Row>
        </Form>
      </Layout>
    </MyLayout>
  );
  }
}

export default Me;
