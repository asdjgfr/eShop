import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import modules from "../store/index";

export default new Vuex.Store({
  modules,
  state: {
    session: ""
  },
  getters: {},
  actions: {},
  mutations: {}
});
