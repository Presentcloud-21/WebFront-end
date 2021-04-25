import React, { useState } from 'react';
import { Input, Layout, Select,Row,Col, Button, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss'

const { Option } = Select;
const { Column } = Table;
const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const initList = require('../../../../static/class.json')

class List extends React.Component {
  constructor(props) {
    super(props);
    this.list=initList;
    this.state={
      "search-type":'search-name',
    };
    this.searchMessage={
      'search-name':'请输入课程名称',
      'search-id':'请输入课程编号',
    }
  }

  onChangeSearchType=(e)=>{
    this.setState({
      "search-type":e,
    });
    console.log(this.state);
  }

  renderbtnGroup = () => {
    return(
      <Button.Group className="btnGroup" >
        <Button>新增</Button>
        <Button>批量删除</Button>
      </Button.Group>
    );
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
        <Layout  className="search-contains">
          <Row>
            <Col>
              <Select defaultValue="search-name" className="search-type" onChange={this.onChangeSearchType}>
                <Option value="search-name">课程名称</Option>
                <Option value="search-id">课程编号</Option>
              </Select>
            </Col>
            <Col>
              <Input className="search" placeholder={this.searchMessage[this.state['search-type']]} />
            </Col>
            <Col>
            <Button>查询</Button>
            </Col>
          </Row>
        </Layout>
        <Layout className="list-contains" >
          <Row>
            <Col style={{marginLeft:"auto"}}>
                {this.renderbtnGroup()}
            </Col>
          </Row>
          <Row>
            <Table className="table" dataSource={this.list} >
              <Column title="课程编号" key="id" dataIndex="id" />
              <Column title="课程名称" key="name" dataIndex="name"/>
              <Column title="授课教师" key="teacher" dataIndex="teacher"/>
              <Column title="学校" key="school" dataIndex="school"/>
              <Column title="专业" key="major" dataIndex="major"/>
              <Column title="开课时间" key="time" dataIndex="time"/>
              <Column title="状态" key="status" dataIndex="status" render={(status)=>{
                if(status==0) return <Tag color="error">未开始</Tag>
                else if(status==1) return <Tag color="success">正在执行</Tag>
                else if(status==2) return <Tag color="default">已结课</Tag>
              }}/>

              <Column dataIndex="option" width={200} key="option" render={this.renderOption} />
            </Table>
          </Row>
        </Layout>
      </Layout>
  );
  }
  
}

export default List;
