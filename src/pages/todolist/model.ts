import { message } from 'antd';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getTodoList,editTodoItem,deleteTodoItem,addTodoItem } from './service'

export interface IndexModelState {
  name: string;
  dataSource:any;
}

export interface IndexModelType {
  namespace: 'todos';
  state: IndexModelState;
  effects: {
    query: Effect;
    edit:Effect;
    delete:Effect;
    add:Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    saveTodoList: any;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const TodoModel: IndexModelType = {
  namespace: 'todos',
  state: {
    name: '我的表格',
    dataSource:[]
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(getTodoList,payload)
      console.log('请求返回结果',response);
      yield put({
        type:"saveTodoList",
        payload:Array.isArray(response.data) ? response.data : [],
      })
    },
    *add({ payload }, { call, put }) {
      console.log('成功进入add方法',payload);
      const response = yield call(addTodoItem,payload)
      yield put({
        type:"query",
      })
    },
    *edit({ payload }, { call, put }) {
      console.log('成功进入edit方法',payload);
      const response = yield call(editTodoItem,payload)
      yield put({
        type:"query",
      })
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTodoItem,payload)
      console.log('删除返回结果model',response);
      yield put({
        type:"query",
      })
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveTodoList(state, action) {
      console.log('当前action',action)
      return {
        ...state,
        dataSource: action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/todolist') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default TodoModel;