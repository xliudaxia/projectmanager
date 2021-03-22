import styles from './index.less';
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { AddProjectItem } from '../../service';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
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
      title="创建项目："
      okText="创建"
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
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="项目名称"
          rules={[
            {
              required: true,
              message: '请输入项目名称!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="项目介绍">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">公开项目</Radio>
            <Radio value="private">私人项目</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = async (values) => {
    const submitStucture = {
      projectName: '',
      projectDescription: '',
      projectadmin: 'admin',
      projectStatus: '',
    };
    submitStucture.projectName = values.title;
    submitStucture.projectDescription = values.description;
    submitStucture.projectStatus = values.modifier;
    const success = await AddProjectItem(submitStucture);
    if (success.status === 200) {
      message.success('添加成功');
      setVisible(false);
    } else {
      message.error('添加失败请重试！');
    }
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加项目
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-form-in-modal">
      <CollectionsPage />
    </div>
  </div>
);
