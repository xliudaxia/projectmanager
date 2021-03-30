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
interface ConfigList {
  projectstatus: string;
  projectname: string;
  projectdescription: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  configList?: ConfigList;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  dispatch: Dispatch;
  mystate: object;
}

function mapStateToProps(state) {
  console.log(state.projectlist.currentProjectInfo, '更新组件');
  const mystate = state;
  const configList = state.projectlist.currentProjectInfo;
  const loading = state.loading.effects['projectlist/updateProjectInfo'];
  return { mystate, loading, configList };
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  configList,
  dispatch,
}) => {
  console.log('查看config', configList);
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
          modifier: configList?.projectstatus,
          title: configList?.projectname,
          description: configList?.projectdescription,
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
