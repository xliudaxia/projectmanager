import { useEffect, useState } from 'react';
import { Card, Col, Row, Tooltip, Modal } from 'antd';
import { connect } from 'dva';
import projbackground from '../../assets/images/background.jpg';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ActionCenter from './components/ActionCenter';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import AddProjectModal from './components/AddProjectModal';
import UpdateProjectModal from './components/UpdateProjectModal';
import styles from './index.less';

const { Meta } = Card;

function mapStateToProps(state) {
  const projectlist = state.projectlist.list;
  const { currentProjectInfo } = state.projectlist;
  return { currentProjectInfo, projectlist };
}

const ProjectList: React.FC<{}> = (props) => {
  const [updateModalvisible, setUpdateModalvisible] = useState(false);
  const [count, setCount] = useState(0);
  const { dispatch, projectlist } = props;
  useEffect(() => {
    dispatch({
      type: 'projectlist/fetch',
      callback: (response) => {
        console.log('执行结果', response);
        if (response.status === 'error') {
          console.log('刷新验证码');
        }
      },
    });
    setCount(1);
  }, [count]);
  const deleteItem = (id: string) => {
    Modal.confirm({
      title: '删除任务',
      content: '确定删除该任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'projectlist/delProjectItem',
          payload: { id },
        });
      },
    });
  };
  const editItem = (values) => {
    console.log('执行了any方法', values)
    dispatch({
      type: 'projectlist/loadProjectInfo',
      payload: values,
    });
    setUpdateModalvisible(true);
  };
  const onCreate = () => {
    dispatch({
      type: 'projectlist/updateProjectItem',
      payload: props.currentProjectInfo,
    });
  };

  return (
    <PageHeaderWrapper>
      <div className={styles.siteCardWrapper}>
        <Card bordered={false}>
          <AddProjectModal></AddProjectModal>
          <UpdateProjectModal
            visible={updateModalvisible}
            onCreate={onCreate}
            onCancel={() => {
              setUpdateModalvisible(false);
            }}
          />
          <Row style={{ display: 'flex', margin: '0 auto', width: '100%' }} gutter={16}>
            {(projectlist || []).map((item) => (
              <Col span={6}>
                <Card
                  hoverable
                  actions={[
                    <Tooltip key="setting" title="配置">
                      <SettingOutlined key="setting" />
                    </Tooltip>,
                    <Tooltip
                      key="edit"
                      onClick={() => {
                        editItem(item);
                      }}
                      title="编辑"
                    >
                      <EditOutlined key="edit" />
                    </Tooltip>,
                    <Tooltip
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                      key="more"
                      title="删除"
                    >
                      <DeleteOutlined key="delete" />
                    </Tooltip>,
                  ]}
                  cover={<img alt="example" src={projbackground} />}
                  style={{ width: 350, marginBottom: 15 }}
                  bordered={true}
                >
                  <Meta title={item.projectname} description={item.projectdescription} />
                </Card>
              </Col>
            ))}
          </Row>
          <ActionCenter />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(mapStateToProps)(ProjectList);
