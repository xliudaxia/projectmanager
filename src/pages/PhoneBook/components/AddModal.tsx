import React, { useState } from 'react';
import { Modal, Button, Form, Input, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';



interface Values {
  name: string;
  phoneNum: string;
  wechat: string;
  qqNum: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}


interface contactPerson {
  id?: number;
  name: string;
  sex?: string;
  age?: string;
  wechat?: string;
  phoneNum: string;
  qqNum?: string;
  email?: string;
  address?: string;
  label?: string;
  extraContent?: string;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
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
      {/* initialValues={{ modifier: "public" }} */}
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
      >
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
        <Form.Item name="phoneNum" label="电话" rules={[
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
          name="qqNum"
          label="QQ号"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    //使用fetch请求后台接口
    const body = {
      name:values.name,
      phone:values.phoneNum,
      qqnum:values.qqNum,
      wechat:values.wechat
    }

    let opts = {
      method: "POST",
      body:JSON.stringify(body)
    }
    fetch('/api/v1/phone', opts).then(response => response.json()).then((response => {
      console.log(response)
    }))

    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        新增联系人
      </Button>
      <CollectionCreateForm
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};
