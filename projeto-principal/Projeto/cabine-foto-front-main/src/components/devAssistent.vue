<template>
  <div
    v-if="false"
    class="
      tw-fixed
      tw-top-0
      tw-p-2
      tw-font-normal
      tw-text-sm
      tw-bg-black
      tw-text-white
    "
  >
    <button
      @click="setHidden()"
      class="tw-rounded-md tw-p-1 tw-px-2 tw-bg-white tw-text-black"
    >
      toggle (dev)
    </button>
    <div v-if="hidden == true">
      {{ getCOMPRA }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hidden: false,
    };
  },
  methods: {
    setHidden() {
      this.hidden = !this.hidden;
    },
  },
  computed: {
    getCOMPRA() {
      return this.$store.getters["compra/getCompra"];
    },
  },
};
</script>

<style></style>
