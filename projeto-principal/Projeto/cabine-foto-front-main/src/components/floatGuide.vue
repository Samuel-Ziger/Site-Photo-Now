<template>
  <div class="tw-p-10 tw-fixed tw-bottom-0 tw-w-screen menuSection">
    <div
      class="tw-grid tw-grid-cols-1 tw-text-center"
      :class="{ 'tw-grid-cols-2 tw-gap-10': this.back && this.next }"
    >
      <div v-if="this.back">
        <button class="btnCustom" @click="btnVoltar()">Voltar</button>
      </div>
      <div v-if="this.next">
        <button
          class="btnCustom"
          :class="{
            disabled: !validNext,
            'animate__animated animate__pulse animate__slow animate__infinite':
              validNext,
          }"
          animate__pulse
          :disabled="!validNext"
          @click="btnProximo()"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { setEtapaCompra } from "@/service/firebase";

export default {
  props: {
    validNext: {
      type: Boolean,
      default: true,
    },
    back: {
      type: Boolean,
      default: true,
    },
    next: {
      type: Boolean,
      default: true,
    },
    destinoBack: {
      type: String,
      default: "",
    },
    destinoNext: {
      type: String,
      default: "",
    },
  },
  methods: {
    btnProximo() {
      if (!this.destinoNext) {
        alert("Não foi possível encontrar o destino do botão proximo");
        return false;
      }
      setEtapaCompra(this.destinoNext);
    },
    btnVoltar() {
      if (!this.destinoBack) {
        alert("Não foi possível encontrar o destino do botão voltar");
        return false;
      }
      setEtapaCompra(this.destinoBack);
    },
  },
};
</script>

<style lang="scss" scoped>
.menuSection {
  background: #cf8aac;
  box-shadow: 0px -8px 8px rgba(140, 38, 103, 0.2);
}
.btnCustom {
  background: #8c2667;
  box-shadow: 0px 4px 8px rgba(162, 134, 199, 0.25);
  border-radius: 8px;
  @apply tw-p-8 tw-w-full tw-text-white tw-cursor-pointer tw-font-bold tw-text-3xl;
  &.disabled {
    @apply tw-opacity-50;
  }
}
.menuBG {
  background-color: #cf8aac;
}
</style>
