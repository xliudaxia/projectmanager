import { PageContainer } from '@ant-design/pro-layout';
import { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from '@/utils/request';
import { message } from 'antd';
import AddModal from './components/AddModal'
import UpdateModal from './components/UpdateModal'
import styles from './index.less';



type PhoneBookItem = {
  ID: number;
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

const doDeleteItem = (action: any, item: PhoneBookItem) => {
  let opts = {
    method: "DELETE",
    headers: {
      'M-Token': localStorage.getItem('M-Token')
    }
  };
  fetch(`/api/v1/phone/${item.ID}`, opts).then(response => response.json()).then((response => {
    if (response.status === 200) {
      message.info(response.msg);
      action?.reload();
    } else {
      message.error(response.msg);
      action?.reload();
    }
  })).catch(err => {
    message.error(String(err))
  })
}



interface PhoneBookData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}


export default () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneItem, setPhoneItem] = useState<PhoneBookData[]>([{ name: ['ID'], value: '' }, { name: ['name'], value: '' }, { name: ['phone'], value: 0 }, { name: ['qqnum'], value: 0 }, { name: ['wechat'], value: "" }]);
  const showModal = (item: PhoneBookItem) => {
    setPhoneItem([{ name: ['ID'], value: item.ID }, { name: ['name'], value: item.name }, { name: ['phone'], value: item.phone }, { name: ['qqnum'], value: item.qqnum }, { name: ['wechat'], value: item.wechat }])
    setIsModalVisible(true);
  };

  const doRefreshTable = () => {
    actionRef.current?.reload();
  }

  const columns: ProColumns<PhoneBookItem>[] = [
    {
      title: '编号',
      dataIndex: 'ID',
      valueType: 'indexBorder',
      width: 48,
      key: "ID"
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: "name",
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
      title: '电话/手机',
      dataIndex: 'phone',
      key: 'phone',
      valueType: 'text',
    },
    {
      title: '微信号',
      dataIndex: 'wechat', 
      key: 'wechat',
      valueType: 'text',
    },
    {
      title: 'QQ号码',
      dataIndex: 'qqnum',
      key: 'qqnum',
      valueType: 'text',
    },
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <a
          key="editable"
          onClick={() => {
            showModal(record);
          }}
        >
          编辑
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => {
            doDeleteItem(action, record)
          }}
          menus={[
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];





  return (
    <PageContainer className={styles.main}>
      <div >
        <UpdateModal
          doRefreshTable={doRefreshTable}
          phoneItem={phoneItem}
          setPhoneItem={setPhoneItem}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}></UpdateModal>
        <AddModal  doRefreshTable={doRefreshTable}></AddModal>
        <ProTable<PhoneBookItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered={true}
          className={styles.mainTable}
          request={async (params = {}) =>
            request<{
              data: PhoneBookItem[];
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
        />
      </div>
    </PageContainer>
  );
};
