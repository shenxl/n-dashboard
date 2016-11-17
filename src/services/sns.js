import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const sns = {
  query : async (companyid) =>{
      return xFetch(`${apiUrl}/companies/${companyid}/sn`)
  },
  findOne : async (sn) =>{
    const filter = {"where" : {"sn" :`${sn}` }}
    // console.log(filter);
    return xFetch(`${apiUrl}/companySns/findOne?filter=${JSON.stringify(filter)}`)
  },
  add: async (payload) =>{

    const { companyId, sn } = payload ;

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify( { company_id : companyId , sn : sn} ),
    };

    return xFetch(`${apiUrl}/companySns`,options);
  },
  remove : async (payload) =>{
    const { companyId, id } = payload ;
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return xFetch(`${apiUrl}/companySns/${id}`,options);
  },
  edit : async (payload) =>{
    const { id, companyId, sn } = payload ;
    const options = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify( { company_id : companyId , sn : sn} ),
    };

    return xFetch(`${apiUrl}/companySns/${id}`,options);
  },

}
export default sns;
