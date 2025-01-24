<template>
  <div
    class="
      tw-bg-gray-800
      tw-bg-opacity-90
      tw-w-full
      tw-h-full
      tw-justify-center
      tw-items-center
      tw-flex
    "
  >
    <div class="tw-bg-white tw-w-3/6 tw-p-5 tw-rounded-xl">
      <div
        class="
          tw-text-center tw-py-2 tw-font-normal tw-text-2xl tw-text-gray-800
        "
      >
        Erro de configuração
      </div>
      <div class="tw-text-left tw-p-2">
        <div
          class="
            tw-text-md tw-text-red-900 tw-flex tw-items-center tw-justify-center
          "
          :key="index"
          v-for="(item, index) in getErros"
        >
          <v-icon
            size="24"
            color="red darken-3"
            class="tw-fill-current tw-stroke-current tw-mr-3"
            >mdi-alert-decagram</v-icon
          >
          <div
            class="
              tw-text-sm tw-font-bold
              red--text
              text--darken-3
              tw-text-left
            "
          >
            {{ item.mensagem }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { db } from "@/service/firebase";
//import { addDoc, Timestamp } from "firebase/firestore";
export default {
  props: {
    erros: {
      type: Array,
      require: true,
    },
  },
  computed: {
    getErros() {
      return this.$store.getters["totem/getErros"];
    },
  },
  mounted() {
    this.$root.sendError();
  },
};
</script>

<style></style>
