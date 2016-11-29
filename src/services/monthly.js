import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const monthly = {
  query : async (companyid) =>{
    return xFetch(`${apiUrl}/companies/${companyid}/companyMonthly`)
  },
  queryInnerData : async (company_id) =>{
    const andopt = [];
    andopt.push({ company_id });
    andopt.push({ server_id : 99 });
    const filter =  { where: { and : andopt } };
    return xFetch(`${apiUrl}/companyMonthlies?filter=${JSON.stringify(filter)}`)
  },
  queryInstallSum : async (company_id) =>{
    const andopt = [];
    andopt.push({ company_id });
    andopt.push({ server_id : 99 });
    const filter =  { where: { and : andopt } };
    return xFetch(`${apiUrl}/companyInstalls?filter=${JSON.stringify(filter)}`)
  },
  queryItem : async (query) =>{
    const andopt = [];
    const { company_id , server_id , year , month } = query;
    andopt.push({ company_id });
    andopt.push({ server_id });
    andopt.push({  year });
    andopt.push({ month });
    const filter =  { where: { and : andopt } };
    return xFetch(`${apiUrl}/companyMonthlies?filter=${JSON.stringify(filter)}`)
  },

  replaceOrCreate : async (currentItem) =>{
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(currentItem),
    };
    return xFetch(`${apiUrl}/companyMonthlies/replaceOrCreate`, options )
  },

  addInstallSum: async (currentItem) =>{
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(currentItem),
    };
    return xFetch(`${apiUrl}/companyInstalls/replaceOrCreate`, options )
  },

  deleteItem : async (query) =>{
    const andopt = [];
    const { company_id , server_id , year , month } = query;
    andopt.push({ company_id });
    andopt.push({ server_id : 99 });
    andopt.push({  year });
    andopt.push({ month });
    const filter =  { and : andopt } ;
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return xFetch(`${apiUrl}/companyMonthlies?where=${JSON.stringify(filter)}`,options )
  }
}
export default monthly;
