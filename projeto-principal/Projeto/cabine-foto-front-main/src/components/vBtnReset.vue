<template>
  <div class="tw-fixed tw-top-3 tw-right-3 tw-z-20">
    <button
      class="
        tw-px-6
        tw-py-4
        tw-bg-white
        tw-shadow-lg
        tw-font-semibold
        tw-justify-center
        tw-items-center
        tw-flex
        tw-rounded-md
        tw-text-2xl
      "
      @click="eraseAll()"
    >
      <v-icon color="red" size="30">mdi-sync</v-icon>
      <div class="tw-ml-2">Reiniciar</div>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    eraseAll() {
      this.$root.SairDaCompra("CANCELADA");
    },
  },
};
</script>

<style></style>
