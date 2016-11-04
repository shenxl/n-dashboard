
const getUser = () => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    return token;
  }
  return undefined;
}

const Auth = {
  user : getUser,
}
export default Auth;//
