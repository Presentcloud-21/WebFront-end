import React  from 'react' ;
import MyLayout from '../../component/my-layout';
import List from './list';
import './index.scss'
import { checkRight, errorRight } from '../../component/service/menu-service';

class SystemParam extends React.Component {
  constructor(props) {
    super(props);
    if(!checkRight('getSysparam')) {
      errorRight();
    }
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
