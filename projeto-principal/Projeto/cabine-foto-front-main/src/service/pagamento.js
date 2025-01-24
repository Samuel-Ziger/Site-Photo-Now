import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9001/",
  //timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default {
  getComprovante() {
    return instance.get("/v1/pinpad/reimpressao");
  },
  cancelarPagamento() {
    return instance.get("/v1/pinpad/cancelar-transacao");
  },
  gerarPagamento(formaPagamento, valorPagamento) {
    return instance.post("v1/pinpad/pagar", {
      formaPagamento: formaPagamento,
      valor: valorPagamento,
    });
  },
  gerarPix(valorPagamento) {
    return instance.post("v1/pinpad/gerar-qrcode", {
      formaPagamento: "PIX",
      valor: valorPagamento,
    });
  },
  aguardandoPagamentoPix(id) {
    return instance.post("v1/pinpad/aguardando-pagamento-pix", { id: id });
  },
};
