import { query } from '../services/monthly';
var _ = require('lodash');

export default {

  namespace: 'companyMonthly',

  state: {
    list : [],
    emptyItem:
    {
      id : undefined,
      company_id: undefined,
      server_id: undefined,
      year: undefined,
      month: undefined,
      activity_sum:undefined,
      activity_max: undefined,
      activity_avg: undefined,
      install_sum:undefined,
      install_max: undefined,
      install_avg:undefined
    },
    currentItem : {},
    loading : false,
    modalVisibel : false ,
    modalMode : "",
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("order setup");
    },
  },

  effects: {
    *query({ payload : companyid }, { call, put }) {
      yield put({ type: 'showLoading' });
      try {
        const { jsonResult : monthly } = yield call(query , companyid );
        if(monthly){
          yield put({ type: 'getSuccess'  , payload :{
            list : monthly
          }});
        }
        return false
      } catch (error) {
        return false
      }
    },
  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading:true };
    },
    getSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    }
  }

}
