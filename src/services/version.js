import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const orders = {
  query : async (companyid , filter ) =>{
    return xFetch(`${apiUrl}/companies/${companyid}/versionMonthly?${filter}`)
  }
}
export default orders;
