export default {
//定义一个全局名字，唯一
  namespace: 'importdata',
//初始数据状态
  state: {
    isDownShow: false,
    isUpShow: false,
    isStateShow: false,
    current: 0,
  },

  reducers: {
    changeDownload(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
