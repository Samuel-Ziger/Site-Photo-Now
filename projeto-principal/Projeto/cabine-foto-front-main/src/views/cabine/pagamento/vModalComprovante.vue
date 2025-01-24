<template>
  <div
    class="
      tw-w-screen
      tw-h-screen
      tw-fixed
      tw-top-0
      tw-left-0
      tw-flex
      tw-items-center
      tw-text-center
      tw-bg-black
      tw-bg-opacity-50
    "
  >
    <div class="tw-bg-white tw-p-10 tw-rounded-xl tw-w-5/6 tw-mx-auto">
      <div v-if="!isError" class="tw-text-4xl tw-font-bold">
        Comprovante de Pagamento
      </div>
      <div v-else class="tw-text-gray-900 tw-p-5 tw-text-5xl">Erro</div>
      <div
        class="tw-text-center tw-text-3xl tw-my-5 tw-leading-snug"
        v-html="content"
      ></div>
      <div class="tw-mt-10">
        <button
          class="
            tw-w-5/6
            tw-text-4xl
            tw-rounded-xl
            tw-bg-pink-800
            tw-text-white
            tw-p-8
          "
          @click="$emit('close')"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isError: {
      type: Boolean,
    },
    content: {
      required: true,
      type: String,
    },
  },
};
</script>

<style></style>
