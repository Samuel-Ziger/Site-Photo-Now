import Vue from "vue";
import Vuex from "vuex";
import moduleTotem from "./totem/index";
import moduleCompra from "./compra/index";
import modulePrecos from "./precos/index";
import moduleMolduras from "./molduras/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modal: {
      tipo: "info",
      mensagem: "",
      toggle: false,
    },
  },
  mutations: {
    closeModal(state) {
      state.modal = {
        toggle: false,
        mensagem: "",
        tipo: "info",
      };
    },
    setModal(state, payload) {
      state.modal = {
        toggle: payload.toggle,
        mensagem: payload.mensagem,
        tipo: payload.tipo ? payload.tipo : "info",
      };
    },
  },
  getters: {
    getModal(state) {
      return state.modal;
    },
  },
  modules: {
    totem: moduleTotem,
    compra: moduleCompra,
    precos: modulePrecos,
    molduras: moduleMolduras,
  },
});
