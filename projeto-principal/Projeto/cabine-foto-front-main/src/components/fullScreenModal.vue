<template>
  <div>
    <div
      class="
        tw-z-20
        tw-opacity-95
        tw-fixed
        tw-top-0
        tw-left-0
        tw-h-screen
        tw-w-screen
        bgCustom
      "
    ></div>
    <div
      class="
        tw-z-30
        tw-fixed
        tw-top-0
        tw-left-0
        tw-h-screen
        tw-w-screen
        tw-grid
        tw-grid-rows-2
        tw-grid-cols-1
        tw-text-white
        tw-text-center
      "
    >
      <div
        class="tw-row-span-1 tw-place-self-end tw-p-8 tw-mb-20 tw-font-normal"
      >
        <slot name="header" />
      </div>
      <div class="tw-row-span-1">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bgCustom {
  background: linear-gradient(
    162.73deg,
    rgba(140, 38, 103, 0.9) 0%,
    rgba(82, 8, 55, 0.9) 101.37%
  );
  backdrop-filter: blur(16px);
}
</style>
