import axios from "utils/request";

/**
 * 获取留言列表
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetMessageList(params) {
  return axios.get("/message/list", params);
}

/**
 * 删除留言
 * @param data
 * @returns {AxiosPromise}
 */
export function apiDelMessage(params) {
  return axios.get("/message/del", params);
}

/**
 * 删除回复
 * @param data
 * @returns {AxiosPromise}
 */
export function apiDelReply(params) {
  return axios.postFile("/message/delReply", params);
}
