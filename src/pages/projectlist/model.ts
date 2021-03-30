import { message } from 'antd';
import { getProjectList, DelProject, UpdateProject } from './service';

export default {
  namespace: 'projectlist',
  state: {
    list: [],
    currentProjectInfo: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getProjectList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *delProjectItem({ payload }, { call }) {
      const response = yield call(DelProject, payload);
      if (response.msg === '删除成功') {
        message.info('删除成功');
      } else {
        message.error('删除失败，请稍后重试！');
      }
    },
    *updateProjectItem({ payload }, { call }) {
      const response = yield call(UpdateProject, payload);
      if (response.status === 200) {
        message.info('项目信息更新成功');
      } else {
        message.error('项目信息更新失败，请稍后再试！');
      }
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
