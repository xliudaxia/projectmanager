import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'umi';

interface Values {
  id?: number;
  title: string;
  description: string;
  modifier: string;
  prjectAdmin?: string;
  projectStatus?: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  configList?: Values;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  dispatch: Dispatch;
  mystate: object;
}

function mapStateToProps(state) {
  const mystate = state;
  const loading = state.loading.effects['projectlist/updateProjectInfo'];
  return { mystate, loading };
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  configList,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const dispatchData = (allFields: any[]) => {
    // 将更新后的数据同步到dva
    const tempFieldStruct = [];
    allFields.forEach((val) => {
      tempFieldStruct.push(val.value);
    });

    dispatch({
      type: 'projectlist/updateProjectInfo',
      payload: tempFieldStruct,
    });
    dispatch({
      type: 'projectlist/UpdateProject',
      payload: { a: 1 },
    });
  };
  return (
    <Modal
      visible={visible}
      title="更新项目"
      okText="更新"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values);
        });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onFieldsChange={(_, allFields) => {
          dispatchData(allFields);
        }}
        initialValues={{
          modifier: configList?.modifier,
          title: configList?.title,
          description: configList?.description,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
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

export default connect(mapStateToProps)(CollectionCreateForm);
