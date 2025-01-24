// OLD FORMAT
export const tiposDeFotos = {
  NORMAL: "normal",
  POLAROID: "polaroid",
  FOTOS_3X4: "fotos_3x4",
};

const photosTypes = [
  {
    id: tiposDeFotos.POLAROID,
    nome: "Foto Polaroid",
    descricao: "Foto com tamanho 7x10 cm",
    imagem: require("@/assets/foto-polaroid.png"),
    customCSS: "cardGradient1",
  },
  {
    id: tiposDeFotos.NORMAL,
    nome: "Foto Comum",
    descricao: "Tamanho 10 x 15cm",
    imagem: require("@/assets/foto-comum.png"),
    customCSS: "cardGradient2",
  },
  {
    id: tiposDeFotos.FOTOS_3X4,
    nome: "Fotos 3x4",
    descricao: "8 fotos no tamanho 3 x 4cm",
    imagem: require("@/assets/foto-3x4.png"),
    customCSS: "cardGradient3",
  },
];

export const getId = (id) => {
  photosTypes.find((item) => item.id === id);
};

export const getObjectTypes = () => {
  let objectList = {};
  photosTypes.forEach((item) => {
    objectList[item.id] = item.id;
  });
  return objectList;
};

export const getList = () => {
  return photosTypes;
};

export const hasId = (id) => {
  return photosTypes.find((item) => item.id === id) ? true : false;
};

export default photosTypes;
