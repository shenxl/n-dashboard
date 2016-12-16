import { query, queryInnerData, queryItem,
  deleteItem, replaceOrCreate, addInstallSum, queryInstallSum } from '../services/monthly';

const _ = require('lodash');

export default {
  namespace: 'companyMonthly',

  state: {
    list: [],
    innerList: [],
    emptyItem:
    {
      id: undefined,
      company_id: undefined,
      server_id: undefined,
      year: undefined,
      month: undefined,
      activity_sum: undefined,
      activity_max: undefined,
      activity_avg: undefined,
      install_sum: undefined,
      install_max: undefined,
      install_avg: undefined,
    },
    selectedRowKeys: [0],
    currentItem: {},
    loading: false,
    modalVisibel: false,
    modalMode: '',
    installSum: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {
    * query({ payload: companyid }, { call, put }) {
      yield put({ type: 'showLoading' });
      try {
        const { jsonResult: monthly } = yield call(query, companyid);
        if (monthly) {
          yield put({
            type: 'getSuccess',
            payload: {
              list: monthly,
            },
          });
        }
        return false
      } catch (error) {
        return false
      }
    },
    * addInstallSum({ payload: current }, { call, put }) {
      try {
        const { jsonResult } = yield call(addInstallSum, current);
        if (jsonResult) {
          yield put({
            type: 'getInstallSum',
            payload: current.company_id,
          });
        }
        return false
      } catch (error) {
        return false
      }
    },
    * getCurrentItem({ payload: query }, { call, put }) {
      try {
        const { jsonResult: current } = yield call(queryItem, query);
        if (current) {
          yield put({
            type: 'setCurrentItem',
            payload: {
              currentItem: current[0],
            },
          });

          yield put({
            type: 'setModalMode',
            payload: {
              modalMode: 'edit',
            },
          });
        }
        return false
      } catch (error) {
        return false
      }
    },
    * removeCurrentItem({ payload: query }, { call, put }) {
      try {
        const { jsonResult } = yield call(deleteItem, query);
        if (jsonResult) {
          yield put({
            type: 'getInnerData',
            payload: query.company_id,
          });
        }
        return false
      } catch (error) {
        return false
      }
    },

    * replaceOrCreate({ payload }, { call, put, select }) {
      try {
        const currentItem = yield select(state => state.companyMonthly.currentItem);
        const { jsonResult } = yield call(replaceOrCreate, currentItem);
        if (jsonResult) {
          yield put({
            type: 'getInnerData',
            payload: jsonResult.company_id,
          });
        }
        return false
      } catch (error) {
        return false
      }
    },

    * getInnerData({ payload: companyid }, { call, put }) {
      yield put({ type: 'showLoading' });
      try {
        const { jsonResult: innerData } = yield call(queryInnerData, companyid);
        if (innerData) {
          yield put({
            type: 'getInnerSuccess',
            payload: {
              innerList: innerData,
            },
          });
          yield put({ type: 'getInstallSum', payload: companyid });
        }
        return false
      } catch (error) {
        return false
      }
    },

    * getInstallSum({ payload: companyid }, { call, put }) {
      try {
        const { jsonResult: installData } = yield call(queryInstallSum, companyid);
        if (installData) {
          yield put({
            type: 'getInstallSumSuccess',
            payload: {
              installSum: installData[0].sum,
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
    getInnerSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    getInstallSumSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    showModal(state, action) {
      return { ...state, ...action.payload };
    },
    setCurrentItem(state, action) {
      return { ...state, ...action.payload };
    },
    setSelectedRowKeys(state, action) {
      return { ...state, ...action.payload };
    },
    setModalMode(state, action) {
      return { ...state, ...action.payload };
    },
    clearModalState(state) {
      return { ...state, modalVisibel: false }
    },
    updateCurrentItem(state, action) {
      const field = action.payload;
      const result = {};
      _.forOwn(field, (item, key) => {
        if (key === 'active_date') {
          result.year = item.value.year();
          result.month = item.value.month() + 1;
        } else {
          result[key] = item.value;
        }
      });
      const currentItem = state.currentItem;
      return { ...state, currentItem: _.merge(currentItem, result) };
    },

  },

}
