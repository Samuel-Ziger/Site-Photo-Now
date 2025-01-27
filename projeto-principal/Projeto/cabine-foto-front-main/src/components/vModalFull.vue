<template>
  <div>
    <div
      class="
        tw-z-30
        tw-opacity-90
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
        tw-z-40
        tw-fixed
        tw-top-0
        tw-left-0
        tw-h-screen
        tw-w-screen
        tw-text-white
        tw-text-center
      "
    >
      <slot />
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
