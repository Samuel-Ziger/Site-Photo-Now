<template>
  <div class="transition-global totemBG tw-bg-cover tw-w-screen tw-h-screen">
    <div class="tw-text-center">
      <vBtnReset />
      <img
        src="@/assets/logo-white.svg"
        class="tw-w-1/4 tw-mx-auto tw-relative tw-py-10 tw-pt-10"
      />
    </div>
    <div class="">
      <div class="tw-w-5/6 tw-p-8 tw-rounded-lg tw-mx-auto tw-my-auto">
        <div class="tw-py-8 tw-text-white tw-text-5xl tw-text-center">
          Forma de pagamento
        </div>
        <div
          class="
            tw-text-4xl tw-tracking-wider tw-text-center tw-py-5 tw-text-white
          "
        >
          Selecione a forma de pagamento que deseja utilizar.
        </div>
        <div class="tw-pt-6">
          <div
            class="
              tw-pt-0 tw-text-4xl tw-uppercase tw-text-center tw-text-white
            "
          >
            Total da compra
          </div>
          <div
            class="
              tw-text-6xl
              tw-py-5
              tw-pb-10
              tw-text-center
              tw-font-black
              tw-text-white
            "
          >
            {{ getPrice }}
          </div>
        </div>
        <div class="tw-text-center">
          <div class="tw-pb-3">
            <div
              :key="index"
              v-for="(item, index) in getPaymentMethods"
              class="tw-py-4"
            >
              <button
                class="
                  gradientItem
                  tw-text-left
                  tw-p-6
                  tw-px-8
                  tw-rounded-xl
                  tw-text-white
                  tw-text-5xl
                  tw-w-5/6
                "
                :class="{
                  'tw-opacity-100': ItemSelecionado == item,
                  'tw-opacity-60': ItemSelecionado != item,
                }"
                @click="selectItem(item)"
              >
                <div class="tw-pb-2">
                  <svg
                    v-if="item.code == 'Credito' || item.code == 'Debito'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="tw-h-16 tw-w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <div v-else>
                    <v-icon color="white" size="60">mdi-qrcode-scan</v-icon>
                  </div>
                </div>
                <div class="tw-text-4xl tw-mt-2">
                  {{ item.name }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <vFloatGuideVue
        :next="true"
        :destinoNext="'PAGAMENTO_PROCESSO'"
        :back="false"
        v-if="ItemSelecionado.code"
      />
      <vTimeout
        v-if="getCOMPRA.etapa === $root.chapters().PAGAMENTO_SELECT"
        :segundos="$root.getTimeoutName($root.chapters().PAGAMENTO_SELECT)"
      />
    </div>
  </div>
</template>

<script>
import anime from "animejs";
// setEtapaCompra
import {
  setCompra,
  setEtapaCompra /*updateCompraInterface*/,
} from "@/service/firebase.js";
import vFloatGuideVue from "../../../components/floatGuide.vue";
import { getMethodForCode } from "@/constants/types/PaymentMethods.js";

export default {
  components: {
    vFloatGuideVue,
  },
  data() {
    return {
      ItemSelecionado: {},
    };
  },
  mounted() {
    this.animaMounted();
    this.validaRegraNoPain();
  },
  computed: {
    getPaymentMethods() {
      let paymentMethods = [];
      let cabineConfig = this.$store.getters["totem/getTotem"].config;

      if (cabineConfig.pagamento_cartao_credito) {
        let includePayment = getMethodForCode("Credito");
        paymentMethods.push(includePayment);
      }
      if (cabineConfig.pagamento_cartao_debito) {
        let includePayment = getMethodForCode("Debito");
        paymentMethods.push(includePayment);
      }
      if (cabineConfig.pagamento_pix) {
        let includePayment = getMethodForCode("PIX");
        paymentMethods.push(includePayment);
      }

      return paymentMethods;
    },
    getPrice() {
      let valor = this.getCOMPRA.valor;
      let currency = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);
      return currency;
    },
    getCOMPRA() {
      return this.$store.getters["compra/getCompra"];
    },
  },
  methods: {
    validaRegraNoPain() {
      const requirePain =
        this.$store.getters["totem/getTotem"].config.pular_etapa_pagamento;
      if (requirePain) {
        console.log("REGRA SEM PAGAR");
        let compra_atual = this.$store.getters["compra/getCompra"];
        compra_atual.pago = false;
        compra_atual.etapa = "IMPRESSAO";
        //updateCompraInterface(compra_atual);
        setCompra(compra_atual);
        setEtapaCompra("IMPRESSAO");
      } else {
        console.log("REGRA PAGAR ");
        let compra_atual = this.$store.getters["compra/getCompra"];
        compra_atual.pago = true;
        //updateCompraInterface(compra_atual);
        setCompra(compra_atual);
      }
    },
    selectItem(item) {
      this.ItemSelecionado = item;
      this.selecionaMetodoDePagamento(item.code);
    },
    async selecionaMetodoDePagamento(metodo) {
      if (metodo == "Debito" || metodo == "Credito" || metodo == "PIX") {
        let compraAtual = this.$store.getters["compra/getCompra"];
        compraAtual.tipoCartao = metodo;
        await setCompra(compraAtual);
      } else {
        alert("METODO NÃO ENCONTRADO");
      }
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
.btnActionCard {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  @apply tw-bg-white tw-group tw-rounded-md tw-justify-center tw-items-center tw-shadow-lg tw-mx-auto tw-w-full tw-border-2 tw-border-solid tw-border-gray-300 tw-p-6 tw-text-gray-700 tw-font-bold tw-text-xl tw-tracking-wide focus:tw-bg-indigo-700 hover:tw-bg-indigo-700 hover:tw-text-white focus:tw-text-white;
}

.gradientItem {
  background: linear-gradient(180deg, #8876a1 0%, #222129 100%);
}

.totemBG {
  background-size: cover;
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
</style>
