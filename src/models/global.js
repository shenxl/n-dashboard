import { getRegion } from '../services/global';
var pathToRegexp = require('path-to-regexp');
var _ = require('lodash');

export default {

  namespace: 'global',

  state: {
    province:[],
    city:[],
    country:[],
    provinceItem:{},
    cityItem:{},
    countryItem:{},
    requesting : false,
    LoadedProvice : false,
    regionList : ["东北区","华北区","西北区","华南区","华东区","西南区"],
    GtypeOptions:[{
      value: '政府',
      label: '政府',
      children: [
        {
          value: '所有',
          label: '所有',
        }, {
          value: '其他',
          label: '其他',
        },{
          value: '审计',
          label: '审计',
        }]
      },
      {
        value: '政府行业',
        label: '政府行业',
        children: [
          {
            value: '所有',
            label: '所有',
          }, {
            value: '公安',
            label: '公安',
          },{
            value: '审计',
            label: '审计',
          },{
            value: '其他',
            label: '其他',
          },{
            value: '检察院',
            label: '检察院',
          },{
            value: '法院',
            label: '法院',
          },{
            value: '税务',
            label: '税务',
          },
        ]
      },
      {
        value: '部委',
        label: '部委',
        children: [
          {
            value: '所有',
            label: '所有',
          },{
            value: '公安',
            label: '公安',
          },{
            value: '审计',
            label: '审计',
          },{
            value: '检察院',
            label: '检察院',
          },{
            value: '法院',
            label: '法院',
          },{
            value: '税务',
            label: '税务',
          },
        ]
      },
    ],
    EtypeOptions:[{
      value: '地方国企',
      label: '地方国企',
      children: [
        {
          value: '地方国企',
          label: '地方国企',
        }]
      },
      {
        value: '企业',
        label: '企业',
        children: [
          {
            value: '所有',
            label: '所有',
          },
          {
            value: '其他',
            label: '其他',
          },
          {
            value: '商业',
            label: '商业',
          },]
        },
        {
          value: '央企',
          label: '央企',
          children: [
            {
              value: '所有',
              label: '所有',
            },
            {
              value: '其他',
              label: '其他',
            },
            {
              value: '建筑设计',
              label: '建筑设计',
            },
            {
              value: '电力',
              label: '电力',
            },
            {
              value: '建筑设计',
              label: '建筑设计',
            },
            {
              value: '能源',
              label: '能源',
            },]
          }
    ],
    FtypeOptions:[{
      value: '金融',
      label: '金融',
      children: [
        {
          value: '所有',
          label: '所有',
        }, {
          value: '保险',
          label: '保险',
        },{
          value: '证券',
          label: '证券',
        },{
          value: '银行',
          label: '银行',
        },{
          value: '其他',
          label: '其他',
        }]
      }
    ],

    addressOptions:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        dispatch({
          type: 'getProvince',
        });
      });
    },
  },

  effects: {
    *getProvince({ payload }, {call, put, select }) {
      yield put({ type: 'sendRequest' });
      const global = yield select(state => state.global);
      if (!global.LoadedProvice) {
        const chinaId = 100000
        const { jsonResult: province } = yield call(getRegion, chinaId);
        if (province) {
          yield put({
            type: 'fristLoadedProvince',
          });
          yield put({
            type: 'setProvince',
            payload: {
              province
            },
          });
          yield put({
            type: 'setAddressOptions',
            payload:{
              opt: "province"
            },
          });
        }
      }
    },

    *getCity({ payload }, {call, put, select }) {
      yield put({ type: 'sendRequest' });
      const { jsonResult: city } = yield call(getRegion, payload.provinceId);
      if (city) {
        yield put({
          type: 'setCity',
          payload: {
            city
          },
        });
        yield put({
          type: 'setAddressOptions',
          payload:{
            opt: "city",
            provinceId : payload.provinceId
          },
        });
      }
    },

    *getCountry({ payload }, {call, put, select }) {
      yield put({ type: 'sendRequest' });
      const { jsonResult: country } = yield call(getRegion, payload.cityId);
      if (country) {
        yield put({
          type: 'setCountry',
          payload: {
            country
          },
        });

        yield put({
          type: 'setAddressOptions',
          payload:{
            opt: "country",
            cityId : payload.cityId
          },
        });
      }
    },
  },

  reducers: {
    sendRequest(state) {
      return { ...state, requesting: true };
    },
    fristLoadedProvince(state) {
      return { ...state, LoadedProvice: true };
    },
    setProvince(state, action) {
      return { ...state, ...action.payload, requesting: false };
    },
    setProvinceItem(state, action) {
      return { ...state, provinceItem : action.payload };
    },
    setCity(state, action) {
      return { ...state, ...action.payload, requesting: false };
    },
    setCityItem(state, action) {
      return { ...state, cityItem : action.payload };
    },
    setCountry(state, action) {
      return { ...state, ...action.payload, requesting: false };
    },
    setCountryItem(state, action) {
      return { ...state, countryItem : action.payload };
    },
    setAddressOptions(state,action){
      let addressOptions = state.addressOptions || [];
      let childrenObj = {};
      let tmpObj = {};
      switch (action.payload.opt) {
        case "province":
          addressOptions = _.map( _.concat(addressOptions , state.province), function(item){
            return {
              value : item.ID,
              label : item.Name,
              pinyin : item.Pinyin
            }
          })
          break;
        case "city":
          const provinceId = action.payload.provinceId
          const provinceObj = _.find(addressOptions, function(province) { return province.value === provinceId });
          if(provinceObj && !provinceObj.children){
            tmpObj = _.map(state.city, function(item){
              return {
                value : item.ID,
                label : item.Name,
                pinyin : item.Pinyin
              }
            });
            tmpObj = _.concat([{value : 0 , label : "省直"}], tmpObj);
            childrenObj = { children : tmpObj }
            _.assign(provinceObj, childrenObj);
          }
          break;
        case "country":
          const cityId = action.payload.cityId

          const cityObj = _.forEach(addressOptions, function(province){
            if(province && province.children){
              const findObj = _.find(province.children, function(city) { return city.value === cityId });
              if(findObj && !findObj.children){
                tmpObj =  _.map(state.country, function(item){
                  return {
                    value : item.ID,
                    label : item.Name,
                    pinyin : item.Pinyin
                  }
                });
                tmpObj = _.concat([{value : 0 , label : "市直"}], tmpObj);
                childrenObj = { children : tmpObj }
                _.assign(findObj, childrenObj);
              }
            }
          })
          break;
        default:
      }
      return { ...state , addressOptions : addressOptions}
    }
  },
}
