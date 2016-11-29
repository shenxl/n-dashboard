import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const companies = {
  query : async (query) =>{
    return xFetch(`${apiUrl}/companyViewers/getRecord?${query}`)
  },
  queryActive :  async (query) =>{
    return xFetch(`${apiUrl}/companyActivities/catalog?${query}`)
  },
  getCompany :  async (companyId) =>{
    return xFetch(`${apiUrl}/companies/${companyId}`)
  },
  updateCompany: async (updateAttributes) =>{
    const options = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(updateAttributes),
    };
    return xFetch(`${apiUrl}/companies/`,options);

 },

}
export default companies;
