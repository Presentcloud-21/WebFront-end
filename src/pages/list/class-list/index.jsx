import React  from 'react' ;
import MyLayout from '../../../component/my-layout';
import { Menu, Layout,Tag,Row,Col,Button,Popconfirm } from 'antd'
import { getLocalData, Request } from '../../../component/service/axios-service';
import BaseList from '../../../component/base-list';

const STATE=[<Tag color="error">未开始</Tag>,<Tag color="success">正在执行</Tag>,<Tag color="default">已结课</Tag>];
const JONIABLE =[<Tag color="error">否</Tag>,<Tag color="success">是</Tag>]
const MODEURL = {'join':'joinlist/','create':'createlist/','all':'getallcourse'};

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[]
    }
    Request('GET','/ajax/joinlist/'+getLocalData('user').userId).then((response)=> {
      const {data} = response.data;
      this.setState({
        'list':data || [],
        'current':'join'
      });
    })
  }
  onChagneMode =(e) => {
    console.log(e);
    let url='/ajax/'+MODEURL[e.key];
    if(e.key!='all') {
      url+=getLocalData('user').userId;
    }
    Request('GET',url).then((response)=>{
      const {data}=response.data;
      this.setState({
        'current':e.key,
        'list':data || []
      });
    })
  }
  
  renderButton = () => {
    return(
        <Button.Group>
            <Button onClick={this.onAddDirectionType} type="primary">新建班课</Button>
            <Button type="danger" style={{margin:'0px 24px'}}>批量删除班课</Button>
        </Button.Group>
    )
}

  selectedCallback(data){
    this.setState({
      'selectedRowKey':data
    })
  }

  renderOption  = (e) => {
    
    return(
      <Row>
        <Col>
          <Button type="link">
              修改
            </Button>
        </Col>
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
            <Button type="link">删除</Button>
          </Popconfirm>
        </Col>
      </Row>
      );
  }

  render() {
    const {current}=this.state;
    const columns = [{
      title:'课程编号',key:'courseId',dataIndex:'courseId'
  },{
      title:'课程名称',key:'courseName',dataIndex:'courseName',
      render:(name)=>{return <Button type="link">{name}</Button>}
  },{
      title:'创建者',key:'teacherName',dataIndex:'teacherName'
  },{
      title:'学校',key:'school',dataIndex:'courseschool',
  },{
      title:'专业',key:'major',dataIndex:'coursemajor',
  },{
      title:'开课学期',key:'term',dataIndex:'term',
  },{
      title:'可加入',key:'joinable',dataIndex:'joinable',
      render:(status)=>{return JONIABLE[status]}
  },{
      title:'课程状态',key:'coursestate',dataIndex:'coursestate',
      render:(status)=>{return STATE[status]}
  },{
      title:'操作',key:'options',
      render:(e)=>{return this.renderOption(e)}
  }];

    return (
    <MyLayout>
      <Layout>
        <Menu mode="horizontal" onClick={this.onChagneMode} selectedKeys={[current]}>
          <Menu.Item key="join">
            我加入的班课
          </Menu.Item>
          <Menu.Item key="create">
            我创建的班课
          </Menu.Item>
          <Menu.Item key="all">
            班课列表
          </Menu.Item>
        </Menu>
        <Row style={{backgroundColor:"white"}}>
          {
            this.state.current == "all"?
            <Col style={{marginLeft:'auto'}}>
              {this.renderButton()}
            </Col>
            :null
          }
        </Row>
        <Row>
          <BaseList list={this.state.list} columns={columns} isSelection={true}  />
        </Row>
      </Layout>
    </MyLayout>
  );
  }
}

export default ClassList;
