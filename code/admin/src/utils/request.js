import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import { removeToken } from './auth';

axios.defaults.withCredentials = true;

// 发送时
axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

// 响应时
axios.interceptors.response.use(
  (response) => response,
  (err) => Promise.resolve(err.response)
);

// 检查状态码
function checkStatus(res) {
  if (res.status === 200 || res.status === 304) {
    return res.data;
  }
  // token过期清掉
  if (res.status === 401) {
    removeToken();
    Message({
      message: res.data,
      type: 'error',
      duration: 2 * 1000,
    });
    return {
      code: 401,
      msg: res.data || res.statusText,
      data: res.data,
    };
  }
  return {
    code: 0,
    msg: res.data.msg || res.statusText,
    data: res.statusText,
  };
}

// 检查CODE值
function checkCode(res) {
  if (res.code === 0) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 2 * 1000,
    });
    throw new Error(res.msg);
  }
  return res;
}

const prefix = '/admin_api';
export default {
  get(url, params) {
    if (!url) return;
    return axios({
      method: 'get',
      url: prefix + url,
      params,
      timeout: 30000,
    })
      .then(checkStatus)
      .then(checkCode);
  },
  post(url, data) {
    if (!url) return;
    return axios({
      method: 'post',
      url: prefix + url,
      data: qs.stringify(data),
      timeout: 30000,
    })
      .then(checkStatus)
      .then(checkCode);
  },
  postFile(url, data) {
    if (!url) return;
    return axios({
      method: 'post',
      url: prefix + url,
      data,
    })
      .then(checkStatus)
      .then(checkCode);
  },
};
