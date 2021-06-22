import React from 'react';
import { Button, Result } from 'antd';
function Statu504() {
  return (
      <Result
        status="error"
        title="504"
        subTitle="网关超时"
        extra={<Button href='/home' type="primary">返回首页</Button>}
      />
  );
}

export default Statu504;
