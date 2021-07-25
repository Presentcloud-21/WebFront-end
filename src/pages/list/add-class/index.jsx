import React  from 'react' ;
import './index.scss';
import { Switch,Space,Breadcrumb, Row, Col, Input, Layout, Avatar,Button, Upload,Form,DatePicker,Select  } from 'antd';
import {  errorModal, Request, successMessage } from '../../../component/service/axios-service';
import { getDictationbyCode } from '../../../component/service/direction-service';
import MyLayout from '../../../component/my-layout';
import { checkRight, errorRight } from '../../../component/service/menu-service';
import { getDefaultClassAvatar } from '../../../component/service/default';
const {Item} = Form;
class AddClass extends React.Component {
  constructor(props) {
    super(props);
    if(!checkRight('createClass')) {
      errorRight();
    }
    const user=window.sessionStorage.user;
    this.state={
        'user':JSON.parse(user),
        'majorlist':[],
        'avatar':getDefaultClassAvatar()
    };
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
    onAdd=(e)=>{
      e.joinable=e.joinable?2:1;
      e.isschoolclass=e.isschoolclass?2:1;
      e['image']=this.state.avatar;
      Request('POST','/ajax/creatclass',JSON.stringify(e)).then((response)=>{
        successMessage('班课添加成功');
        window.location.href='/class/created-list';

      })
    }

     getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    handleChange = info => {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            'avatar':imageUrl
          }),
        );
      }
    };

   customRequest=(option)=> {
    const formData = new FormData();
    formData.append("files[]", option.file);
    const reader = new FileReader();
    reader.readAsDataURL(option.file);
    let res;
    reader.onloadend = function(e) {
      res=e.target.result;
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    };
    this.setState('avatar',res);
  }
   beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorModal('添加失败','不能超过2MB！');
    }
    return isLt2M;
  }

  render() {
    return (
    <MyLayout>
      <Layout className="me-contains" >
        
      <Form
          onFinish={this.onAdd}
        >
          <Breadcrumb>
              <Breadcrumb.Item>
                <a onClick={()=>{window.history.back();}}>我的班课</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>新增班课</Breadcrumb.Item>
            </Breadcrumb>
          <Row>
          <Col span={3}/>
        <Col span={12}>
          班课名称
          <Form.Item name="courseName" rules={[{ required: true, message: '班课名称不能为空' }]}  >
            <Row><Input/></Row>
          </Form.Item>
          班级
          <Form.Item name="courseclass"  rules={[{ required: true, message: '班级不能为空' }]} >
            <Row><Input/></Row>
          </Form.Item>
          开课学校
          <Form.Item name="courseschool"  rules={[{ required: true, message: '请选择开课学校' }]} >
            <Select  onChange={this.getMajor} >
              {
                getDictationbyCode('school').map((i)=>{
                  return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          开课学院
          <Form.Item name="coursemajor"  rules={[{ required: true, message: '请选择开课学院' }]} >
            <Select onChange={(e)=>{ console.log(e); }}>
              {
                this.state.majorlist.length==0?<Select.Option key={0} value={0}>未知</Select.Option>:this.state.majorlist.map((i)=>{
                  return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          开课学期
          <Form.Item name="term" rules={[{ required: true, message: '请选择开课学期' }]}>
            <Select  onChange={this.getMajor} >
              {
                getDictationbyCode('term').map((i)=>{
                  return <Select.Option key={i.itemKey} value={i.itemValue}>{i.itemValue}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          学习要求
          <Form.Item name="learningrequire" initialValue={""} >
            <Row><Input.TextArea placeholder="无"/></Row>
          </Form.Item>
          考试范围
          <Form.Item name="examarrange" initialValue={""} >
            <Row><Input.TextArea placeholder="无"/></Row>
          </Form.Item>
          <Form.Item name="teachprogress" initialValue={""} />
          <Row>
            <Col>
              是否可加入
              <Form.Item initialValue={false} name="joinable" >
                <Switch />
              </Form.Item>
            </Col>
            <Col style={{marginLeft:'24px'}}>
              是否是学校课程
              <Form.Item initialValue={false} name="isschoolclass" >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Button style={{width:'100%'}} type="primary" htmlType="submit">提交</Button>

          </Col>
          <Col span={3}/>
          
          <Col  span={6}>
          <Upload     
          name="avatar"    
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={this.handleChange}        
          beforeUpload={this.beforeUpload}
          >
          <Space  direction="vertical" className="me-info" size="small" align="center">
            <Row>
              <Avatar style={{top:0}} size={108} src={this.state.avatar}  />

              {/* <img src={this.state.avatar} alt="avatar"/> */}
            </Row>
            <Row>
              <Button>更换头像</Button>
            </Row>
          </Space>
        </Upload>
        </Col>
          </Row>
          
          <Form.Item name="coursestate"  initialValue={1} />
          <Form.Item name="teacherName"  initialValue={this.state.user.userName} />
          
    


        </Form>
      </Layout>
    </MyLayout>
  );
  }
}

export default AddClass;
