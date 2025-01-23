<script lang="ts" setup>
import CommandPalette from './command-palette.vue'
import { useEditorStore } from '@/store/editorStore.ts'
import Photo from './photo.vue'
// SELFIE: 400 pixels de largura por 400 pixels de altura.
// 10x20: 720 pixels de largura por 1440 pixels de altura.
// 10x15: 720 pixels de largura por 1080 pixels de altura.
// 3x4: 216 pixels de largura por 288 pixels de altura.
// 2x2: 144 pixels de largura por 144 pixels de altura.
// POLAROID: 350 pixels de largura por 450 pixels de altura.
// 5x7: 360 pixels de largura por 504 pixels de altura.

const editorStore = useEditorStore()
</script>

<template>
  <CommandPalette />
  <div
    class="flex-1 rounded-md h-[70vh] flex flex-col gap-4 justify-center items-center relative"
  >
    <div
      class="h-full w-full flex justify-center items-center bg-[#EBECF0] rounded-xl overflow-hidden"
    >
      <Photo
        :url="editorStore.currentOrderItem.originalPictureUrl"
        v-if="editorStore.currentOrderItem.originalPictureUrl"
      />
    </div>
  </div>
</template>
