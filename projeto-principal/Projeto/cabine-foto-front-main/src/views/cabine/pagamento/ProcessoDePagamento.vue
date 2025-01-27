<template>
  <div class="transition-global">
    <div
      class="totemBG tw-bg-cover tw-w-screen tw-h-screen tw-flex tw-flex-col"
    >
      <div class="tw-flex-none">
        <div class="tw-py-16 tw-text-center">
          <img
            src="@/assets/logo-white.svg"
            class="tw-w-2/5 tw-mx-auto tw-relative tw-mt-10"
          />
        </div>
      </div>
      <div class="tw-flex-1 tw-justify-center tw-items-center">
        <div class="tw-text-white">
          <div id="pgqrpix" v-if="getCOMPRA.tipoCartao == 'PIX'">
            <div class="tw-font-bold tw-text-center tw-py-5 tw-text-6xl">
              Pagamento via Pix
            </div>

            <div class="tw-my-20 tw-text-center">
              <div
                v-if="dataImagem"
                class="tw-p-10 tw-inline-block tw-w-2/5 tw-mx-auto qrcodeBorder"
              >
                <img class="tw-w-full tw-rounded-xl" :src="dataImagem" />
              </div>
              <div
                v-else
                class="
                  mockQRCODE
                  tw-rounded-xl tw-justify-center tw-bg-white tw-mx-auto tw-grid
                "
              >
                <v-icon
                  color="black"
                  size="120"
                  class="tw-mx-auto tw-animate-spin"
                  >mdi-loading</v-icon
                >
              </div>
            </div>
            <div class="tw-my-20 tw-text-center">
              <div class="tw-text-center tw-text-3xl tw-text-white tw-mx-auto">
                Total da compra
              </div>
              <div
                class="
                  tw-text-white tw-text-center tw-text-6xl tw-pt-3 tw-font-light
                "
              >
                {{ getPrice }}
              </div>
            </div>
            <div class="tw-text-center tw-mt-5">
              <div>
                <button
                  :disabled="lockCancel"
                  @click="cancelarPagamento"
                  class="
                    tw-text-4xl
                    tw-w-2/3
                    tw-mx-auto
                    tw-bg-red-700
                    tw-text-center
                    tw-text-white
                    tw-p-10
                    tw-rounded-md
                  "
                >
                  <v-icon
                    v-if="lockCancel"
                    color="white"
                    size="60"
                    class="tw-animate-spin"
                    >mdi-loading</v-icon
                  >
                  <div v-else>CANCELAR PIX</div>
                </button>
              </div>
            </div>
          </div>
          <div id="pgcard" v-else>
            <vFullModal>
              <template v-slot:header>
                <div class="tw-text-6xl">
                  Seus melhores momentos <br />na palma da sua mão!
                </div>
                <div class="tw-text-5xl tw-mx-10 tw-mt-16 tw-font-light">
                  Efetue o pagamento na máquina de cartão, para revelar
                  suas fotos
                </div>
              </template>
              <template v-slot:footer>
                <v-icon size="200" color="white" class="tw-animate-spin"
                  >mdi-loading</v-icon
                >
              </template>
            </vFullModal>
          </div>
        </div>
      </div>
      <vTimeout
        v-if="
          getCOMPRA.etapa &&
          getCOMPRA.etapa === $root.chapters().PAGAMENTO_PROCESSO
        "
        :segundos="$root.getTimeoutName($root.chapters().PAGAMENTO_PROCESSO)"
      />
    </div>
  </div>
</template>

<script>
import vFullModal from "@/components/fullScreenModal";
import servicePagamento from "@/service/pagamento";
import anime from "animejs";
import QRCode from "qrcode";
import { setEtapaCompra } from "../../../service/firebase";

export default {
  components: {
    vFullModal,
  },
  data() {
    return {
      lockCancel: false,
      dataImagem: "",
    };
  },
  mounted() {
    this.animaMounted();
    this.iniciaPagamento();
  },
  computed: {
    getCOMPRA() {
      return this.$store.getters["compra/getCompra"];
    },
    getPrice() {
      let valor = this.getCOMPRA.valor;
      let currency = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);
      return currency;
    },
  },
  methods: {
    cancelarPagamento() {
      this.lockCancel = true;
      servicePagamento
        .cancelarPagamento()
        .then(() => {
          setEtapaCompra(this.$root.chapters().PAGAMENTO_SELECT);
        })
        .catch((err) => {
          console.log(err);
          setEtapaCompra(this.$root.chapters().PAGAMENTO_FALHOU);
        });
    },
    gerarQRCODE(code) {
      if (!code) {
        alert("PROBLEMA NA GERAÇÃO DO QRCODE");
      }
      QRCode.toDataURL(code, { errorCorrectionLevel: "H" })
        .then((url) => {
          this.dataImagem = url;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    aguardandoPagamentoPix(resp) {
      const pagamento_id = resp.id;
      servicePagamento
        .aguardandoPagamentoPix(pagamento_id)
        .then(() => {
          setEtapaCompra(this.$root.chapters().PAGAMENTO_SUCESSO);
        })
        .catch((err) => {
          console.error(err);
          setEtapaCompra(this.$root.chapters().PAGAMENTO_FALHOU);
        });
    },
    iniciaPix(compra) {
      servicePagamento
        .gerarPix(compra.valor)
        .then((resp) => {
          this.gerarQRCODE(resp.data.url);
          this.aguardandoPagamentoPix(resp.data);
        })
        .catch((err) => {
          setEtapaCompra(this.$root.chapters().PAGAMENTO_FALHOU);
          console.error(err);
        });
    },
    iniciaPagamento() {
      const compra = this.$store.getters["compra/getCompra"];
      if (compra.tipoCartao === "PIX") {
        this.iniciaPix(compra);
      } else {
        this.iniciarMaquininha(compra);
      }
    },
    iniciarMaquininha(compra) {
      servicePagamento
        .gerarPagamento(compra.tipoCartao, compra.valor)
        .then(() => {
          setEtapaCompra(this.$root.chapters().PAGAMENTO_SUCESSO);
        })
        .catch((err) => {
          console.error(err);
          setEtapaCompra(this.$root.chapters().PAGAMENTO_FALHOU);
        });
    },
    animaMounted() {
      anime({
        targets: ".transition-global",
        opacity: {
          value: 1,
          delay: 0,
          duration: 1000,
          easing: "easeInOutExpo",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mockQRCODE {
  width: 432px;
  height: 432px;
}
.totemBG {
  background-image: linear-gradient(
      180deg,
      #978fc4 0%,
      #a78ebd 34.84%,
      rgba(207, 138, 172, 0.8) 100%
    ),
    url("../../../assets/fundo.png");
}
.transition-global {
  opacity: 0;
}
.header-text {
  color: #3d5a80;
  font-size: 28px;
  line-height: 29px;
}
.textBody {
  color: #4a4a4a;
  font-family: "Roboto", sans-serif;
}
.qrcodeBorder {
  background-image: url("../../../assets/qrcode-border.svg");
  background-size: contain;
}
</style>
