import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const auth = {
  login: async (email, password) => {
    const payload = {
        email,
        password
    };

    return xFetch(`${authUrl}/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify( payload ),
      })
  },

  logoutSer : async () => {
    return xFetch(`${authUrl}/logout`)
  },

  signup: async (singupInfo) => {
    const { email, password } = singupInfo;

    const payload = {
        email,
        password
    };

    return xFetch(`${apiUrl}/users`,
      {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body :  JSON.stringify( payload ) ,
      })
  },

  getCurrentUser : async () =>{
    return xFetch(`${authUrl}/session`)
  }
}
export default auth;
