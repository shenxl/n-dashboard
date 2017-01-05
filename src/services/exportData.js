import xFetch from '../utils/xFetch';
import { apiUrl, authUrl } from '../utils/constant'

const companies = {
  exportSummy: async (query) => {
    return xFetch(`${apiUrl}/companyViewers?${query}`)
  },
  exportDetails: async (query) => {
    return xFetch(`${apiUrl}/companyExports?${query}`)
  },
}
export default companies;
