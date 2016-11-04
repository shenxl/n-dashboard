import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const orders = {
  query : async (companyid) =>{
    return xFetch(`${apiUrl}/companies/${companyid}/order`)
  },

  createOrder: async (createAttributes) => {
    console.log(createAttributes);
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(createAttributes),
    };
    return xFetch(`${apiUrl}/companyOrders`, options );
  },

   editOrder: async (id,updateAttributes) =>{
     console.log(updateAttributes);
     const options = {
       method: "PUT",
       headers: {
         'Content-Type': 'application/json',
       },
       body : JSON.stringify(updateAttributes),
     };
     return xFetch(`${apiUrl}/companyOrders/${id}`,options);

  },
}
export default orders;
