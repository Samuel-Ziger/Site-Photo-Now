export default {
  getID(state) {
    return state.compra.id;
  },
  getCompra(state) {
    return state.compra || {};
  },
  getCode(state) {
    return state.compra.code;
  },
};
