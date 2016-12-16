import { query, queryActive, getCompany, updateCompany } from '../services/companies';

const pathToRegexp = require('path-to-regexp');
const u = require('updeep');
const _ = require('lodash');

const date = new Date()

function assignFilter(companies, catalogType) {
  const { filterOption, catalog, activityDate } = companies;
  const typeFilter = {
    type: {
      inq: (catalogType && catalog && catalogType[catalog.toLocaleUpperCase()])
        || catalogType.GOVERNMENT,
    },
  }
  const { year, month } = activityDate;
  const dateFilter = { or: [{ activity_sum: null }, { and: [{ year }, { month }] }] }


  const { and, or, limit, order, skip } = filterOption;

  let andopt = [];

  andopt.push(typeFilter);
  andopt.push(dateFilter);
  andopt = _.concat(andopt, and);

  const optwhere = { where: { and: andopt } };

  const filter = _.assign({}, optwhere, { limit, order, skip });
  return `filter=${JSON.stringify(filter)}`
}


export default {

  namespace: 'companies',

  state: {
    activeCompanies: {}, // 报活数据表
    companies: {}, // 全体采购表
    query: {}, // 查询条件
    isBasic: false, // 基本查询 or 高级查询
    loading: false, // 控制加载状态
    hideSearchPanel: false,
    selectedRowKeys: [0],

    catalog: '',
    tabState: 'basic',
    subSelect: 'sub-basic',

    searchInfo: [],
    activityDate: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    },
    activityCurrent: {},
    filterOption: { //查询参数
      and: [],
      or: [],
      limit: 6,
      skip: 0,
      order: 'buy DESC',
    },
    current: 0, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("company setup");
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/company/:catalog?').exec(pathname);

        if (match) {
          dispatch({
            type: 'global/setCurrentType',
            payload: { catalogName: match[1] },
          });
          dispatch({
            type: 'setCatalog',
            payload: match[1],
          });
          dispatch({
            type: 'clearQuery',
          });
          dispatch({
            type: 'getCurrentType',
            payload: match[1],
          });
          dispatch({
            type: 'report/queryMonthly',
          });
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    * getCurrentItem({ payload: companyId }, { call, put }) {
      const { jsonResult: companyItem } = yield call(getCompany, companyId);
      if (companyItem) {
        yield put({
          type: 'setCurrentItem',
          payload: companyItem,
        });
        yield put({
          type: 'setTypeAndIndustry',
          payload: { company: companyItem },
        });
        yield put({
          type: 'orders/query',
          payload: companyId,
        });
        yield put({
          type: 'sns/query',
          payload: companyId,
        });
        yield put({
          type: 'companyMonthly/query',
          payload: companyId,
        });
        yield put({
          type: 'versionDaily/query',
          payload: companyId,
        });
      }
    },
    * setTypeAndIndustry({ payload }, { call, put, select }) {
      const { company } = payload;
      const catalogData = yield select(state => state.global.catalogData);
      const catalogName = yield select(state => state.companies.catalog);
      yield put({
        type: 'global/setCurrentType',
        payload: { catalogName },
      })
    },
    * updateCompany({ payload }, { call, put, select }) {
      try {
        const currentItem = yield select(state => state.companies.currentItem);
        const { jsonResult: company } =
          yield call(updateCompany, currentItem);
        if (company) {
          yield put({ type: 'getCurrentItem', payload: company.id });
        }
        return false
      } catch (error) {
        return false
      }
    },

    * query({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });

      const companies = yield select(state => state.companies);
      const global = yield select(state => state.global);
      const filterStr = assignFilter(companies, global.catalog);
      const { jsonResult: list } = yield call(query, filterStr);
      if (list.success) {
        yield put({
          type: 'listSuccess',
          payload: {
            companies: {
              list: list.data,
              total: list.total,
              current: list.current,
              activitytotal: list.activity_count,
            },
          },
        });
        if (list.data.length > 0) {
          yield put({
            type: 'getCurrentItem',
            payload: list.data[0].id,
          });
        }
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true, activityloading: true };
    },
    activity(state, action) {
      return { ...state, tabState: action.payload };
    },
    activitySuccess(state, action) {
      return { ...state, ...action.payload, activityloading: false };
    },
    listSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    setSelectedRowKeys(state, action) {
      return { ...state, ...action.payload };
    },
    updateFilter(state, action) {
      const { and, skip } = action.payload;
      const filter = u.updateIn('filterOption.and', and, state);
      return u.updateIn('filterOption.skip', skip, filter);
    },
    hideSearchPanel(state, action) {
      return { ...state, hideSearchPanel: action.payload };
    },
    clearQuery(state) {
      const filter = { //查询参数
        and: [],
        or: [],
        limit: 6,
        skip: 0,
        order: 'buy DESC',
      };
      return { ...state, filterOption: filter, searchInfo: [] }
    },

    setCatalog(state, action) {
      const filter = { //查询参数
        and: [],
        or: [],
        limit: 6,
        skip: 0,
        order: 'buy DESC',
      };
      return { ...state, catalog: action.payload, filterOption: filter };
    },

    basicPage(state, action) {
      const { limit, current } = action.payload;
      let { order } = action.payload;
      if (!order) order = state.filterOption.order
      const skip = (current - 1) * limit;
      return u.updateIn('filterOption', { limit, skip, order }, state);
    },
    setSubSelect(state, action) {
      return { ...state, ...action.payload }
    },
    setBasicSearch(state, action) {
      return { ...state, isBasic: action.payload };
    },
    setCurrentItem(state, action) {
      return { ...state, currentItem: action.payload };
    },
    setActivityCurrent(state, action) {
      return { ...state, activityCurrent: action.payload };
    },
    setSearchInfo(state, action) {
      return { ...state, searchInfo: action.payload };
    },
    changeFilterDate(state, action) {
      return { ...state, activityDate: action.payload };
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

    setCrrentType(state, action) {
      return { ...state, ...action.payload }
    },
    setCurrentIndustry(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
