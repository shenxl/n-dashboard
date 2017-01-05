import { exportDetails, exportSummy } from '../services/exportData';

const _ = require('lodash');
const json2csv = require('json2csv');
/*global document URL Blob*/
const convertName = (exportData, isDetails) => {
  const { selectedCustomerType, checkAll, date } = exportData;
  const { start, end } = date;
  let result;
  if (checkAll) {
    result = '所有用户'
  } else {
    result = `${selectedCustomerType.join('_')}用户`;
  }
  if (start.year === end.year && start.month === end.month) {
    result += `(${start.year}年${start.month})`
  } else {
    result += `(${start.year}年${start.month}月至${end.year}年${end.month}月)`
  }
  if (isDetails) {
    result += '数据明细表'
  } else {
    result += '数据汇总表'
  }
  return result;
}
const assignFilter = (exportData) => {
  const { selectedCustomerType, catalogList, checkAll, date, isDetails } = exportData;
  let typeFilter;
  let dateFilter;
  if (!checkAll) {
    typeFilter = {
      type: {
        inq: _.flattenDeep(selectedCustomerType.map((item) => {
          return _.flattenDeep(catalogList.map((catalog) => {
            if (catalog.key === item) {
              return catalog.value
            }
            return []
          }));
        })),
      },
    }
  }
  const { start, end } = date;
  if (start.year === end.year && start.month === end.month) {
    dateFilter = { and: [
      { year: start.year },
      { month: start.month },
    ] }
  } else if (end.year === start.year && end.month > start.month) {
    dateFilter = { and: [
      { year: start.year },
      { month: { between: [start.month, end.month] } },
    ] }
  } else if (end.year - start.year === 1) {
    dateFilter = { or: [
      { and: [{ year: start.year }, { month: { between: [start.month, 12] } }] },
      { and: [{ year: end.year }, { month: { between: [1, end.month] } }] },
    ] }
  } else if (end.year - start.year > 1) {
    dateFilter = { or: [
      { year: { between: [start.year + 1, end.year - 1] } },
      { and: [{ year: start.year }, { month: { between: [start.month, 12] } }] },
      { and: [{ year: end.year }, { month: { between: [1, end.month] } }] },
    ] }
  }
  const andopt = [];
  if (dateFilter) andopt.push(dateFilter);
  if (typeFilter) andopt.push(typeFilter);
  const optwhere = { where: { and: andopt } };
  const filter = _.assign({}, optwhere);

  return `filter=${JSON.stringify(filter)}`
}

const convert4JSONToCSV = (JSONData, queryFields, isDetails) => {
  let convertRefres;
  if (isDetails) {
    convertRefres = (row, field, data) => {
      switch (row.server_id) {
        case 2:
          return '外网数据'
        case 3:
          return '外网数据(09版本)'
        case 99:
          return '内网数据(手动录入)'
        case 100:
          return '常态化数据'
        default:
          return '未知来源'
      }
    };
  } else {
    convertRefres = (row, field, data) => {
      switch (row.server_token) {
        case 2:
          return '外网数据'
        case 3:
          return '外网数据(09版本)'
        case 5:
          return '外网数据、外网数据(09版本)'
        case 99:
          return '内网数据(手动录入)'
        case 101:
          return '外网数据、内网数据(手动录入)'
        case 102:
          return '外网数据(09版本)、内网数据(手动录入)'
        case 104:
          return '外网数据、外网数据(09版本)、内网数据(手动录入)'
        case 100:
          return '常态化数据'
        default:
          return '未知来源'
      }
    }
  }
  const fields = [
    {
      label: '客户名称',
      value: 'name',
    },
    {
      label: '区域',
      value: 'region',
    },
    {
      label: '省',
      value: 'province',
    },
    {
      label: '市',
      value: 'city',
    },
    {
      label: '区/县',
      value: 'county',
    },
    {
      label: '市',
      value: 'city',
    },
    {
      label: '行业',
      value: 'type',
    },
    {
      label: '子行业',
      value: 'industry',
    },
    {
      label: '采购量',
      value: 'buy',
    },
    {
      label: '月',
      value: 'month',
    },
    {
      label: '年',
      value: 'year',
    },
    {
      label: '月',
      value: 'month',
    },
    {
      label: '当月报活',
      value: 'activity_sum',
      default: '暂无记录',
    },
    {
      label: '当月日活均值',
      value: 'activity_avg',
      default: '暂无记录',
    },
    {
      label: '当月安装量',
      value: 'install_sum',
      default: '暂无记录',
    },
    {
      label: '数据来源',
      value: convertRefres,
    },
  ]
  json2csv({ data: JSONData, fields }, (err, csv) => {
    if (err) console.error(err);
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    if (Blob !== undefined) {
      const blob = new Blob([csv], { type: 'text/csv' });
      link.setAttribute('href', URL.createObjectURL(blob));
    } else {
      link.setAttribute('href', `data:text/csv;charset=utf-8,\uFEFF${encodeURIComponent(csv)}`);
    }
    link.setAttribute('download', `${queryFields}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

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
    catalogList: [{
      key: '政府',
      value: ['政府', '政府行业', '部委'],
    },
    {
      key: '企业',
      value: ['企业', '地方国企', '央企', '港澳台企业'],
    },
    {
      key: '金融',
      value: ['金融'],
    },

    {
      key: '常态化',
      value: ['常态化'],
    }],
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
    * ExportReport({ payload }, { call, put, select }) {
      // console.log("In ti" );
      try {
        const isDetails = payload.isDetails
        const exportState = yield select(state => state.exportData);
        const query = assignFilter(exportState);
        const tableName = convertName(exportState, isDetails);
        if (isDetails) {
          const { jsonResult: detailsData } = yield call(exportDetails, query);
          if (detailsData) {
            convert4JSONToCSV(detailsData, tableName, isDetails);
          }
        } else {
          const { jsonResult: summyData } = yield call(exportSummy, query);
          if (summyData) {
            convert4JSONToCSV(summyData, tableName, isDetails);
          }
        }

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
