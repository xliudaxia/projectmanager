import type { Effect, Reducer } from 'umi';

import { queryTags } from './service';


export interface TagType {
  name: string;
  value: string;
  type: string;
}

export interface StateType {
  tags: TagType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTags: Effect;
  };
  reducers: {
    saveTags: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dashboardAndmonitor',

  state: {
    tags: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};

export default Model;
