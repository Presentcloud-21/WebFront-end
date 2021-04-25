import React, { useState } from 'react';
import { Input, Layout, Select,Row,Col, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { surnameArr, nameArr, phoneHeaderArr } from './name';
import './index.scss'

const { Option } = Select;
const { Column } = Table;
const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const initList = require("../../../../static/teacher.json");

class List extends React.Component {
  constructor(props) {
    super(props);
    this.list=initList;
    console.log(this.list);
    this.state={
      "search-type":'search-name',
    };
    this.searchMessage={
      'search-name':'请输入教师姓名',
      'search-id':'请输入教师工号',
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
                <Option value="search-name">教师姓名</Option>
                <Option value="search-id">教师工号</Option>
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
              <Column title="工号" key="id" dataIndex="id" />
              <Column title="姓名" key="name" dataIndex="name"/>
              <Column title="年龄" key="age" dataIndex="age"/>
              <Column title="性别" key="sex" dataIndex="sex"/>
              <Column title="学校" key="school" dataIndex="school"/>
              <Column title="专业" key="major" dataIndex="major"/>
              <Column title="职称" key="position" dataIndex="position"/>
              <Column title="注册时间" key="time" dataIndex="time"/>
              <Column dataIndex="option" width={200} key="option" render={this.renderOption} />
            </Table>
          </Row>
        </Layout>
      </Layout>
  );
  }
  
}

export default List;
