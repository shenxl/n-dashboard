import { query } from '../services/example';

export default {

  namespace: 'exportData',

  state: {
    isSelectDataShow: false,
    checkAll: false,
    plainOptions: ['政府', '企业', '金融'],
    defaultCheckedList: ['政府'],
    isMonthesShow: false,
    isSingleMonthShow: false,
    isRangeMonthShow: false,
    type: '',
    query: {},
    date: { start: { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 },
      end: { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 } },
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
    toggleMonthes(state) {
      const isMonthesShow = state.isMonthesShow;
      return { ...state, isMonthesShow: !isMonthesShow };
    },
    toggleSigleMonth(state) {
      const isSingleMonthShow = state.isSingleMonthShow;
      return { ...state, isSingleMonthShow: !isSingleMonthShow };
    },
    toggleRangeMonth(state) {
      const isRangeMonthShow = state.isRangeMonthShow;
      return { ...state, isRangeMonthShow: !isRangeMonthShow };
    },
    toggleSelectData(state) {
      const isSelectDataShow = state.isSelectDataShow;
      return { ...state, isSelectDataShow: !isSelectDataShow };
    },
    changeChecked(state, action) {
      return { ...state, ...action.payload };
    },

  },

}
