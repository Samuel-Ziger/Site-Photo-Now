export const PaymentTypes = [
  {
    code: "Credito",
    aggregated: "pagamento_cartao_credito",
    rootPath: "config",
    type: "Boolean",
    name: "Cartão de Crédito",
    icon: "credito",
  },
  {
    code: "Debito",
    aggregated: "pagamento_cartao_debito",
    rootPath: "config",
    type: "Boolean",
    name: "Cartão de Débito",
    icon: "debito",
  },
  {
    code: "PIX",
    aggregated: "pagamento_pix",
    rootPath: "config",
    type: "Boolean",
    name: "Pagamento por PIX",
    icon: "pix",
  },
];

export const getMethodForCode = (code) => {
  return PaymentTypes.find((item) => item.code === code);
};

export const getAllCodes = () => {
  let listPayment = [];
  PaymentTypes.forEach((elem) => {
    listPayment.push(elem.code);
  });
  return listPayment;
};
