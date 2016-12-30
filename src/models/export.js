import { query } from '../services/example';

export default {

  namespace: 'export',

  state: {
    type: '',
    query: {},
    date: [{ start: { year: 2016, month: 12 } }],
    field: [],
    isDetails: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * fetchRemote({ payload }, { call, put }) {
      // console.log("In ti" );
      try {
        const { jsonResult } = yield call(query);

        return false
      } catch (error) {
        return false
      }
    },
  },

  reducers: {
    changeDate(state, action) {
      const date = action.payload;
      return { ...state, date };
    },
  },

}
