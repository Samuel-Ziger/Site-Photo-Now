export default [
  {
    path: "home",
    name: "homeCabine",
    component: () => import("@/views/cabine/home.vue"),
  },
  {
    path: "selecione-tipo-foto",
    name: "selectTypePhoto",
    component: () => import("@/views/cabine/photoTypeSelect.vue"),
  },
  {
    path: "selecione-qtd-foto",
    name: "selectQtdPhoto",
    component: () => import("@/views/cabine/photoQtdSelect.vue"),
  },
  {
    path: "scan-qr-code",
    name: "scanQrCode",
    component: () => import("@/views/cabine/scanQrCode.vue"),
  },
  {
    path: "aguardando-upload",
    name: "aguardandoUpload",
    component: () => import("@/views/cabine/aguardandoUpload.vue"),
  },
  {
    path: "editor",
    name: "editorDeFotos",
    component: () => import("@/views/cabine/editor/vEditor.vue"),
  },
  {
    path: "seleciona-pagamento",
    name: "Metodo de pagamento DEB/CRED",
    component: () =>
      import("@/views/cabine/pagamento/SelecionaMetodoDePagamento.vue"),
  },
  {
    path: "pagamento-em-processo",
    name: "Pagamento em processo",
    component: () => import("@/views/cabine/pagamento/ProcessoDePagamento.vue"),
  },
  {
    path: "pagamento-sucesso",
    name: "SucessoPagamento",
    component: () => import("@/views/cabine/pagamento/vPagamentoSucesso.vue"),
  },
  {
    path: "pagamento-falha",
    name: "Falha no pagamento",
    component: () => import("@/views/cabine/pagamento/falha.vue"),
  },
  {
    path: "impressao",
    name: "impressao",
    component: () => import("@/views/cabine/impressora/vImpressao.vue"),
  },
  {
    path: "agradecimento",
    name: "agradecimento",
    component: () => import("@/views/cabine/agradecimento.vue"),
  },
  {
    path: "*",
    name: "nada",
    redirect: "/home",
  },
];
