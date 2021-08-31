import axios from "utils/request";

/**
 * 获取标签列表
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetLabelList(params) {
  return axios.get("/label/list", params);
}
/**
 * 新增标签
 * @param data
 * @returns {AxiosPromise}
 */
export function apiAddLabel(params) {
  return axios.postFile("/label/add", params);
}
/**
 * 修改标签
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdateLabel(params) {
  return axios.post("/label/update", params);
}
/**
 * 删除标签
 * @param data
 * @returns {AxiosPromise}
 */
export function apiDelLabel(params) {
  return axios.get("/label/del", params);
}
