import { Http } from '@/utils';
import { CommonEnum } from '@/enums';
export default {
  state: {
    detail: {}, // 基本信息
    comments: [], // 评论
    page: CommonEnum.PAGE, // 分页默认配置
    showLoading: true,
    reloadCommentsNum: 0, // 请求加载次数
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
    setShowLoading(state, payload) {
      return {
        ...state,
        showLoading: payload,
      };
    },
    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1,
        },
      };
    },
    resetData(state, payload) {
      return {
        ...state,
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload,
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
      dispatch({
        type: 'setShowLoading',
        payload: lists.length ? true : false,
      });
    },
    async addCommentsAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/comments/add',
        body: payload,
      });
      if (result) {
        dispatch({
          type: 'resetData',
          payload: {},
        });
      }
    },
  },
};
