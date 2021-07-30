import React  from 'react' ;
import {Button,Result} from 'antd';

class Status404 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'data':[]
    }
  }



  render() {
    return (
      <Result
      status="404"
      title="404"
      subTitle="未找到该页面"
      extra={<div>
          <Button type="primary" href="/home">返回首页</Button>
          <Button type="danger" style={{marginLeft:'24px'}} onClick={()=>{window.history.back();}}>返回上级</Button>
          </div>}
      >

      </Result>
  );
  }
  
}

export default Status404;
