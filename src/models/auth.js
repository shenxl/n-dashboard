const u = require('updeep');
import { routerRedux } from 'dva/router';
import { login , signup ,getCurrentUser, logoutSer } from '../services/auth';
import { user } from '../utils/auth';
import { loginUrl , signupUrl , signSuccessUrl , UserInfoUrl } from '../utils/constant';
import { AuthError } from '../utils/ErrorMessage';
import { message } from 'antd';

message.config({
  top: 50,
  duration: 2,
});

function* authorize ({ email, password } , {call, put, take}) {
  yield put({ type: 'sendingRequest', sending: true })
  try {
    // todo : hash pwd with bcryptjs
    // let salt = genSalt(username)
    // let hash = hashSync(password, salt)
    const { jsonResult } = yield call(login, email, password);
    if (jsonResult.success) {
      return jsonResult.authorization
    }
    return false
  } catch (error) {
    message.error(AuthError[error.code]);
    localStorage.removeItem('n-token');
    return false
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: 'sendingRequest', sending: false })
  }
}

function* logout({ payload } , { call , put }){
  yield put({ type: 'sendingRequest', sending: true })
  try {
    let response = yield call(logoutSer)
    yield put({ type: 'sendingRequest', sending: false })
    // return response
  } catch (error) {
    yield put({ type: 'sendingRequest', sending: false })
    message.error(AuthError[error.code]);
  }
}

export default {

  namespace: 'auth',

  state: {
    currentlySending: false,
    isAuthenticating: false,
    isLogin:false,
    currentUser:{
      "realm": null,
      "username": null,
      "credentials": null,
      "challenges": null,
      "email": null,
      "emailVerified": null,
      "status": null,
      "created": null,
      "lastUpdated": null,
      "id": null,
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log("auth setup");
      history.listen(({ pathname }) => {
        // 判断是否需要用户信息才可以展示
        const path = [ loginUrl, signupUrl , signSuccessUrl ,UserInfoUrl ];
        if (path.indexOf(pathname) == -1) {
          dispatch({"type":"getCurrentUser" , "nextPath" : pathname});
        }
     });
    },
  },

  effects: {
    logoutFlow: [function*({ call, put, take } ) {
      //  let = effect;
      while (true) {
        const request = yield take('auth/logout')
        yield call(logout , { } ,  {call, put, take})
        yield put({ type: 'logoutSuccess', sending: false })
        localStorage.removeItem('n-token');
        yield put(routerRedux.push(loginUrl));
      }
    }, {
      type: 'watcher'
    }],

   loginFlow: [function*({ call, put, take, race } ) {
     while (true) {
       const request = yield take('auth/login');
       const {
         email,
         password,
         redirect
       } = request.data;

       const winner = yield race({
         auth: call(authorize, {
           email,
           password
         }, {call, put, take}),
         logout: take('auth/logout'),
       })

       if (winner.auth) {
         localStorage.setItem('n-token', winner.auth.id);
         yield put({"type":"getCurrentUser"});
         const redirectUrl = redirect.next || '/'
         yield put(routerRedux.push(redirectUrl));
       } else if (winner.logout) {
         yield put(routerRedux.push(loginUrl));
       }
     }
   }, {
     type: 'watcher'
   }],

   *signup ({ data : userinfo }, { put, call }) {
     try {
       //let response = yield call(auth.logout)
       const { jsonResult } = yield call(signup, userinfo);
       if( jsonResult.success ){
          yield put(routerRedux.push(signSuccessUrl));
       }
     } catch (error) {
       const { status } = error;
       if(status === 422){
         message.error(AuthError["EMAIL_EXISTS"]);
       }
     }
    },

    *getCurrentUser({ nextPath }, { call, put , select}) {
      try {
        const user = yield select(state => state.auth);
        if(!user.isLogin){
          const { jsonResult } = yield call(getCurrentUser);
          if(jsonResult.success){
            yield put({ type: 'setCurrentUser', payload: jsonResult.user })
            if(jsonResult.username === null){
              yield put(routerRedux.push(`${UserInfo}?next=${nextPath}`));
            }
          }
        }
      } catch (error) {
        // 如果getUser 失败，则清除 token， 跳转到登录页面
        localStorage.removeItem('n-token');
        yield put(routerRedux.push(`${loginUrl}?next=${nextPath}`));
        // console.log(error);
      }
    },
  },

  reducers: {
    login(state, action) {
      return u({
        isAuthenticating: true
      }, state)
    },
    loginSuccess(state,payload){
      return u({
        isAuthenticating: false,
        isLogin: true,
      }, state)
    },
    loginFailure(state,payload){
      return u({
        isAuthenticating: false,
        isLogin: false
      }, state)
    },
    sendingRequest(state, payload) {
      return u({
        currentlySending: payload.sending,
      }, state)
    },
    setCurrentUser( state , action ){
        return { ...state , currentUser : action.payload , isLogin:true } ;
    },
    logoutSuccess(state) {
      return u({
        isLogin: false,
        currentUser:{
          "realm": null,
          "username": null,
          "credentials": null,
          "challenges": null,
          "email": null,
          "emailVerified": null,
          "status": null,
          "created": null,
          "lastUpdated": null,
          "id": null,
        }
      }, state)
    },

  },

}
