import xFetch from '../utils/xFetch';
import { apiUrl, authUrl } from '../utils/constant'

const example = {
  query: async (query) => {
    return xFetch(`${authUrl}/test`);
  },
}
export default example;
