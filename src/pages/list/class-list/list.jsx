import React, { useState } from 'react';
import { Input, Layout, Select,Row,Col, Button, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss'
import { transformDirectionData } from '../../../component/service/direction-service';

const { Option } = Select;
const { Column } = Table;

const STATE=[<Tag color="error">未开始</Tag>,<Tag color="success">正在执行</Tag>,<Tag color="default">已结课</Tag>];
const JONIABLE =[<Tag color="error">否</Tag>,<Tag color="success">是</Tag>]

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      "search-type":'search-name',
      'list':props.list
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      'list':props.list
    });
  }

  renderOption  = (text,record,index) => {
    return(
      <Row>
        <Col>
          <Button type="link">
            <Link to={{pathname:'/edit-list',query:record}}>
              详情
            </Link> 
            </Button>
        </Col>
        <Col>
          <Button type="link" onClick={()=>{console.log("text: ",text);console.log("record: ",record);console.log("index: ",index);}}>删除</Button>
        </Col>
      </Row>
      
      );
  }

  render(){
    return (
      <Layout>
        <Layout  >
          <Row>
            <Table className="table" dataSource={this.state.list} >
              <Column title="课程编号" key="courseId" dataIndex="courseId" />
              <Column title="课程名称" key="courseName" dataIndex="courseName"/>
              <Column title="授课教师" key="teacherName" dataIndex="teacherName"/>
              <Column title="学校" key="courseschool" dataIndex="courseschool" render={(value)=>{return transformDirectionData(value,'school')}} />
              <Column title="专业" key="coursemajor" dataIndex="coursemajor" render={(value)=>{return transformDirectionData(value,'major')}}/>
              <Column title="开课学期" key="term" dataIndex="term"/>
              <Column title="可加入" key="joinable" dataIndex="joinable" render={(status)=>{return JONIABLE[status]}} />
              <Column title="状态" key="coursestate" dataIndex="coursestate" render={(status)=>{return STATE[status];}}/>

              <Column dataIndex="option" width={200} key="option" render={this.renderOption} />
            </Table>
          </Row>
        </Layout>
      </Layout>
  );
  }
  
}

export default List;
