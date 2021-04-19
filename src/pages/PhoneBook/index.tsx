import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { Tag, Space, Menu, Button, Dropdown } from 'antd';
import AddModal from './components/AddModal'
import styles from './index.less';



type GithubIssueItem = {
  id: number;
  name: string;
  sex: string;
  phone: number;
  wechat: string;
  label: string;
  qqnum: number;
  email: string;
  address: string;
  extra: string;
  status: boolean;
};


const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    copyable: true,
    tip: '可以点击按钮复制姓名',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '性别',
    key: 'sex',
    dataIndex: 'sex',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: '电话/手机',
    key: 'phone',
    dataIndex: 'phone',
    valueType: 'text',
  },
  {
    title: '微信号',
    key: 'wechat',
    dataIndex: 'wechat',
    valueType: 'text',
  },
  {
    title: '标签',
    key: 'label',
    dataIndex: 'label',
    valueType: 'text',
  },
  {
    title: 'QQ号码',
    key: 'qqnum',
    dataIndex: 'qqnum',
    valueType: 'text',
  },
  {
    title: '邮箱',
    key: 'email',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: '住址',
    key: 'address',
    dataIndex: 'address',
    valueType: 'text',
  },
  {
    title: '备注',
    key: 'extra',
    dataIndex: 'extra',
    valueType: 'text',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);


export default () => {
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer className={styles.main}>
      <div>
        <AddModal></AddModal>
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          request={async (params = {}) =>
            request<{
              data: GithubIssueItem[];
            }>('/api/v1/phone', {
              params,
            })
          }
          editable={{
            type: 'multiple',
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          dateFormatter="string"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>,
            <Dropdown key="menu" overlay={menu}>
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ]}
        />
      </div>
    </PageContainer>
  );
};
