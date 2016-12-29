export default {
  namespace: 'importdata',
  state: {
    //控制导入数据的数据面板显示隐藏
    isDownShow: true,
    //控制导入数据的上传文件面板显示隐藏
    isUpShow: false,
    //控制导入数据的文件完成状态面板显示隐藏
    isStateShow: false,
    //控制steps流程的切换
    current: 0,
  },

  reducers: {
    changeDownload(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
