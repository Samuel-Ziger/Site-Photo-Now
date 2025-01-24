import tipoFoto from "../../constants/tipoFoto";

export default {
  getPrecos(state) {
    return state.precos;
  },
  getPriceForType: (state) => (tipo) => {
    if (state && state.precos) {
      return state.precos.filter((preco) => preco.tipo === tipo);
    } else {
      return [];
    }
  },
  getPrecosPolaroid(state) {
    if (state && state.precos) {
      return state.precos.filter((p) => p.tipo === tipoFoto.POLAROID);
    }
    return [];
  },
  getPrecosNormal(state) {
    if (state && state.precos) {
      return state.precos.filter((p) => p.tipo === tipoFoto.NORMAL);
    }
    return [];
  },
  getPrecosFotos3X4(state) {
    if (state && state.precos) {
      return state.precos.filter((p) => p.tipo === tipoFoto.FOTOS_3X4);
    }
    return [];
  },
};
