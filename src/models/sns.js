import { message } from 'antd';
import { query, findOne, add, remove, edit } from '../services/sns';

message.config({
  top: 50,
  duration: 2,
});

export default {

  namespace: 'sns',

  state: {
    list: [],
    currentItem: {},
    loading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("sns setup");
    },
  },

  effects: {
    * addSn({ payload }, { call, put }) {
      const { companyId, sn } = payload;
      try {
        const { jsonResult: multiplicity } = yield call(findOne, sn);
        if (multiplicity) {
          message.error('添加失败，该SN已经在库中存在');
        }
        return false;
      } catch (error) {
        if (error.res.url.indexOf('companySns/findOne') > 0) {
          try {
            const { jsonResult: record } = yield call(add, payload);
            if (record) {
              yield put({ type: 'query', payload: companyId });
            }
            return false;
          } catch (e) {
            return false;
          }
        }
        return false;
      }
    },

    * removeSn({ payload }, { call, put }) {
      const { companyId, id } = payload;
      try {
        const { jsonResult: record } = yield call(remove, payload);
        if (record) {
          yield put({ type: 'query', payload: companyId });
        }
        return false;
      } catch (error) {
        return false
      }
    },
    * editSn({ payload }, { call, put }) {
      const { companyId, sn, id } = payload;
      try {
        const { jsonResult: multiplicity } = yield call(findOne, sn);
        if (multiplicity) {
          message.error('添加失败，该SN已经在库中存在');
        }
        return false;
      } catch (error) {
        if (error.res.url.indexOf('companySns/findOne') > 0) {
          try {
            const { jsonResult: record } = yield call(edit, payload);
            if (record) {
              yield put({ type: 'query', payload: companyId });
            }
            return false;
          } catch (e) {

          }
        }
        return false;
      }
    },

    * query({ payload: companyid }, { call, put }) {
      yield put({ type: 'showLoading' });
      try {
        const { jsonResult: sns } = yield call(query, companyid);
        if (sns) {
          yield put({
            type: 'getSuccess',
            payload: {
              list: sns,
            },
          });
        }
        return false
      } catch (error) {
        return false
      }
    },
  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    getSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    setCurrentItem(state, action) {
      return { ...state, ...action.payload }
    },
    setmultiplicitySn(state, action) {
      return { ...state, multiplicitySn: action.payload }
    },
  },

}
