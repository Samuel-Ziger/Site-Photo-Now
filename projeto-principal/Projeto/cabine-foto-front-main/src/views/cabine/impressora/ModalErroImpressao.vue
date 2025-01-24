<template>
  <div>
    <vModalFull>
      <template>
        <div
          class="
            tw-grid
            tw-grid-cols-1
            tw-grid-rows-2
            tw-justify-center
            tw-items-center
            tw-h-screen
          "
        >
          <div class="tw-text-center tw-p-10">
            <div class="tw-mb-20 tw-text-7xl tw-py-4 tw-font-bold">Opss...</div>
            <div class="tw-text-4xl tw-py-4 tw-mb-10">
              Ocorreu um problema na impressão, você pode tentar até 5 vezes
            </div>
            <div
              class="
                tw-text-4xl
                tw-py-4
                tw-bg-white
                tw-rounded-full
                tw-text-black
                tw-inline-block
                tw-p-6
              "
            >
              Tentativas: {{ contagem }} / 5
            </div>
          </div>
          <div class="tw-text-center">
            <button
              @click="$emit('close')"
              class="
                tw-w-4/5 tw-text-4xl tw-rounded-xl tw-mx-auto tw-uppercase
                btnCustom
                tw-py-8
              "
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        </div>
      </template>
    </vModalFull>
  </div>
</template>

<script>
import vModalFull from "@/components/vModalFull.vue";
export default {
  components: { vModalFull },
  props: {
    contagem: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.btnCustom {
  background-color: #988fc4;
}
</style>
