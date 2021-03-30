
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Spin } from 'antd';
import ReactFitText from 'react-fittext';


export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
        <ReactFitText maxFontSize={25}>
          <h1>做最好的自己！</h1>
        </ReactFitText>
      </div>
    </PageHeaderWrapper>
  );
};
