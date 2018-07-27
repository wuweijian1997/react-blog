import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  addArticleApi,
  fetchArticleByIdApi,
  fetchLatestApi,
  searchArticle,
} from '../services/aritcles';

export default {
  namespace: 'articles',
  state: {
    latest: [],
    entities: {},
    recycle: [],
    recycleObj: {},
  },
  effects: {
    *addArticle({ payload }, { call, put }) {
      const resp = yield call(addArticleApi, payload);
      if (resp.status === 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      }
      message.success('提交成功');
      yield put(routerRedux.push('/articles/list'));
    },
    *fetchLatest({ payload }, { call, put }) {
      const resp = yield call(fetchLatestApi, payload);
      yield put({
        type: 'setLatest',
        payload: resp.data,
      });
    },
    *fetchArticleById({ payload }, { call, put }) {
      /* Goog */
      const resp = yield call(fetchArticleByIdApi, payload);
      yield put({
        type: 'setArticle',
        payload: resp.data,
      });
    },
    *search({ payload }, { call, put }) {
      console.log(payload);
      const resp = yield call(searchArticle, payload);
      yield put({
        type: 'setLatest',
        payload: resp.data,
      });
    },
  },
  reducers: {
    setLatest(state, action) {
      const newEntities = action.payload.list
        .map(e => {
          e.key = e.id;
          return e;
        })
        .reduce((acc, value) => {
          acc[value.id] = value;
          return acc;
        }, {});
      return {
        ...state,
        latest: action.payload,
        entities: {
          ...state.entities,
          ...newEntities,
        },
      };
    },
    setRecycle(state, action) {
      const newRecycleObj = action.payload.list
        .map(e => {
          e.key = e.id;
          return e;
        })
        .reduce((acc, value) => {
          acc[value.id] = value;
          return acc;
        }, {});
      return {
        ...state,
        recycle: action.payload,
        newRecycleObj: {
          ...state.newRecycleObj,
          ...newRecycleObj,
        },
      };
    },
    setArticle(state, action) {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      };
    },
  },
};
