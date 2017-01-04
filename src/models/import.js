export default {
  namespace: 'importData',
  state: {
    //控制导入数据的数据面板显示隐藏
    isDownShow: false,
    //控制steps流程的切换
    current: 0,
    selectCurrent: 0,
  },

  reducers: {
    changeDownload(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
