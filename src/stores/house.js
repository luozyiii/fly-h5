import { Http } from '@/utils';
import { CommonEnum } from '@/enums';
export default {
  state: {
    detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoading: true,
    reloadCommentsNum: 0,
  },
  reducers: {
    getDetail(state, payload) {
      return {
        ...state,
        detail: payload,
      };
    },
    getComments(state, payload) {
      return {
        ...state,
        comments: payload,
      };
    },
  },
  effects: {
    async getDetailAsync(dispatch, rootState, payload) {
      const detail = await Http({
        url: '/house/detail',
        body: payload,
      });
      dispatch({
        type: 'getDetail',
        payload: detail,
      });
    },
    async getCommentsAsync(dispatch, rootState, payload) {
      const { comments, page } = rootState.house;
      const lists = await Http({
        url: '/comments/lists',
        body: {
          pageSize: page.pageSize,
          pageNum: page.pageNum,
          ...payload,
        },
      });
      dispatch({
        type: 'getComments',
        payload: [...comments, ...lists],
      });
    },
  },
};
