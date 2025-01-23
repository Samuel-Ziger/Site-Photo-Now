<script setup lang="ts">
import { Crop } from 'lucide-vue-next'
import { toRef } from 'vue'

const props = defineProps({
  instance: {
    type: Object,
    required: true,
  },
})
console.log(props)

const emit = defineEmits(['cancelCrop', 'applyCrop'])
const editor = toRef(props, 'instance')

function cancelCrop() {
  emit('cancelCrop')
}

function applyCrop() {
  emit('applyCrop')
}

function presetCrop(presetType?: string) {
  switch (presetType) {
    case 'preset-3-2':
      editor.value.setCropzoneRect(3 / 2)
      break
    case 'preset-4-3':
      editor.value.setCropzoneRect(4 / 3)
      break
    case 'preset-5-4':
      editor.value.setCropzoneRect(5 / 4)
      break
    case 'preset-7-5':
      editor.value.setCropzoneRect(7 / 5)
      break
    case 'preset-16-9':
      editor.value.setCropzoneRect(16 / 9)
      break
    default:
      editor.value.setCropzoneRect()
      break
  }
}
</script>

<template>
  <ul class="flex justify-evenly gap-6">
    <li
      class="flex flex-col justify-center items-center"
      @click="() => presetCrop()"
    >
      <Crop color="#EC4899" :size="32" />
      <span class="text-[#737373] text-sm">Personalizado</span>
    </li>
    <li
      class="flex flex-col justify-center items-center"
      @click="() => presetCrop('preset-3-2')"
    >
      <Crop color="#737373" :size="32" />
      <span class="text-[#737373] text-sm">3:2</span>
    </li>

    <li
      class="flex flex-col justify-center items-center"
      @click="() => presetCrop('preset-4-3')"
    >
      <Crop color="#737373" :size="32" />
      <span class="text-[#737373] text-sm">4:3</span>
    </li>
    <li
      class="flex flex-col justify-center items-center"
      @click="() => presetCrop('preset-5-4')"
    >
      <Crop color="#737373" :size="32" />
      <span class="text-[#737373] text-sm">5:4</span>
    </li>
    <li
      class="flex flex-col justify-center items-center"
      @click="() => presetCrop('preset-7-5')"
    >
      <Crop color="#737373" :size="32" />
      <span class="text-[#737373] text-sm">7:5</span>
    </li>
    <li
      class="flex flex-col justify-center items-center"
      @click="() => presetCrop('preset-16-9')"
    >
      <Crop color="#737373" :size="32" />
      <span class="text-[#737373] text-sm">16:9</span>
    </li>
  </ul>
  <div class="flex justify-center items-center gap-3 mt-2">
    <button
      @click="applyCrop"
      class="text-white font-semibold text-lg bg-[#EC4899] py-1 px-2 rounded-3xl"
    >
      Aplicar
    </button>
    <button
      @click="cancelCrop"
      class="text-[#737373] border border-[#D4D4D4] font-semibold text-lg bg-transparent py-1 px-2 rounded-3xl"
    >
      Cancelar
    </button>
  </div>
</template>
