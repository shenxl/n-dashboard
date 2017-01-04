import { query } from '../services/example';

export default {

  namespace: 'exportData',

  state: {
    selectCurrent: 0,
    current: 0,
    isDownData: false,
    isSelectDataShow: false,
    indeterminate: true,
    checkAll: true,
    customerType: ['政府', '企业', '金融', '常态化'],
    selectedCustomerType: ['政府', '企业', '金融', '常态化'],
    catalog: {
      GOVERNMENT: ['政府', '政府行业', '部委'],
      ENTERPRISE: ['企业', '地方国企', '央企', '港澳台企业'],
      FINANCE: ['金融'],
      NORMALIZATION: ['常态化'],
    },
    isMonthesShow: false,
    isSingleMonthShow: false,
    isRangeMonthShow: false,
    type: '',
    query: {},
    date: { start: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
      end: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },
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
    changeDownload(state, action) {
      return { ...state, ...action.payload };
    },
    changeDate(state, action) {
      const date = action.payload;
      return { ...state, date };
    },
    toggleMonthes(state, action) {
      const isMonthesShow = state.isMonthesShow;
      return { ...state, ...action.payload };
    },
    toggleSigleMonth(state, action) {
      const isSingleMonthShow = state.isSingleMonthShow;
      return { ...state, ...action.payload };
    },
    toggleRangeMonth(state, action) {
      const isRangeMonthShow = state.isRangeMonthShow;
      return { ...state, ...action.payload };
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
