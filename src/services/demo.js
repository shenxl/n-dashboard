import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const demo = {
  query : async (query) =>{
    return xFetch(`${apiUrl}/demos/`)
  },
}
export default demo;
