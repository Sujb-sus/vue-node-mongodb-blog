import axios from "utils/request";

/**
 * 上传图片
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUploadImg(params) {
  return axios.postFile("/uploadImage", params);
}
/**
 * 删除图片
 * @param data
 * @returns {AxiosPromise}
 */
export function apiDelUploadImg(params) {
  return axios.post("/delUploadImage", params);
}
