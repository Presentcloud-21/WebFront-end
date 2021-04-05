import React from 'react';
import MyLayout from '../../component/my-layout'
import './index.scss';
class Me extends React.Component {
  render() {
    return (
    <MyLayout>
      <div className="home-page1">
        <div  className="big-text1">
          我的
        </div>
      </div>
    </MyLayout>
  );
  }
}

export default Me;
