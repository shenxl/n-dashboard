import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const errorMessages = res => `${res.status} ${res.statusText}`;


function check401(res) {
  if (res.status === 401) {
    localStorage.removeItem('n-token');
    location.href = '/login';
    location.reload()
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    var error = new Error(res.statusText);
    error.res = res;
    throw error;
  }
  return res;
}

function jsonParse(res) {
  const data = res.json().then(jsonResult => ({ ...res,
    jsonResult,
  }));
  return data;
}

function errorMessageParse(res) {
  const {
    success,
    error
  } = res.jsonResult;
  if (error) {
    return Promise.reject(error);
  }
  return res;
}

function xFetch(url, options) {
  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
    authorization : localStorage.getItem('n-token') || '',
  };

  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export default xFetch;
