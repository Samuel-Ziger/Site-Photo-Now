export default {
  setID(state, id) {
    state.id = id;
  },
  resetCompra(state) {
    state.compra = {};
    state.id = null;
  },
  setCompra(state, payload) {
    state.compra = payload;
  },
  setCompraTipoPagamento(state, payload) {
    state.compra.tipoPagamento = payload;
  },
};
