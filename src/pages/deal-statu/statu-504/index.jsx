import React from 'react';
import MyLayout from '../../../component/my-layout'
import { Button, Result } from 'antd';
function Statu504() {
  return (
    <MyLayout>
      <Result
        status="error"
        title="504"
        subTitle="网关超时"
        extra={<Button href='/home' type="primary">返回首页</Button>}
      />,
    </MyLayout>
  );
}

export default Statu504;
