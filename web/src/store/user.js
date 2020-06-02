const state = {
  login: false,
  username: "",
  isAdmin: false
};
const mutations = {
  updateUserInfo(state, params) {
    const { login, username, isAdmin } = params;
    state.login = login;
    state.username = username;
    state.isAdmin = isAdmin;
  }
};
export default {
  state,
  mutations
};
