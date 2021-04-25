import React from 'react';
import MyLayout from '../../../component/my-layout'
import { Button, Result } from 'antd';
function Statu404() {
  return (
    <MyLayout>
      <Result
        status="404"
        title="404"
        subTitle="未找到页面"
        extra={<Button href='/home' type="primary">返回首页</Button>}
      />,
    </MyLayout>
  );
}

export default Statu404;
