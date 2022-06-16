import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: Cookies.get("token") || null, //token
    id: Cookies.get("id"),
    drawer: true,
    env: process.env.VUE_APP_ENV, //env
    config: {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  },
  getters: {
    getUser(state) {
      return state.token !== null && state.token !== undefined;
    },
  },
  mutations: {},
  actions: {
    async getData(context, data) {
      let config = context.state.config;
      let env = context.state.env;
      try {
        const res = await axios.get(`${env}api/${data.path}`, config);
        return res.data;
      } catch (err) {
        return err;
      }
    },

    async postData(context, data) {
      let config = context.state.config;
      let env = context.state.env;
      const res = await axios.post(`${env}api/${data.path}`, data.body, config);
      try {
        return res.data;
      } catch (err) {
        return err;
      }
    },
    async putData(context, data) {
      let config = context.state.config;
      let env = context.state.env;
      const res = await axios.put(`${env}api/${data.path}`, data.body, config);
      try {
        return res.data;
      } catch (err) {
        return err;
      }
    },
    async deleteData(context, data) {
      let config = context.state.config;
      let env = context.state.env;
      const res = await axios.delete(
        `${env}api/${data.path}`,

        config,
      );
      try {
        return res.data;
      } catch (err) {
        return err;
      }
    },
  },
  modules: {},
});
