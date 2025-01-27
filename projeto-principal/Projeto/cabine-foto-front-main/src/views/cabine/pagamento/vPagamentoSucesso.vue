<template>
  <div
    class="bgcustom tw-w-screen tw-h-screen tw-text-center tw-flex tw-flex-col"
  >
    <div class="tw-text-center tw-flex-none tw-items-center tw-py-20">
      <img src="@/assets/logo-white.svg" class="tw-w-5/12 tw-mx-auto" />
    </div>
    <div class="">
      <div class="tw-flex-1 tw-items-center">
        <div class="tw-text-white tw-py-10">
          <img
            src="@/assets/pagamento_sucesso.svg"
            class="tw-mx-auto tw-w-3/6 tw-mb-0"
          />
          <div class="tw-mt-20">
            <div class="tw-text-5xl tw-my-5">Obaa... Pagamento concluído</div>
            <div class="tw-text-4xl tw-mt-5 tw-tracking-wide tw-mx-20">
              Seu pagamento foi aprovado! Vamos revelar suas fotos?!
            </div>
          </div>
        </div>
        <div class="tw-absolute tw-bottom-20 tw-w-screen">
          <div class="tw-items-center">
            <div class="tw-items-center tw-text-center tw-text-white">
              <div>
                <button
                  class="
                    tw-p-10 tw-rounded-xl tw-w-5/6 tw-mt-20 tw-text-4xl
                    btnCustom
                  "
                  @click="gerarComprovante()"
                  :disabled="loading"
                >
                  <v-icon v-if="loading" class="tw-animate-spin" size="35"
                    >mdi-loading</v-icon
                  >
                  <span v-else> COMPROVANTE DE PAGAMENTO </span>
                </button>
              </div>
              <div>
                <button
                  class="
                    tw-p-10 tw-rounded-xl tw-w-5/6 tw-my-10 tw-text-4xl
                    btnCustom
                  "
                  @click="imprimirFotos()"
                  :disabled="loading"
                >
                  <v-icon v-if="loading" class="tw-animate-spin" size="35"
                    >mdi-loading</v-icon
                  >
                  <span v-else> IMPRIMIR FOTOS </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vModalComprovante
      @close="closeModalComprovante"
      :isError="comprovanteError"
      :content="modalStringHTML"
      v-if="modalComprovante"
    />
  </div>
</template>

<script>
import servicePayment from "@/service/pagamento.js";
import vModalComprovante from "./vModalComprovante.vue";
import { setEtapaCompra } from "../../../service/firebase";

export default {
  components: {
    vModalComprovante,
  },
  data() {
    return {
      loading: false,
      modalStringHTML: "",
      modalComprovante: false,
      comprovanteError: false,
    };
  },
  methods: {
    closeModalComprovante() {
      this.modalStringHTML = "";
      this.modalComprovante = false;
      this.comprovanteError = false;
    },
    imprimirFotos() {
      this.loading = true;
      setEtapaCompra("IMPRESSAO");
    },
    gerarComprovante() {
      this.loading = true;
      servicePayment
        .getComprovante()
        .then((resp) => {
          this.loading = false;
          this.modalComprovante = true;
          this.modalStringHTML = resp.data;
          this.comprovanteError = false;
        })
        .catch(() => {
          this.loading = false;
          this.modalComprovante = true;
          this.comprovanteError = true;
          this.modalStringHTML =
            "Ocorreu um erro durante o processo do comprovante tente novamente";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.btnCustom {
  background-color: #8c2667;
  &:disabled {
    @apply tw-bg-gray-100 tw-text-gray-500;
  }
}
.bgcustom {
  background-image: linear-gradient(
      180deg,
      #978fc4 0%,
      #a78ebd 34.84%,
      rgba(207, 138, 172, 0.8) 100%
    ),
    url("../../../assets/fundo.png");
  background-size: cover;
}
</style>
