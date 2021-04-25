import React from 'react';
import MyLayout from '../../../component/my-layout';
import { Layout, Space, Input,Row, Col, Switch, Radio, Button} from 'antd';
import './index.scss';
class EditList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={
      relation:false,
    };
  };
  onChange=(checked)=>{
    this.setState({
      relation:checked,
    });
  }
  render() {
    return (
    <MyLayout>
      <Layout className="edit-contains" >
        <Space direction="vertical" className="center" size="middle" align="start" >
          <Row>
            <Col>学号:</Col>
          </Row>
          <Row>
            <Col><Input style={{width: 400}} placeholder={this.props.location.query?this.props.location.query.id:null} disabled/></Col>
          </Row>
          <Row>
            <Col>姓名:</Col>
          </Row>
          <Row>
            <Col><Input placeholder={this.props.location.query?this.props.location.query.name:null} style={{width: 400}}/></Col>
          </Row>
          <Row>
            <Col>电话号码:</Col>
          </Row>
          <Row>
            <Col><Input placeholder={this.props.location.query?this.props.location.query.tel:null} style={{width: 400}} /></Col>
          </Row>
          <Row>
            <Col>描述:</Col>
          </Row>
          <Row>
            <Col><Input.TextArea style={{width: 400}} /></Col>
          </Row>
          <Row>
            关系户<Switch onChange={this.onChange} />
          </Row>
          <Row>
            {
            this.state.relation===true?
            <Radio.Group  >
              <Radio value={1}>校长</Radio>
              <Radio value={2}>院长</Radio>
              <Radio value={3}>教师子女</Radio>
              <Radio value={4}>其他</Radio>
            </Radio.Group>:
            null
          }
          </Row>
          
          
        </Space>
      </Layout>
    </MyLayout>
  );
  }
}

export default EditList;
