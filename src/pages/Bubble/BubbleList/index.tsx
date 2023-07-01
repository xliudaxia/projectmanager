import type { FC } from 'react';
import { Button, Space, Table } from 'antd';
import { CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import type { BubbleItem, BubbleListProps } from '../data';
import styles from './index.less';

/** 待办列表 */
const BubbleList: FC<BubbleListProps> = (props) => {
  const { loading, bubbleList, triggerBubbleStatus,handleBubbleDelete } = props;

  const columns = [
    {
      title: '编号',
      width: 240,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '待办内容',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      align: 'center',
      width: 240,
      key: 'operation',
      render: (_: string, record: BubbleItem) => (
        <Space size="middle">
          {record.status ? (
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: 'orange', borderColor: 'orange' }}
              onClick={() => triggerBubbleStatus(record.id, record.status)}
              shape="circle"
              icon={<ReloadOutlined />}
            />
          ) : (
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: '#67c23a', borderColor: '#67c23a' }}
              onClick={() => triggerBubbleStatus(record.id, record.status)}
              shape="circle"
              icon={<CheckOutlined />}
            />
          )}
          <Button
            type="primary"
            style={{ backgroundColor: '#f56c6c', borderColor: '#f56c6c' }}
            danger
            size="large"
            onClick={() => handleBubbleDelete(record.id)}
            shape="circle"
            icon={<CloseOutlined />}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        className={styles.bubbleTable}
        loading={loading}
        style={{ paddingTop: 20 }}
        dataSource={bubbleList}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      />
    </div>
  );
};

export default BubbleList;
