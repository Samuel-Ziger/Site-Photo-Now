<template>
  <div class="tw-fixed tw-w-full tw-bottom-8 tw-justify-center tw-text-center">
    <button
      class="tw-p-12 tw-bg-white tw-rounded-full tw-font-bold tw-shadow-xl"
      @click="actionBtn()"
    >
      <v-icon color="black">mdi-arrow-left</v-icon>
    </button>
  </div>
</template>

<script>
import { setEtapaCompra } from "@/service/firebase";
export default {
  props: {
    goto: {
      type: String,
      require: true,
    },
  },
  methods: {
    actionBtn() {
      setEtapaCompra(this.goto);
    },
  },
};
</script>

<style></style>
