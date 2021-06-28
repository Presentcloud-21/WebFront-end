import React  from 'react' ;
import './index.scss';
import { Switch,Space, Row, Col, Input, Layout, Avatar,Button, Upload,Form,DatePicker,Select  } from 'antd';
import {  Request } from '../../../component/service/axios-service';
import { getDictationbyCode } from '../../../component/service/direction-service';
import MyLayout from '../../../component/my-layout';
const {Item} = Form;
class EditClass extends React.Component {
  constructor(props) {
    super(props);
    const user=window.sessionStorage.user;
    this.state={
        'user':JSON.parse(user),
        'majorlist':[],
        'avatar':'data:image/png;base64,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'
    };
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
    onAdd=(e)=>{
      e.joinable=e.joinable?1:0;
      e.isschoolclass=e.isschoolclass?1:0;
      e['image']=this.state.avatar;
      console.log('res',e);
      Request('POST','/ajax/creatclass',JSON.stringify(e)).then((response)=>{
        console.log(response);
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
      // console.log(e.target.result);// 打印图片的base64
      if (e && e.target && e.target.result) {
        option.onSuccess();
      }
    };
    this.setState('avatar',res);
    console.log('avatar',this.state.avatar);
  }
   beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('不能超过 2MB!');
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
            <Select onClick={()=>{console.log(this.state.majorlist);}} onChange={(e)=>{ console.log(e); }}>
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

export default EditClass;
