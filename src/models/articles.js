import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  addArticleApi,
  fetchArticleByIdApi,
  fetchLatestApi,
  updateArticleByIdApi,
  deleteArticleByIdApi,
  recoverArticleByIdApi,
  fetchDeleteArticlesApi,
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
      if (resp.status === 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      }
      yield put({
        type: 'setLatest',
        payload: resp.data,
      });
    },
    *fetchArticleById({ payload }, { call, put }) {
      /* Goog */
      const resp = yield call(fetchArticleByIdApi, payload);
      if (resp.status === 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      }
      console.log(resp);
      yield put({
        type: 'setArticle',
        payload: resp.data,
      });
    },
    *updateArticle({ payload }, { call, put }) {
      const resp = yield call(updateArticleByIdApi, payload);
      if (resp.status === 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      }
      yield put({
        type: 'setArticle',
        payload: resp.data,
      });
      message.success('修改成功');
      yield put(routerRedux.push(`/articles/show/${resp.data.id}`));
    },
    *deleteArticle({ payload }, { call, put }) {
      const resp = yield call(deleteArticleByIdApi, payload);
      if (resp.status === 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      }
      if (resp.status == 0) {
        message.success('删除成功');
        yield put({
          type: 'setLatest',
          payload: resp.data,
        });
      } else {
        message.error('删除失败');
      }
    },
    *recoverArticle({ payload }, { call, put }) {
      const resp = yield call(recoverArticleByIdApi, payload);
      if (resp.status == 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      } else if (resp.status == 0) {
        message.success('还原成功');
        yield put({
          type: 'setRecycle',
          payload: resp.data,
        });
      } else {
        message.error('还原失败');
      }
    },
    *fetchDeleteArticles({ payload }, { call, put }) {
      const resp = yield call(fetchDeleteArticlesApi, payload);
      if (resp.status === 40) {
        message.error('请先登陆管理员账号');
        yield put(routerRedux.push('/user/login'));
      }
      yield put({
        type: 'setRecycle',
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
