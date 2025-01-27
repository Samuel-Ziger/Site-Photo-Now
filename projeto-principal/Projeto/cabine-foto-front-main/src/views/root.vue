<template>
  <div class="tw-h-full tw-w-full">
    <vModalComponent v-if="getModal" />
    <div>
      <div
        v-if="loading"
        class="
          tw-flex
          tw-text-center
          tw-flex-col
          tw-justify-center
          tw-align-middle
          tw-p-10
        "
      >
        <v-progress-circular
          size="80"
          :value="valorCarregamento"
          intermitente
          class="tw-mx-auto tw-mb-8"
        ></v-progress-circular>
        <div class="tw-font-bold tw-text-2xl tw-text-gray-600">
          Carregando totem
        </div>
        <div class="tw-font-normal tw-text-sm tw-text-gray-400">
          conectando ao servidor
        </div>
      </div>
      <div class="tw-h-full tw-w-full" v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import vModalComponent from "@/components/vModalComponent";
export default {
  components: {
    vModalComponent,
  },
  data() {
    return {
      loading: true,
      valorCarregamento: 0,
    };
  },
  computed: {
    getModal() {
      return this.$store.getters["getModal"].toggle;
    },
  },
};
</script>
