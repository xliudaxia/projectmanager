import { Modal, Button, Form, Input } from 'antd';
import { useEffect } from 'react';

const TodoModal = (props) => {
  const { visible, onFinish, cancleHandler, recordItem } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(recordItem);
  }, [visible]);
  if (recordItem === undefined) {
    form.resetFields();
  }
  const onOk = () => {
    form.submit();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal title="编辑/修改记录" visible={visible} onOk={onOk} onCancel={cancleHandler}>
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item hidden={true} label="ID" name="id">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: '请输入名称!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="CreateTime" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoModal;
