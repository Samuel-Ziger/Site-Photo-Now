<template>
  <div
    class="
      tw-flex
      tw-fixed
      tw-top-0
      tw-left-0
      tw-w-screen
      tw-h-screen
      tw-items-center
      customBG
      tw-z-50
    "
  >
    <div
      class="
        tw-bg-white
        tw-p-6
        tw-px-8
        tw-mx-auto
        tw-my-auto
        tw-rounded-md
        tw-shadow-2xl
        tw-w-1/2
        tw-text-center
      "
    >
      <div
        class="
          tw-text-center
          tw-object-center
          tw-p-3
          tw--mt-32
          tw-shadow
          tw-rounded-full
          tw-bg-white
          tw-inline-block
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="tw-mx-auto tw-text-pink-600 tw-h-16 tw-w-16 tw-animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <div class="tw-py-2 tw-font-bold tw-text-4xl">Quase lá</div>
      <div class="tw-py-2 tw-text-3xl">Importando imagens para impressão</div>
    </div>
  </div>
  <!-- 
    <div
      class="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-justify-center tw-align-middle tw-bg-gray-700 tw-bg-opacity-95 tw-z-50 tw-grid tw-grid-rows-3"
    >
      <div></div>
      <div
        class="tw-bg-white tw-p-6 tw-px-8 tw-mx-auto tw-my-auto tw-inline-grid tw--mt-8 tw-rounded-md tw-shadow-2xl tw-w-full"
      >
        <div class="tw-p-1 tw-font-bold tw-text-3xl">Quase lá</div>
        <div class="tw-p-1 tw-text-2xl">Importando imagens para impressão</div>
        <div class="tw-p-1 tw-my-4 tw-text-center tw-object-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="tw-mx-auto tw-text-pink-600 tw-h-12 tw-w-12 tw-animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
        </div>
      </div>
      <div></div>
    </div>
    -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.customBG {
  @apply tw-bg-opacity-50 tw-bg-gradient-to-b tw-from-pink-400 tw-to-pink-600;
}
</style>
