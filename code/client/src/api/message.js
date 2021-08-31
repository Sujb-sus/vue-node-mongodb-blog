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
 * 获取回复数量
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetReplyCount(params) {
  return axios.get("/message/replyCount", params);
}

/**
 * 添加留言
 * @param data
 * @returns {AxiosPromise}
 */
export function apiAddMessage(params) {
  return axios.post("/message/add", params);
}

/**
 * 点赞
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdateLikes(params) {
  return axios.post("/message/updateLikes", params);
}

/**
 * 回复
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdateReplys(params) {
  return axios.post("/message/updateReplys", params);
}
