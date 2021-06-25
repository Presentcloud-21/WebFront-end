import React from 'react';
import MyLayout from '../../component/my-layout'
import { getDirection } from '../../component/service/direction-service';
import './index.scss';
class Home extends React.Component {
  constructor(props) {
    super(props);
    getDirection();
  }
  render() {
    return (
    <MyLayout>
      <div className="home-page1">
        <div  className="big-text1">
          这里是后台管理系统
        </div>
      </div>
    </MyLayout>
  );
  }
  
}

export default Home;
