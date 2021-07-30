import React  from 'react' ;
import MyLayout from '../../component/my-layout';
import List from './list';
import './index.scss'
import { checkRight, errorRight } from '../../component/service/menu-service';

class SystemParam extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
      'list':[]
    };
  }
  componentWillMount() {
    if(!checkRight('getSysparam')) {
      errorRight();
    }
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
