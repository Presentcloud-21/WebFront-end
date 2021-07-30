import React  from 'react' ;
import MyLayout from '../../../component/my-layout';
import { Menu, Layout,Tag,Row,Col,Button,Popconfirm } from 'antd'
import { getLocalData, Request, successMessage } from '../../../component/service/axios-service';
import BaseList from '../../../component/base-list';
import { getDictationbyCode } from '../../../component/service/direction-service';
import { Link } from 'react-router-dom';
import { checkRight } from '../../../component/service/menu-service';

const STATE=[<Tag color="error">未开始</Tag>,<Tag color="success">正在执行</Tag>,<Tag color="default">已结课</Tag>];
const JONIABLE =["",<Tag color="error">否</Tag>,<Tag color="success">是</Tag>]

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'current':props.current || 'joined',
      'hasOptions':props.hasOptions || false,
      'list':props.list || [],
      'isSelection':props.isSelection || false,
      'hasDeleted':props.hasDeleted || false,
      'created':checkRight('getCreatedClass'),
      'all':checkRight('getAllClass'),
      'deleteAllClass':checkRight('deleteAllClass'),
      'creatable':checkRight('createClass'),
      'sortedInfo':{'columnKey':'','order':''}
      
    }
  }
  componentWillReceiveProps(props) {
    this.props=props;
    this.setState({
      'current':props.current || 'joined',
      'hasOptions':props.hasOptions || false,
      'list':props.list || [],
      'isSelection':props.isSelection || false,
      'hasDeleted':props.hasDeleted || false,
      'created':checkRight('getCreatedClass'),
      'all':checkRight('getAllClass'),
      'deleteAllClass':checkRight('deleteAllClass'),
      'creatable':checkRight('createClass')

    });
  }
  onChagneMode =(e) => {
    window.location.href="/class/"+e.key+"-list";
  }


  renderButton = () => {
    return(
        <Button.Group style={{marginLeft:'auto'}}>
          {
            this.state.creatable?
            <Button type="primary"><Link to="/class/add-class">新建班课</Link></Button>:null
          }
            {/* <Button type="danger" style={{margin:'0px 24px'}}>批量删除班课</Button> */}
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
        {
          (this.state.deleteAllClass)||(e.teacherName==JSON.parse(window.sessionStorage.user)['userName'])?
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
              successMessage('删除成功');
            }
          })}}>
            <Button type="link">删除</Button>
          </Popconfirm>
        </Col>:null
        }
        
      </Row>
      );
  }
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  render() {
    const {current}=this.state;
    const {sortedInfo}=this.state;
    const columns = [{
      title:'课程编号',key:'courseId',dataIndex:'courseId',
      sorter:(a,b)=>{return a.courseId-b.courseId},
      render:(id)=>{return <Button type="link" onClick={()=>{
        window.sessionStorage.setItem('desClass',id);
      }}> <Link to="/class/class-describe">{id}</Link></Button>}
  },{
      title:'课程名称',key:'courseName',dataIndex:'courseName'
  },{
      title:'创建者',key:'teacherName',dataIndex:'teacherName'
  },{
      title:'学校',key:'school',dataIndex:'courseschool',
      sorter:(a,b)=>{return a.courseschool-b.courseschool},
  },{
      title:'专业',key:'major',dataIndex:'coursemajor',
      // sorter:(a,b)=>{return a.coursemajor-b.coursemajor},

  },{
      title:'开课学期',key:'term',dataIndex:'term',
      // sorter:(a,b)=>{return a.term-b.term},

  },{
      title:'可加入',key:'joinable',dataIndex:'joinable',
      // sorter:(a,b)=>{return a.joinable-b.joinable},
      render:(status)=>{return JONIABLE[status]}
  },{
      title:'课程状态',key:'coursestate',dataIndex:'coursestate',
      // sorter:(a,b)=>{return a.coursestate-b.coursestate},
      render:(status)=>{return STATE[status]}
  },{
      title:'',key:'options',
      render:(e)=>{return this.state.hasDeleted?this.renderOption(e):null}
  }];

    return (
    <MyLayout>
        <Menu style={{'margin':'10px 24px'}} mode="horizontal" onClick={this.onChagneMode} selectedKeys={[current]}>
          <Menu.Item key="joined">
            我加入的班课
          </Menu.Item>
          {
            this.state.created?
            <Menu.Item key="created">
            我创建的班课
          </Menu.Item>:null
          }
          {
            this.state.all?
            <Menu.Item key="all">
            班课列表
          </Menu.Item>:null
          }
        </Menu>
        {
          this.state.hasOptions?
          <Row style={{backgroundColor:"white",'margin':'0px 24px'}}>
              {this.renderButton()}
          </Row>:null
        }
        <Row>
          <BaseList list={this.state.list} columns={columns} isSelection={this.state.isSelection}  />
        </Row>
    </MyLayout>
  );
  }
}

export default ClassList;
