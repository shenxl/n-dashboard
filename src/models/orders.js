import { query , createOrder , editOrder} from '../services/orders';
var _ = require('lodash');

const dealWithCurrent = (current , company_id) => {
  const dealItem = {};
   _.forIn(current , ( value , key ) => {
    if(value.name){
      dealItem[key] = value.value
    }
  });
  _.assign(dealItem, {company_id : company_id})
  return dealItem;
}

export default {

  namespace: 'orders',

  state: {
    list : [],
    emptyItem:
    {
      id: undefined,
      company_id: undefined,
      group_id: undefined,
      sns: undefined,
      order_number: undefined,
      order_type:undefined,
      order_area: undefined,
      order_name: undefined,
      authorization_years: undefined,
      authorization_date: undefined,
      length_of_service: undefined,
      service_date: undefined,
      after_authorization: undefined,
      prediction: undefined,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined
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
        const { jsonResult : orders } = yield call(query , companyid );
        if(orders){
          yield put({ type: 'getSuccess'  , payload :{
            list : orders
          }});
        }
        return false
      } catch (error) {
        return false
      }
    },
    *create({ payload : companyid } , {call , put , select }){
      try {
        const currentItem = yield select(state => state.orders.currentItem);
        const { jsonResult : orders } =
          yield call(createOrder , dealWithCurrent(currentItem, companyid));
        if(orders){
          yield put({ type: 'query' , payload : companyid });
        }
        yield put({ type: 'clearModalState'});
        return false
      } catch (error) {
        return false
      }
    },
    *edit({ payload : companyid } , {call , put , select }){
      try {
        const currentItem = yield select(state => state.orders.currentItem);

        const { jsonResult : orders } =
          yield call(editOrder ,currentItem.id.value, dealWithCurrent(currentItem , companyid));
        if(orders){
            yield put({ type: 'query' , payload : companyid });
        }
        yield put({ type: 'clearModalState'});
        return false
      } catch (error) {
        return false
      }
    }

  },

  reducers: {
    showLoading(state, action) {
      return { ...state, loading:true };
    },
    getSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    setCurrentItem(state, action){
      const orderid = action.payload;
      const current = _.assign({} ,
        _.find(state.list , (item) => {return item.id ===  orderid}) || state.emptyItem);

      const currentItem = _.forIn(current , ( value , key ) => {
        return current[key] = {
              "value" : value
            }
      });

      return { ...state, currentItem : currentItem }
    },
    setModalState(state, action){
      return { ...state,  ...action.payload }
    },
    updateCurrentItem(state, action){
      return { ...state , currentItem : { ...state.currentItem , ...action.payload}  }
    },
    clearModalState(state) {
      const currentItem = _.forIn(state.currentItem , ( value , key ) => {
        return state.currentItem[key] = {
              "value" : undefined
            }
      });

      return { ...state,
        modalVisibel: false ,
        modalMode:"" ,
        currentItem : currentItem }
    }
  },

}
