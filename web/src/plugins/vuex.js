import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import modules from "../store/index";

export default new Vuex.Store({
  modules,
  state: {
    session: "",
    // 全局的加载动画
    globalLoading: true,
    globalLoadingText: "加载中。。。",
    globalToast: false,
    globalToastText: ""
  },
  getters: {},
  actions: {},
  mutations: {
    toggleGlobalLoading(state, params) {
      const { show, text } = params;
      state.globalLoading = show;
      state.globalLoadingText = text ?? "加载中。。。";
    },
    toggleGlobalToast(state, params) {
      const { show, text } = params;
      state.globalToast = show;
      state.globalToastText = text ?? "";
    }
  }
});
