import React from 'react';
import MyLayout from '../../component/my-layout'
import './index.scss';
class Home extends React.Component {
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
