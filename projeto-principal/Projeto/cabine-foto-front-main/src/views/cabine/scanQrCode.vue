<template>
  <div class="transition-global">
    <vBtnReset />

    <div class="totemBG tw-bg-cover tw-w-full tw-h-full tw-absolute">
      <div class="tw-top-16 tw-text-center">
        <img
          src="@/assets/logo-white.svg"
          class="tw-w-2/5 tw-mx-auto tw-relative tw-mt-10"
        />
      </div>
      <div class="tw-z-10 tw-mt-16 tw-w-full tw-flex">
        <div class="tw-w-5/6 tw-p-6 tw-rounded-lg tw-mx-auto tw-my-auto">
          <div class="tw-items-center tw-text-center tw-text-white">
            <div class="tw-text-5xl tw-font-semibold tw-mb-5">
              Upload de fotos
            </div>

            <div class="tw-text-4xl tw-font-normal">
              <div class="tw-mb-3">Para continuar siga as instruções:</div>
              <div
                class="tw-p-1 tw-mb-1"
                style="background-color: #8c2667; border-radius: 20px"
              >
                <div class="tw-my-5">
                  <div class="mb-10">
                    <span>1.</span> Abra o site
                    <p
                      class="tw-text-5xl"
                      style="background-color: #651946; border-radius: 20px"
                    >
                      {{ mobileURL }}
                    </p>
                  </div>
                  <div class="mb-2">
                    <span>2.</span> Digite o código:
                    <p
                      class="tw-text-5xl"
                      style="background-color: #651946; border-radius: 20px"
                    >
                      {{ getCode }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span class="tw-text-6xl tw-font-normal">Ou</span>
            <div
              class="tw-p-1 tw-mt-1"
              style="background-color: #8c2667; border-radius: 20px"
            >
              <div class="tw-text-4xl tw-my-5">Escaneie o QR Code abaixo:</div>
              <div class="tw-py-1">
                <div class="tw-p-5 qrcodeBorder">
                  <img :src="dataImagem" class="tw-mx-auto tw-w-64" />
                </div>
                <!-- // * COMENTAR EM PROD.
              <a
                class="tw-text-gray-600"
                :href="getURLQRCODE"
                target="_mob"
                >{{ getURLQRCODE }}</a>
              --></div>
            </div>
            <p class="tw-text-2xl mt-1">Atenção!</p>
            <p class="tw-text-2xl">É necessário estar conectado a internet.</p>
          </div>
        </div>
      </div>
    </div>

    <vTimeout
      id="SCAN_QR_CODE"
      :timeEtapa="GET_COMPRA.etapa"
      :segundos="$root.getTimeoutName('SCAN_QR_CODE')"
    />

    <vFloatGuide destinoBack="QTDE_FOTO" :next="false" />
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { createCode } from "@/service/firebase";
import {
  mobileURLProduction,
  mobileURLDefault,
  baseURL,
} from "@/constants/base_url";
import QRCode from "qrcode";
import vFloatGuide from "@/components/floatGuide";
export default {
  components: {
    vFloatGuide,
  },
  data() {
    return {
      dataImagem: "",
      mobileURL:
        process.env.VUE_APP_ENV === "production"
          ? mobileURLProduction
          : mobileURLDefault,
    };
  },
  beforeMount() {
    let compraID = this.$store.getters["compra/getID"];
    createCode(compraID);
  },
  mounted() {
    this.animaMounted();
    this.gerarQRCODE();
  },
  computed: {
    getCode() {
      return this.$store.getters["compra/getCode"];
    },
    GET_COMPRA() {
      return this.$store.getters["compra/getCompra"];
    },
    getURLQRCODE() {
      return this.getURL();
    },
  },
  methods: {
    getURL() {
      let getCompraID = this.$store.getters["compra/getID"];
      let transfer = `${baseURL}init/${getCompraID}`;
      return transfer;
    },
    gerarQRCODE() {
      let transfer = this.getURL();
      QRCode.toDataURL(transfer, { errorCorrectionLevel: "H" })
        .then((url) => {
          this.dataImagem = url;
        })
        .catch((err) => {
          console.error(err);
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
.transition-global {
  opacity: 0;
}

.customBorder {
  border-color: #98a1bb;
  border-width: 1px;
  border-spacing: 30px;
  @apply tw-border-dashed
        tw-w-full
        tw-h-full
        tw-flex
        tw-flex-col
        tw-items-center
        tw-justify-center
        tw-rounded-full
        tw-border-gray-400;
}
.polaroidColorBG {
  background-color: rgba(72, 87, 236, 0.2);
}
.comumColorBG {
  background-color: rgba(255, 51, 68, 0.2);
}
.totemBG {
  background-image: linear-gradient(
      180deg,
      #978fc4 0%,
      #a78ebd 34.84%,
      rgba(207, 138, 172, 0.8) 100%
    ),
    url("../../assets/fundo.png");
}
.qrcodeBorder {
  background-image: url("../../assets/qrcode-border.svg");
  background-size: contain;
  display: inline-block;
}
</style>
