<template>
  <div class="containActionsSelect">
    <button
      v-if="getSelectedObject"
      class="actionSelect"
      @click="$emit('discartaSelect')"
    >
      <div
        class="
          tw-flex-none
          tw-pr-2
          tw-relative
          tw-text-gray-300
          tw-fill
          tw-fill-current
        "
      >
        <v-icon size="40" color="rgba(200,0,0,1)"
          >mdi-cursor-default-click</v-icon
        >
      </div>
      <div class="tw-flex-1 tw-text-xl tw-font-bold tw-text-black">
        Anular a seleção
      </div>
    </button>
    <button
      v-if="getSelectedObject && getSelectedObject.tipo == 'texto'"
      class="actionSelect"
      @click="$emit('removerItem')"
    >
      <div
        class="
          tw-flex-none
          tw-pr-2
          tw-relative
          tw-text-gray-300
          tw-fill
          tw-fill-current
        "
      >
        <v-icon class="" size="40" color="rgba(200,0,0,1)">mdi-delete</v-icon>
      </div>
      <div class="tw-flex-1 tw-text-xl tw-font-bold tw-text-black">
        Remover texto
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: ["objetoSelecionado"],
  computed: {
    getSelectedObject() {
      return this.objetoSelecionado;
    },
  },
};
</script>

<style lang="scss" scoped>
.containActionsSelect {
  min-height: 60px;
  @apply tw-relative tw-flex tw-px-2 tw-overflow-x-auto;
}
.actionSelect {
  @apply tw-left-0
          tw-flex-none
          tw-w-auto
          tw-text-black
          tw-bg-white
          tw-rounded-lg
          tw-flex
          tw-flex-row
          tw-mr-2
          tw-px-5
          tw-py-3
          tw-items-center;
}
</style>
