import React from 'react';
import { Modal,  Form, Input, message } from 'antd';


interface Values {
  name: string;
  phoneNum: string;
  wechat: string;
  qqNum: string;
}

interface PhoneBookData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  phoneItem: PhoneBookData[];
  setPhoneItem: any;
  doRefreshTable:()=>void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  phoneItem,
  setPhoneItem
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="新增联系人："
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("验证失败:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        fields={phoneItem}
        onFieldsChange={(_, allFields) => {
          setPhoneItem(allFields);
        }}
      >
        <Form.Item
          name="ID"
          label="ID"
          hidden={true}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: "请输入姓名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="电话" 
        rules={[
          {
            required: true,
            message: "请输入电话",
          },
        ]}>
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
          name="wechat"
          label="微信号"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="qqnum"
          label="QQ号"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ({ phoneItem, setPhoneItem, isModalVisible, setIsModalVisible,doRefreshTable }: { phoneItem: PhoneBookData[], setPhoneItem: any, isModalVisible: boolean, setIsModalVisible: any,doRefreshTable:()=>void }) => {

  const onCreate = (values) => {
    const  ID= phoneItem[0].value
    const body = {
      name: phoneItem[1].value,
      phone: Number(phoneItem[2].value),
      wechat: phoneItem[3].value,
      qqnum: Number(phoneItem[4].value)
    }
    let opts = {
      method: "PUT",
      body: JSON.stringify(body)
    }
    fetch(`/api/v1/phone/${ID}`, opts).then(response => response.json()).then((response => {
      if (response.code === 200) {
        message.info(response.msg)
        doRefreshTable();
      } else {
        message.error('添加失败，请稍后重试');
        doRefreshTable();
      }
    }))
    setIsModalVisible(false);
  };

  return (
    <>
      <CollectionCreateForm
        doRefreshTable={doRefreshTable}
        phoneItem={phoneItem}
        setPhoneItem={setPhoneItem}
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};
