
import { loginUrl, signupUrl, signSuccessUrl } from '../utils/constant';

export default {
  namespace: 'authLayout',
  state: {
    title: '',
  },
  reducers: {
    setTitle(state, action) {
      return { ...state, title: action.payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("authLayout setup");
      history.listen(({ pathname }) => {
        switch (pathname) {
          case loginUrl:
            dispatch({
              type: 'setTitle',
              payload: '登陆页面',
            });
            dispatch({
              type: 'mainLayout/hideMenu',
            });
            break;
          case signupUrl:
            dispatch({
              type: 'setTitle',
              payload: '注册页面',
            });
            dispatch({
              type: 'mainLayout/hideMenu',
            });
            break;
          case signSuccessUrl:
            dispatch({
              type: 'setTitle',
              payload: '恭喜您！',
            });
            dispatch({
              type: 'mainLayout/hideMenu',
            });
            break;
          default:
            dispatch({
              type: 'mainLayout/showMenu',
            });
            break;
        }
      });
    },
  },

}
