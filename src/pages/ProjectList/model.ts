import { message } from 'antd';
import { GetProjectList, DelProject, UpdateProject,QueryProjectList } from './service';

export default {
  namespace: 'projectlist',
  state: {
    list: [],
    currentProjectInfo: {},
  },

  effects: {
    // 获取项目列表
    *fetch({ payload }, { call, put }) {
      const response = yield call(GetProjectList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    // 删除单个项目
    *delProjectItem({ payload }, { call }) {
      const response = yield call(DelProject, payload);
      if (response.msg === '删除成功') {
        message.info('删除成功');
      } else {
        message.error('删除失败，请稍后重试！');
      }
    },
    // 更新项目信息
    *updateProjectItem({ payload }, { call }) {
      const response = yield call(UpdateProject, payload);
      if (response.status === 200) {
        message.info('项目信息更新成功');
      } else {
        message.error('项目信息更新失败，请稍后再试！');
      }
    },
    // 查询项目信息
    *queryProjectList({ payload }, { call, put }) {
      const response = yield call(QueryProjectList, payload);
      console.log('query response',response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.projectlist) ? response.projectlist : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    loadProjectInfo(state, action) {
      console.log('执行了', action.payload);
      return {
        ...state,
        currentProjectInfo: action.payload,
      };
    },
    updateProjectInfo(state, action) {
      const temparrray = {
        projectname: action.payload[0],
        projectdescription: action.payload[1],
        projectstatus: action.payload[2],
      };
      return {
        ...state,
        currentProjectInfo: { ...state.currentProjectInfo, ...temparrray },
      };
    },
  },
};
