
const apiversion = 'v2';
const Constant = {
  // apiUrl: 'http://120.92.18.39/v2/api',
  // authUrl: 'http://120.92.18.39/v2/auth',
  apiversion,
  apiUrl: `http://localhost:3000/api/${apiversion}`,
  authUrl: 'http://localhost:3000/auth',
  loginUrl: '/pass/login',
  signupUrl: '/pass/signup',
  signSuccessUrl: '/pass/signsuccess',
  UserInfoUrl: '/user/info',
  emailAddonAfter: 'kingsoft.com',

  importFolder: 'importContainers',
  exportFolder: 'exportContainers',

}
export default Constant;//
