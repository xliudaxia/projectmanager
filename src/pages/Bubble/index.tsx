import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Col, Input, message, Row } from 'antd';
import type { BubbleItem } from './data';
import { addBubble, deleteBubble, queryBubble, triggerBubble } from './service';
import BubbleList from './BubbleList';

export default () => {
  // 待办列表
  const [bubbleList, setBubbleList] = useState<BubbleItem[]>([]);
  const [loading, setLoading] = useState(false);
  // 新增bubble内容
  const [newBubble, setNewBubble] = useState('');

  /** 获取列表 */
  const initQuery = async () => {
    setLoading(true);
    const todos = await queryBubble();
    setBubbleList(todos);
    setLoading(false);
  };

  /** 更新待办状态 */
  const triggerBubbleStatus = async (id: number, status: boolean) => {
    setLoading(true);
    await triggerBubble(id, status);
    await initQuery();
    setLoading(false);
    if (status) {
      message.success('状态成功更新为已完成');
    } else {
      message.warning('状态重置为未完成');
    }
  };

    /** 删除待办 */
  const handleBubbleDelete = async (id: number) => {
    setLoading(true);
    await deleteBubble(id);
    await initQuery();
    setLoading(false);
    message.success('待办删除成功');
  };

  /** 新增待办 */
  const handleBubbleAdd = async () => {
    if (newBubble) {
      setLoading(true);
      await addBubble(newBubble);
      await initQuery();
      setLoading(false);
      setNewBubble('');
      message.success('新增待办事项成功');
    } else {
      message.error('请输入内容后再执行添加操作');
    }
  };

  useEffect(() => {
    initQuery();
  }, []);


  return (
    <PageContainer>
      <Card style={{ minHeight: '60vh' }}>
        <Alert
          message={'欢迎使用待办事项，让他帮助你把事情处理的井井有条吧！'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Row gutter={16}>
          <Col offset={4} className="gutter-row" span={16}>
            <Card
              type="inner"
              title={
                <>
                  <Row gutter={16}>
                    <Col offset={4} className="gutter-row" span={16}>
                      <Input
                        style={{ height: 45, fontSize: 15, fontWeight: 500 }}
                        value={newBubble}
                        onChange={(value) => setNewBubble(value.target.value)}
                        placeholder="请输入待办事项……"
                      />
                      <Button
                        style={{
                          marginLeft: 25,
                          backgroundColor: '#409eff',
                          borderColor: '#409eff',
                        }}
                        onClick={handleBubbleAdd}
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<PlusOutlined />}
                      />
                    </Col>
                  </Row>
                </>
              }
            >
              <BubbleList
                loading={loading}
                bubbleList={bubbleList}
                handleBubbleDelete={handleBubbleDelete}
                triggerBubbleStatus={triggerBubbleStatus}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};
