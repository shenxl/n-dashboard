import { query , queryActive ,getCompany } from '../services/companies';
var pathToRegexp = require('path-to-regexp');
var u = require('updeep');
var _ = require('lodash');

const date = new Date()

function assignFilter(filterOption , isActivity , activityDate ){
  let whereQuery = {}
  const { and , or , basic , active } =  filterOption;
  if(isActivity){
    const { limit, order , skip } = active;
    const { year , month } = activityDate;
    const dateArr =  _.concat(and,{year},{month});
    if(dateArr.length != 0){
      whereQuery = _.assign({ }, { and : dateArr } , whereQuery );
    }
    if(or.length != 0){
      whereQuery = _.assign({ }, { or : or } , whereQuery );
    }
    return _.assign({} , {where :  whereQuery} , {limit}, {order} ,  {skip} );
  }
  else{
    const {limit, order , skip } = basic;
    if(and.length != 0){
      whereQuery = _.assign({ }, { and : and } , whereQuery );
    }
    if(or.length != 0){
      whereQuery = _.assign({ }, { or : or } , whereQuery );
    }
    return _.assign({} , {where :  whereQuery} , {limit}, {order} ,  {skip} );
  }

}


export default {

  namespace: 'companies',

  state: {
     activeCompanies: {}, // 报活数据表
     companies: {}, // 全体采购表
     query : {}, // 查询条件
     isBasic : false , // 基本查询 or 高级查询
     loading: false, // 控制加载状态
     activityloading : false,
     catalog:"",
     isActivity:false,
     searchInfo:"",
     activityDate:{
       year : date.getFullYear(),
       month: date.getMonth() + 1
     },
     activityCurrent:{},
     filterOption :{ //查询参数
       and : [],
       or : [],
       active:{
         limit : 6,
         skip : 0,
         order : 'activity_sum DESC',
       },
       basic:{
         limit : 6,
         skip : 0,
         order : 'buy DESC',
       },

     },
     current: 0, // 当前分页信息
     currentItem: {}, // 当前操作的用户对象

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp(`/company/:catalog?`).exec(pathname);
        if (match) {
          dispatch({
            type: 'setCatalog',
            payload: match[1]
          });


          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    *getCurrentItem({ payload : companyId } , {call, put }){
      const { jsonResult : companyItem } = yield call(getCompany, companyId);
      if(companyItem){
          yield put({
            type:"setCurrentItem",
            payload : companyItem
          });

          yield put({
            type:"orders/query",
            payload : companyId
          });

          yield put({
            type:"sns/query",
            payload : companyId
          });
      }
    },

    *query({ payload }, {call, put, select }) {
      yield put({ type: 'showLoading' });

      const companies = yield select(state => state.companies);
      const filterOption = _.assign({} , companies.filterOption);
      const filter = assignFilter(filterOption);
      const queryStr = `type=${companies.catalog}&options=${JSON.stringify(filter)}`

      const { jsonResult : list } = yield call(query, queryStr);
      if (list) {
        yield put({
          type: 'listSuccess',
          payload: {
            companies: {
              list: list.data,
              total: list.page.total,
              current: list.page.current,
            }
          }
        });
        if(list.data.length > 0){
          yield put({
            type: 'getCurrentItem',
            payload: list.data[0].id
          });
        }

      }

      const activityfilter = assignFilter(filterOption , true , companies.activityDate);
      const activityqueryStr = `type=${companies.catalog}&options=${JSON.stringify(activityfilter)}`
      const { jsonResult: activity } = yield call(queryActive, activityqueryStr);
      if (activity) {
        yield put({
          type: 'activitySuccess',
          payload: {
            activeCompanies: {
              list: activity.data,
              total: activity.page.total,
              current: activity.page.current,
            }
          },
        });

        if(activity.data.length > 0){
          yield put({
            type: 'setActivityCurrent',
            payload: activity.data[0]
          });
        }
      }

    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true , activityloading: true };
    },
    activity(state , action) {
      return { ...state, isActivity:action.payload };
    },
    activitySuccess(state, action) {
      return { ...state, ...action.payload, activityloading: false };
    },
    listSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },

    updateFilter(state, action) {
      const { and , skip } = action.payload;
      let filter = u.updateIn('filterOption.and', and, state);
      filter = u.updateIn('filterOption.basic.skip', skip, filter);
      return u.updateIn('filterOption.active.skip', skip, filter);
    },

    setCatalog(state,action){

      const filter = { //查询参数
        and : [],
        or : [],
        active:{
          limit : 6,
          skip : 0,
          order : 'activity_sum DESC',
        },
        basic:{
          limit : 6,
          skip : 0,
          order : 'buy DESC',
        },
      };

      return { ...state, catalog : action.payload , filterOption: filter};
    },
    basicPage(state,action){
      let { limit , current , order } =  action.payload;
      if(!order) order = state.filterOption.basic.order
      const skip = (current - 1) * limit;
      return u.updateIn('filterOption.basic', { limit , skip , order }, state);
    },
    activityPage(state,action){
      let { limit , current ,order  } =  action.payload;
      if(!order) order = state.filterOption.active.order
      const skip = (current - 1) * limit;
      return u.updateIn('filterOption.active', { limit , skip , order }, state);
    },
    setBasicSearch(state,action){
      return { ...state, isBasic : action.payload};
    },
    setCurrentItem(state,action){
      return { ...state, currentItem : action.payload};
    },
    setActivityCurrent(state, action) {
      return { ...state, activityCurrent : action.payload};
    },
    setSearchInfo(state,action){
      return { ...state, searchInfo : action.payload };
    },
    changeFilterDate(state,action){
      return {...state , activityDate: action.payload };
    },

  },
}
