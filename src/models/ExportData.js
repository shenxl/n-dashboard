export default {
  namespace: 'exportdata',
  state: {
    //控制数据导出的数据面板显示隐藏
    isDownData: false,
    //控制数据导出的上传文件面板显示隐藏
    isDownFiles: false,
    //控制数据导出的文件完成状态面板显示隐藏
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
