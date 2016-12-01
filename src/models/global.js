import { getAllRegion , getRegion , getCatalog  } from '../services/global';
var pathToRegexp = require('path-to-regexp');
import { getRegionData , setRegionData } from '../utils/globalUtils'
var _ = require('lodash');

const filterCatalog = (info , catalog) => {
  const result =  _.chain(info).
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
   return result || [];
}

export default {

  namespace: 'global',

  state: {
    data:[],
    catalogName : 'GOVERNMENT',
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
    catalogData:[],
    currentTypeOptions:[],
    addressOptions:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("global setup");
      history.listen(({ pathname }) => {

        dispatch({
          type: 'getAllRegion',
        });

        dispatch({
          type: 'getCatalog',
        });
      });
    },
  },

  effects: {
    *getAllRegion({ payload } , {call , put , select }){
      yield put({ type: 'sendRequest' });
      let cacheData = getRegionData();
      if(!cacheData) {
          const { jsonResult : data } = yield call(getAllRegion);
          if(data) {
            cacheData = data;
            setRegionData(cacheData);
          }
        }

        const province = _.filter(cacheData, (item) => {
          return item.LevelType === 1
        });
        let addressOptions = _.map(_.concat([], province), (item) => {
          return {
            value: item.ID,
            label: item.Name,
            pinyin: item.Pinyin
          }
        });
        addressOptions = _.map(addressOptions, (province) => {
          const city = _.filter(cacheData, (item) => {
            return item.ParentId === province.value
          });
          let cityObj = _.map(city, (item) => {
            return {
              value: item.ID,
              label: item.Name,
              pinyin: item.Pinyin
            }
          });
          cityObj = _.map(cityObj, (city) => {
            const country = _.filter(cacheData, (item) => {
              return item.ParentId === city.value
            });
            let countryObj = _.map(country, (item) => {
              return {
                value: item.ID,
                label: item.Name,
                pinyin: item.Pinyin
              }
            });
            const countryExtend = _.concat([{
              value: -100,
              label: "市直",
              pinyin: "shizhi"
            }], countryObj);
            return _.assign(city, {
              children: countryExtend
            });
          })
          const cityExtend = _.concat([{
            value: -10,
            label: "省直",
            pinyin: "shengzhi"
          }], cityObj);
          return _.assign(province, {
            children: cityExtend
          });
        });
        yield put({
          type: 'setAddressOptions',
          payload: {
            addressOptions
          }
        })
    },

    *setAddressItem({ payload } , { call , put , select }){
      const data = getRegionData();
      const { selectValue } = payload;
      const selectProps = { provinceItem : {} , cityItem: {} , countryItem : {}};
      _.forEach(selectValue,(item) => {
        const selectItem = _.head(_.filter(data , (select) => { return select.ID === item}));
        if(selectItem && selectItem.LevelType){
          switch (selectItem.LevelType) {
            case 1:
              _.assign(selectProps , { provinceItem : selectItem } , { cityItem : {} } ,  { countryItem : {} }) ;
              break;
            case 2:
              _.assign(selectProps , { cityItem : selectItem } , { countryItem : {} }) ;
              break;
            case 3:
              _.assign(selectProps , { countryItem : selectItem }) ;
              break;
            default:
          }
        }
        if(item === -10){
          _.assign(selectProps ,   { cityItem : {
              ID: -10,
              Name: "省直",
              pinyin: "shengzhi"
            } }) ;
        } else if (item === -100){
          _.assign(selectProps ,   { countryItem : {
              ID: -100,
              Name: "市直",
              pinyin: "shizhi"
          } }) ;
        }
      })
      yield put({ type: 'updateAddressItem', payload : selectProps });
    },

    *getCatalog({ payload }, {call, put, select }) {
      yield put({ type: 'sendRequest' });
      const global = yield select(state => state.global);
      if (!global.LoadedCatalog) {
        const { jsonResult: catalog } = yield call(getCatalog);
        if(catalog){
          yield put({
            type : 'setCatalogData',
            payload : { catalogData : catalog }
          });

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
    setCatalogData(state,action){
      return { ...state, ...action.payload };
    },
    setAddressOptions(state,action){
      return { ...state, ...action.payload };
    },
    updateAddressItem(state, action) {
      return { ...state, ...action.payload };
    },
    setCatalogName(state , action){
      return {...state , ...action.payload  }
    },

    fristLoadCatalog(state) {
      return { ...state, LoadedCatalog: true };
    },

    loadCatalog(state,action){
      const catalogEntity = action.payload;
      const catalogName = state.catalogName;

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

      const currentTypeOptions = filterCatalog(info , _.toUpper(catalogName)) ;
      return {...state, catalog, catalogInfo : info , currentTypeOptions };
    },

    setCurrentType(state , action ){
      const { catalogName } = action.payload;
      const info = state.catalogInfo;
      const currentTypeOptions = filterCatalog(info , _.toUpper(catalogName));
      return {...state, currentTypeOptions };
    }

  },
}
