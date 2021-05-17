import { Http } from '@/utils';
import { CommonEnum } from '@/enums';

async function handleOrder(url, dispatch, payload) {
  const result = await Http({
    url,
    body: payload,
  });
  if (result) {
    dispatch({
      type: 'setOrder',
      payload: result,
    });
  }
}

export default {
  state: {
    detail: {}, // 基本信息
    comments: [], // 评论
    page: CommonEnum.PAGE, // 分页默认配置
    showLoading: true,
    reloadCommentsNum: 0, // 请求加载次数
    order: null,
  },
  reducers: {
    getDetail(state, payload) {
      return {
        ...state,
        detail: payload,
      };
    },
    setOrder(state, payload) {
      return {
        ...state,
        order: payload,
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
        url: '/comment/lists',
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
        url: '/comment/add',
        body: payload,
      });
      if (result) {
        dispatch({
          type: 'resetData',
          payload: {},
        });
      }
    },
    async hasOrderAsync(dispatch, rootState, payload) {
      handleOrder('/orders/hasOrder', dispatch, payload);
    },
    async addOrderAsync(dispatch, rootState, payload) {
      handleOrder('/orders/addOrder', dispatch, payload);
    },
    async delOrderAsync(dispatch, rootState, payload) {
      handleOrder('/orders/delOrder', dispatch, payload);
    },
  },
};
