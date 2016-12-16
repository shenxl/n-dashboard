import xFetch from '../utils/xFetch';
import { apiUrl, authUrl } from '../utils/constant'

const report = {
  query4Monthly: async (query) => {
    return xFetch(`${apiUrl}/companyMonthlyReports/data?${query}`)
  },
  query4Version: async (query) => {
    return xFetch(`${apiUrl}/companyVersionReports/data?${query}`)
  },
}
export default report;
