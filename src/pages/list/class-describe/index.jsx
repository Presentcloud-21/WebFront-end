import React  from 'react' ;
import MyLayout from '../../../component/my-layout';
import {Breadcrumb,Form,Upload,Avatar,Space,Select,Input,Switch,Menu, Layout,Tag,Row,Col,Button,Popconfirm } from 'antd'
import { errorModal, getLocalData, Request, successMessage } from '../../../component/service/axios-service';
import BaseList from '../../../component/base-list';
import { getDictationbyCode } from '../../../component/service/direction-service';
import { Link } from 'react-router-dom';
import { checkRight, errorRight } from '../../../component/service/menu-service';
import { getDefaultClassAvatar } from '../../../component/service/default';

const STATE=[<Tag color="error">未开始</Tag>,<Tag color="success">正在执行</Tag>,<Tag color="default">已结课</Tag>];
const JONIABLE =[<Tag color="error">否</Tag>,<Tag color="success">是</Tag>]
const MODEURL = {'studentList':'memberList/','sign':'historysign/','admin':'getcoursedetail/'};
const SIGHTYPE = ["",<Tag color="error">限时签到</Tag>,<Tag color="success">一键签到</Tag>];
class ClassDescribe extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[],
      'success':false,
      'majorlist':[],
      'current':'studentList',
      "isend":false,
      
    }
    Request('GET','/ajax/memberList/'+getLocalData('desClass')).then((response)=> {
      const {data} = response.data;
      this.setState({
        'list':data || [],
        'success':true
      });
    })
  }
  componentWillMount(){
    if(!checkRight('getDescribeClass')) {
      errorRight();
    }
  }

  onChagneMode =(e) => {
    this.setState({
      'success':false
    })
    let url='/ajax/'+MODEURL[e.key]+getLocalData('desClass');
    if(e.key=='sign') {
      url+="/"+new Date().getTime();
    }
    Request('GET',url).then((response)=>{
      let {data}=response.data;
      if(e.key=='admin') {
        this.getMajor(data.courseschool);
        data.isschoolclass=data.isschoolclass==2?true:false;
        data.joinable = data.joinable==2?true:false;  
        this.setState({
          'avatar':data.image || getDefaultClassAvatar(),
          'isend':!((checkRight('editDescribeAllClass') ||JSON.parse(window.sessionStorage.getItem('user'))['userName']===data.teacherName))
        });
        if(data.coursestate==2) {
          this.setState({
            'isend':true
          })
          errorModal("班课已结束，你无法再对班课进行修改");
        }
      }
      this.setState({
        'current':e.key,
        'list':data || [],
        'success':true
      });

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

  renderButton = () => {
    return(
        <Button.Group>
            <Button type="primary"><Link to="/class/add-class">新建班课</Link></Button>
            <Button type="danger" style={{margin:'0px 24px'}}>批量删除班课</Button>
        </Button.Group>
    )
}


  renderOption  = (e) => {
    return(
      <Row>
        <Col>
        <Popconfirm  
          title="是否确认删除该数据？"
          okText="删除"
          cancelText="取消"
          onConfirm={()=>{Request("POST",'/ajax/deleteclass/'+e.courseId).then((response)=>{
            const {data}=response;
            console.log('delete',response);
            if(data.success) {
              let list=[...this.state.list];
              list.splice(e.key,1);
              this.setState({
                "list":list
              });
            }
          })}}>
            <Button type="link">移出班课</Button>
          </Popconfirm>
        </Col>
      </Row>
      );
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
  onUpdate=(e)=>{
  e.joinable=e.joinable?2:1;
  e.isschoolclass=e.isschoolclass?2:1;
  e.coursestate = e.coursestate?2:1;
  e['image']=this.state.avatar;
  if(e.coursestate==2) {
    this.setState({
      'isend':true
    });
  }
  Request('POST','/ajax/updateclass',JSON.stringify(e)).then((response)=>{
    successMessage('班课信息修改成功');
  })
}
  render() {
    const {current}=this.state;
    const studentcolumns = [{
      title:'学号',key:'perid',dataIndex:'perid'
  },{
      title:'姓名',key:'studentname',dataIndex:'studentname',
  },{
      title:'经验值',key:'totalExp',dataIndex:'totalExp'
  }
  // ,{
  //     title:'',key:'options',
  //     render:(e)=>{return this.renderOption(e)}
  // }
];

    const signcolumns = [{
      title:'开始时间',key:'begtime',dataIndex:'begtime',
      render:(val)=>{const data=new Date(val);return data.toLocaleDateString()+" "+data.toLocaleTimeString();}
  },{
      title:'结束时间',key:'endtime',dataIndex:'endtime',
      render:(val)=>{const data=new Date(val);return data.toLocaleDateString()+" "+data.toLocaleTimeString();}
  },{
      title:'学生数量',key:'allstudentnum',dataIndex:'allstudentnum'
  },{
      title:'签到人数',key:'allstudentnum',dataIndex:'allstudentnum'
  },{
      title:'签到类型',key:'sightype',dataIndex:'sightype',
      render:(val)=>{return SIGHTYPE[val]}
  }];

    return (
    <MyLayout>
      {this.state.success?
      <Layout style={{margin:'10px 24px'}}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/class">班课列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>班课详情</Breadcrumb.Item>
        </Breadcrumb>
        <Menu style={{margin:'10px 0px'}} mode="horizontal" onClick={this.onChagneMode} selectedKeys={[current]}>
          <Menu.Item key="studentList">
            学生列表
          </Menu.Item>
          <Menu.Item key="sign">
            签到记录
          </Menu.Item>
          <Menu.Item key="admin">
            班课管理
          </Menu.Item>
        </Menu>
        <Row style={{backgroundColor:"white"}}>
          <Col span={24}>
          {
            this.state.current == "studentList"?<BaseList list={this.state.list} columns={studentcolumns}  />:null
          }
          {
            this.state.current == "sign"?<BaseList list={this.state.list} columns={signcolumns} />:null
          }
          {
            this.state.current == 'admin'?
            <Form className="me-contains" disabled
            onFinish={this.onUpdate}
          >
            <Row>
            <Col span={3}/>
            <Col span={12}>
              班课名称
              <Form.Item name="courseName" initialValue={this.state.list.courseName} rules={[{ required: true, message: '班课名称不能为空' }]}  >
                <Input disabled={this.state.isend}/>
              </Form.Item>
              班级
              <Form.Item name="courseclass" initialValue={this.state.list.courseclass}  rules={[{ required: true, message: '班级不能为空' }]} >
                <Input disabled={this.state.isend}/>
              </Form.Item>
              创建者
              <Form.Item name="teacherName"  initialValue={this.state.list.teacherName}> 
                <Input disabled />
              </Form.Item>

              开课学校
              <Form.Item name="courseschool" initialValue={this.state.list.courseschool}  rules={[{ required: true, message: '请选择开课学校' }]} >
                <Select disabled={this.state.isend}  onChange={this.getMajor} >
                  {
                    getDictationbyCode('school').map((i)=>{
                      return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>
               开课学院
              <Form.Item name="coursemajor" initialValue={this.state.list.coursemajor}  rules={[{ required: true, message: '请选择开课学院' }]} >
                <Select disabled={this.state.isend}>
                  {
                    this.state.majorlist.length==0?<Select.Option key={0} value={0}>未知</Select.Option>:this.state.majorlist.map((i)=>{
                      return <Select.Option key={i.itemKey} value={i.itemKey}>{i.itemValue}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>
              开课学期
              <Form.Item name="term" initialValue={this.state.list.term} rules={[{ required: true, message: '请选择开课学期' }]}>
                <Select disabled={this.state.isend}  onChange={this.getMajor} >
                  {
                    getDictationbyCode('term').map((i)=>{
                      return <Select.Option key={i.itemKey} value={i.itemValue}>{i.itemValue}</Select.Option>
                    })
                  }
                </Select>
              </Form.Item>
              学习要求
              <Form.Item name="learningrequire" initialValue={this.state.list.learningrequire||""} >
                <Input.TextArea disabled={this.state.isend} placeholder="无"/>
              </Form.Item>
              考试范围
              <Form.Item name="examarrange" initialValue={this.state.list.examarrange||''} >
                <Input.TextArea disabled={this.state.isend} placeholder="无"/>
              </Form.Item>
              教学进度
              <Form.Item name="teachprogress" initialValue={this.state.list.teachprogress||""}>
                <Input.TextArea disabled={this.state.isend} placeholder="无"/>
              </Form.Item>
              <Row>
                <Col>
                  是否可加入
                  <Form.Item initialValue={this.state.list.joinable} name="joinable" >
                    <Switch disabled={this.state.isend} defaultChecked={this.state.list.joinable} />
                  </Form.Item>
                </Col>
                <Col style={{marginLeft:'24px'}}>
                  是否是学校课程
                  <Form.Item initialValue={this.state.list.isschoolclass} name="isschoolclass" >
                    <Switch disabled={this.state.isend} defaultChecked={this.state.list.isschoolclass} />
                  </Form.Item>
                </Col>
                <Col style={{marginLeft:'24px'}}>
                  是否已结课
                  <Form.Item name="coursestate"  initialValue={this.state.list.coursestate==2} >
                    <Switch disabled={this.state.isend} defaultChecked={this.state.list.coursestate==2} />
                  </Form.Item>
                </Col>
              </Row>
              <Button disabled={this.state.isend}  style={{width:'100%'}} type="primary" htmlType="submit">提交</Button>

            </Col>
            <Col span={3}/>
            <Col  span={6}>
              <Upload  disabled={this.state.isend}   
              name="image"    
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
                    <Button disabled={this.state.isend}>更换头像</Button>
                  </Row>
                </Space>
              </Upload>
            </Col>
          </Row>

          <Form.Item name="courseId"  initialValue={this.state.list.courseId} />
          {/* <Form.Item name="coursestate"  initialValue={this.state.isend} /> */}
          
            </Form>
            :
            null
              }
              </Col>
        </Row>
      </Layout>:null
  }
    </MyLayout>
  );
  }
}

export default ClassDescribe;
