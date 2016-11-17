import { query4Monthly , query4Version } from '../services/report';


function assignFilter(companies , catalogType){
  const { filterOption ,catalog ,  activityDate} = companies;
  let typeFilter  = {
    type : {
        inq : (catalogType && catalogType[catalog.toLocaleUpperCase()]) || catalogType["GOVERNMENT"]
      }
  }
  const { and , or } =  filterOption;
  // TODO: or for 自定义查询

  const optwhere =  { where: { and : _.concat([typeFilter] , and ) } };

  const filter = _.assign({}, optwhere );
  return `filter=${JSON.stringify(filter)}`
}

function assignVersionFilter(companies , catalogType , query ){
  const { server_id, type , year , month } = query;
  const { filterOption ,catalog ,  activityDate} = companies;
  let typeFilter  = {
    type : {
        inq : (catalogType && catalogType[catalog.toLocaleUpperCase()]) || catalogType["GOVERNMENT"]
      }
  }
  let andfilter = [];
  const { and , or } =  filterOption;
  // TODO: or for 自定义查询

  const optwhere =  { where: { and : _.concat([typeFilter , { server_id },{ year } , {month}] , and ) } };

  const filter = _.assign({}, optwhere );
  console.log(filter);
  return `filter=${JSON.stringify(filter)}&type=${type}`
}

export default {

  namespace: 'report',

  state: {
    loading : false,
    versionLoading:false,
    versionTitle:'请点击[数据分析]以获取版本信息',
    monthly : [],
    version : []
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *queryMonthly({ payload }, { call, put ,select }) {
      yield put({ type: 'showLoading' });
      const companies = yield select(state => state.companies);
      const global = yield select(state => state.global);
      const filterStr = assignFilter(companies , global.catalog);
      try {
        const { jsonResult:monthly } = yield call(query4Monthly,filterStr);
        if(monthly.success){
          yield put({
            type: 'monthlySuccess',
            payload: {
              monthly : monthly.data
            }
          });
        }
      } catch (error) {

      }
    },

    *getVersion({ payload } , { call, put ,select }) {
      yield put({ type: 'showPieLoading' });
      const companies = yield select(state => state.companies);
      const global = yield select(state => state.global);
      const filterStr = assignVersionFilter(companies , global.catalog , payload);
      try {
        const { jsonResult : version } = yield call(query4Version,filterStr);
        if(version.success){
          yield put({
            type: 'versionSuccess',
            payload: {
              version : version.data
            }
          });
        }
      } catch (error) {

      }
    },

    *setVersionTitle({ payload } , {  put ,select }) {
      const { type , versionTitle : title } = payload;
      if(type && type === 'single'){
        const companies = yield select(state => state.companies);
        const  versionTitle = companies.currentItem.name + title
        yield put({
          type: 'setTitle',
          payload: {
            versionTitle
          }
        })
      }else {
        yield put({
          type: 'setTitle',
          payload: {
            versionTitle : title
          }
        })
      }
    }
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    showPieLoading(state) {
      return { ...state, versionLoading: true };
    },
    setVersion(state,action){
      return { ...state, ...action.payload};
    },
    monthlySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    versionSuccess(state, action) {
      return { ...state, ...action.payload, versionLoading: false };
    },
    setTitle(state,action){
      return { ...state, ...action.payload};
    }
  },

}
