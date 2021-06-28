import React from 'react';
import { Input, Layout, Select,Row,Col, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss'
import { hasDirectionKey, transformDirectionData } from '../service/direction-service';

class BaseList extends React.Component {
  constructor(props) {
    super(props);
    let columns = props.columns;
    columns.map((i)=>{
        console.log(i.key,window.sessionStorage.getItem[i.key]);
        if(hasDirectionKey(i.key)) {
            i['render'] = (val)=>{return transformDirectionData(val,i.key)}
        }
    });
    for(let i=0;i<props.list.length;++i) {
      props.list[i]["key"]=i;
    }
    this.state={
      'list':props.list,
      'columns':columns,
      'isSelection':props.isSelection || false,
      'selectedRowKey':[],
      'selectedCallback':props.selectedCallback
    };
  }
  componentWillReceiveProps(props) {
    for(let i=0;i<props.list.length;++i) {
      props.list[i]["key"]=i;
    }
    this.setState({
      'list':props.list
    });
  }
  onSelectChange = (selectedRowKey)=>{
    console.log('selected row key',selectedRowKey);
    this.setState({
      'selectedRowKey':selectedRowKey
    });
    // this.state.selectedCallback(selectedRowKey);
  }
  render(){
    const {selectedRowKey,isSelection} = this.state;
    const rowSelection = isSelection?  {
      selectedRowKey,
      onChange: this.onSelectChange,
    }:null;
    return (
      <Layout className="list-contains" >
        <Table columns={this.state.columns} rowSelection={rowSelection} className="list-table" dataSource={this.state.list}
        render={(val)=>{console.log('new val',val);}}
        />
      </Layout>
  );
  }
  
}

export default BaseList;
