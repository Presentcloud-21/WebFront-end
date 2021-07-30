import React  from 'react' ;
import {Button,Result} from 'antd';

class OthersError extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'data':[]
    }
  }



  render() {
    return (
      <Result
      status="error"
      title="ERROR"
      subTitle="遇到复杂错误，请重新尝试"
      extra={<div>
          <Button type="primary" href="/home">返回首页</Button>
          <Button type="danger" style={{marginLeft:'24px'}} onClick={()=>{window.history.back();}}>返回上级</Button>
          </div>}
      >

      </Result>
  );
  }
  
}

export default OthersError;
