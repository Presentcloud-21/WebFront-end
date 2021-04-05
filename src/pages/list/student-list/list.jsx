import React, { useState } from 'react';
import { Input, Layout, Select,Row,Col, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { surnameArr, nameArr, phoneHeaderArr } from './name';
import './index.scss'

const { Option } = Select;
const { Column } = Table;
const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const initList = () => {
  const result = [];
  for (let i = 0; i < 2021; i++) {
    result.push({
      id: 100200300400 + i,
      name: `${surnameArr[i % 598]}${nameArr[i % 10]}`,
      // address: '',
      tel: `${phoneHeaderArr[i % 5]}${(`${randomNum(10000000, 99999999)}`).slice(0, 8)}`,
    });
  }
  return result;
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.list=initList();
    console.log(this.list);
    this.state={
      "search-type":'search-name',
    };
    this.searchMessage={
      'search-name':'请输入学生姓名',
      'search-id':'请输入学生学号',
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
              编辑
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
                <Option value="search-name">学生姓名</Option>
                <Option value="search-id">学生学号</Option>
              </Select>
            </Col>
            <Col>
              <Input className="search" placeholder={this.searchMessage[this.state['search-type']]} />
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
            <Table bordered className="table" dataSource={this.list} >
              <Column title="学号" key="id" dataIndex="id" />
              <Column title="姓名" key="name" dataIndex="name"/>
              <Column title="联系方式" key="tel" dataIndex="tel" />
              <Column dataIndex="option" width={200} key="option" render={this.renderOption} />
            </Table>
          </Row>
        </Layout>
      </Layout>
  );
  }
  
}

export default List;
