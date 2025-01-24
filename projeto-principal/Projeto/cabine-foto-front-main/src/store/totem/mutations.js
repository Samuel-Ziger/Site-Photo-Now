export default {
  setToken(state, payload) {
    state.token = payload;
  },
  setTotem(state, payload) {
    state.totem = payload;
  },
  setError(state, payload) {
    state.erros.push(payload);
  },
  removeErrors(state) {
    state.erros = [];
  },
  setAFK(state, payload) {
    state.afk = payload;
  },
};
