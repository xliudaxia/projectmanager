import { PageContainer } from '@ant-design/pro-layout'
import { useState, useEffect, FC } from 'react'
import { IndexModelState, ConnectProps, Loading, connect } from 'umi'
import { Table, Space, Popconfirm,Button } from 'antd'
import styles from './index.less'
import TodoModal from './components/TodoModal'

interface pageProps extends ConnectProps {
  todos: IndexModelState;
  loading: boolean;
  dispatch: any;
}




const Index: FC<pageProps> = ({ todos, dispatch }) => {
  // const [name,setName] = useState<string>('莫文蔚');
  const { dataSource } = todos;
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [recordItem, setRecordItem] = useState<any>(undefined);


  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => { editHandler(record) }}>编辑</a>
          <Popconfirm
            title="确认删除当前Todo项目?"
            onConfirm={() => { deleteTodoItem(record.id) }}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteTodoItem = (id: number) => {
    console.log('执行删除方法', id)
    dispatch({
      type:"todos/delete",
      payload:id
    })
  }

  const editHandler = (item) => {
    setModalVisible(true);
    setRecordItem(item)
    console.log(recordItem)
  }
  const cancleHandler = () => {
    setModalVisible(false);
  }
  const openAddModal=()=>{
    setRecordItem(undefined);
    setModalVisible(true);
  }

  const onFinish = (values: any) => {
    let id =0;
    if(values.id){
      id =values.id;
    }
    console.log('Success:', values);
    if(id){
      console.log('编辑')
      dispatch({
        type: "todos/edit",
        payload: values
      })
    }else{
      console.log('新增')
      dispatch({
        type: "todos/add",
        payload: values
      })
    }
    
    setModalVisible(false);
  };
  useEffect(() => {
    setTimeout(() => {
      console.log("周润发")
    }, 1000);
  }, [])
  return (
    <PageContainer>
      {/* <div style={{fontSize:10}}>{name}</div> */}
      <div className={styles.listtable}>
        <Button type="primary" onClick={openAddModal} style={{marginBottom:20}}>添加</Button>
        <Table dataSource={dataSource} columns={columns}></Table>
        <TodoModal visible={modalVisible} onFinish={onFinish} recordItem={recordItem} cancleHandler={cancleHandler} ></TodoModal>
      </div>
    </PageContainer>
  )
}

export default connect(({ todos, loading }: { todos: IndexModelState, loading: Loading }) => ({
  todos, loading: loading.models.index
}))(Index)