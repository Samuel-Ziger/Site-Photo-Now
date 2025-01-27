<template>
  <div class="transition-global">
    <div class="tw-w-screen tw-h-screen totemBG tw-bg-cover">
      <vBtnReset />
      <div class="tw-flex">
        <div class="tw-w-full tw-h-full tw-absolute">
          <div class="tw-z-10 tw-h-full tw-w-full tw-flex tw-items-center">
            <div class="tw-mx-auto tw-text-white">
              <div class="tw-font-bold tw-text-6xl tw-text-center tw-py-2">
                Aguardando
              </div>
              <div
                class="
                  tw-flex tw-justify-center tw-items-center tw-py-3 tw-my-20
                "
              >
                <v-icon size="150" color="white" class="tw-animate-spin"
                  >mdi-loading</v-icon
                >
              </div>
              <div class="tw-text-center tw-text-5xl tw-text-white tw-mx-20">
                Carregue as imagens pelo telefone e finalize o processo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vTimeout
      v-if="GET_COMPRA.etapa == 'UPLOAD'"
      id="UPLOAD"
      :segundos="$root.getTimeoutName('UPLOAD')"
    />
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  data() {
    return {
      handleSnapCompra: {},
    };
  },
  mounted() {
    this.animaMounted();
  },
  computed: {
    GET_COMPRA() {
      return this.$store.getters["compra/getCompra"];
    },
    getURLQRCODE() {
      return this.getURL();
    },
  },
  methods: {
    removeHandle() {
      this.handleSnapCompra();
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
  background-size: cover;
}
</style>
