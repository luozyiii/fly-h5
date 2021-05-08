import { getLists } from '@/services/search';
export default {
  namespace: 'search',
  state: {
    text: 'dva',
    lists: [],
  },
  // 同步方法
  reducers: {
    getLists(state, action) {
      console.log('同步方法');
      console.log('state:', state);
      console.log('action:', action);
      return {
        ...state,
        // lists: Array(1).fill(action.payload),
        lists: action.payload,
      };
    },
  },
  // 异步方法
  effects: {
    *getListsAsync({ payload }, { call, put }) {
      console.log('异步方法');
      console.log('payload:', payload);
      const res = yield call(getLists, payload);
      console.log('model:', res);
      yield put({
        type: 'getLists',
        payload: res.data,
      });
    },
  },
};
