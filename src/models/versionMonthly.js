import { query } from '../services/version';
var _ = require('lodash');

function formatFilter( query ){
  const { server_id, type , year , month } = query;
  console.log({ server_id, type , year , month });
  const optwhere =  { where: { and : [ { server_id },{ year } , {month}] } };
  return `filter=${JSON.stringify(optwhere)}`
}

export default {

  namespace: 'versionMonthly',
  state: {
    list : [],
    loading : false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log("versionMonthly setup");
    },
  },

  effects: {
    *query({ payload }, { call, put ,select  }) {
      yield put({ type: 'showLoading' });
      try {
          const { type : needCompany , query : queryStr } = payload;
          const companies = yield select(state => state.companies);
          const companyId = companies.currentItem.id;
          const filter = formatFilter(queryStr);
          const { type } = queryStr;
          console.log(filter);
          const { jsonResult : version } = yield call(query , companyId , filter);
          if(version){
            const result = _.chain(version).groupBy('version').map((keyItem) => {
            if (keyItem.length > 0) {
              return {
                server_id: keyItem[0].server_id,
                version: keyItem[0].version,
                year: keyItem[0].year,
                month: keyItem[0].month,
                value: _.sumBy(keyItem, (item) => {
                  if (type === 'install'){
                    return item.install_sum
                  } else {
                    return item.activity_sum
                  }
                })
              }
            }
          }).
          orderBy('value','desc').
          slice(0,8).
          filter((item) => { return item.value > 0 }).
          value();
          console.log(result);
          yield put({ type:'report/setVersion',
            payload: {
              version : result
            }
          })
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
