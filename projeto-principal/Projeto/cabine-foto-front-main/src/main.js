import BtnVoltar from "@/components/btnVoltar";
import vTimeout from "@/components/vTimeount";
import labelEtapa from "@/constants/etapaCompra";
import timePage from "@/constants/timeout_page";
import {
  db,
  removeCodeFirebase,
  setCompra,
  setEtapaCompra,
  setEtapaCompraLocal,
} from "@/service/firebase";
import axios from "axios";
import {
  Timestamp,
  // MANUTENCAO
  addDoc,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import "./scss/index.scss";
import store from "./store";

Vue.component("btn-voltar", BtnVoltar);
Vue.component("vBtnReset", () => import("@/components/vBtnReset"));
/*
import { makeServer } from "./mirage";
if (process.env.VUE_APP_ENV === "development") {
  makeServer({ environment: "development" });
}
*/

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

Vue.component("vTimeout", vTimeout);
Vue.config.productionTip = false;

function actErr(err, info) {
  if (process.env.VUE_APP_ENV !== "development") {
    appvue.$root.sendOneError(err, info);
  } else {
    console.error("devlog", err, info);
  }
}

Vue.config.warnHandler = (err, vm, info) => {
  actErr(err, info);
};

Vue.config.errorHandler = (err, vm, info) => {
  actErr(err, info);
};

Vue.config.errorCaptured = (err, vm, info) => {
  actErr(err, info);
};


// Sentry.init({
//   Vue,  // Passa a instância Vue para o Sentry
//   dsn: "https://5d01bfbdbf2149e530f33715dfd8beb9@o4507420778299392.ingest.us.sentry.io/4507420782952448",
//   integrations: [
//     Sentry.browserTracingIntegration(),  // Integração de rastreamento do navegador para monitoramento de desempenho
//     Sentry.replayIntegration(),  // Integração para reprodução de sessões
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Captura 100% das transações
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["localhost", /^https:\/\/app\.photonow\.com\.br/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // Define a taxa de amostragem de sessões em 10%. Pode ser alterada para 100% durante o desenvolvimento e uma taxa menor em produção.
//   replaysOnErrorSampleRate: 1.0, // Se você não estiver amostrando toda a sessão, altera a taxa de amostragem para 100% quando ocorrerem erros nas sessões.
// });

const appvue = new Vue({
  data() {
    return {
      handlerCompraFirebase: function () {},
      handlerTotemFirebase: function () {},
    };
  },
  methods: {
    getAFK() {
      return this.$store.getters["totem/getAFK"];
    },
    chapters() {
      return labelEtapa;
    },
    async SairDaCompra(status) {
      if (status === labelEtapa[status]) {
        let compra = store.getters["compra/getCompra"];
        compra.etapa = labelEtapa[status];
        await removeCodeFirebase();
        await setCompra(compra);
      } else {
        console.error("Erro de REFERENCIA, contactar o suporte");
        alert("Erro de REFERENCIA, contactar o suporte");
      }
    },
    async sendOneError(err, tracker) {
      let totemID =
        this.$store.getters["totem/getTotem"].id ||
        this.$route.params.id ||
        "Sem definição";
      let instanteTime = Timestamp.fromDate(new Date());
      let payload = {
        totem_id: totemID,
        time: instanteTime,
        error: err ? err : "undefined",
        info: tracker ? tracker : "undefined",
        route: this.$route.path ? this.$route.path : "undefined",
      };
      console.log("sendOneError: ", payload);
      let referencia = collection(db, "erros");
      await addDoc(referencia, payload);
    },
    async sendError(mensagem) {
      console.log("sendError: ", mensagem);
      /*
      MANUTENCAO
      let totemID =
        this.$store.getters["totem/getTotem"].id ||
        this.$route.params.id ||
        "Sem definição";
      let instanteTime = Timestamp.fromDate(new Date());
      let errosList = this.$store.getters["totem/getErros"];
      if (errosList.length < 1) {
        errosList.push({
          mensagem: mensagem,
        });
      }
      await errosList.forEach(async (element) => {
        let payload = {
          totem_id: totemID,
          time: instanteTime,
          error: element.mensagem,
          info: "",
          route: this.$route.path,
        };
        await addDoc(collection(db, "erros"), { ...payload });
      });
      */
    },
    goto(rota) {
      if (this.$route.path == rota) {
        return;
      } else {
        this.$router.push(rota);
      }
    },
    errorConfig(mensagem, redir) {
      this.$store.commit("totem/setError", {
        mensagem: mensagem,
      });
      if (redir) {
        this.$router.push("/error-config");
      }
    },
    redirectsPorData(compraEtapa) {
      //console.log("====> compraEtapa alterada", compraEtapa);
      switch (compraEtapa) {
        case labelEtapa.CANCELADA:
          this.goto("/cabine/home");
          break;
        case labelEtapa.EXPIROU:
          this.goto("/cabine/home");
          break;
        case labelEtapa.TIPO_FOTO:
          this.goto("/cabine/selecione-tipo-foto");
          break;
        case labelEtapa.QTDE_FOTO:
          this.goto("/cabine/selecione-qtd-foto");
          break;
        case labelEtapa.SCAN_QR_CODE:
          this.goto("/cabine/scan-qr-code");
          break;
        case labelEtapa.UPLOAD:
          this.goto("/cabine/aguardando-upload");
          break;
        case labelEtapa.EDICAO:
          this.goto("/cabine/editor");
          break;
        case labelEtapa.PAGAMENTO_SELECT:
          if (
            this.$store.getters["totem/getTotem"].config.pular_etapa_pagamento
          ) {
            setEtapaCompra("IMPRESSAO");
          } else {
            this.goto("/cabine/seleciona-pagamento");
          }
          break;
        case labelEtapa.PAGAMENTO_PROCESSO:
          if (
            this.$store.getters["totem/getTotem"].config.pular_etapa_pagamento
          ) {
            setEtapaCompra("IMPRESSAO");
          } else {
            this.goto("/cabine/pagamento-em-processo");
          }
          break;
        case labelEtapa.PAGAMENTO_SUCESSO:
          this.goto("/cabine/pagamento-sucesso");
          break;
        case labelEtapa.PAGAMENTO_FALHOU:
          if (
            this.$store.getters["totem/getTotem"].config.pular_etapa_pagamento
          ) {
            setEtapaCompra("IMPRESSAO");
          } else {
            this.goto("/cabine/pagamento-falha");
          }
          break;
        case labelEtapa.IMPRESSAO:
          this.goto("/cabine/impressao");
          break;
        case labelEtapa.AGRADECIMENTO:
          this.goto("/cabine/agradecimento");
          break;
        default:
          this.goto("/404");
      }
    },
    CreatListenerPurchase() {
      this.handlerCompraFirebase();
      let compra = this.$store.getters["compra/getCompra"];
      let docRef = doc(db, "compras", compra.id);
      this.handlerCompraFirebase = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          var compraPayload = snapshot.data();
          setEtapaCompraLocal(compraPayload.etapa);
          this.redirectsPorData(compraPayload.etapa);
        }
      });
    },
    getTimeoutName(name) {
      return timePage[name];
    },
    mockmode(mode_etapa) {
      let estapa_mock;
      if (mode_etapa && labelEtapa[mode_etapa]) {
        estapa_mock = mode_etapa;
      } else {
        alert("Falha ao tentar mockar a etapa não existe");
        return false;
      }
      const compraMock = {
        aplicar_desconto_id: null,
        codigo_gateway_pag: null,
        data_hora: Timestamp.fromDate(new Date()),
        etapa: estapa_mock,
        id: "mockTestDev2023",
        keep_alive: Timestamp.fromDate(new Date()),
        qtde_foto: 4,
        tipo_foto: "polaroid",
        valor: 50,
        flags: ["mock"],
        pago: false,
        totem_id: "eFS8Hb7LgE6K0KQMPf8w", // totem trulogic para testes
        tipoCartao: "PIX",
        code: null,
        mocke: true,
      };
      this.$store.commit("compra/setCompra", compraMock);
      setCompra(compraMock);

      setTimeout(() => {
        this.CreatListenerPurchase();
      }, 1000);
    },
    infoModal(mensagem) {
      this.$store.commit("setModal", {
        tipo: "info",
        mensagem: mensagem,
        toggle: true,
      });
    },
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
