import { useEffect, useState } from 'react';
import { Card, Col, Row, Tooltip, Modal, Input, Space } from 'antd';
import { connect } from 'dva';
import projbackground from '../../assets/images/projectitem.png';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ActionCenter from './components/ActionCenter';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import AddProjectModal from './components/AddProjectModal';
import UpdateProjectModal from './components/UpdateProjectModal';
import styles from './index.less';
import autoHeight from '../Dashboard/components/Charts/autoHeight';

const { Search } = Input;
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
          console.log('获取项目列表出错');
        }
      },
    });
    setCount(1);
  }, [count]);
  const getProjectList=()=>{
    dispatch({
      type: 'projectlist/fetch',
      callback: (response) => {
        if (response.status === 'error') {
          console.log('获取项目列表出错');
        }
      },
    });
  }
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
        setCount(2);
      },
    });
  };
  const editItem = (values: any) => {
    dispatch({
      type: 'projectlist/loadProjectInfo',
      payload: values,
    });
    setUpdateModalvisible(true);
  };

  const onSearch=(value:string)=>{
    dispatch({
      type: 'projectlist/queryProjectList',
      payload: value,
    });
  }
  const onCreate = () => {
    dispatch({
      type: 'projectlist/updateProjectItem',
      payload: props.currentProjectInfo,
    });
    setUpdateModalvisible(false);
    setCount(3);
  };

  return (
    <PageHeaderWrapper>
      <div className={styles.siteCardWrapper}>
        <Card bordered={false}>
          <Space style={{marginBottom:"20px",width:"100%",position:"relative"}}>
            <AddProjectModal getProjectList={getProjectList}  />
            <Search
            onSearch={onSearch}
              style={{ position:"absolute",right:"0", top:"0",width:"300px"}}
              placeholder="请输入关键词"
              allowClear
              enterButton="搜索"
            />
          </Space>
          <UpdateProjectModal
            visible={updateModalvisible}
            onCreate={onCreate}
            onCancel={() => {
              setUpdateModalvisible(false);
            }}
          />
          <Row
            align="middle"
            gutter={60}
          >
            {(projectlist || []).map((item) => (
              <Col span={4}>
                <div style={{display:"flex",justifyContent:"center"}}>
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
                      title="修改"
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
                  style={{ width: 350, marginBottom: 50 }}
                  bordered={true}
                >
                  <Meta title={item.projectname} description={item.projectdescription} />
                </Card>
                </div>
               
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
