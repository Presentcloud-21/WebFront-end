import React from 'react';
import { Button, Result } from 'antd';
function Statu404() {
  return (
      <Result
        status="404"
        title="404"
        subTitle="未找到页面"
        extra={<Button href='/home' type="primary">返回首页</Button>}
      />
  );
}

export default Statu404;
