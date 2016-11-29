import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'
const global = {
  getRegion : async (parentId) =>{
    return xFetch(`${apiUrl}/globalRegions/${parentId}/region`)
  },
  getCatalog : async () =>{
    return xFetch(`${apiUrl}/companyCatalogs`)
  },
  getAllRegion : async () => {
    const fields =  {
      fields: {
        ID: true,
        Name: true,
        ParentId: true,
        LevelType: true,
        Pinyin: true
      }
    }
    return xFetch(`${apiUrl}/globalRegions?filter=${JSON.stringify(fields)}`)
  }

}
export default global;
