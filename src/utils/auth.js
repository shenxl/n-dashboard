/*global localStorage*/

const getUser = () => {
  const token = localStorage.getItem('n-token');
  if (token !== null) {
    return token;
  }
  return undefined;
}

const Auth = {
  user: getUser,
}
export default Auth;//
