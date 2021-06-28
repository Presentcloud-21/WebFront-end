import React  from 'react' ;
import MyLayout from '../../component/my-layout';
import List from './list';
import { Row, Col, Menu, Button, Modal, Form, Input} from 'antd'
import './index.scss'

class SystemParam extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[]
    };
  }

  render() {
    return (
    <MyLayout>
      <List/>
    </MyLayout>
  );
  }
}

export default SystemParam;
