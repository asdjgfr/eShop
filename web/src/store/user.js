const state = {
  username: "",
  isAdmin: false
};
const mutations = {
  changeUsername(state, username) {
    state.username = username;
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
