import { query, createOrder, editOrder } from '../services/orders';

const _ = require('lodash');

export default {

  namespace: 'orders',

  state: {
    list: [],
    emptyItem:
    {
      id: undefined,
      company_id: undefined,
      group_id: undefined,
      sns: undefined,
      order_number: 0,
      order_type: '场地授权',
      order_area: undefined,
      order_name: undefined,
      authorization_years: 0,
      authorization_date: new Date(),
      length_of_service: 0,
      service_date: new Date(),
      after_authorization: 0,
      prediction: 0,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    },
    currentItem: {},
    loading: false,
    modalVisibel: false,
    modalMode: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("order setup");
    },
  },

  effects: {
    * query({ payload: companyid }, { call, put }) {
      yield put({ type: 'showLoading' });
      try {
        const { jsonResult: orders } = yield call(query, companyid);
        if (orders) {
          yield put({
            type: 'getSuccess',
            payload: {
              list: orders,
            },
          });
        }
        return false
      } catch (error) {
        return false
      }
    },
    * create({ payload: company_id }, { call, put, select }) {
      try {
        const currentItem = yield select(state => state.orders.currentItem);
        const { jsonResult: orders } =
          yield call(createOrder, _.assign(currentItem, { company_id }));
        if (orders) {
          yield put({ type: 'query', payload: company_id });
        }
        yield put({ type: 'clearModalState' });
        return false
      } catch (error) {
        return false
      }
    },
    * edit({ payload: company_id }, { call, put, select }) {
      try {
        const currentItem = yield select(state => state.orders.currentItem);
        const { jsonResult: orders } =
          yield call(editOrder, currentItem.id, _.assign(currentItem, { company_id }));
        if (orders) {
          yield put({ type: 'query', payload: company_id });
        }
        yield put({ type: 'clearModalState' });
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
      const orderid = action.payload;
      const current = _.assign({},
        _.find(state.list, (item) => { return item.id === orderid }) || state.emptyItem);
      return { ...state, currentItem: current }
    },
    setModalState(state, action) {
      return { ...state, ...action.payload }
    },
    updateCurrentItem(state, action) {
      const field = action.payload;
      const result = {};
      _.forOwn(field, (item, key) => {
        result[key] = item.value;
      });
      const currentItem = state.currentItem;
      return { ...state, currentItem: _.merge(currentItem, result) };
    },
    clearModalState(state) {
      return { ...state,
        modalVisibel: false,
        modalMode: '',
        currentItem: state.emptyItem }
    },
  },

}
