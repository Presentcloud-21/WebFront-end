import React  from 'react' ;
import { Button, Result } from 'antd';
function Statu502() {
  return (
      <Result
        status="500"
        title="502"
        subTitle="服务器错误"
        extra={<Button href='/home' type="primary">返回首页</Button>}
      />
  );
}

export default Statu502;
