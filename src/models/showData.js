export default {
  namespace: 'showdata',
  state: {
    showDataVisibel: false,
  },
  reducers: {
    setModalState(state, action) {
      return { ...state, ...action.payload }
    },
    clearModalState(state) {
      return { ...state,
        showDataVisibel: false,
      }
    },
  },
};
