export default {
  getMolduras(state) {
    return state.molduras;
  },
  getMoldurasPolaroid(state) {
    return state.molduras.filter((e) => e.tipo === "polaroid");
  },
  getMoldurasNormal(state) {
    return state.molduras.filter((e) => e.tipo === "normal");
  },
};
