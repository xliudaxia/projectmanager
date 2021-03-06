import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const {Option} = Select;



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
            message: "请输入电话,且必须为数字",
          },
        ]}>
          <Input   min={7} max={13}  type="number" />
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

export default ({doRefreshTable}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = (values) => {
    const body = {
      name:values.name,
      phone:Number(values.phoneNum),
      qqnum:Number(values.qqNum),
      wechat:values.wechat
    }

    let opts = {
      method: "POST",
      body:JSON.stringify(body)
    }
    fetch('/api/v1/phone', opts).then(response => response.json()).then((response => {
      if(response.status === 200){
        message.info(response.msg)
        doRefreshTable()
      }else{
        message.error('添加失败，请稍后重试');
        doRefreshTable()
      }
    }))

    setIsModalVisible(false);
  };

  return (
    <>
    <div style={{marginBottom:15}}>
    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        新增
      </Button>
    </div>
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
