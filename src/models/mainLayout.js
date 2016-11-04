

export default {
  namespace: 'mainLayout',
  state: {
    collapse : true,
    menuMode : 'vertical' ,
    showMenu : true ,
  },
  reducers: {
    collapseMenu(state, action) {
      return { ...state, collapse: action.payload };
    },
    changeMenu(state , action ){
      return { ...state , menuMode : action.payload } ;
    },
    showMenu(state ){
      return { ...state , showMenu : true } ;
    },
    hideMenu(state){
      return { ...state , showMenu : false } ;
    }

  },

};
