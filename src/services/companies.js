import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const companies = {
  query : async (query) =>{
    return xFetch(`${apiUrl}/companies/catalog?${query}`)
  },
  queryActive :  async (query) =>{
    return xFetch(`${apiUrl}/companyActivities/catalog?${query}`)
  },
  getCompany :  async (companyId) =>{
    return xFetch(`${apiUrl}/companies/${companyId}`)
  },

}
export default companies;
