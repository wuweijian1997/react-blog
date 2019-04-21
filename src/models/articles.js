import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  addArticleApi,
  fetchArticleByIdApi,
  fetchLatestApi,
  searchArticle,
  changeBlogLikeStatus,
  changeBlogStarStatus
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
      if(payload.type.key == 'rich') payload.type = 0;
      else payload.type = 1;
       /* payload.type = payload.type == true ? 1 : 0;*/
      const resp = yield call(addArticleApi, payload);
      if (resp.status === 20) {
        message.error('请先登陆账号');
        yield put(routerRedux.push('/user/login'));
      }
      message.success('提交成功');
      yield put(routerRedux.push('/articles/list'));
    },
    *fetchLatest({ payload }, { call, put }) {
      console.log(payload)
      const resp = yield call(fetchLatestApi, payload);
      console.log(resp);
      yield put({
        type: 'setLatest',
        payload: resp.data,
      });
    },
    *fetchArticleById({ payload }, { call, put }) {
      /* Goog */
           console.log(payload);
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
    *changeArticleLikeStatus({ payload }, {call, put}) {
        const resp = yield call(changeBlogLikeStatus, payload);
        yield put({
            type: 'setLatest',
            payload: resp.data,
        });
    },
    *changeArticleStarStatus({ payload }, {call, put}) {
        const resp = yield call(changeBlogStarStatus, payload);
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
        console.log(state)
        console.log(typeof state);
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
    changeArticleStatus(state, action) {
        let newLatest = state.latest;
        newLatest.list
        .forEach(function (item, index) {
            if(item.id == 126) { 
                newLatest.list.splice(index, 1)
            }
        });
        console.log(action.payload.data);
        newLatest.list.push(action.payload.data);
        return {
            ...state,
            latest:newLatest
        }
    }
  },
};
