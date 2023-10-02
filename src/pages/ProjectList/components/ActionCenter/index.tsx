import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

class Index extends Component {
  render() {
    return (
      <div className={styles.actiontab}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="操作记录" key="1">
            暂无
          </TabPane>
          <TabPane tab="已查看" key="2">
            暂无
          </TabPane>
          <TabPane tab="我的任务" key="3">
            暂无
          </TabPane>
          <TabPane tab="已标星" key="4">
            暂无
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Index;
