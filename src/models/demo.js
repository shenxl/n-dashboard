import { query } from '../services/demo';

export default {

  namespace: 'demo',

  state: {
    list:[],
    loading:false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type:'query' });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type:"startGet" });

      try {
        const { jsonResult } = yield call(query);
        if(jsonResult){
          yield put({type:"getSuccess" , payload:{
            list : jsonResult
          }});
        }
        return false
      } catch (error) {
        return false
      }
    },
  },

  reducers: {
    startGet(state, action) {
      return { ...state, loading : true};
    },

    getSuccess(state, action) {
      return { ...state, loading : false, ...action.payload };
    },
  },

}
