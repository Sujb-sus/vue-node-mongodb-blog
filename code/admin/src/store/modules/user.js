import axios from "src/utils/request";
import { getToken } from "src/utils/auth";
import md5 from "js-md5";

const user = {
  state: {
    list: [],
    total: 0,
    username: "",
    roles: null,
    token: getToken(),
    otherList: [],
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERINFO(state, info) {
      state.username = info.username;
      state.roles = info.roles;
    },
    USERLIST(state, data) {
      state.list = data.list;
      state.total = data.list.length || 0;
    },
    GET_INFOLIST(state, data) {
      state.otherList = data;
    },
    CLEARINFO(state) {
      state.username = "";
      state.roles = null;
    },
  },
  actions: {
    clearInfo({ commit }) {
      commit("CLEARINFO");
    },
    userLogin({ state, commit }, info) {
      let { username, pwd } = info;
      return new Promise((resolve, reject) => {
        axios
          .post("/user/login", {
            username: username,
            pwd: md5(pwd),
          })
          .then((res) => {
            state.token = getToken();
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/info", {
            token: state.token,
          })
          .then((res) => {
            commit("SET_USERINFO", res.data);
            resolve(res);
          })
          .catch((err) => {
            // console.log(err)
            reject(err);
          });
      });
    },
    getUserList({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/list", params)
          .then((res) => {
            commit("USERLIST", res.data);
            resolve(res);
          })
          .catch((err) => {
            // console.log(err)
            reject(err);
          });
      });
    },
    addUser({ commit }, info) {
      info.pwd = md5(info.pwd);
      return new Promise((resolve, reject) => {
        axios
          .post("/user/add", info)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    delUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/del", { id: id })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateUser({ commit }, info) {
      info.pwd = md5(info.pwd);
      info.old_pwd = md5(info.old_pwd);
      return new Promise((resolve, reject) => {
        axios
          .post("/user/update", info)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};

export default user;
