import React from 'react';
import MyLayout from '../../../component/my-layout'
import { Button, Result } from 'antd';
function Statu502() {
  return (
    <MyLayout>
      <Result
        status="500"
        title="502"
        subTitle="服务器错误"
        extra={<Button href='/home' type="primary">返回首页</Button>}
      />,
    </MyLayout>
  );
}

export default Statu502;
