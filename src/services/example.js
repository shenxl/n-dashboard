import xFetch from '../utils/xFetch';
import { apiUrl , authUrl } from '../utils/constant'

export async function query() {
  // console.log("in query");
  return xFetch(`${authUrl}/test`);
}
