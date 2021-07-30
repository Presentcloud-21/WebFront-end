import React  from 'react' ;
import {Button,Result} from 'antd';

class Status50x extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'data':[]
    }
  }



  render() {
    return (
      <Result
      status="500"
      title="500"
      subTitle="服务器错误"
      extra={<div>
          <Button type="primary" href="/home">返回首页</Button>
          <Button type="danger" style={{marginLeft:'24px'}} onClick={()=>{window.history.back();}}>返回上级</Button>
          </div>}
      >

      </Result>
  );
  }
  
}

export default Status50x;
