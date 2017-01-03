export default {
  namespace: 'exportdata',
  state: {
    //控制查询条件模板显示和隐藏
    isDownData: false,
    //isDownFiles: false,
    //isStateShow: false,
    //控制steps流程的切换
    current: 0,
    //控制弹出框中steps流程切换
    selectCurrent: 0,
  },

  reducers: {
    changeDownload(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
