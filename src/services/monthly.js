import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const orders = {
  query : async (companyid) =>{
    return xFetch(`${apiUrl}/companies/${companyid}/companyMonthly`)
  }
}
export default orders;
