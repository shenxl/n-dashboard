import { getRegion , getCatalog } from '../services/global';
var pathToRegexp = require('path-to-regexp');
var _ = require('lodash');

const filterCatalog = (info , catalog) => {
  return _.chain(info).
    filter((item) => {
      return item.catalog === catalog
    }).
    map((item) => {
      return _.map(item.type, (type) => {
        return {
          value: type.name,
          label: type.name,
          children: _.chain(type.industry).map((industry) => {
            if(industry){
              return {
                value: industry,
                label: industry
              }
            }
          }).filter((item) => {return item}).value()
        }
      });
    }).head().value()
}

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
    LoadedCatalog : false,
    regionList : ["东北区","华北区","西北区","华南区","华东区","西南区"],
    catalog:{
      GOVERNMENT : ["政府","政府行业","部委"],
      ENTERPRISE : ["企业","地方国企","央企","港澳台企业"],
      FINANCE : ["金融"],
      NORMALIZATION  : ["常态化"]
    },
    GtypeOptions:[],
    EtypeOptions:[],
    FtypeOptions:[],
    addressOptions:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("global setup");
      history.listen(({ pathname }) => {
        dispatch({
          type: 'getProvince',
        });

        dispatch({
          type: 'getCatalog',
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

    *getCatalog({ payload }, {call, put, select }) {
      yield put({ type: 'sendRequest' });
      const global = yield select(state => state.global);
      if (!global.LoadedCatalog) {
        const { jsonResult: catalog } = yield call(getCatalog);
        if(catalog){
          yield put({
            type : 'loadCatalog',
            payload : catalog
          });

          yield put({
            type : 'fristLoadCatalog'
          });

        }
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

    fristLoadCatalog(state) {
      return { ...state, LoadedCatalog: true };
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

    loadCatalog(state,action){
      const catalogEntity = action.payload;
      const info = _.chain(catalogEntity).
        groupBy('catalog').
        map((item, ckey) => {
          return {
            catalog: ckey,
            type: _.chain(item).groupBy('type').map(
              (titem, tkey) => {
                return {
                  name: tkey,
                  industry: _.map(titem, (item) => {
                    return item.industry
                  }),
                }
              }).value()
          }
        }).
        value();

      let catalog = _.reduce(info, (init, item) => {
        return _.assign(init, {
          [item.catalog]: _.map(item.type, (o) => {
            return o.name
          })
        })
      }, {});

      let GtypeOptions = filterCatalog(info , 'GOVERNMENT');
      let EtypeOptions = filterCatalog(info ,'ENTERPRISE');
      let FtypeOptions = filterCatalog(info ,'FINANCE');

      return {...state, catalog, GtypeOptions, EtypeOptions, FtypeOptions };

    },

    setAddressOptions(state,action){
      let addressOptions = state.addressOptions || [];
      let childrenObj = {};
      let tmpObj = {};
      switch (action.payload.opt) {
        case "province":
          addressOptions = _.map( _.concat(addressOptions , state.province), (item) => {
            return {
              value : item.ID,
              label : item.Name,
              pinyin : item.Pinyin
            }
          })
          break;
        case "city":
          const provinceId = action.payload.provinceId
          const provinceObj = _.find(addressOptions, (province) => { return province.value === provinceId });
          if(provinceObj && !provinceObj.children){
            tmpObj = _.map(state.city, (item) => {
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
          const cityObj = _.forEach(addressOptions, (province) => {
            if(province && province.children){
              const findObj = _.find(province.children, (city) => { return city.value === cityId });
              if(findObj && !findObj.children){
                tmpObj =  _.map(state.country, (item) => {
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
