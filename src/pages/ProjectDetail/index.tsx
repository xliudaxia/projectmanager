import React, { useState } from 'react';
import { Button, Avatar, Tag, Input, Descriptions, Card, Steps } from 'antd';
import type {BasicLayoutProps} from '@ant-design/pro-layout';
import { CrownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import CommnetCenter from './components/CommentCenter'

const { Step } = Steps;
const defaultProps = {
  routes: [
    {
      path: '/projectlist/projectdetail',
      name: '项目主页',
      icon: <CrownOutlined />,
      component: './Welcome',
    },
    {
      path: '/projectlist/projectdetail/todo',
      name: '待办事项',
      icon: <UserOutlined />,
      component: './components/TodoList',
    },
    {
      path: '/projectlist/projectdetail/comment',
      name: '文件仓库',
      icon: <SmileOutlined />,
      component: './components/CommentCenter',
    },
  ],
};


const ProjectDetail: React.FC<BasicLayoutProps>= (props) => {
  const [pathname, setPathname] = useState('/welcome');
  return (
    <>
      <ProLayout
        route={defaultProps}
        location={{
          pathname,
        }}
        navTheme="light"
        fixSiderbar
        headerRender={false}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
      >
        <PageContainer
          onBack={() => null}
          tags={<Tag color="blue">进行中</Tag>}
          header={{
            style: {
              padding: '4px 16px',
              position: 'fixed',
              top: 0,
              width: '100%',
              left: 0,
              zIndex: 999,
              boxShadow: '0 2px 8px #f0f1f2',
            },
          }}
          style={{
            paddingTop: 20,
          }}
          extra={[
            <Input.Search
              key="search"
              style={{
                width: 240,
              }}
            />,
            <Button key="1" type="primary">
              搜索
            </Button>,
          ]}
        >
          { }
          {/* <div
            style={{
              minHeight: '120vh',
            }}
          >
            <Card bordered={false} style={{ background: '#fff',marginTop:25,paddingTop: 30  }}>
              <Descriptions title="光大科技+信托存证项目" >
                <Descriptions.Item label="创建人">周传雄</Descriptions.Item>
                <Descriptions.Item label="状态">进行中</Descriptions.Item>
                <Descriptions.Item label="创建时间">2021-04-06</Descriptions.Item>
                <Descriptions.Item label="项目介绍">这是一段用于演示的项目介绍，欢迎您的体验！</Descriptions.Item>
              </Descriptions>
            </Card>
            <Card title="执行阶段" style={{ marginBottom: 12,marginTop:25, height: "100%", padding: "0 24px 0 24px" }} bordered={false} >
              <Steps
                direction='horizontal'
              >
                <Step title="商务立项" />
                <Step title="实施立项" />
                <Step title="大额支出" />
                <Step title="项目招采" />
                <Step title="合同签订" />
              </Steps>
            </Card>
            <Card title="评论" style={{ marginBottom: 12, height: "100%", padding: "24px" }} bordered={false} >
              <CommnetCenter />
            </Card>
          </div> */}
          {props.children}
        </PageContainer>
      </ProLayout>
    </>
  );
};


export default ProjectDetail